import {Component, Suspense} from 'react';
import rightStore from "./RightStore";
import {observer} from "mobx-react";
import './ConfigContent.less';
import designerStore from "../store/DesignerStore";
import {AbstractComponentDefinition} from "../../framework/core/AbstractComponentDefinition";
import {ConfigType} from "./ConfigType";
import AbstractDesignerController from "../../framework/core/AbstractDesignerController";
import ObjectUtil from "../../utils/ObjectUtil";
import historyRecordOperateProxy from "../operate-provider/undo-redo/HistoryRecordOperateProxy";
import Loading from "../../ui/loading/Loading";
import DesignerLoaderFactory from "../loader/DesignerLoaderFactory";

class ConfigContent extends Component {

    createProxy = (controller: AbstractDesignerController) => {
        return new Proxy(controller, {
            get(target, prop) {
                const originalMethod = target[prop as keyof AbstractDesignerController];
                if (typeof originalMethod === 'function' && originalMethod.name === "update") {
                    return new Proxy(originalMethod, {
                        apply(target, thisArg, argumentsList) {
                            const newValue = argumentsList[0];
                            const oldValue = ObjectUtil.getOriginValue(thisArg.config, argumentsList[0]);
                            historyRecordOperateProxy.doStyleUpd(newValue, oldValue);
                            return target.apply(thisArg, argumentsList);
                        }
                    });
                }
                return originalMethod;
            }
        });
    }

    buildConfigContent = () => {
        const {compInstances} = designerStore;
        let {activeMenu, activeElem} = rightStore;
        let abstractConfigObj: AbstractComponentDefinition = DesignerLoaderFactory.getLoader().customComponentInfoMap[activeElem.type + '']
        if (!abstractConfigObj) return;
        let configMapping = abstractConfigObj.getMenuToConfigContentMap();
        const ConfigComp: React.ComponentType<ConfigType> = configMapping![activeMenu];
        //使用动态代理对象，监听属性变化
        const controller = this.createProxy(compInstances[activeElem.id + '']);
        return (
            <Suspense fallback={<Loading/>}>
                <ConfigComp controller={controller}/>
            </Suspense>
        )

    }

    onClose = () => {
        const {setContentVisible} = rightStore;
        setContentVisible && setContentVisible(false);
    }

    render() {
        return (
            <>{this.buildConfigContent()}</>
        );
    }
}

export default observer(ConfigContent);