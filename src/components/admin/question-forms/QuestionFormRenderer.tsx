import type { QuestionDraft, QuestionFormData } from "@/types/admin";
import { TrueFalseNGForm } from "./TrueFalseNGForm";
import { YesNoNGForm } from "./YesNoNGForm";
import { MultipleChoiceForm } from "./MultipleChoiceForm";
import { MatchingHeadingsForm } from "./MatchingHeadingsForm";
//import { MatchingInformationForm } from "./MatchingInformationForm";
//import { MatchingFeaturesForm } from "./MatchingFeaturesForm";
//import { MatchingSentenceEndingsForm } from "./MatchingSentenceEndingsForm";
//import { SentenceCompletionForm } from "./SentenceCompletionForm";
//import { NoteTableFlowchartForm } from "./NoteTableFlowchartForm";
//import { DiagramLabelForm } from "./DiagramLabelForm";
//import { ShortAnswerForm } from "./ShortAnswerForm";

interface Props {
  draft: QuestionDraft;
  onChange: (data: QuestionFormData) => void;
}

export function QuestionFormRenderer({ draft, onChange }: Props) {
  const props = { data: draft.formData as any, onChange: onChange as any };

  switch (draft.type) {
    case "TRUE_FALSE_NG":
      return <TrueFalseNGForm {...props} />;
    case "YES_NO_NG":
      return <YesNoNGForm {...props} />;
    case "MULTIPLE_CHOICE":
      return <MultipleChoiceForm {...props} />;
    case "MATCHING_HEADINGS":
      return <MatchingHeadingsForm {...props} />;
    //case "MATCHING_INFORMATION": return <MatchingInformationForm {...props} />;
    //case "MATCHING_FEATURES": return <MatchingFeaturesForm {...props} />;
    //case "MATCHING_SENTENCE_ENDINGS": return <MatchingSentenceEndingsForm {...props} />;
    //case "SENTENCE_COMPLETION": return <SentenceCompletionForm {...props} />;
    //case "NOTE_TABLE_FLOWCHART_SUMMARY": return <NoteTableFlowchartForm {...props} />;
    //case "DIAGRAM_LABEL": return <DiagramLabelForm {...props} />;
    //case "SHORT_ANSWER": return <ShortAnswerForm {...props} />;
  }
}
