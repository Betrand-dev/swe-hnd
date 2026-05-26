export interface PaperFiles{
    id: number;
    name: string;
    file: any;
}

export interface ResourceFiles{
    id: number;
    name: string;
    file: any;
}[]

export interface PaperSubject {
  title: string;
  files: PaperFiles[];
}

export const PastPapers: Record<string, PaperSubject> = {

  practice_of_computer: {
    title: "practice of computer",
    files: [
      { id: 1, name: "", file: require("./assets/past-questions/practice-of-computer/") },
      { id: 2, name:"", file: require("./assets/past-questions/practice-of-computer/") },
    ],
  },

  case_study: {
    title: "case study",
    files: [
      { id: 1, name: "", file: require("./assets/past-questions/case-study/") },
    ],
  },

  digital_literacy: {
    title: "digital literacy",
    files: [
      { id: 1, name: "", file: require("./assets/past-questions/digital-literacy/") },
    ],
  },

  french: {
    title: "french",
    files: [
      { id: 1, name: "", file: require("./assets/past-questions/french/") },
    ],
  },

  english: {
    title: "english",
    files: [
      { id: 1, name: "", file: require("./assets/past-questions/english/") },
    ],
  },

  enterprise_creation: {
    title: "enterprise creation",
    files: [
      { id: 1, name: "", file: require("./assets/past-questions/enterprise-creation/") },
    ],
  },

  law_and_citizenship: {
    title: "law and citizenship",
    files: [
      { id: 1, name: "", file: require("./assets/past-questions/law-and-citizenship/") },
    ],
  },

  computer_technology: {
    title: "computer technology",
    files: [
      { id: 1, name: "", file: require("./assets/past-questions/computer-technology/") },
    ],
  },

  discrete_mathematics: {
    title: "discrete mathematics",
    files: [
      { id: 1, name: "", file: require("./assets/past-questions/discrete-mathematics/") },
    ],
  },

  information_systems: {
    title: "information systems",
    files: [
      { id: 1, name: "", file: require("./assets/past-questions/information-systems/") },
    ],
  },

  digital_electronic: {
    title: "digital electronics",
    files: [
      { id: 1, name: "", file: require("./assets/past-questions/digital-electronics/") },
    ],
  },

  system_analysis_and_design: {
    title: "system analysis and design",
    files: [
      { id: 1, name: "", file: require("./assets/past-questions/system-analysis-and-design/") },
    ],
  },


};

export const ResourceMaterials: Record<string, ResourceFiles[]> = {

  resources: [
    { id: 1, name: "", file: require("./assets/resources/") },
    { id: 2, name: "", file: require("./assets/resources/") },
  ],

}
