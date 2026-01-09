export const mockNotes = [
  {
    id: '1',
    title: 'Biology Chapter 3',
    content: 'Cell structure and functions. Key points: nucleus, mitochondria, cell membrane...',
    tags: ['Biology', 'Science'],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05')
  },
  {
    id: '2',
    title: 'Calculus Formulas',
    content: 'Important derivatives and integrals to remember for the exam...',
    tags: ['Math', 'Calculus'],
    createdAt: new Date('2024-01-04'),
    updatedAt: new Date('2024-01-06')
  },
  {
    id: '3',
    title: 'Spanish Vocabulary',
    content: 'Common verbs and phrases for conversation practice...',
    tags: ['Language', 'Spanish'],
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03')
  }
];

export const mockGoals = [
  {
    id: '1',
    description: 'Complete Chapter 5 by Friday',
    completed: false,
    deadline: new Date('2024-01-12'),
    createdAt: new Date('2024-01-08')
  },
  {
    id: '2',
    description: 'Review calculus formulas daily',
    completed: true,
    deadline: null,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '3',
    description: 'Finish biology lab report',
    completed: false,
    deadline: new Date('2024-01-10'),
    createdAt: new Date('2024-01-07')
  },
  {
    id: '4',
    description: 'Practice 10 Spanish verbs',
    completed: true,
    deadline: new Date('2024-01-09'),
    createdAt: new Date('2024-01-05')
  }
];

export const mockEvents = [
  {
    id: '1',
    title: 'Biology Midterm',
    subject: 'Biology',
    date: new Date('2024-01-15'),
    time: '10:00',
    color: 'science',
    reminder: true
  },
  {
    id: '2',
    title: 'Calculus Quiz',
    subject: 'Math',
    date: new Date('2024-01-12'),
    time: '14:00',
    color: 'math',
    reminder: true
  },
  {
    id: '3',
    title: 'Spanish Oral Exam',
    subject: 'Spanish',
    date: new Date('2024-01-18'),
    time: '09:00',
    color: 'language',
    reminder: true
  },
  {
    id: '4',
    title: 'History Essay Due',
    subject: 'History',
    date: new Date('2024-01-20'),
    time: '23:59',
    color: 'history',
    reminder: true
  }
];

export const availableTags = [
  'Biology',
  'Math',
  'Calculus',
  'Spanish',
  'Language',
  'Science',
  'History',
  'Chemistry',
  'Physics',
  'English',
  'Literature'
];