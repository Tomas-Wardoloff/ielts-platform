export type QuestionType =
  | "MULTIPLE_CHOICE"
  | "TRUE_FALSE_NG"
  | "YES_NO_NG"
  | "MATCHING_HEADINGS"
  | "MATCHING_INFORMATION"
  | "MATCHING_FEATURES"
  | "MATCHING_SENTENCE_ENDINGS"
  | "SENTENCE_COMPLETION"
  | "NOTE_TABLE_FLOWCHART_SUMMARY"
  | "DIAGRAM_LABEL"
  | "SHORT_ANSWER";

export const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  MULTIPLE_CHOICE: "Multiple Choice",
  TRUE_FALSE_NG: "True / False / Not Given",
  YES_NO_NG: "Yes / No / Not Given",
  MATCHING_HEADINGS: "Matching Headings",
  MATCHING_INFORMATION: "Matching Information",
  MATCHING_FEATURES: "Matching Features",
  MATCHING_SENTENCE_ENDINGS: "Matching Sentence Endings",
  SENTENCE_COMPLETION: "Sentence Completion",
  NOTE_TABLE_FLOWCHART_SUMMARY: "Note / Table / Flowchart / Summary",
  DIAGRAM_LABEL: "Diagram Label Completion",
  SHORT_ANSWER: "Short Answer Questions",
};

export type TFNGValue = "TRUE" | "FALSE" | "NOT GIVEN";
export type YNNGValue = "YES" | "NO" | "NOT GIVEN";

export type TrueFalseNGFormData = {
  statements: { id: string; text: string; answer: TFNGValue }[];
};

export type YesNoNGFormData = {
  statements: { id: string; text: string; answer: YNNGValue }[];
};

export type MultipleChoiceFormData = {
  question: string;
  options: { id: string; text: string }[];
  answer: string;
};

export type MatchingHeadingsFormData = {
  paragraphs: { id: string }[];
  headings: { id: string; text: string }[];
  solution: Record<string, string>;
};

export type MatchingInformationFormData = {
  paragraphs: { id: string; text: string }[];
  statements: { id: string; text: string; answer: string }[];
};

export type MatchingFeaturesFormData = {
  category: string;
  features: { id: string; text: string }[];
  statements: { id: string; text: string; answer: string }[];
};

export type MatchingSentenceEndingsFormData = {
  beginnings: { id: string; text: string; answer: string }[];
  endings: { id: string; text: string }[];
};

export type SentenceCompletionFormData = {
  sentences: {
    segments: { type: "text" | "blank"; value?: string; id?: string }[];
  }[];
  blanks: { id: string; answers: string }[];
};

export type NoteTableFlowchartFormData = {
  format: "note" | "table" | "flowchart" | "summary";
  title: string;
  segments: { type: "text" | "blank"; value?: string; id?: string }[];
  blanks: { id: string; answers: string }[];
};

export type DiagramLabelFormData = {
  diagramDescription: string;
  labels: { id: string; hint: string; answers: string }[];
  options: string;
};

export type ShortAnswerFormData = {
  questions: { id: string; text: string; answers: string }[];
};

export type QuestionFormData =
  | TrueFalseNGFormData
  | YesNoNGFormData
  | MultipleChoiceFormData
  | MatchingHeadingsFormData
  | MatchingInformationFormData
  | MatchingFeaturesFormData
  | MatchingSentenceEndingsFormData
  | SentenceCompletionFormData
  | NoteTableFlowchartFormData
  | DiagramLabelFormData
  | ShortAnswerFormData;

export type QuestionDraft = {
  id: string;
  type: QuestionType;
  instructions: string;
  formData: QuestionFormData;
};
