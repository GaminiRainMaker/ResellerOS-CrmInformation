/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
import {FC} from 'react';
import {Cell, Legend, Pie, PieChart} from 'recharts';

// const data = [
//   {name: 'Unassigned', value: 400},
//   {name: 'Professional Services', value: 300},
//   {name: 'Subscriptions', value: 300},
//   {name: 'Pricing method', value: 200},
// ];
// interface OsPieChartInterFace {

// }

const OsPieChart: FC<any> = ({data}: any) => (
  <div>
    <PieChart
      width={550}
      height={230}
      //  onMouseEnter={this.onPieEnter}
    >
      <Pie
        data={data}
        cx={210}
        cy={120}
        innerRadius={50}
        outerRadius={75}
        fill="#8884d8"
        dataKey="value"
      >
        {data &&
          data.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={entry?.color[index]} />
          ))}
      </Pie>
      <Legend
        iconSize={20}
        iconType="circle"
        width={200}
        height={100}
        layout="vertical"
        verticalAlign="middle"
        align="right"
      />
    </PieChart>
    <div>{JSON.stringify(data)}</div>
  </div>
);

export default OsPieChart;
