/* eslint-disable linebreak-style */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Cell,
  Legend,
} from 'recharts';
import { randomHexColor } from '../../utils/convert-utils';

const CustomChart = ({ data }) => {
  const [colors, setColors] = useState([]);
  const [updFunders, setUpdFunders] = useState([]);

  const getAllColors = (funders) => {
    const res = [];
    for (let i = 1; i <= funders.length; i++) {
      res.push(randomHexColor());
    }
    return res;
  };

  const getAllPartsWithFree = (funders) => {
    const parts = funders.map((item) => +Object.values(item)[Object.values(item).length - 1]);
    const sumOfParts = parts.reduce((sum, curr) => sum + curr, 0);
    if (sumOfParts < 100) {
      const freePart = 100 - sumOfParts;
      const freePartObj = {
        desc: 'Free part to get',
        name: 'Free',
        part: freePart,
      };
      if (sumOfParts === 0) return [freePartObj];
      const newFunders = [...funders, freePartObj];
      return newFunders;
    }
    return data;
  };

  if (!updFunders.length && !colors.length) {
    const allParts = getAllPartsWithFree(data);
    const allColors = getAllColors(allParts);
    setColors(allColors);
    setUpdFunders(allParts);
  }

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
    const x = cx + (percent === 1 ? 0 : (radius * Math.cos(-midAngle * RADIAN)));
    const y = cy + (percent === 1 ? 0 : (radius * Math.sin(-midAngle * RADIAN)));

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
  return updFunders.length && colors.length && (
    <div className="funders-chart">
      <ResponsiveContainer>
        <PieChart barGap="0">
          <Pie
            data={updFunders}
            dataKey="part"
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
            isAnimationActive={false}
          >
            {updFunders.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
                strokeWidth={0}
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
