import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

interface BarChartProps {
  data: { name: string; Canada: number }[];
  onBarClick: (field: string) => void;
}
const programNameMap: Record<string, string> = {
  Education: "Education",
  "Visual and performing arts, and communications technologies":
    "Arts & Communications",
  Humanities: "Humanities",
  "Social and behavioural sciences, and legal studies": "Social Sciences",
  Law: "Law",
  "Business, management and public administration": "Business Admin",
  "Physical and life sciences and technologies": "Sciences",
  "Mathematics, computer and information sciences": "Maths",
  Engineering: "Engineering",
  Architecture: "Architecture",
  "Agriculture, natural resources and conservation": "Agriculture",
  Dentistry: "Dentistry",
  Medicine: "Medicine",
  Nursing: "Nursing",
  Pharmacy: "Pharmacy",
  "Veterinary medicine": "Veterinary",
  Optometry: "Optometry",
  "Other health, parks, recreation and fitness": "Health & Rec",
  "Personal, protective and transportation services": "Protective Services",
};

const BarChartComponent: React.FC<BarChartProps> = ({ data, onBarClick }) => {
  return (
    <ResponsiveContainer width="100%" height={600}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 20, right: 40, left: 20, bottom: 40 }}
        barCategoryGap={15} // Increased spacing between bars
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis
          type="number"
          tickFormatter={(value) => `$${value.toLocaleString()}`}
          label={{ value: "Tuition (CAD)", position: "bottom", offset: 10 }}
        />
        <YAxis
          dataKey="name"
          type="category"
          axisLine={false}
          tickLine={false}
          tick={false}
          width={10}
          label={{
            value: "Program",
            angle: -90,
            position: "insideLeft",
            offset: -10,
          }}
        />

        <Tooltip
          formatter={(value) => [`$${value}`, "Tuition"]}
          labelFormatter={(label) => programNameMap[label] || label}
        />
        <Bar
          dataKey="Canada"
          name="Tuition (CAD)"
          radius={[0, 4, 4, 0]}
          barSize={30}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              cursor="pointer"
              onClick={() => onBarClick(entry.name)}
              fill="#E06343"
            />
          ))}
          <LabelList
            dataKey="name"
            position="insideLeft"
            formatter={(value) => {
              if (typeof value === "string") {
                return programNameMap[value] || value;
              }
              return value;
            }}
            fill="#ffffff"
            fontSize={12}
            offset={10}
            width={200}
          />

          <LabelList
            dataKey="Canada"
            position="right"
            formatter={(value) => {
              if (typeof value === "number") {
                return `$${value.toLocaleString()}`;
              }
              return value;
            }}
            fill="#666"
            fontSize={12}
            offset={5}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
