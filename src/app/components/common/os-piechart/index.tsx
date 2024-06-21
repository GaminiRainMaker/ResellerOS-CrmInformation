'use client';
import {FC, useEffect, useState} from 'react';
import {Cell, Legend, Pie, PieChart, Tooltip} from 'recharts';
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
            {`${entry?.name}: $ ${ abbreviate(entry?.value)  }`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const OsPieChart: FC<any> = ({data}: any) => {
  const [chartDimensions, setChartDimensions] = useState<any>({});

  useEffect(() => {
    const updateChartDimensions = () => {
      let width;
      if (window.innerWidth < 400) {
        width = window.innerWidth - 40;
      } else if (window.innerWidth < 768) {
        width = 400;
      } else if (window.innerWidth < 1024) {
        width = 620;
      } else if (window.innerWidth < 1537) {
        width = 620;
      } else {
        width = 800;
      }
      setChartDimensions({width});
    };

    window.addEventListener('resize', updateChartDimensions);
    updateChartDimensions();
    return () => window.removeEventListener('resize', updateChartDimensions);
  }, []);

  return (
    <PieChart width={chartDimensions?.width} height={280}>
      <Pie
        data={data}
        cx={200}
        cy={120}
        innerRadius={70}
        outerRadius={95}
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
  );
};

export default OsPieChart;