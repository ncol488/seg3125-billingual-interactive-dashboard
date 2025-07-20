import React from "react";
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
  data: { name: string; nameFr: string; Canada: number }[];
  onBarClick: (field: string) => void;
  isFrench: boolean;
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

const programNameMapFr: Record<string, string> = {
  Education: "Éducation",
  "Visual and performing arts, and communications technologies":
    "Arts & Communications",
  Humanities: "Humanités",
  "Social and behavioural sciences, and legal studies": "Sciences Sociales",
  Law: "Droit",
  "Business, management and public administration": "Administration",
  "Physical and life sciences and technologies": "Sciences",
  "Mathematics, computer and information sciences": "Maths",
  Engineering: "Ingénierie",
  Architecture: "Architecture",
  "Agriculture, natural resources and conservation": "Agriculture",
  Dentistry: "Dentisterie",
  Medicine: "Médecine",
  Nursing: "Soins Infirmiers",
  Pharmacy: "Pharmacie",
  "Veterinary medicine": "Vétérinaire",
  Optometry: "Optométrie",
  "Other health, parks, recreation and fitness": "Santé & Loisirs",
  "Personal, protective and transportation services": "Services de Protection",
};

const BarChartComponent: React.FC<BarChartProps> = ({
  data,
  onBarClick,
  isFrench,
}) => {
  const getShortName = (name: string) => {
    return isFrench
      ? programNameMapFr[name] || name
      : programNameMap[name] || name;
  };

  return (
    <ResponsiveContainer width="100%" height={600}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 20, right: 40, left: 20, bottom: 40 }}
        barCategoryGap={15}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis
          type="number"
          tickFormatter={(value) =>
            isFrench
              ? `${value.toLocaleString()} $`
              : `$${value.toLocaleString()}`
          }
          label={{
            value: isFrench ? "Frais de scolarité (CAD)" : "Tuition (CAD)",
            position: "bottom",
            offset: 10,
          }}
        />
        <YAxis
          dataKey="name"
          type="category"
          axisLine={false}
          tickLine={false}
          tick={false}
          width={10}
          label={{
            value: isFrench ? "Programme" : "Program",
            angle: -90,
            position: "insideLeft",
            offset: -10,
          }}
        />

        <Tooltip
          formatter={(value) => [
            isFrench ? `${value} $` : `$${value}`,
            isFrench ? "Frais" : "Tuition",
          ]}
          labelFormatter={(label) =>
            isFrench
              ? data.find((d) => d.name === label)?.nameFr || label
              : label
          }
        />
        <Bar
          dataKey="Canada"
          name={isFrench ? "Frais (CAD)" : "Tuition (CAD)"}
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
            formatter={(value: unknown) => {
              if (typeof value === "string") {
                return getShortName(value);
              }
              return ""; // Fallback for non-string values
            }}
            fill="#ffffff"
            fontSize={12}
            offset={10}
            width={200}
          />

          <LabelList
            dataKey="Canada"
            position="right"
            formatter={(value: unknown) => {
              if (typeof value === "number") {
                return isFrench
                  ? `${value.toLocaleString()} $`
                  : `$${value.toLocaleString()}`;
              }
              return ""; // Fallback for non-number values
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
