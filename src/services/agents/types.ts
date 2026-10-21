/**
 * CinePlus - Tipos del Sistema Multi-Agente (Arquitectura de 5 Agentes)
 * 1. Orquestador / Moderador General
 * 2. Crítico Cinematográfico & Narrativo (Especialista 1)
 * 3. Asesor Comercial & Logístico (Especialista 2)
 * 4. Especialista Técnico & Audiovisual (Especialista 3)
 * 5. Auditor de Calidad, Fact-Checking y Consistencia (Auditor)
 */

import { Movie } from '../../domain/Movie';

export type AgentRole = 'ORCHESTRATOR' | 'CRITIC' | 'LOGISTICS' | 'TECHNICAL' | 'AUDITOR';

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

export interface AuditMetrics {
  consistencyScore: number; // 0 - 100%
  factCheckStatus: 'VERIFICADO_CONFORME' | 'ALERTA_DISCREPANCIA' | 'OPTIMO';
  factualNotes: string;
  biasDetected: boolean;
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
  auditMetrics: AuditMetrics;
  messages: AgentMessage[];
  verdict: FinalVerdict;
  completedAt: Date;
}
