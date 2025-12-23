
export enum GameStage {
  INTRO = 'INTRO',
  SURVEY = 'SURVEY',
  CONGRESS = 'CONGRESS',
  RESOLUTION = 'RESOLUTION',
  RESULT = 'RESULT',
  TIMELINE = 'TIMELINE'
}

export interface Stats {
  economy: number;
  people: number;
  stability: number;
}

export interface SurveyPoint {
  id: string;
  name: string;
  title: string;
  description: string[];
  keywords: string[];
  icon: string;
  representative: {
    name: string;
    role: string;
    avatar: string;
  };
  options: {
    label: string;
    collects: boolean;
    feedback: string;
  }[];
}

export interface SessionOption {
  label: string;
  impact: Partial<Stats>;
  feedback: string;
  resolutionText: string;
  isInnovation: boolean;
}

export interface CongressSession {
  id: number;
  title: string;
  intro: string;
  question: string;
  options: SessionOption[];
}

export interface HistoryInsight {
  title: string;
  content: string;
  significance: string;
}

export interface CrisisItem {
  id: string;
  label: string;
  icon: string;
  fact: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  achievements: string[];
  icon: string;
  color: string;
}
