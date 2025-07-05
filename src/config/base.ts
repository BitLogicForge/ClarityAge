export type TPhilosophyQuestion = {
  title: string;
  description: string;
  quote: string;
  author: string;
  question: string;
};

export const questions: TPhilosophyQuestion[] = [
  {
    title: "philosophies.q1.title",
    description: "philosophies.q1.description",
    quote: "philosophies.q1.quote",
    author: "philosophies.q1.author",
    question: "philosophies.q1.question",
  },
  {
    title: "philosophies.q2.title",
    description: "philosophies.q2.description",
    quote: "philosophies.q2.quote",
    author: "philosophies.q2.author",
    question: "philosophies.q2.question",
  },
  {
    title: "philosophies.q3.title",
    description: "philosophies.q3.description",
    quote: "philosophies.q3.quote",
    author: "philosophies.q3.author",
    question: "philosophies.q3.question",
  },
  {
    title: "philosophies.q4.title",
    description: "philosophies.q4.description",
    quote: "philosophies.q4.quote",
    author: "philosophies.q4.author",
    question: "philosophies.q4.question",
  },
  {
    title: "philosophies.q5.title",
    description: "philosophies.q5.description",
    quote: "philosophies.q5.quote",
    author: "philosophies.q5.author",
    question: "philosophies.q5.question",
  },
  {
    title: "philosophies.q6.title",
    description: "philosophies.q6.description",
    quote: "philosophies.q6.quote",
    author: "philosophies.q6.author",
    question: "philosophies.q6.question",
  },
  {
    title: "philosophies.q7.title",
    description: "philosophies.q7.description",
    quote: "philosophies.q7.quote",
    author: "philosophies.q7.author",
    question: "philosophies.q7.question",
  },
  {
    title: "philosophies.q8.title",
    description: "philosophies.q8.description",
    quote: "philosophies.q8.quote",
    author: "philosophies.q8.author",
    question: "philosophies.q8.question",
  },
  {
    title: "philosophies.q9.title",
    description: "philosophies.q9.description",
    quote: "philosophies.q9.quote",
    author: "philosophies.q9.author",
    question: "philosophies.q9.question",
  },
  {
    title: "philosophies.q10.title",
    description: "philosophies.q10.description",
    quote: "philosophies.q10.quote",
    author: "philosophies.q10.author",
    question: "philosophies.q10.question",
  },
  {
    title: "philosophies.q11.title",
    description: "philosophies.q11.description",
    quote: "philosophies.q11.quote",
    author: "philosophies.q11.author",
    question: "philosophies.q11.question",
  },
  {
    title: "philosophies.q12.title",
    description: "philosophies.q12.description",
    quote: "philosophies.q12.quote",
    author: "philosophies.q12.author",
    question: "philosophies.q12.question",
  },
];

export type TLikertScaleValues = {
  stronglyDisagree: number;
  disagree: number;
  neutral: number;
  agree: number;
  stronglyAgree: number;
};

export const likertScaleValues: TLikertScaleValues = {
  stronglyDisagree: -2,
  disagree: -1,
  neutral: 0,
  agree: 1,
  stronglyAgree: 2,
};
