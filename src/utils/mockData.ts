import type { DocumentAnalysis, OpenCall } from '@/types';

export const mockAnalysisResult: DocumentAnalysis = {
  id: '1',
  fileName: 'resume.pdf',
  category: 'cv',
  status: 'completed',
  score: 85,
  strengths: [
    'Clear and professional formatting',
    'Strong use of action verbs',
    'Relevant work experience highlighted',
    'Appropriate length and structure'
  ],
  improvements: [
    'Add more quantifiable achievements',
    'Include relevant keywords for ATS',
    'Strengthen summary section',
    'Consider adding skills section'
  ],
  recommendations: [
    'Consider adding a 2-3 line professional summary at the top that highlights your key strengths and career objectives.',
    'Where possible, add specific numbers, percentages, or dollar amounts to demonstrate your impact (e.g., "Increased sales by 25%" instead of "Improved sales").',
    'Include industry-specific keywords and skills that are commonly searched for in your field to improve ATS compatibility.',
    'Continue using strong action verbs like "developed," "implemented," "led," and "achieved" to make your accomplishments more impactful.'
  ],
  createdAt: new Date(),
  completedAt: new Date()
};

export const mockOpenCalls: OpenCall[] = [
  {
    id: '1',
    title: 'International Artist Residency Program',
    organization: 'Berlin Art Institute',
    deadline: '2024-03-15',
    location: 'Berlin, Germany',
    type: 'residency',
    description: 'A 3-month residency program for emerging artists working in contemporary media.',
    url: 'https://example.com/residency1',
    tags: ['contemporary art', 'international', 'emerging artists'],
    source: '@opencallforartists_'
  },
  {
    id: '2',
    title: 'Young Artist Exhibition 2024',
    organization: 'Museum of Modern Art',
    deadline: '2024-02-28',
    location: 'New York, USA',
    type: 'exhibition',
    description: 'Annual exhibition showcasing works by artists under 35.',
    url: 'https://example.com/exhibition1',
    tags: ['exhibition', 'young artists', 'modern art'],
    source: '@artopencalls'
  },
  {
    id: '3',
    title: 'Digital Art Innovation Grant',
    organization: 'Tech Arts Foundation',
    deadline: '2024-04-10',
    location: 'San Francisco, USA',
    type: 'grant',
    description: 'Funding for artists exploring the intersection of technology and art.',
    url: 'https://example.com/grant1',
    tags: ['digital art', 'technology', 'innovation', 'grant'],
    source: '@opencalls_'
  },
  {
    id: '4',
    title: 'Photography Competition 2024',
    organization: 'World Photography Society',
    deadline: '2024-05-20',
    location: 'Online',
    type: 'competition',
    description: 'Annual competition for photographers of all levels.',
    url: 'https://example.com/competition1',
    tags: ['photography', 'competition', 'all levels'],
    source: '@opencallpalette'
  }
];

export function simulateAnalysis(): Promise<DocumentAnalysis> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAnalysisResult);
    }, 3000); // Simulate 3 second processing time
  });
} 