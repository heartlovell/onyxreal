
export interface LogEntry {
  type: 'command' | 'system' | 'ai' | 'error';
  content: string;
  timestamp: string;
}

export enum SystemState {
  BOOTING = 'BOOTING',
  READY = 'READY',
  PROCESSING = 'PROCESSING',
  ERROR = 'ERROR'
}

export type ViewType = 'dashboard' | 'it-work' | 'web-dev' | 'security';

export interface NavItem {
  label: string;
  command: string;
  description: string;
  view?: ViewType;
}
