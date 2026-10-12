/**
 * CinePlus - Tipos del Sistema Multi-Agente
 */

import { Movie } from '../../domain/Movie';

export type AgentRole = 'CRITIC' | 'LOGISTICS' | 'CONCIERGE';

export interface AgentMessage {
  id: string;
  role: AgentRole;
  agentName: string;
  agentTitle: string;
  avatar: string;
  badgeColor: string;
  content: string;
  metrics?: Record<string, string | number>;
  timestamp: Date;
}

export type VerdictStatus = 'IMPERDIBLE' | 'RECOMENDADA' | 'ESPERAR_STREAMING' | 'NO_RECOMENDADA';

export interface FinalVerdict {
  status: VerdictStatus;
  statusLabel: string;
  badgeClass: string;
  score: number; // 0 - 100
  summary: string;
  bestShowtimeRecommendation?: string;
  valueForMoney: string;
}

export interface MultiAgentDeliberation {
  movie: Movie;
  userAffinityScore: number;
  userAffinityExplanation: string;
  sentimentStats: {
    positiveRatio: number;
    neutralRatio: number;
    negativeRatio: number;
    totalReviewsAnalyzed: number;
    dominantSentiment: string;
  };
  messages: AgentMessage[];
  verdict: FinalVerdict;
  completedAt: Date;
}
