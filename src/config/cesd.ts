import type { TCESDQuestion } from '../types/all.types';

/**
 * CES-D (Center for Epidemiologic Studies Depression Scale) Questions
 *
 * 20-question screening test for depression.
 * Each question is scored 0-3 (Rarely/None to Most/All).
 * Items 4, 8, 12, 16 are reverse-scored (positively worded).
 *
 * References:
 * - Radloff, L. S. (1977). The CES-D scale: A self-report depression scale for research in the general population.
 * - CES-D-R: Revised version aligned with DSM-5-TR criteria
 */
export const cesdQuestions: TCESDQuestion[] = [
  // 1. Bothered by things
  {
    id: 1,
    text: 'cesd.questions.q1',
    isReverseScored: false,
  },
  // 2. Appetite poor
  {
    id: 2,
    text: 'cesd.questions.q2',
    isReverseScored: false,
  },
  // 3. Felt as good as others (REVERSE)
  {
    id: 3,
    text: 'cesd.questions.q3',
    isReverseScored: true,
  },
  // 4. Could not shake blues (REVERSE SCORED)
  {
    id: 4,
    text: 'cesd.questions.q4',
    isReverseScored: true,
  },
  // 5. Trouble keeping mind on tasks
  {
    id: 5,
    text: 'cesd.questions.q5',
    isReverseScored: false,
  },
  // 6. Felt depressed
  {
    id: 6,
    text: 'cesd.questions.q6',
    isReverseScored: false,
  },
  // 7. Everything was effort
  {
    id: 7,
    text: 'cesd.questions.q7',
    isReverseScored: false,
  },
  // 8. Felt hopeful (REVERSE SCORED)
  {
    id: 8,
    text: 'cesd.questions.q8',
    isReverseScored: true,
  },
  // 9. Life was failure
  {
    id: 9,
    text: 'cesd.questions.q9',
    isReverseScored: false,
  },
  // 10. Felt fearful
  {
    id: 10,
    text: 'cesd.questions.q10',
    isReverseScored: false,
  },
  // 11. Sleep restless
  {
    id: 11,
    text: 'cesd.questions.q11',
    isReverseScored: false,
  },
  // 12. Felt happy (REVERSE SCORED)
  {
    id: 12,
    text: 'cesd.questions.q12',
    isReverseScored: true,
  },
  // 13. Talked less than usual
  {
    id: 13,
    text: 'cesd.questions.q13',
    isReverseScored: false,
  },
  // 14. Felt lonely
  {
    id: 14,
    text: 'cesd.questions.q14',
    isReverseScored: false,
  },
  // 15. People were unfriendly
  {
    id: 15,
    text: 'cesd.questions.q15',
    isReverseScored: false,
  },
  // 16. Enjoyed life (REVERSE SCORED)
  {
    id: 16,
    text: 'cesd.questions.q16',
    isReverseScored: true,
  },
  // 17. Cried spells
  {
    id: 17,
    text: 'cesd.questions.q17',
    isReverseScored: false,
  },
  // 18. Felt sad
  {
    id: 18,
    text: 'cesd.questions.q18',
    isReverseScored: false,
  },
  // 19. Felt disliked
  {
    id: 19,
    text: 'cesd.questions.q19',
    isReverseScored: false,
  },
  // 20. Could not get going
  {
    id: 20,
    text: 'cesd.questions.q20',
    isReverseScored: false,
  },
];

/**
 * Get question by ID
 */
export const getQuestionById = (id: number): TCESDQuestion | undefined => {
  return cesdQuestions.find(q => q.id === id);
};

/**
 * Get all reverse-scored question IDs
 */
export const getReverseScoredIds = (): number[] => {
  return cesdQuestions.filter(q => q.isReverseScored).map(q => q.id);
};
