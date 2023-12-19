import {ComponentBaseProps} from "../../common-component/common-types";
import { StatisticCard } from '@ant-design/pro-components';
import { Component } from 'react';
import './LineStatisticComponent.less';
import { Line } from '@ant-design/charts';
import CountUp from "react-countup";

export interface LineStatisticComponentStyle {
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
  bordered: boolean;
  hoverable: boolean;
  xField: string;
  yField: string;
  countField: string;
  color: string;
  smooth: boolean;
  point: any;
  line: any;
}

export interface LineStatisticComponentProps extends ComponentBaseProps {
    style?: LineStatisticComponentStyle;
}

class LineStatisticComponent extends Component<any, any>  {
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
    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
      const { data, jsonData } = this.state;
      if (JSON.stringify(data.staticData.data) !== JSON.stringify(jsonData)) {
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
        xAxis: style.xAxis,
        yAxis: style.yAxis,
        point: style.point,
        smooth: style.smooth,
        line: style.line,
        color: style.line.color,
        padding: 6
      };
      const formatter: any = (value: number) => <CountUp end={value} separator="," />;
      return (
        <StatisticCard
          style={{height: '100%'}}
          bodyStyle={{height: '100%'}}
          hoverable={style.hoverable}
          bordered={style.bordered}
          className="LineStatisticComponent"
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
          chart={<Line autoFit {...config} />}
        />
      );
    }
};

export default LineStatisticComponent;