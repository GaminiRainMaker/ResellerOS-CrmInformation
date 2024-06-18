/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
import {FC} from 'react';
import {Cell, Legend, Pie, PieChart, Tooltip} from 'recharts';

const CustomTooltip = (props: any) => {
  const {active, payload} = props;
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: 'none',
          border: 'none',
          padding: '8px',
          backgroundColor: `${payload[0]?.payload?.fill}`,
          color: '#fff',
          borderRadius: '4px',
          width: 'fit-content',
          boxShadow: '0px 6px 12px 0px rgba(0, 0, 0, 0.10)',
        }}
      >
        {payload.map((entry: any) => (
          <p key={entry.value} className="caption">
            {`${entry.name}: $ ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const OsPieChart: FC<any> = ({data}: any) => (
  <PieChart width={600} height={230}>
    <Pie
      data={data}
      cx={200}
      cy={120}
      innerRadius={50}
      outerRadius={75}
      dataKey="value"
    >
      {data &&
        data.map((entry: any, index: number) => (
          <Cell key={`cell-${index}`} fill={entry?.color} />
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
    <Tooltip
      isAnimationActive={false}
      animationEasing="linear"
      content={<CustomTooltip />}
      position={{x: 0, y: 10}}
    />
  </PieChart>
);

export default OsPieChart;
