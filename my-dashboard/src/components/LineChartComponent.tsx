import React from "react";
import "./LineChartComponent.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface LineChartProps {
  data: { year: string; tuition: number | null }[];
  field: string;
}

const LineChartComponent: React.FC<LineChartProps> = ({ data, field }) => {
  return (
    <div className="space-y-4">
      <h2>Tuition Over Time: {field}</h2>
      <p>
        Displays how tuition fees have changed over time for the selected field
        of study.
      </p>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 40, left: 20, bottom: 20 }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="year" />
          <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />

          <Tooltip formatter={(value) => `$${value}`} />
          <Legend />
          <Line
            type="monotone"
            dataKey="tuition"
            stroke="#E06343"
            strokeWidth={2}
            name={field}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
