/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
import {FC} from 'react';
import {Cell, Legend, Pie, PieChart} from 'recharts';

const OsPieChart: FC<any> = (data: any, COLORS: any) => (
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
      {/* {data?.map((entry: any, index: number) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))} */}
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
);

export default OsPieChart;
