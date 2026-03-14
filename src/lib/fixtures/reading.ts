import type {
  ReadingPassageWithQuestions,
  TrueFalseNGContent,
  TrueFalseNGSolution,
  MatchingHeadingsContent,
  MatchingHeadingsSolution,
  MultipleChoiceContent,
  MultipleChoiceSolution,
  SentenceCompletionContent,
  CompletionSolution,
} from "@/types/exercise";

export const READING_FIXTURES: ReadingPassageWithQuestions[] = [
  {
    id: "fixture-passage-1",
    title: "The History of Photography",
    source: "Adapted from an academic journal on visual arts",
    difficulty: "INTERMEDIATE",
    text: `Photography, derived from the Greek words for light and writing, has transformed the way humans document and perceive reality. The invention is most commonly attributed to Louis Daguerre, whose daguerreotype process was announced to the world in 1839. However, earlier experiments by Joseph Nicéphore Niépce, who produced the world's oldest surviving photograph in 1826 or 1827, laid the groundwork for Daguerre's work.

The daguerreotype produced highly detailed images on silver-coated copper plates, but each image was unique and could not be reproduced. This limitation was addressed by William Henry Fox Talbot's calotype process, which introduced the concept of a negative from which multiple positive prints could be made. This negative-positive process became the foundation of photography for over a century.

By the late nineteenth century, photography had become accessible to the general public. George Eastman's introduction of roll film and the Kodak camera in 1888 revolutionised the medium by making it portable and affordable. The slogan "You press the button, we do the rest" captured the simplicity that Eastman intended to bring to photography.

The transition from film to digital photography in the late twentieth century marked another radical shift. Digital cameras, and later smartphones, made photography ubiquitous. Today, it is estimated that over 1.4 trillion photographs are taken annually worldwide, a figure that would have been incomprehensible to the pioneers of the medium.`,
    questions: [
      {
        id: "fixture-q1",
        type: "TRUE_FALSE_NG",
        title: "Statements about the history of photography",
        instructions:
          "Do the following statements agree with the information in the passage? Write TRUE, FALSE or NOT GIVEN.",
        content: {
          statements: [
            {
              id: "s1",
              text: "Louis Daguerre is the only person credited with inventing photography.",
            },
            {
              id: "s2",
              text: "The daguerreotype allowed photographers to make multiple copies of a single image.",
            },
            {
              id: "s3",
              text: "George Eastman studied photography in Europe before founding his company.",
            },
            {
              id: "s4",
              text: "More than one trillion photographs are taken every year in the modern era.",
            },
          ],
        } as TrueFalseNGContent,
        solution: {
          s1: "FALSE",
          s2: "FALSE",
          s3: "NOT GIVEN",
          s4: "TRUE",
        } as TrueFalseNGSolution,
        explanation:
          "s1: FALSE — Niépce is also credited. s2: FALSE — the daguerreotype was unique and could not be reproduced. s3: NOT GIVEN — the passage does not mention where Eastman studied. s4: TRUE — the passage states over 1.4 trillion photographs are taken annually.",
        order: 1,
      },
      {
        id: "fixture-q2",
        type: "MATCHING_HEADINGS",
        title: "Paragraph headings",
        instructions:
          "The passage has four paragraphs (A–D). Choose the correct heading for each paragraph from the list. There are more headings than paragraphs, so you will not use all of them.",
        content: {
          paragraphs: [
            {
              id: "A",
              text: "Photography, derived from the Greek words for light and writing...",
            },
            {
              id: "B",
              text: "The daguerreotype produced highly detailed images...",
            },
            {
              id: "C",
              text: "By the late nineteenth century, photography had become accessible...",
            },
            {
              id: "D",
              text: "The transition from film to digital photography...",
            },
          ],
          headings: [
            { id: "i", text: "The origins and early pioneers of photography" },
            {
              id: "ii",
              text: "A technological leap that enabled reproduction",
            },
            { id: "iii", text: "The commercialisation of photography" },
            { id: "iv", text: "The digital revolution and modern photography" },
            { id: "v", text: "The role of chemistry in image development" },
            { id: "vi", text: "Photography as an art form" },
          ],
        } as MatchingHeadingsContent,
        solution: {
          A: "i",
          B: "ii",
          C: "iii",
          D: "iv",
        } as MatchingHeadingsSolution,
        explanation:
          "Each heading summarises the main idea of its paragraph. Headings v and vi are not used.",
        order: 2,
      },
      {
        id: "fixture-q3",
        type: "MULTIPLE_CHOICE",
        title: "Multiple choice",
        instructions: "Choose the correct letter, A, B, C or D.",
        content: {
          question:
            "According to the passage, what was the main limitation of the daguerreotype?",
          options: [
            {
              id: "A",
              text: "It required expensive silver-coated copper plates.",
            },
            {
              id: "B",
              text: "Each image produced was unique and could not be copied.",
            },
            { id: "C", text: "The process was too slow for everyday use." },
            { id: "D", text: "Images produced were not detailed enough." },
          ],
        } as MultipleChoiceContent,
        solution: {
          answer: "B",
        } as MultipleChoiceSolution,
        explanation:
          "The passage explicitly states: 'each image was unique and could not be reproduced'.",
        order: 3,
      },
      {
        id: "fixture-q4",
        type: "SENTENCE_COMPLETION",
        title: "Sentence completion",
        instructions:
          "Complete the sentences below. Use NO MORE THAN TWO WORDS from the passage for each answer.",
        content: {
          passage: "",
          sentences: [
            [
              {
                type: "text",
                value: "Fox Talbot's calotype introduced the concept of a ",
              },
              { type: "blank", id: "b1" },
              {
                type: "text",
                value: " from which multiple prints could be made.",
              },
            ],
            [
              {
                type: "text",
                value:
                  "Eastman's Kodak camera made photography both portable and ",
              },
              { type: "blank", id: "b2" },
              { type: "text", value: "." },
            ],
          ],
        } as SentenceCompletionContent,
        solution: {
          b1: { answers: ["negative"] },
          b2: { answers: ["affordable"] },
        } as CompletionSolution,
        explanation:
          "Both answers appear verbatim in the passage. Synonyms are not accepted.",
        order: 4,
      },
    ],
  },
  {
    id: "fixture-passage-2",
    title: "Urban Green Spaces and Mental Health",
    source: "Adapted from a public health research paper",
    difficulty: "ADVANCED",
    text: `The relationship between urban green spaces and mental wellbeing has attracted considerable academic attention in recent decades. Parks, gardens, and tree-lined streets are no longer viewed merely as aesthetic additions to city planning but as essential components of public health infrastructure. A growing body of research suggests that regular exposure to natural environments reduces stress, anxiety, and symptoms of depression.

One of the most cited studies in this field was conducted in the United Kingdom, where researchers found that individuals living within 300 metres of a green space reported significantly higher levels of life satisfaction compared to those living further away. The benefits were found to be independent of income, age, and physical activity levels, suggesting that the mere presence of greenery may be sufficient to produce positive psychological effects.

Critics of this research, however, argue that correlation does not imply causation. Wealthier neighbourhoods tend to have better-maintained green spaces, and residents of such areas may report higher wellbeing for entirely unrelated reasons. Disentangling the effects of greenery from those of socioeconomic status remains a methodological challenge for researchers in this field.

Despite these criticisms, many city governments have begun incorporating green space targets into urban planning policies. Singapore, often cited as a model, has committed to ensuring that every resident lives within a ten-minute walk of a park. Similar initiatives are underway in cities across Europe and North America, reflecting a growing consensus that access to nature is not a luxury but a public health necessity.`,
    questions: [
      {
        id: "fixture-q5",
        type: "TRUE_FALSE_NG",
        title: "Statements about urban green spaces",
        instructions:
          "Do the following statements agree with the information in the passage? Write TRUE, FALSE or NOT GIVEN.",
        content: {
          statements: [
            {
              id: "s1",
              text: "Green spaces were historically considered important for public health.",
            },
            {
              id: "s2",
              text: "The UK study found that proximity to green space improved wellbeing regardless of income.",
            },
            {
              id: "s3",
              text: "Some researchers question whether green spaces directly cause improved mental health.",
            },
            {
              id: "s4",
              text: "Singapore was the first city to introduce green space targets in urban planning.",
            },
          ],
        } as TrueFalseNGContent,
        solution: {
          s1: "FALSE",
          s2: "TRUE",
          s3: "TRUE",
          s4: "NOT GIVEN",
        } as TrueFalseNGSolution,
        explanation:
          "s1: FALSE — the passage says they were previously viewed only as aesthetic. s2: TRUE — explicitly stated. s3: TRUE — critics argue correlation does not imply causation. s4: NOT GIVEN — Singapore is cited as a model but not as the first.",
        order: 1,
      },
      {
        id: "fixture-q6",
        type: "MULTIPLE_CHOICE",
        title: "Multiple choice",
        instructions: "Choose the correct letter, A, B, C or D.",
        content: {
          question: "What do critics of the green space research argue?",
          options: [
            { id: "A", text: "Green spaces have no effect on mental health." },
            {
              id: "B",
              text: "The positive effects may be caused by factors other than greenery.",
            },
            {
              id: "C",
              text: "The research was conducted in too few countries to be reliable.",
            },
            {
              id: "D",
              text: "Wealthier residents do not benefit from green spaces.",
            },
          ],
        } as MultipleChoiceContent,
        solution: {
          answer: "B",
        } as MultipleChoiceSolution,
        explanation:
          "Critics argue that wealthier neighbourhoods have better green spaces and higher wellbeing for unrelated reasons — so the cause may not be the greenery itself.",
        order: 2,
      },
    ],
  },
];
