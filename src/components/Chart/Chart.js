import React from 'react';
import {
  // eslint-disable-next-line no-unused-vars
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="stage">{label}</p>
        <p className="duration">{`Duration: ${payload[0].payload.name}`}</p>
        <p className="fee">{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const Chart = ({ data, width = 800 }) => (
  <ComposedChart
    width={width}
    height={300}
    data={data}
    className="chart"
    margin={{
      top: 5,
      right: 5,
      bottom: 5,
      left: 0,
    }}
  >
    <CartesianGrid stroke="#f5f5f5" />
    <XAxis dataKey="stage" padding={{ left: 20, right: 20 }} />
    <YAxis />
    <Tooltip content={<CustomTooltip />} />
    <Bar dataKey="Data Upload Fee, USD" barSize={60} fill="#3FDD7E" />
    {data.length > 8 && (<Brush dataKey="stage" height={20} travellerWidth={8} width={600} x={130} />)}
    {/* <Line
      type="monotone"
      dataKey="Data Upload Fee Slope, %"
      stroke="#2EC3E9"
      strokeWidth={3}
      dot={{ stroke: 'white',
        fill: '#2EC3E9',
        strokeWidth: 5,
        r: 12 }}
    /> */}
    {/* <Scatter dataKey="cnt" fill="red" /> */}
  </ComposedChart>
);

export default Chart;
