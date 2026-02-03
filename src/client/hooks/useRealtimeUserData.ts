import { useState, useEffect } from 'react';
import { context, connectRealtime } from '@devvit/web/client';
import { usePirateChestAPI } from './usePirateChestApi';
import {
  ChannelMessage,
  MODE_UPDATE_MSG,
  STATS_UPDATE_MSG,
  userDataChannel,
} from '../../shared/types/channels';
import { UserStats } from '../../shared/types/api';

type GameMode = 'daily' | 'practice';

export interface UserData {
  username: string;
  score: number;
  mode: GameMode;
  loading: boolean;
}

export interface StatsUpdatePayload {
  stats: UserStats
}

export interface ModeUpdatePayload {
  mode: GameMode;
}

export const useRealtimeUserData = () => {
  const { getDailyChallenge } = usePirateChestAPI();
  const { username, postId, userId } = context;

  const [userData, setUserData] = useState<UserData>({
    username: username ?? 'Matey',
    score: 0,
    mode: 'practice',
    loading: true,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchInitialData = async () => {
      try {
        const data = await getDailyChallenge();
        if (data && isMounted) {
          setUserData({
            username: data.username,
            score: data.stats.score,
            mode: data.hasPlayed ? 'practice' : 'daily',
            loading: false,
          });
        }
      } catch (error) {
        if (isMounted) {
          setUserData((prev) => ({ ...prev, loading: false }));
        }
      }
    };

    fetchInitialData();

    return () => {
      isMounted = false;
    };
  }, [getDailyChallenge]);

  useEffect(() => {
    if (!postId || !userId) return;

    let connection: any = null;
    const channelName = userDataChannel(userId);

    const setupRealtimeConnection = async () => {
      try {
        connection = await connectRealtime({
          channel: channelName,
          onConnect: async () => {
            console.log('Connected to Realtime User Data');
          },
          onMessage: (message: ChannelMessage) => {
            if (message.type === STATS_UPDATE_MSG && message.payload) {
              const payload = message.payload as StatsUpdatePayload;
              setUserData((prev) => ({
                ...prev,
                score: payload.stats.score,
              }));
            }
            if (message.type === MODE_UPDATE_MSG && message?.payload?.postId === postId) {
              const payload = message.payload as ModeUpdatePayload;
              setUserData((prev) => ({
                ...prev,
                mode: payload.mode,
              }));
            }
          },
        });
      } catch (error) {
        console.error(error);
      }
    };

    setupRealtimeConnection();

    return () => {
      if (connection) {
        connection.disconnect();
      }
    };
  }, [postId, userId]);

  return userData;
};
