export const userDataChannel = (userId: string) => `user_update_${userId}`;

export const STATS_UPDATE_MSG = 'stats-update';
export const MODE_UPDATE_MSG = 'mode-update';

export type ChannelMessage = {
  userId: string;
  type: 'stats-update' | 'mode-update';
  payload: any;
};
