import React, { useState } from "react";
import rawData from "../data/tuitionData.json";
import BarChartComponent from "../components/BarChartComponent";
import LineChartComponent from "../components/LineChartComponent";
import "./TuitionDashboard.css";

interface RawTuitionEntry {
  REF_DATE: string;
  GEO: string;
  "Field of study": string;
  "Field of study (FR)": string;
  VALUE: number;
}

const TuitionDashboard: React.FC = () => {
  const [isFrench, setIsFrench] = useState(false);
  const allYears = Array.from(
    new Set(rawData.map((entry: RawTuitionEntry) => entry.REF_DATE))
  ).sort();

  // Get field options in both languages
  const fieldOptions = Array.from(
    new Set(
      rawData.filter((d) => d.GEO === "Canada").map((d) => d["Field of study"])
    )
  ).sort();

  const [year, setYear] = useState(allYears[allYears.length - 1]);
  const [selectedField, setSelectedField] = useState(fieldOptions[0]);
  const [searchTerm, setSearchTerm] = useState("");

  // Translations
  const translations = {
    title: isFrench
      ? "Informations sur les frais de scolarité universitaires - Canada"
      : "University Undergrad Tuition Insights - Canada",
    description: isFrench
      ? "Ce tableau de bord explore les tendances des frais de scolarité moyens dans les programmes universitaires de premier cycle canadiens de 2020 à 2024. Utilisez le menu pour filtrer par année, explorer les frais de scolarité au fil du temps et comparer les domaines d'étude."
      : "This dashboard explores trends in average tuition fees across Canadian undergraduate university programs from 2020 to 2024.Use the menu to filter by year, explore tuition over time, and compare fields of study.",
    tuitionNote: isFrench
      ? "Les valeurs des frais de scolarité représentent les frais moyens en dollars canadiens et peuvent varier selon l'établissement et le statut de résidence."
      : "Tuition values represent average fees in Canadian dollars and may vary by institution and residency status.",
    averageTuition: isFrench
      ? "Frais de scolarité moyens"
      : "Average completion tuition",
    searchPrompt: isFrench
      ? "Curieux à propos d'un domaine spécifique?"
      : "Curious about a specific field?",
    searchPlaceholder: isFrench ? "ex. Ingénierie" : "e.g. Engineering",
    barChartTitle: isFrench
      ? "Frais de scolarité par domaine"
      : "Tuition fees by field",
    barChartDescription: isFrench
      ? "Affiche les frais de scolarité moyens de premier cycle pour chaque domaine d'étude dans l'année sélectionnée."
      : "Shows the average undergraduate tuition fees for each field of study in the selected year.",
    footerText: isFrench
      ? "Ce tableau de bord utilise les données officielles canadiennes sur les frais de scolarité universitaires de Statistique Canada pour aider les étudiants, les éducateurs et les décideurs à analyser et comparer les tendances des frais de scolarité par programme et au fil du temps."
      : "This dashboard uses official Canadian university tuition fee data from Statistics Canada to help students, educators, and policymakers analyze and compare tuition trends by program and over time.",
    sourceText: isFrench
      ? "Source : Statistique Canada"
      : "Source: Statistics Canada",
  };

  const fieldDescriptions: Record<string, { en: string; fr: string }> = {
    Education: {
      en: "Education programs prepare students for careers in teaching and pedagogy at various levels, from elementary to post-secondary.",
      fr: "Les programmes d'éducation préparent les étudiants à des carrières dans l'enseignement et la pédagogie à différents niveaux, du primaire au postsecondaire.",
    },
    "Visual and performing arts, and communications technologies": {
      en: "These programs encompass creative fields such as music, theatre, visual arts, and media production.",
      fr: "Ces programmes englobent des domaines créatifs tels que la musique, le théâtre, les arts visuels et la production médiatique.",
    },
    Humanities: {
      en: "Humanities programs include disciplines like history, philosophy, languages, and cultural studies.",
      fr: "Les programmes en sciences humaines comprennent des disciplines comme l'histoire, la philosophie, les langues et les études culturelles.",
    },
    "Social and behavioural sciences, and legal studies": {
      en: "This field covers psychology, sociology, political science, and legal studies, focusing on human behavior and institutions.",
      fr: "Ce domaine couvre la psychologie, la sociologie, les sciences politiques et les études juridiques, en se concentrant sur le comportement humain et les institutions.",
    },
    Law: {
      en: "Law programs train students in legal theory and practice, preparing them for legal careers.",
      fr: "Les programmes de droit forment les étudiants à la théorie et à la pratique juridiques, les préparant à des carrières dans le domaine juridique.",
    },
    "Business, management and public administration": {
      en: "Business and administration programs develop skills in finance, marketing, economics, and organizational leadership.",
      fr: "Les programmes en commerce et administration développent des compétences en finance, marketing, économie et leadership organisationnel.",
    },
    "Physical and life sciences and technologies": {
      en: "Programs in this field explore the natural sciences, including biology, chemistry, and physics.",
      fr: "Les programmes dans ce domaine explorent les sciences naturelles, y compris la biologie, la chimie et la physique.",
    },
    "Mathematics, computer and information sciences": {
      en: "This field involves mathematics, programming, data analysis, and information systems.",
      fr: "Ce domaine comprend les mathématiques, la programmation, l'analyse de données et les systèmes d'information.",
    },
    Engineering: {
      en: "Engineering programs cover the design and development of structures, machines, and systems.",
      fr: "Les programmes de génie couvrent la conception et le développement de structures, de machines et de systèmes.",
    },
    Architecture: {
      en: "Architecture programs blend design, history, and engineering to prepare students for designing spaces and buildings.",
      fr: "Les programmes d'architecture combinent design, histoire et ingénierie pour préparer les étudiants à concevoir des espaces et des bâtiments.",
    },
    "Agriculture, natural resources and conservation": {
      en: "These programs study food production, environmental management, and resource conservation.",
      fr: "Ces programmes étudient la production alimentaire, la gestion environnementale et la conservation des ressources.",
    },
    Dentistry: {
      en: "Dentistry programs prepare students for oral health careers, including prevention and treatment.",
      fr: "Les programmes de dentisterie préparent les étudiants à des carrières en santé bucco-dentaire, y compris la prévention et le traitement.",
    },
    Medicine: {
      en: "Medical programs train students in clinical science and patient care for future healthcare careers.",
      fr: "Les programmes de médecine forment les étudiants en sciences cliniques et en soins aux patients pour des carrières futures dans le domaine de la santé.",
    },
    Nursing: {
      en: "Nursing programs provide theoretical and clinical training for healthcare support roles.",
      fr: "Les programmes en sciences infirmières offrent une formation théorique et clinique pour des rôles de soutien en santé.",
    },
    Pharmacy: {
      en: "Pharmacy programs focus on the development, use, and effects of medication.",
      fr: "Les programmes de pharmacie se concentrent sur le développement, l'utilisation et les effets des médicaments.",
    },
    "Veterinary medicine": {
      en: "This field prepares students to care for animal health and treat diseases in animals.",
      fr: "Ce domaine prépare les étudiants à s'occuper de la santé animale et à traiter les maladies chez les animaux.",
    },
    Optometry: {
      en: "Optometry involves diagnosing and treating vision problems and eye disorders.",
      fr: "L'optométrie consiste à diagnostiquer et traiter les problèmes de vision et les troubles oculaires.",
    },
    "Other health, parks, recreation and fitness": {
      en: "Covers allied health fields, fitness sciences, and wellness programs.",
      fr: "Couvre les domaines de la santé connexes, les sciences du fitness et les programmes de bien-être.",
    },
    "Personal, protective and transportation services": {
      en: "Programs include firefighting, policing, transportation safety, and personal services.",
      fr: "Les programmes comprennent la lutte contre les incendies, le maintien de l'ordre, la sécurité des transports et les services personnels.",
    },
  };
  const getFieldName = (field: string) => {
    if (!isFrench) return field;
    const entry = rawData.find((d) => d["Field of study"] === field);
    return entry ? entry["Field of study (FR)"] : field;
  };

  const allPrograms = fieldOptions;

  const canadaData = rawData.filter(
    (d) => d.GEO === "Canada" && d.REF_DATE === year
  );

  const barData = fieldOptions.map((field) => {
    const entries = canadaData.filter((d) => d["Field of study"] === field);
    const avgValue =
      entries.reduce((acc, curr) => acc + curr.VALUE, 0) / entries.length;
    return {
      name: field,
      nameFr: getFieldName(field),
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
          <p style={{ color: "white" }}>
            {translations.sourceText}{" "}
            <a
              href="https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=3710000301"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "white",
                textDecoration: "underline",
                fontWeight: "bold",
              }}
            >
              {isFrench ? "Voir les données" : "View data"}
            </a>
          </p>
        </div>
        <button
          onClick={() => setIsFrench(!isFrench)}
          style={{
            padding: "12px 16px",
            backgroundColor: isFrench ? "#E06343" : "#E06343",
            color: isFrench ? "white" : "white",
            border: "none",
            borderRadius: "14px",
            cursor: "pointer",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            marginLeft: "16px",
          }}
        >
          {isFrench ? (
            <>
              <span>English</span>
              <span>🇬🇧</span>
            </>
          ) : (
            <>
              <span>Français</span>
              <span>🇫🇷</span>
            </>
          )}
        </button>
      </div>
      <div className="intro-section">
        <h1 className="title">{translations.title}</h1>
        <h3>{translations.description}</h3>
        <p style={{ fontSize: "0.9em", color: "#666", marginTop: "0.5em" }}>
          {translations.tuitionNote}
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
              {translations.averageTuition}{" "}
              <span style={{ fontSize: "0.9em", color: "#666" }}>({year})</span>
            </p>
            <p className="stat-value">
              {isFrench ? "" : "$"}
              <span style={{ color: "black" }}>
                {avgTuition.toLocaleString()}
              </span>
              {isFrench ? " $" : ""}
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
              <h2>{translations.searchPrompt}</h2>
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
                placeholder={translations.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const foundProgram = allPrograms.find((prog) => {
                      const englishMatch = prog
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase());
                      const frenchName = getFieldName(prog);
                      const frenchMatch = frenchName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase());
                      return englishMatch || frenchMatch;
                    });
                    if (foundProgram) {
                      setSelectedField(foundProgram);
                      setSearchTerm(
                        isFrench ? getFieldName(foundProgram) : foundProgram
                      );
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
                    .filter((prog) => {
                      const frenchName = getFieldName(prog);
                      return (
                        prog.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        frenchName
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      );
                    })
                    .slice(0, 5)
                    .map((prog) => (
                      <li
                        key={prog}
                        onClick={() => {
                          setSelectedField(prog);
                          setSearchTerm(isFrench ? getFieldName(prog) : prog);
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
                        {isFrench ? getFieldName(prog) : prog}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="program-description mb-4">
        <h2>{isFrench ? getFieldName(selectedField) : selectedField}</h2>
        <h3>
          {fieldDescriptions[selectedField]
            ? isFrench
              ? fieldDescriptions[selectedField].fr
              : fieldDescriptions[selectedField].en
            : isFrench
            ? "Explorez les tendances des frais de scolarité pour ce domaine."
            : "Explore tuition trends for this field."}
        </h3>
      </div>

      <div className="charts-container">
        {/* Bar Chart */}
        <div className="chart-card">
          <div className="title-select-row">
            <h2>{translations.barChartTitle}</h2>
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
          <p>{translations.barChartDescription}</p>
          <BarChartComponent
            data={barData}
            onBarClick={setSelectedField}
            isFrench={isFrench}
          />
        </div>
        <div className="chart-card">
          <LineChartComponent
            data={lineData}
            field={isFrench ? getFieldName(selectedField) : selectedField}
            isFrench={isFrench}
          />
        </div>
      </div>
      <p style={{ marginTop: "1em", fontStyle: "italic", color: "#555" }}>
        {translations.footerText}
      </p>
    </div>
  );
};

export default TuitionDashboard;
