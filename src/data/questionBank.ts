export interface Question {
  id: string;
  question: string;
  answer: string;
  subject: 'math' | 'physics' | 'chemistry' | 'biology' | 'english' | 'history';
  grade: number;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

export const questionBank: Question[] = [
  // MATH QUESTIONS
  // Grade 1-3 Math
  { id: 'math_001', question: 'What is 5 + 3?', answer: '8', subject: 'math', grade: 1, difficulty: 'easy', points: 10 },
  { id: 'math_002', question: 'What is 12 - 7?', answer: '5', subject: 'math', grade: 1, difficulty: 'easy', points: 10 },
  { id: 'math_003', question: 'What is 4 × 3?', answer: '12', subject: 'math', grade: 2, difficulty: 'easy', points: 15 },
  { id: 'math_004', question: 'What is 15 ÷ 3?', answer: '5', subject: 'math', grade: 2, difficulty: 'easy', points: 15 },
  { id: 'math_005', question: 'What is half of 16?', answer: '8', subject: 'math', grade: 3, difficulty: 'medium', points: 20 },

  // Grade 4-6 Math
  { id: 'math_006', question: 'What is 25% of 80?', answer: '20', subject: 'math', grade: 4, difficulty: 'medium', points: 25 },
  { id: 'math_007', question: 'What is the area of a rectangle with length 8 and width 5?', answer: '40 square units', subject: 'math', grade: 5, difficulty: 'medium', points: 30 },
  { id: 'math_008', question: 'If x + 7 = 15, what is x?', answer: '8', subject: 'math', grade: 6, difficulty: 'medium', points: 35 },
  { id: 'math_009', question: 'What is the perimeter of a square with side length 6?', answer: '24', subject: 'math', grade: 4, difficulty: 'medium', points: 25 },
  { id: 'math_010', question: 'Convert 3/4 to a decimal', answer: '0.75', subject: 'math', grade: 5, difficulty: 'medium', points: 30 },

  // Grade 7-9 Math
  { id: 'math_011', question: 'What is the square root of 144?', answer: '12', subject: 'math', grade: 7, difficulty: 'medium', points: 40 },
  { id: 'math_012', question: 'Solve: 2x + 3 = 11', answer: 'x = 4', subject: 'math', grade: 8, difficulty: 'medium', points: 45 },
  { id: 'math_013', question: 'What is the slope of the line y = 3x + 2?', answer: '3', subject: 'math', grade: 9, difficulty: 'hard', points: 50 },
  { id: 'math_014', question: 'Find the value of x: 3x² = 27', answer: 'x = ±3', subject: 'math', grade: 9, difficulty: 'hard', points: 50 },
  { id: 'math_015', question: 'What is the circumference of a circle with radius 7? (Use π ≈ 3.14)', answer: '43.96', subject: 'math', grade: 8, difficulty: 'medium', points: 45 },

  // Grade 10-12 Math
  { id: 'math_016', question: 'What is the derivative of x³?', answer: '3x²', subject: 'math', grade: 11, difficulty: 'hard', points: 60 },
  { id: 'math_017', question: 'Solve the quadratic equation: x² - 5x + 6 = 0', answer: 'x = 2 or x = 3', subject: 'math', grade: 10, difficulty: 'hard', points: 55 },
  { id: 'math_018', question: 'What is sin(30°)?', answer: '1/2 or 0.5', subject: 'math', grade: 11, difficulty: 'hard', points: 60 },
  { id: 'math_019', question: 'Find the integral of 2x', answer: 'x² + C', subject: 'math', grade: 12, difficulty: 'hard', points: 65 },
  { id: 'math_020', question: 'What is log₁₀(100)?', answer: '2', subject: 'math', grade: 10, difficulty: 'hard', points: 55 },

  // PHYSICS QUESTIONS
  // Grade 6-8 Physics
  { id: 'physics_001', question: 'What is the unit of force?', answer: 'Newton (N)', subject: 'physics', grade: 6, difficulty: 'easy', points: 20 },
  { id: 'physics_002', question: 'What is the speed of light in vacuum?', answer: '3 × 10⁸ m/s', subject: 'physics', grade: 7, difficulty: 'medium', points: 35 },
  { id: 'physics_003', question: 'What is the acceleration due to gravity on Earth?', answer: '9.8 m/s²', subject: 'physics', grade: 8, difficulty: 'medium', points: 40 },
  { id: 'physics_004', question: 'State Newton\'s first law of motion', answer: 'An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force', subject: 'physics', grade: 8, difficulty: 'medium', points: 40 },
  { id: 'physics_005', question: 'What is the formula for kinetic energy?', answer: 'KE = ½mv²', subject: 'physics', grade: 8, difficulty: 'medium', points: 40 },

  // Grade 9-10 Physics
  { id: 'physics_006', question: 'What is Ohm\'s law?', answer: 'V = IR (Voltage = Current × Resistance)', subject: 'physics', grade: 9, difficulty: 'medium', points: 45 },
  { id: 'physics_007', question: 'What is the unit of electric current?', answer: 'Ampere (A)', subject: 'physics', grade: 9, difficulty: 'easy', points: 30 },
  { id: 'physics_008', question: 'What is the formula for power?', answer: 'P = VI or P = I²R or P = V²/R', subject: 'physics', grade: 10, difficulty: 'medium', points: 50 },
  { id: 'physics_009', question: 'What is the relationship between frequency and wavelength?', answer: 'c = fλ (speed = frequency × wavelength)', subject: 'physics', grade: 10, difficulty: 'hard', points: 55 },
  { id: 'physics_010', question: 'What is momentum?', answer: 'p = mv (momentum = mass × velocity)', subject: 'physics', grade: 9, difficulty: 'medium', points: 45 },

  // Grade 11-12 Physics
  { id: 'physics_011', question: 'What is Einstein\'s mass-energy equivalence formula?', answer: 'E = mc²', subject: 'physics', grade: 11, difficulty: 'hard', points: 60 },
  { id: 'physics_012', question: 'What is the uncertainty principle?', answer: 'ΔxΔp ≥ ℏ/2 (position and momentum cannot both be precisely known)', subject: 'physics', grade: 12, difficulty: 'hard', points: 65 },
  { id: 'physics_013', question: 'What is the photoelectric effect?', answer: 'Light can eject electrons from a material surface, showing light\'s particle nature', subject: 'physics', grade: 12, difficulty: 'hard', points: 65 },
  { id: 'physics_014', question: 'What is Coulomb\'s law?', answer: 'F = kq₁q₂/r² (force between charges)', subject: 'physics', grade: 11, difficulty: 'hard', points: 60 },
  { id: 'physics_015', question: 'What is the Doppler effect?', answer: 'The change in frequency of a wave due to relative motion between source and observer', subject: 'physics', grade: 11, difficulty: 'hard', points: 60 },

  // CHEMISTRY QUESTIONS
  // Basic Chemistry
  { id: 'chem_001', question: 'What is the chemical symbol for water?', answer: 'H₂O', subject: 'chemistry', grade: 6, difficulty: 'easy', points: 20 },
  { id: 'chem_002', question: 'What is the atomic number of carbon?', answer: '6', subject: 'chemistry', grade: 7, difficulty: 'easy', points: 25 },
  { id: 'chem_003', question: 'What is the pH of pure water?', answer: '7', subject: 'chemistry', grade: 8, difficulty: 'medium', points: 35 },
  { id: 'chem_004', question: 'What gas makes up about 78% of Earth\'s atmosphere?', answer: 'Nitrogen', subject: 'chemistry', grade: 7, difficulty: 'easy', points: 25 },
  { id: 'chem_005', question: 'What is the chemical formula for table salt?', answer: 'NaCl', subject: 'chemistry', grade: 8, difficulty: 'easy', points: 30 },

  // Advanced Chemistry
  { id: 'chem_006', question: 'What is Avogadro\'s number?', answer: '6.022 × 10²³', subject: 'chemistry', grade: 10, difficulty: 'hard', points: 50 },
  { id: 'chem_007', question: 'What is the molecular geometry of methane (CH₄)?', answer: 'Tetrahedral', subject: 'chemistry', grade: 11, difficulty: 'hard', points: 55 },
  { id: 'chem_008', question: 'What is the ideal gas law equation?', answer: 'PV = nRT', subject: 'chemistry', grade: 11, difficulty: 'hard', points: 55 },
  { id: 'chem_009', question: 'What is an oxidation reaction?', answer: 'A reaction where a substance loses electrons', subject: 'chemistry', grade: 10, difficulty: 'medium', points: 45 },
  { id: 'chem_010', question: 'What is the electron configuration of oxygen?', answer: '1s² 2s² 2p⁴', subject: 'chemistry', grade: 11, difficulty: 'hard', points: 55 },

  // BIOLOGY QUESTIONS
  // Basic Biology
  { id: 'bio_001', question: 'What is the powerhouse of the cell?', answer: 'Mitochondria', subject: 'biology', grade: 6, difficulty: 'easy', points: 20 },
  { id: 'bio_002', question: 'What process do plants use to make food?', answer: 'Photosynthesis', subject: 'biology', grade: 7, difficulty: 'easy', points: 25 },
  { id: 'bio_003', question: 'What is DNA an abbreviation for?', answer: 'Deoxyribonucleic acid', subject: 'biology', grade: 8, difficulty: 'medium', points: 35 },
  { id: 'bio_004', question: 'How many chambers does a human heart have?', answer: '4 (four)', subject: 'biology', grade: 7, difficulty: 'easy', points: 25 },
  { id: 'bio_005', question: 'What is the basic unit of life?', answer: 'Cell', subject: 'biology', grade: 6, difficulty: 'easy', points: 20 },

  // Advanced Biology
  { id: 'bio_006', question: 'What is the process of cell division called?', answer: 'Mitosis (or Meiosis for gametes)', subject: 'biology', grade: 9, difficulty: 'medium', points: 40 },
  { id: 'bio_007', question: 'What is the central dogma of molecular biology?', answer: 'DNA → RNA → Protein', subject: 'biology', grade: 11, difficulty: 'hard', points: 55 },
  { id: 'bio_008', question: 'What is natural selection?', answer: 'The process by which organisms with favorable traits survive and reproduce', subject: 'biology', grade: 10, difficulty: 'medium', points: 45 },
  { id: 'bio_009', question: 'What are the base pairs in DNA?', answer: 'A-T and G-C (Adenine-Thymine, Guanine-Cytosine)', subject: 'biology', grade: 10, difficulty: 'medium', points: 45 },
  { id: 'bio_010', question: 'What is ATP?', answer: 'Adenosine triphosphate - the energy currency of cells', subject: 'biology', grade: 11, difficulty: 'hard', points: 55 },

  // ENGLISH QUESTIONS
  // Grammar & Literature
  { id: 'eng_001', question: 'What is a noun?', answer: 'A word that names a person, place, thing, or idea', subject: 'english', grade: 3, difficulty: 'easy', points: 15 },
  { id: 'eng_002', question: 'Who wrote "Romeo and Juliet"?', answer: 'William Shakespeare', subject: 'english', grade: 9, difficulty: 'medium', points: 40 },
  { id: 'eng_003', question: 'What is an adjective?', answer: 'A word that describes or modifies a noun', subject: 'english', grade: 4, difficulty: 'easy', points: 20 },
  { id: 'eng_004', question: 'What is the past tense of "go"?', answer: 'Went', subject: 'english', grade: 5, difficulty: 'easy', points: 25 },
  { id: 'eng_005', question: 'What is alliteration?', answer: 'The repetition of initial consonant sounds in words', subject: 'english', grade: 7, difficulty: 'medium', points: 35 },

  // Advanced English
  { id: 'eng_006', question: 'What is a metaphor?', answer: 'A figure of speech that compares two unlike things without using "like" or "as"', subject: 'english', grade: 8, difficulty: 'medium', points: 35 },
  { id: 'eng_007', question: 'Who wrote "To Kill a Mockingbird"?', answer: 'Harper Lee', subject: 'english', grade: 10, difficulty: 'medium', points: 45 },
  { id: 'eng_008', question: 'What is the difference between "your" and "you\'re"?', answer: '"Your" is possessive, "you\'re" is a contraction for "you are"', subject: 'english', grade: 6, difficulty: 'medium', points: 30 },
  { id: 'eng_009', question: 'What is personification?', answer: 'Giving human characteristics to non-human things', subject: 'english', grade: 7, difficulty: 'medium', points: 35 },
  { id: 'eng_010', question: 'What is iambic pentameter?', answer: 'A poetic meter with five feet per line, each foot having an unstressed followed by a stressed syllable', subject: 'english', grade: 11, difficulty: 'hard', points: 55 }
];

export const getQuestionsByGrade = (grade: number): Question[] => {
  return questionBank.filter(q => q.grade === grade);
};

export const getQuestionsBySubject = (subject: string): Question[] => {
  return questionBank.filter(q => q.subject === subject);
};

export const getRandomQuestion = (grade?: number, subject?: string): Question => {
  let filteredQuestions = questionBank;
  
  if (grade) {
    filteredQuestions = filteredQuestions.filter(q => q.grade === grade);
  }
  
  if (subject) {
    filteredQuestions = filteredQuestions.filter(q => q.subject === subject);
  }
  
  const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
  return filteredQuestions[randomIndex];
};

export const subjects = [
  { id: 'math', name: 'Mathematics', icon: '🧮', color: 'bg-blue-500' },
  { id: 'physics', name: 'Physics', icon: '⚡', color: 'bg-purple-500' },
  { id: 'chemistry', name: 'Chemistry', icon: '🧪', color: 'bg-green-500' },
  { id: 'biology', name: 'Biology', icon: '🧬', color: 'bg-emerald-500' },
  { id: 'english', name: 'English', icon: '📚', color: 'bg-orange-500' },
  { id: 'history', name: 'History', icon: '🏛️', color: 'bg-yellow-500' }
];