import React from 'react';
import {
  // eslint-disable-next-line no-unused-vars
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const Chart = ({ data }) => (
  <ComposedChart
    width={800}
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
    <XAxis interval={0} dataKey="name" padding={{ left: 20, right: 20 }} width={800} />
    <YAxis />
    <Tooltip />
    <Bar dataKey="Data Upload Fee, USD" barSize={60} fill="#3FDD7E" />
    <Line
      type="monotone"
      dataKey="Data Upload Fee Slope, %"
      stroke="#2EC3E9"
      strokeWidth={3}
      dot={{ stroke: 'white',
        fill: '#2EC3E9',
        strokeWidth: 5,
        r: 12 }}
    />
    {/* <Scatter dataKey="cnt" fill="red" /> */}
  </ComposedChart>
);

export default Chart;
