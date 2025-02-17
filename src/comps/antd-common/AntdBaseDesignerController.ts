import AbstractDesignerController from "../../framework/core/AbstractDesignerController";
import {UpdateOptions} from "../../framework/core/AbstractController";
import {ComponentBaseProps} from "../common-component/common-types";
import {Options, Plot} from "@antv/g2plot";
import ObjectUtil from "../../utils/ObjectUtil";
import BPExecutor from "../../blueprint/core/BPExecutor";
import ComponentUtil from "../../utils/ComponentUtil";

export abstract class AntdBaseDesignerController<I extends Plot<any> = Plot<Options>,
    C extends ComponentBaseProps = ComponentBaseProps> extends AbstractDesignerController<I, C> {

    protected interval: NodeJS.Timeout | null = null;
    //上一次数据连接状态 true：成功 false：失败
    protected lastReqState: boolean = true;
    //是否为断开后重新连接
    protected reConnect: boolean = false;

    changeData(data: any) {
        if (this.config?.style?.data)
            this.config!.style!.data = data;
        this.instance?.changeData(data);
    }

    registerEvent(): void {
        const nodeId = this.config?.base?.id!;
        this.instance?.on('plot:click', (...args: any) => {
            BPExecutor.triggerComponentEvent(nodeId!, "globalClick", {msg: '这是测试参数'})
        });
        this.instance?.on('element:click', (...args: any) => {
            BPExecutor.triggerComponentEvent(nodeId!, "elementClick", {msg: '这是测试参数'})
        });
        // 图例添加点击事件
        this.instance?.on('legend-item:click', (...args: any) => {
            BPExecutor.triggerComponentEvent(nodeId!, "legendClick", {msg: '这是测试参数'})
        });
        // 图例名称添加点击事件
        this.instance?.on('legend-item-name:click', (...args: any) => {
            BPExecutor.triggerComponentEvent(nodeId!, "elementNameClick", {msg: '这是测试参数'})
        });
        // axis-label 添加点击事件
        this.instance?.on('axis-label:click', (...args: any) => {
            BPExecutor.triggerComponentEvent(nodeId!, "axisLabelClick", {msg: '这是测试参数'})
        });
    }

    public async commonCreateByCustom(container: HTMLElement, CustomComponent: any, config: C) {
        this.config = config;
        this.container = container;
        this.instance = await ComponentUtil.createAndRender(container, CustomComponent, config);
    }

    public commonCreate(container: HTMLElement, Clazz: new (...args: any[]) => I, config: C): void {
        this.config = config;
        this.container = container;
        this.instance = new Clazz(container, this.config?.style! as C);
        this.instance?.render();
        this.registerEvent();
    }

    public commonUpdate(config: C, Clazz: new (...args: any[]) => I, upOp?: UpdateOptions,): void {
        this.config = ObjectUtil.merge(this.config, config);
        upOp = upOp || {reRender: true};
        if (upOp.reRender)
            this.instance?.update(this.config?.style!);
    }
}