export interface PaperFiles{
    id: number;
    name: string;
    file: any;
}

export interface ResourceFiles{
    id: number;
    name: string;
    file: any;
    fileType: string;
}[]

export interface PaperSubject {
  title: string;
  overview: any;
  files: PaperFiles[];
}

export const PastPapers: Record<string, PaperSubject> = {

  practice_of_computer: {
    title: "practice of computer",
    overview: require("@/assets/past-questions/practice-of-computer/overview.md"),
    files: [
      { id: 1, name: "Practice of Computer 2021", file: require("@/assets/past-questions/practice-of-computer/practice-of-computer-2021.pdf") },
      { id: 2, name: "Practice of Computer 2023", file: require("@/assets/past-questions/practice-of-computer/practice-of-computer-2023.pdf") },
    ],
  },

  case_study: {
    title: "case study",
    overview: require("@/assets/past-questions/case-study/overview.md"),
    files: [
      { id: 1, name: "Case Study 2020", file: require("@/assets/past-questions/case-study/case-study-2020.pdf") },
      { id: 2, name: "Case Study 2021", file: require("@/assets/past-questions/case-study/case-study-2021.pdf") },
      { id: 3, name: "Case Study 2022", file: require("@/assets/past-questions/case-study/case-study-2022.pdf") },
      { id: 4, name: "Case Study 2023", file: require("@/assets/past-questions/case-study/case-study-2023.pdf") },
      { id: 5, name: "Case Study 2024", file: require("@/assets/past-questions/case-study/case-study-2024.pdf") },
      { id: 6, name: "Case Study 2025", file: require("@/assets/past-questions/case-study/case-study-2025.pdf") },
    ],
  },

  digital_literacy: {
    title: "digital literacy",
    overview: require("@/assets/past-questions/digital-literacy/overview.md"),
    files: [
      { id: 1, name: "Digital Literacy 2020", file: require("@/assets/past-questions/digital-literacy/digital-literacy-2020.pdf") },
      { id: 2, name: "Digital Literacy 2021", file: require("@/assets/past-questions/digital-literacy/digital-literacy-2021.pdf") },
      { id: 3, name: "Digital Literacy 2022", file: require("@/assets/past-questions/digital-literacy/digital-literacy-2022.pdf") },
      { id: 4, name: "Digital Literacy 2023", file: require("@/assets/past-questions/digital-literacy/digital-literacy-2023.pdf") },
      { id: 5, name: "Digital Literacy 2024", file: require("@/assets/past-questions/digital-literacy/digital-literacy-2024.pdf") },
      { id: 6, name: "Digital Literacy 2025", file: require("@/assets/past-questions/digital-literacy/digital-literacy-2025.pdf") },
    ],
  },

  french: {
    title: "french",
    overview: require("@/assets/past-questions/french/overview.md"),
    files: [
      { id: 1, name: "French 2020", file: require("@/assets/past-questions/french/french-2020.pdf") },
      { id: 2, name: "French 2021", file: require("@/assets/past-questions/french/french-2021.pdf") },
      { id: 3, name: "French 2022", file: require("@/assets/past-questions/french/french-2022.pdf") },
      { id: 4, name: "French 2023", file: require("@/assets/past-questions/french/french-2023.pdf") },
      { id: 5, name: "French 2024", file: require("@/assets/past-questions/french/french-2024.pdf") },
      { id: 6, name: "French 2025", file: require("@/assets/past-questions/french/french-2025.pdf") },
    ],
  },

  english: {
    title: "english",
    overview: require("@/assets/past-questions/english/overview.md"),
    files: [
      { id: 2, name: "English 2022", file: require("@/assets/past-questions/english/english-2022.pdf") },
      { id: 1, name: "English 2021", file: require("@/assets/past-questions/english/english-2021.pdf") },
      { id: 3, name: "English 2023", file: require("@/assets/past-questions/english/english-2023.pdf") },
      { id: 4, name: "English 2024", file: require("@/assets/past-questions/english/english-2024.pdf") },
      { id: 5, name: "English 2025", file: require("@/assets/past-questions/english/english-2025.pdf") },
    ],
  },

  enterprise_creation: {
    title: "enterprise creation",
    overview: require("@/assets/past-questions/enterprise-creation/overview.md"),
    files: [
      { id: 1, name: "Enterprise Creation and Entrepreneuship 2020", file: require("@/assets/past-questions/enterprise-creation/enterprise-creation-and-entrepreneuship-2020.pdf") },
      { id: 2, name: "Enterprise Creation and Entrepreneuship 2021", file: require("@/assets/past-questions/enterprise-creation/enterprise-creation-and-entrepreneuship-2021.pdf") },
      { id: 3, name: "Enterprise Creation and Entrepreneuship 2022", file: require("@/assets/past-questions/enterprise-creation/enterprise-creation-and-entrepreneuship-2022.pdf") },
      { id: 4, name: "Enterprise Creation and Entrepreneuship 2023", file: require("@/assets/past-questions/enterprise-creation/enterprise-creation-and-entrepreneuship-2023.pdf") },
      { id: 5, name: "Enterprise Creation and Entrepreneuship 2024", file: require("@/assets/past-questions/enterprise-creation/enterprise-creation-and-entrepreneuship-2024.pdf") },
      { id: 6, name: "Enterprise Creation and Entrepreneuship 2025", file: require("@/assets/past-questions/enterprise-creation/enterprise-creation-and-entrepreneuship-2025.pdf") },
    ],
  },

  law_and_citizenship: {
    title: "law and citizenship",
      overview: require("@/assets/past-questions/law-and-citizenship/overview.md"),
    files: [
      { id: 1, name: "Law and Citizenship 2020", file: require("@/assets/past-questions/law-and-citizenship/law-and-citizenship-2020.pdf") },
      { id: 2, name: "Law and Citizenship 2021", file: require("@/assets/past-questions/law-and-citizenship/law-and-citizenship-2021.pdf") },
      { id: 3, name: "Law and Citizenship 2022", file: require("@/assets/past-questions/law-and-citizenship/law-and-citizenship-2022.pdf") },
      { id: 6, name: "Law and Citizenship 2025", file: require("@/assets/past-questions/law-and-citizenship/law-and-citizenship-2025.pdf") },
    ],
  },

  computer_technology: {
    title: "computer technology",
    overview: require("@/assets/past-questions/computer-technology/overview.md"),
    files: [
      { id: 1, name: "Computer Technology 2020", file: require("@/assets/past-questions/computer-technology/computer-technology-2020.pdf") },
      { id: 2, name: "Computer Technology 2021", file: require("@/assets/past-questions/computer-technology/computer-technology-2021.pdf") },
      { id: 3, name: "Computer Technology 2022", file: require("@/assets/past-questions/computer-technology/computer-technology-2022.pdf") },
      { id: 4, name: "Computer Technology 2023", file: require("@/assets/past-questions/computer-technology/computer-technology-2023.pdf") },
      { id: 5, name: "Computer Technology 2025", file: require("@/assets/past-questions/computer-technology/computer-technology-2025.pdf") },
    ],
  },

  discrete_mathematics: {
    title: "discrete mathematics",
    overview: require("@/assets/past-questions/discrete-mathematics/overview.md"),
    files: [
      { id: 1, name: "Discrete Mathematics 2020", file: require("@/assets/past-questions/discrete-mathematics/discrete-mathematics-2020.pdf") },
      { id: 2, name: "Discrete Mathematics 2021", file: require("@/assets/past-questions/discrete-mathematics/discrete-mathematics-2021.pdf") },
      { id: 3, name: "Discrete Mathematics 2022", file: require("@/assets/past-questions/discrete-mathematics/discrete-mathematics-2022.pdf") },
      { id: 4, name: "Discrete Mathematics 2023", file: require("@/assets/past-questions/discrete-mathematics/discrete-mathematics-2023.pdf") },
      { id: 5, name: "Discrete Mathematics 2024", file: require("@/assets/past-questions/discrete-mathematics/discrete-mathematics-2024.pdf") },
      { id: 6, name: "Discrete Mathematics 2025", file: require("@/assets/past-questions/discrete-mathematics/discrete-mathematics-2025.pdf") },
    ],
  },

  information_systems: {
    title: "information systems",
    overview: require("@/assets/past-questions/information-systems/overview.md"),
    files: [
      { id: 1, name: "Information Systems 2020", file: require("@/assets/past-questions/information-systems/information-systems-2020.pdf") },
      { id: 2, name: "Information Systems 2021", file: require("@/assets/past-questions/information-systems/information-systems-2021.pdf") },
      { id: 3, name: "Information Systems 2022", file: require("@/assets/past-questions/information-systems/information-systems-2022.pdf") },
      { id: 4, name: "Information Systems 2023", file: require("@/assets/past-questions/information-systems/information-systems-2023.pdf") },
      { id: 5, name: "Information Systems 2024", file: require("@/assets/past-questions/information-systems/information-systems-2024.pdf") },
      { id: 6, name: "Information Systems 2025", file: require("@/assets/past-questions/information-systems/information-systems-2025.pdf") },
    ],
  },

  digital_electronic: {
    title: "digital electronics",
    overview: require("@/assets/past-questions/digital-electronics/overview.md"),
    files: [
      { id: 1, name: "Digital Electronics 2020", file: require("@/assets/past-questions/digital-electronics/digital-electronics-2020.pdf") },
      { id: 2, name: "Digital Electronics 2021", file: require("@/assets/past-questions/digital-electronics/digital-electronics-2021.pdf") },
      { id: 3, name: "Digital Electronics 2022", file: require("@/assets/past-questions/digital-electronics/digital-electronics-2022.pdf") },
      { id: 4, name: "Digital Electronics 2023", file: require("@/assets/past-questions/digital-electronics/digital-electronics-2023.pdf") },
      { id: 5, name: "Digital Electronics 2025", file: require("@/assets/past-questions/digital-electronics/digital-electronics-2025.pdf") },
    ],
  },

  system_analysis_and_design: {
    title: "system analysis and design",
    overview: require("@/assets/past-questions/system-analysis-and-design/overview.md"),
    files: [
      { id: 1, name: "System Analysis and Design 2020", file: require("@/assets/past-questions/system-analysis-and-design/systems-analysis-and-design-2020.pdf") },
      { id: 2, name: "System Analysis and Design 2021", file: require("@/assets/past-questions/system-analysis-and-design/systems-analysis-and-design-2021.pdf") },
      { id: 3, name: "System Analysis and Design 2022", file: require("@/assets/past-questions/system-analysis-and-design/systems-analysis-and-design-2022.pdf") },
      { id: 4, name: "System Analysis and Design 2023", file: require("@/assets/past-questions/system-analysis-and-design/systems-analysis-and-design-2023.pdf") },
      { id: 5, name: "System Analysis and Design 2024", file: require("@/assets/past-questions/system-analysis-and-design/systems-analysis-and-design-2024.pdf") },
      { id: 6, name: "System Analysis and Design 2025", file: require("@/assets/past-questions/system-analysis-and-design/systems-analysis-and-design-2025.pdf") },
    ],
  },


};

export const ResourceMaterials: Record<string, ResourceFiles[]> = {

  resources: [
    { id: 1, name: "INTRODUCTION TO ALGORITHMS", file: require("./assets/resources/INTRODUCTION-TO-ALGORITHMS.pdf"), fileType: "PDF file" },
    { id: 2, name: "PROGRAMMING I", file: require("./assets/resources/PROGRAMMING-I.pdf"), fileType: "PDF file" },
    { id: 3, name: "PROGRAMMING OF MOBILE TERMINALS", file: require("./assets/resources/PROGRAMMING-OF-MOBILE-TERMINALS.pdf"), fileType: "PDF file" },
    { id: 4, name: "SQL and DataBase_Administration", file: require("./assets/resources/SQL-and-DataBase_Administration.pdf"), fileType: "PDF file" },
  ],

}
