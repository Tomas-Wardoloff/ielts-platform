import type {
  QuestionDraft,
  TrueFalseNGFormData,
  YesNoNGFormData,
  MultipleChoiceFormData,
  MatchingHeadingsFormData,
  MatchingInformationFormData,
  MatchingFeaturesFormData,
  MatchingSentenceEndingsFormData,
  SentenceCompletionFormData,
  NoteTableFlowchartFormData,
  DiagramLabelFormData,
  ShortAnswerFormData,
} from "@/types/admin";

export function serializeQuestion(draft: QuestionDraft): {
  content: unknown;
  solution: unknown;
} {
  switch (draft.type) {
    case "TRUE_FALSE_NG": {
      const d = draft.formData as TrueFalseNGFormData;
      return {
        content: {
          statements: d.statements.map(({ id, text }) => ({ id, text })),
        },
        solution: Object.fromEntries(d.statements.map((s) => [s.id, s.answer])),
      };
    }
    case "YES_NO_NG": {
      const d = draft.formData as YesNoNGFormData;
      return {
        content: {
          statements: d.statements.map(({ id, text }) => ({ id, text })),
        },
        solution: Object.fromEntries(d.statements.map((s) => [s.id, s.answer])),
      };
    }
    case "MULTIPLE_CHOICE": {
      const d = draft.formData as MultipleChoiceFormData;
      return {
        content: { question: d.question, options: d.options },
        solution: { answer: d.answer },
      };
    }
    case "MATCHING_HEADINGS": {
      const d = draft.formData as MatchingHeadingsFormData;
      return {
        content: { paragraphs: d.paragraphs, headings: d.headings },
        solution: d.solution,
      };
    }
    case "MATCHING_INFORMATION": {
      const d = draft.formData as MatchingInformationFormData;
      return {
        content: {
          paragraphs: d.paragraphs,
          statements: d.statements.map(({ id, text }) => ({ id, text })),
        },
        solution: Object.fromEntries(d.statements.map((s) => [s.id, s.answer])),
      };
    }
    case "MATCHING_FEATURES": {
      const d = draft.formData as MatchingFeaturesFormData;
      return {
        content: {
          category: d.category,
          features: d.features,
          statements: d.statements.map(({ id, text }) => ({ id, text })),
        },
        solution: Object.fromEntries(d.statements.map((s) => [s.id, s.answer])),
      };
    }
    case "MATCHING_SENTENCE_ENDINGS": {
      const d = draft.formData as MatchingSentenceEndingsFormData;
      return {
        content: {
          beginnings: d.beginnings.map(({ id, text }) => ({ id, text })),
          endings: d.endings,
        },
        solution: Object.fromEntries(d.beginnings.map((b) => [b.id, b.answer])),
      };
    }
    case "SENTENCE_COMPLETION": {
      const d = draft.formData as SentenceCompletionFormData;
      return {
        content: { sentences: d.sentences.map((s) => s.segments) },
        solution: Object.fromEntries(
          d.blanks.map((b) => [
            b.id,
            {
              answers: b.answers
                .split(",")
                .map((a) => a.trim())
                .filter(Boolean),
            },
          ])
        ),
      };
    }
    case "NOTE_TABLE_FLOWCHART_SUMMARY": {
      const d = draft.formData as NoteTableFlowchartFormData;
      return {
        content: {
          format: d.format,
          title: d.title || undefined,
          segments: d.segments,
        },
        solution: Object.fromEntries(
          d.blanks.map((b) => [
            b.id,
            {
              answers: b.answers
                .split(",")
                .map((a) => a.trim())
                .filter(Boolean),
            },
          ])
        ),
      };
    }
    case "DIAGRAM_LABEL": {
      const d = draft.formData as DiagramLabelFormData;
      return {
        content: {
          diagramDescription: d.diagramDescription,
          labels: d.labels.map(({ id, hint }) => ({
            id,
            hint: hint || undefined,
          })),
          options: d.options
            ? d.options
                .split(",")
                .map((o) => o.trim())
                .filter(Boolean)
            : undefined,
        },
        solution: Object.fromEntries(
          d.labels.map((l) => [
            l.id,
            {
              answers: l.answers
                .split(",")
                .map((a) => a.trim())
                .filter(Boolean),
            },
          ])
        ),
      };
    }
    case "SHORT_ANSWER": {
      const d = draft.formData as ShortAnswerFormData;
      return {
        content: {
          questions: d.questions.map(({ id, text }) => ({ id, text })),
        },
        solution: Object.fromEntries(
          d.questions.map((q) => [
            q.id,
            {
              answers: q.answers
                .split(",")
                .map((a) => a.trim())
                .filter(Boolean),
            },
          ])
        ),
      };
    }
  }
}
