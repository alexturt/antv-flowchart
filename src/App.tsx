import type { IAppLoad } from '@antv/xflow'

import React, { useRef, useEffect } from 'react'
/** 交互组件 */
import {
    /** XFlow核心组件 */
        XFlow,
    /** 流程图画布组件 */
        FlowchartCanvas,
    /** 流程图配置扩展 */
        FlowchartExtension,
    /** 流程图节点组件 */
        FlowchartNodePanel,
    /** 流程图表单组件 */
        FlowchartFormPanel,
    /** 通用组件：快捷键 */
        KeyBindings,
    /** 通用组件：画布缩放 */
        CanvasScaleToolbar,
    /** 通用组件：右键菜单 */
        CanvasContextMenu,
    /** 通用组件：工具栏 */
        CanvasToolbar,
    /** 通用组件：对齐线 */
        CanvasSnapline,
    /** 通用组件：节点连接桩 */
        CanvasNodePortTooltip,
} from '@antv/xflow'
/** 配置Command*/
import { useCmdConfig } from './config-cmd'
/** 配置Menu */
import { useMenuConfig } from './config-menu'
/** 配置Toolbar */
import { useToolbarConfig } from './config-toolbar'
/** 配置快捷键 */
import { useKeybindingConfig } from './config-keybinding'
//import type { Node, Edge } from '@antv/x6';
import { Graph } from '@antv/x6';
import "antd4/dist/antd.css";
import "@ant-design/flowchart/dist/index.css";
import './index.less'
const DndNode = (props) => {
    const { size = { width: 126, height: 104 }, data } = props
    const { width, height } = size
    const { label, stroke, fill, fontFill, fontSize } = data

    return (
        <div
            className="container"
            style={{
                width,
                height,
                borderColor: stroke,
                backgroundColor: fill,
                color: fontFill,
                fontSize,
            }}
        >
            <span>{label}</span>
        </div>
    )
}
export interface IProps {
    meta: { flowId: string }
}

export const Demo: React.FC<IProps> = props => {
    const { meta } = props
    const toolbarConfig = useToolbarConfig()
    const menuConfig = useMenuConfig()
    const keybindingConfig = useKeybindingConfig()
    const graphRef = useRef<Graph>()
    const commandConfig = useCmdConfig()
    /**
     * @param app 当前XFlow工作空间
     * @param extensionRegistry 当前XFlow配置项
     */

    const onLoad: IAppLoad = async app => {
        graphRef.current = await app.getGraphInstance()
        graphRef.current
        const source = graphRef.current?.addNode({
            shape: 'custom-node-width-port',
            x: 40,
            y: 40,
            label: 'hello',
            ports: {
                items: [
                    {
                        id: 'port_1',
                        group: 'bottom',
                    },
                    {
                        id: 'port_2',
                        group: 'bottom',
                    },
                ],
            },
        })
        const target = graphRef.current?.addNode({
            shape: 'custom-node-width-port',
            x: 160,
            y: 180,
            label: 'world',
            ports: {
                items: [
                    {
                        id: 'port_3',
                        group: 'top',
                    },
                    {
                        id: 'port_4',
                        group: 'top',
                    },
                ],
            },
        })
        console.log(graphRef)
        console.log(source)
        console.log(target)
    }

    useEffect(() => {
        if (graphRef.current) {
            graphRef.current.on('node:click', (...arg) => {
                //console.log(arg)
            })
        }
    }, [graphRef])


    return (
        <XFlow
            className="flow-user-custom-clz"
            commandConfig={commandConfig}
            onLoad={onLoad}
            meta={meta}
        >
            <FlowchartExtension />
            <FlowchartNodePanel
                registerNode={{
                    title: 'custom', key: '1',
                    nodes: [
                        {
                            component: DndNode,
                            popover: () => <div>自定义节点</div>,
                            name: 'custom-node-width-port',
                            width: 210,
                            height: 130,
                            label: 'custom-node-width-port',
                        },
                    ],
                }}
                position={{ width: 162, top: 40, bottom: 0, left: 0 }}
            />
            <CanvasToolbar
                className="xflow-workspace-toolbar-top"
                layout="horizontal"
                config={toolbarConfig}
                position={{ top: 0, left: 0, right: 0, bottom: 0 }}
            />
            <FlowchartCanvas position={{ top: 40, left: 0, right: 0, bottom: 0 }}>
                <CanvasScaleToolbar
                    layout="horizontal"
                    position={{ top: -40, right: 0 }}
                    style={{
                        width: 150,
                        left: 'auto',
                        height: 39,
                    }}
                />
                <CanvasContextMenu config={menuConfig} />
                <CanvasSnapline color="#faad14" />
                <CanvasNodePortTooltip />
            </FlowchartCanvas>
            <FlowchartFormPanel show={true} position={{ width: 200, top: 40, bottom: 0, right: 0 }} />
            <KeyBindings config={keybindingConfig} />
        </XFlow>
    )
}

function App() {
    return <Demo meta={{ flowId: 'string' }} />;
}
export default App;
