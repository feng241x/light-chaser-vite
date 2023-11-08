import React, {ClassType} from "react";
import { createRoot } from 'react-dom/client';
class ComponentUtil {

    public static async createAndRender<T, P = any>(container: HTMLElement, clazzTemp: ClassType<P, any, any>, props?: P): Promise<T | null> {
        const containerDom = createRoot(container);
        if (!container)
            throw new Error("create react node failed, container is null");
        return await new Promise<T | null>((resolve) => {
            try {
                containerDom.render(
                    React.createElement(clazzTemp, {
                        ref: (instance: T) => resolve(instance),
                        ...props
                    })
                );
            } catch (e: any) {
                console.error('create react node failed ', e)
                resolve(null);
            }
        });
    }
}

export default ComponentUtil;