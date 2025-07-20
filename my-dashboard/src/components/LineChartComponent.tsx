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
  isFrench: boolean;
}

const LineChartComponent: React.FC<LineChartProps> = ({
  data,
  field,
  isFrench,
}) => {
  // Translations
  const translations = {
    title: isFrench
      ? "Frais de scolarité au fil du temps"
      : "Tuition Over Time",
    description: isFrench
      ? "Affiche l'évolution des frais de scolarité pour le domaine d'étude sélectionné."
      : "Displays how tuition fees have changed over time for the selected field of study.",
    tuitionLabel: isFrench ? "Frais" : "Tuition",
    currencySymbol: isFrench ? "$" : "$", // French Canadian still uses $ prefix
    tooltipFormatter: isFrench
      ? (value: number) => `${value.toLocaleString()} $`
      : (value: number) => `$${value.toLocaleString()}`,
    yAxisFormatter: isFrench
      ? (value: number) => `${value.toLocaleString()} $`
      : (value: number) => `$${value.toLocaleString()}`,
  };

  return (
    <div className="space-y-4">
      <h2>
        {translations.title}: {field}
      </h2>
      <p>{translations.description}</p>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 40, left: 20, bottom: 20 }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="year" />
          <YAxis tickFormatter={translations.yAxisFormatter} />

          <Tooltip
            formatter={(value) => translations.tooltipFormatter(Number(value))}
            labelFormatter={(label) => label}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="tuition"
            stroke="#E06343"
            strokeWidth={2}
            name={translations.tuitionLabel}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
