/* eslint-disable linebreak-style */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Cell,
  Legend,
} from 'recharts';

const CustomChart = ({ data, colors }) => {
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={16}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const renderLegend = (props) => {
    const { payload } = props;

    return (
      <ul className="chart-legend">
        {payload.map((entry, index) => {
          const funderName = `${entry.value} `;
          const funderValue = `${entry.payload.tooltipPayload[0].value}%`;
          return (
            <li key={`item-${index}`} className="legend-item">
              <span
                className="legend-pointer"
                style={{ backgroundColor: `${entry.color}` }}
              />
              <span className="legend-text">
                <span className="legend-name">{funderName}</span>
                <span className="legend-value">{funderValue}</span>
              </span>
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <div className="funders-chart">
      <ResponsiveContainer>
        <PieChart barGap="0">
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            fill="#8884d8"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={91}
            paddingAngle={0}
            startAngle={90}
            endAngle={450}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Legend
            content={renderLegend}
            verticalAlign="middle"
            layout="vertical"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomChart;
