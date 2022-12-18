import {cloneDeep} from 'lodash';

//基础条形图初始化数据和配置
const AntdBaseBarInitData = () => {
    return cloneDeep({
        baseInfo: {
            name: '基础条形图',
            type: 'AntdBaseBar'
        },
        baseStyle: {
            padding: '10px',
            backgroundColor: 'rgba(23,157,169,0.12)'
        },
        chartProps: {
            data: [
                {
                    name: '1951 年',
                    value: 38,
                },
                {
                    name: '1952 年',
                    value: 52,
                },
                {
                    name: '1956 年',
                    value: 61,
                },
            ],
            xField: 'value',
            yField: 'name',
            seriesField: 'name',
            xAxis: {
                grid: null,
                label: {
                    style: {
                        fill: 'rgb(0,255,234)'
                    },
                },
                line: null,
                tickLine: null
            },
            yAxis: {
                grid: null,
                label: {
                    style: {
                        fill: 'rgb(0,255,234)'
                    },
                },
                line: null,
                tickLine: null
            },
            color: 'rgb(0,255,234,0.2)',
            legend: false,
            maxBarWidth: 8
        }
    });
};

export default AntdBaseBarInitData;