'use client';
import {FC} from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import useAbbreviationHook from '../hooks/useAbbreviationHook';

const CustomTooltip = (props: any) => {
  const {active, payload} = props;
  const {abbreviate} = useAbbreviationHook(0);

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
            {`${entry?.name}: $ ${abbreviate(entry?.value)}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const OsPieChart: FC<any> = ({data}: any) => {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          cx={200}
          cy={120}
          innerRadius={70}
          outerRadius={95}
          dataKey="value"
        >
          {data &&
            data?.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={entry?.color} />
            ))}
        </Pie>
        <Legend
          iconSize={20}
          iconType="circle"
          width={250}
          height={100}
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
        <Tooltip
          isAnimationActive={false}
          animationEasing="linear"
          content={<CustomTooltip />}
          position={{x: 130, y: 230}}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default OsPieChart;
