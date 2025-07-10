export interface DocumentAnalysis {
  id: string;
  fileName: string;
  category: DocumentCategory;
  status: AnalysisStatus;
  score?: number;
  strengths?: string[];
  improvements?: string[];
  recommendations?: string[];
  createdAt: Date;
  completedAt?: Date;
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