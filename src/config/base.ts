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
