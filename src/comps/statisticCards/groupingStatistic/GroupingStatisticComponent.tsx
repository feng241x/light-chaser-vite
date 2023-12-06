import {ComponentBaseProps} from "../../common-component/common-types";
import { StatisticCard } from '@ant-design/pro-components';
import { Component } from 'react';
import { Line } from '@ant-design/plots';
import './GroupingStatisticComponent.less';
import { Column } from "@ant-design/charts";
import CountUp from "react-countup";

export interface GroupingStatisticComponentStyle {
  title: string;
  description: string;
  tip: string;
  fontSize: number;
  fontWeight: number;
  prefix: string;
  suffix: string;
  layout: 'vertical' | 'horizontal' | 'inline';
  CountUp: boolean;
  xAxis: boolean;
  yAxis: boolean;
  chart: 'Column' | 'Line';
  xField: string;
  yField: string;
  countField: string;
}

export interface GroupingStatisticComponentProps extends ComponentBaseProps {
    style?: GroupingStatisticComponentStyle;
}

class GroupingStatisticComponent extends Component<any, any>  {
    constructor(props: any) {
        super(props);
        this.state = {...props, jsonData: []};
    }
    componentDidMount(): void {
      const { data } = this.state;
      if (data.dataSource === 'static') {
        try {
          this.setState({jsonData: data.staticData.data})
        } catch (error) {}
      }
    }
    render() {
      const { jsonData, style } : any = this.state;
      const config = {
        data: jsonData,
        xField: style.xField,
        yField: style.yField,
        xAxis: style.xAxis ? {
          label: {}
        } : {
          label: null,
        },
        yAxis: style.yAxis ? {label: {}} : {
          label: null,
        },
      };
      const formatter: any = (value: number) => <CountUp end={value} separator="," />;
      return (
        <StatisticCard
          style={{height: '100%'}}
          bodyStyle={{height: '100%'}}
          className="GroupingStatisticComponent"
          statistic={{
            title: style.title,
            valueStyle: {
              fontSize: style.fontSize || 26,
              fontWeight: style.fontWeight || 700
            },
            value: jsonData.reduce((acc: number, obj: any) => acc + obj[style.countField], 0),
            prefix: style.prefix,
            tip: style.tip,
            suffix: style.suffix,
            description: style.description,
            layout: style.layout || 'vertical',
            formatter: style.CountUp ? formatter : undefined
          }}
          chart={
            style.chart === 'Line' ? <Line autoFit {...config} /> : <Column {...config} />
          }
        />
      );
    }
};

export default GroupingStatisticComponent;