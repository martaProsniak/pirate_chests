import { FindingsMap } from './game';

export type InitResponse = {
  type: 'init';
  postId: string;
  username: string;
};

export type UserStats = {
  score: number;
  gamesPlayed: number;
  wins: number;
  findings: FindingsMap;
};

export type LeaderboardEntry = {
  username: string;
  score: number;
  rank: number;
};

export type DailyChallengeResponse = {
  seed: string;
  date: string;
  attempts: number;
  stats: UserStats;
  username: string;
};

export type SubmitScoreRequest = {
  moves: number;
  score: number;
  findings: FindingsMap;
  isWin: boolean;
  isDaily: boolean;
  attempt: number;
};

export type SubmitScoreResponse = {
  success: boolean;
  newStats: UserStats;
};

export type LeaderboardResponse = {
  entries: LeaderboardEntry[];
  userRank?: number;
};
