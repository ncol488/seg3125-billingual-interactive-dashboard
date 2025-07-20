import React, { useState } from "react";
import rawData from "../data/tuitionData.json";
import BarChartComponent from "../components/BarChartComponent";
import LineChartComponent from "../components/LineChartComponent";
import "./TuitionDashboard.css";

interface RawTuitionEntry {
  REF_DATE: string;
  GEO: string;
  "Field of study": string;
  VALUE: number;
}
const fieldDescriptions: Record<string, string> = {
  Education:
    "Education programs prepare students for careers in teaching and pedagogy at various levels, from elementary to post-secondary.",
  "Visual and performing arts, and communications technologies":
    "These programs encompass creative fields such as music, theatre, visual arts, and media production.",
  Humanities:
    "Humanities programs include disciplines like history, philosophy, languages, and cultural studies.",
  "Social and behavioural sciences, and legal studies":
    "This field covers psychology, sociology, political science, and legal studies, focusing on human behavior and institutions.",
  Law: "Law programs train students in legal theory and practice, preparing them for legal careers.",
  "Business, management and public administration":
    "Business and administration programs develop skills in finance, marketing, economics, and organizational leadership.",
  "Physical and life sciences and technologies":
    "Programs in this field explore the natural sciences, including biology, chemistry, and physics.",
  "Mathematics, computer and information sciences":
    "This field involves mathematics, programming, data analysis, and information systems.",
  Engineering:
    "Engineering programs cover the design and development of structures, machines, and systems.",
  Architecture:
    "Architecture programs blend design, history, and engineering to prepare students for designing spaces and buildings.",
  "Agriculture, natural resources and conservation":
    "These programs study food production, environmental management, and resource conservation.",
  Dentistry:
    "Dentistry programs prepare students for oral health careers, including prevention and treatment.",
  Medicine:
    "Medical programs train students in clinical science and patient care for future healthcare careers.",
  Nursing:
    "Nursing programs provide theoretical and clinical training for healthcare support roles.",
  Pharmacy:
    "Pharmacy programs focus on the development, use, and effects of medication.",
  "Veterinary medicine":
    "This field prepares students to care for animal health and treat diseases in animals.",
  Optometry:
    "Optometry involves diagnosing and treating vision problems and eye disorders.",
  "Other health, parks, recreation and fitness":
    "Covers allied health fields, fitness sciences, and wellness programs.",
  "Personal, protective and transportation services":
    "Programs include firefighting, policing, transportation safety, and personal services.",
};

const TuitionDashboard: React.FC = () => {
  const allYears = Array.from(
    new Set(rawData.map((entry: RawTuitionEntry) => entry.REF_DATE))
  ).sort();

  const fieldOptions = Array.from(
    new Set(
      rawData.filter((d) => d.GEO === "Canada").map((d) => d["Field of study"])
    )
  ).sort();

  const [year, setYear] = useState(allYears[allYears.length - 1]);
  const [selectedField, setSelectedField] = useState(fieldOptions[0]);
  const [searchTerm, setSearchTerm] = useState("");

  const allPrograms = fieldOptions; // already sorted and filtered to Canada

  const canadaData = rawData.filter(
    (d) => d.GEO === "Canada" && d.REF_DATE === year
  );

  const barData = fieldOptions.map((field) => {
    const entries = canadaData.filter((d) => d["Field of study"] === field);
    const avgValue =
      entries.reduce((acc, curr) => acc + curr.VALUE, 0) / entries.length;
    return {
      name: field,
      Canada: Math.round(avgValue),
    };
  });

  barData.sort((a, b) => b.Canada - a.Canada);

  const lineData = allYears.map((y) => {
    const match = rawData.find(
      (d) =>
        d.GEO === "Canada" &&
        d.REF_DATE === y &&
        d["Field of study"] === selectedField
    );
    return {
      year: y,
      tuition: match ? match.VALUE : null,
    };
  });

  const avgTuition =
    barData.reduce((sum, field) => sum + field.Canada, 0) /
    (barData.length || 1);

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="header" style={{ display: "flex", alignItems: "center" }}>
        <div className="logo-text" style={{ marginRight: "20px" }}>
          EduTrends <br />
          <span className="logo-subtext">Dashboard</span>
        </div>
        <div
          style={{
            flexGrow: 1,
            height: "3em",
            backgroundColor: "#E06343",
            borderRadius: "1em",
            display: "flex",
            alignItems: "center",
            padding: "0 1em",
            color: "white",
            fontSize: "0.9em",
            fontWeight: "500",
          }}
        >
          <p style={{ color: "white" }}>Source: Statistics Canada</p>
        </div>
      </div>

      {/* Title and Stat */}
      <div className="intro-section">
        <h1 className="title">
          University Undergrad Tuition Insights - Canada
        </h1>
        <h3>
          This dashboard explores trends in average tuition fees across Canadian
          undergraduate university programs from 2020 to 2024. Use the menu to
          filter by year, explore tuition over time, and compare fields of
          study. Type a program name to view detailed tuition trends for that
          field.
        </h3>
        <p style={{ fontSize: "0.9em", color: "#666", marginTop: "0.5em" }}>
          Tuition values represent average fees in Canadian dollars and may vary
          by institution and residency status.
        </p>

        <hr
          style={{
            border: "none",
            borderTop: "1px solid #ccc",
            margin: "2rem 0",
            width: "100%",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "1em" }}>
          <div className="stat-card">
            <p>
              Average completion tuition{" "}
              <span style={{ fontSize: "0.9em", color: "#666" }}>({year})</span>
            </p>
            <p className="stat-value">
              ${""}
              <span style={{ color: "black" }}>
                {avgTuition.toLocaleString()}
              </span>
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              width: "100%",
            }}
          >
            <label
              htmlFor="programSearch"
              style={{
                fontWeight: "bold",

                marginBottom: "0.25em",
              }}
            >
              <h2>Curious about a specific field?</h2>
            </label>
            <div
              style={{
                position: "relative",
                width: "300px",
                textAlign: "right",
              }}
            >
              <input
                id="programSearch"
                type="text"
                placeholder="e.g. Engineering"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const foundProgram = allPrograms.find((prog) =>
                      prog.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                    if (foundProgram) {
                      setSelectedField(foundProgram);
                    }
                  }
                }}
                style={{
                  fontSize: "2em",
                  fontWeight: 500,
                  border: "none",
                  borderBottom: "2px solid #ccc",
                  outline: "none",
                  background: "transparent",
                  width: "100%",
                  textAlign: "right",
                  paddingBottom: "0.25em",
                }}
              />

              {searchTerm && (
                <ul
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "100%",
                    width: "100%",
                    background: "white",
                    border: "1px solid #ccc",
                    borderTop: "none",
                    listStyle: "none",
                    margin: 0,
                    padding: "0.5em 0",
                    maxHeight: "150px",
                    overflowY: "auto",
                    zIndex: 10,
                    textAlign: "left",
                  }}
                >
                  {allPrograms
                    .filter((prog) =>
                      prog.toLowerCase().startsWith(searchTerm.toLowerCase())
                    )
                    .slice(0, 5)
                    .map((prog) => (
                      <li
                        key={prog}
                        onClick={() => {
                          setSelectedField(prog);
                          setSearchTerm(prog);
                        }}
                        style={{
                          padding: "0.5em 1em",
                          cursor: "pointer",
                          color: "#333",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.backgroundColor = "#f3f4f6")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "transparent")
                        }
                      >
                        {prog}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Selected Program Description */}
      <div className="program-description mb-4">
        <h2>{selectedField}</h2>
        <h3 className="text-sm text-gray-700 leading-snug mt-1">
          {fieldDescriptions[selectedField] ||
            "Explore tuition trends for this field."}
        </h3>
      </div>

      <div className="charts-container">
        {/* Bar Chart */}
        <div className="chart-card">
          <div className="title-select-row">
            <h2>Tuition fees by field</h2>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="year-select"
            >
              {allYears.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <p>
            Shows the average undergraduate tuition fees for each field of study
            in the selected year.
          </p>
          <BarChartComponent data={barData} onBarClick={setSelectedField} />
        </div>

        {/* Line Chart */}
        <div className="chart-card">
          <LineChartComponent data={lineData} field={selectedField} />
        </div>
      </div>
      <p style={{ marginTop: "1em", fontStyle: "italic", color: "#555" }}>
        This dashboard uses official Canadian university tuition fee data from
        Statistics Canada to help students, educators, and policymakers analyze
        and compare tuition trends by program and over time. Understanding these
        trends supports informed decision-making about higher education
        investments.
      </p>
    </div>
  );
};

export default TuitionDashboard;
