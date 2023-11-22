import React, {useEffect, useRef} from "react";
import DragScaleProvider from "../../framework/drag-scale/DragScaleProvider";
import bpStore from "../store/BPStore";
import {reRenderLine} from "../drag/BPMovable";


export interface BPDragScaleContainerContainerProps {
    children?: React.ReactNode;
}

export const BPDragScaleContainer: React.FC<BPDragScaleContainerContainerProps> = (props) => {
    const {children} = props;
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const {canvasOffset, setCanvasTranslate, setCanvasScale} = bpStore;
        const container = containerRef.current;
        const content = contentRef.current;
        if (container && content) {
            const dragScaleProvider = new DragScaleProvider({
                container,
                content,
                posOffset: canvasOffset,
                dragCallback: (dsData) => {
                    const {position} = dsData;
                    setCanvasTranslate(position);
                    reRenderLine();
                },
                scaleCallback: (dsData) => {
                    const {position, scale} = dsData;
                    setCanvasScale(scale);
                    setCanvasTranslate(position);
                    reRenderLine()
                }
            });
            return () => {
                dragScaleProvider.destroy();
            }
        }
    }, []);
    return (
        <div className={'bp-ds-container'} ref={containerRef} style={{
            overflow: "hidden",
            width: window.innerWidth - 670,
            height: window.innerHeight - 75,
        }}>
            <div className={'bp-ds-content'} ref={contentRef}
                 style={{
                     width: 0,
                     height: 0,
                     backgroundColor: '#797979'
                 }}>
                {children}
            </div>
        </div>
    )
}
