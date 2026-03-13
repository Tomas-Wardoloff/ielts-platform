export type Option = { id: string; text: string };
export type Statement = { id: string; text: string };
export type Paragraph = { id: string; text: string };
export type Heading = { id: string; text: string };
export type SentenceBeginning = { id: string; text: string };
export type SentenceEnding = { id: string; text: string };
export type BlankSegment = { type: "blank"; id: string };
export type TextSegment = { type: "text"; value: string };
export type ContentSegment = TextSegment | BlankSegment;

/**
 * 1. Multiple Choice
 * Choose one correct answer (A/B/C/D) or sometimes two from five.
 * Instructions will specify how many answers are required.
 */
export type MultipleChoiceContent = {
  passage: string;
  question: string;
  options: Option[];
  selectCount?: number; // defaults to 1 if omitted
};

/**
 * 2. True / False / Not Given
 * Factual statements — does the text confirm, contradict, or not mention them?
 */
export type TrueFalseNGContent = {
  passage: string;
  statements: Statement[];
};

/**
 * 3. Yes / No / Not Given
 * Same format as T/F/NG but targets the writer's views or claims
 */
export type YesNoNGContent = {
  passage: string;
  statements: Statement[];
};

/**
 * 4. Matching Information
 * Match each statement to the paragraph (A, B, C...) where it appears.
 * Multiple statements can match the same paragraph.
 */
export type MatchingInformationContent = {
  passage: string;
  paragraphs: Paragraph[];
  statements: Statement[];
};

/**
 * 5. Matching Headings
 * Match each paragraph to its best heading.
 * There are always more headings than paragraphs — some headings are unused.
 */
export type MatchingHeadingsContent = {
  passage: string;
  paragraphs: Paragraph[];
  headings: Heading[];
};

/**
 * 6. Matching Features
 * Match statements to items from a category (people, countries, periods, etc).
 * An item can match more than one statement.
 */
export type MatchingFeaturesContent = {
  passage: string;
  category: string; // e.g. "Researchers", "Countries", "Historical periods"
  features: Option[]; // the items to match to (A, B, C...)
  statements: Statement[];
};

/**
 * 7. Matching Sentence Endings
 * Complete sentence beginnings by selecting the correct ending.
 * Questions follow the order of information in the passage.
 * There are always more endings than beginnings.
 */
export type MatchingSentenceEndingsContent = {
  passage: string;
  beginnings: SentenceBeginning[];
  endings: SentenceEnding[];
};

/**
 * 8. Sentence Completion
 * Fill blanks in sentences using exact words from the passage.
 * Synonyms are not accepted. Word limit specified in instructions.
 */
export type SentenceCompletionContent = {
  passage: string;
  sentences: ContentSegment[][]; // each sentence is an array of segments
};

/**
 * 9. Note / Table / Flow Chart / Summary Completion
 * Same mechanic as sentence completion but presented in a structured format.
 * Words must come from the text — no synonyms.
 * `format` drives how the renderer displays it.
 */
export type NoteTableFlowchartSummaryContent = {
  passage: string;
  format: "note" | "table" | "flowchart" | "summary";
  title?: string;
  // For notes and summaries: free segments
  segments?: ContentSegment[];
  // For tables: rows of cells, each cell is segments or plain text
  rows?: { cells: (ContentSegment[] | string)[] }[];
  columnHeaders?: string[];
  // For flowcharts: ordered steps
  steps?: ContentSegment[][];
};

/**
 * 10. Diagram Label Completion
 * A diagram (machine, building, process) with labels to fill in.
 * A list of options is usually provided alongside the diagram.
 * Words must come from the text or provided options.
 */
export type DiagramLabelContent = {
  passage: string;
  diagramDescription: string; // text description of what the diagram shows
  labels: { id: string; hint?: string }[]; // blanks to fill
  options?: string[]; // provided word bank, if any
};

/**
 * 11. Short Answer Questions
 * Locate precise details in the text and write a short answer.
 * Word limit specified in instructions. Exact words from text required.
 */
export type ShortAnswerContent = {
  passage: string;
  questions: Statement[];
};

export type ExerciseContent =
  | MultipleChoiceContent
  | TrueFalseNGContent
  | YesNoNGContent
  | MatchingInformationContent
  | MatchingHeadingsContent
  | MatchingFeaturesContent
  | MatchingSentenceEndingsContent
  | SentenceCompletionContent
  | NoteTableFlowchartSummaryContent
  | DiagramLabelContent
  | ShortAnswerContent;

/** 1. Multiple Choice — single or multi select */
export type MultipleChoiceSolution =
  | { answer: string } // single select
  | { answers: string[] }; // multi select

/** 2 & 3. T/F/NG and Y/N/NG — keyed by statement id */
export type TrueFalseNGSolution = Record<
  string,
  "TRUE" | "FALSE" | "NOT GIVEN"
>;
export type YesNoNGSolution = Record<string, "YES" | "NO" | "NOT GIVEN">;

/** 4. Matching Information — statement id → paragraph id */
export type MatchingInformationSolution = Record<string, string>;

/** 5. Matching Headings — paragraph id → heading id */
export type MatchingHeadingsSolution = Record<string, string>;

/** 6. Matching Features — statement id → feature id */
export type MatchingFeaturesSolution = Record<string, string>;

/** 7. Matching Sentence Endings — beginning id → ending id */
export type MatchingSentenceEndingsSolution = Record<string, string>;

/**
 * 8 & 9. Sentence / Note / Table / Flowchart / Summary Completion
 * blank id → accepted answers (multiple accepted forms, case-insensitive)
 */
export type CompletionSolution = Record<string, { answers: string[] }>;

/**
 * 10. Diagram Label Completion
 * label id → accepted answers
 */
export type DiagramLabelSolution = Record<string, { answers: string[] }>;

/**
 * 11. Short Answer
 * question id → accepted answers
 */
export type ShortAnswerSolution = Record<string, { answers: string[] }>;

export type ExerciseSolution =
  | MultipleChoiceSolution
  | TrueFalseNGSolution
  | YesNoNGSolution
  | MatchingInformationSolution
  | MatchingHeadingsSolution
  | MatchingFeaturesSolution
  | MatchingSentenceEndingsSolution
  | CompletionSolution
  | DiagramLabelSolution
  | ShortAnswerSolution;

/**
 * Follows the same referential pattern as solution.
 * Keys are IDs from content, values are the user's responses.
 */
export type UserAnswer = Record<string, string | string[]>;

export type GradeResult = {
  correct: number;
  total: number;
  score: number; // 0–1
  breakdown: Record<string, boolean>; // id → correct or not
};
