import { FindingsMap, GameConfigItem, MatrixItem } from './game';

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
  time: number;
};

export type DailyChallengeResponse = {
  matrix: MatrixItem[][];
  gameConfig: GameConfigItem;
  date: string;
  hasPlayed: boolean;
  stats: UserStats;
  username: string;
  mode: 'practice' | 'daily';
};

export type PracticeGameResponse = {
  matrix: MatrixItem[][];
  gameConfig: GameConfigItem;
  stats: UserStats;
  username: string;
  mode: 'practice';
};

export type SubmitScoreRequest = {
  moves: number;
  score: number;
  time: number;
  findings: FindingsMap;
  isWin: boolean;
  isDaily: boolean;
};

export type SubmitScoreResponse = {
  success: boolean;
  newStats: UserStats;
};

export type LeaderboardResponse = {
  entries: LeaderboardEntry[];
  userEntry?: LeaderboardEntry | null;
};

export type PostCommentRequest = {
  score: number;
  isWin: boolean;
  wasBombed: boolean;
  moves: number;
  findings: FindingsMap;
};

export type PostCommentResponse = {
  success: boolean;
  commentId?: string;
};

export interface StatsResponse {
  success: boolean;
  stats?: UserStats;
  message?: string;
}
