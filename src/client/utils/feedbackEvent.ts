export interface FeedbackDetail {
  row: number;
  col: number;
  score: number;
  rum: number;
}

export const EVENT_NAME = 'tile-feedback';

export const triggerFeedback = (row: number, col: number, score: number, rum: number) => {
  const event = new CustomEvent<FeedbackDetail>(EVENT_NAME, {
    detail: { row, col, score, rum },
  });
  window.dispatchEvent(event);
};
