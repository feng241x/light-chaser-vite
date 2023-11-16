
export enum ChartTypeCNEnum {
    'all' = '全部',
    'base' = '基础',
    'ornamental' = '装饰',
    'bar' = '条形图',
    'column' = '柱状图',
    'line' = '折线图',
    'area' = '面积图',
    'pie' = '饼图',
    'progress' = '进度图',
    'scatter' = '散点图',
    'rose' = '玫瑰图',
    'gauge' = '仪表盘',
    'liquid' = '水波图'
}

export enum ChartTypeEnum {
    /**
     * 全部
     */
    'ALL' = 'all',
    /**
     * 基础
     */
    'BASE' = 'base',
    /**
     * 装饰
     */
    'ORNAMENTAL' = 'ornamental',
    /**
     * 条形图
     */
    'BAR' = 'bar',
    /**
     * 柱状图
     */
    'COLUMN' = 'column',
    /**
     * 折线图
     */
    'LINE' = 'line',
    /**
     * 面积图
     */
    'AREA' = 'area',
    /**
     * 饼图
     */
    'PIE' = 'pie',
    /**
     * 进度图
     */
    'PROGRESS' = 'progress',
    /**
     * 散点图
     */
    'SCATTER' = 'scatter',
    /**
     * 玫瑰图
     */
    'ROSE' = 'rose',
    /**
     * 仪表盘
     */
    'GAUGE' = 'gauge',
    /**
     * 水波图
     */
    'LIQUID' = 'liquid'
}

export type ChartType = 
    /** 全部 */
    'all' |
    /** 基础 */
    'base' |
    /** 装饰 */
    'ornamental' |
    /** 条形图 */
    'bar' |
    /** 柱状图 */
    'column' |
    /** 折线图 */
    'line' |
    /** 面积图 */
    'area' |
    /** 饼图 */
    'pie' |
    /** 进度图 */
    'progress' |
    /** 散点图 */
    'scatter' |
    /** 玫瑰图 */
    'rose' |
    /** 仪表盘 */
    'gauge' |
    /** 水波图 */
    'liquid'

export enum CategoryEnum {
    /** 图表 */
    'CHART' = 'chart',
    /** 基础 */
    'BASE' = 'base',
    /** 模板 */
    'TEMPLATE' = 'template',
    /** 定制 */
    'CUSTOMIZATION' = 'customization',
    /** 图层 */
    'COVERAGE' = 'coverage'
}

export type Category = 
    /** 图表 */
    'chart' |
    /** 基础 */
    'base' |
    /** 模板 */
    'template' |
    /** 定制 */
    'customization' |
    /** 图层 */
    'coverage'