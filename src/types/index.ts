export interface DocumentAnalysis {
  id: string;
  document_id: string;
  document_name: string;
  status: string;
  analysis_result?: string;
  error_message?: string;
  created_time?: string;
  started_time?: string;
  completed_time?: string;
  updated_time?: string;
  // Parsed fields from analysis_result JSON
  score?: number;
  strengths?: string[];
  improvements?: string[];
  recommendations?: string[];
  summary?: string;
  analysis_text?: string; // Full text analysis
  format?: string;
  note?: string;
}

export type DocumentCategory = 
  | 'cv' 
  | 'cover-letter' 
  | 'portfolio' 
  | 'research' 
  | 'proposal' 
  | 'other';

export type AnalysisStatus = 
  | 'pending' 
  | 'processing' 
  | 'completed' 
  | 'failed';

export interface OpenCall {
  id: string;
  title: string;
  organization: string;
  deadline: string;
  location: string;
  type: OpenCallType;
  description: string;
  url: string;
  imageUrl?: string;
  tags: string[];
  source: string;
}

export type OpenCallType = 
  | 'residency' 
  | 'exhibition' 
  | 'grant' 
  | 'competition' 
  | 'call-for-artists';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface NavigationItem {
  name: string;
  href: string;
  icon?: string;
}

export interface ServiceCard {
  title: string;
  description: string;
  icon: string;
  buttonText: string;
  buttonStyle: 'primary' | 'secondary';
  href: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
  color: string;
} 