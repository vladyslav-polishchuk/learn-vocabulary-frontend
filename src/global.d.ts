interface Word {
  value: string;
  count?: number;
}

interface Book {
  name: string;
  hash: string;
  views: number;
  words: Word[];
}

interface User {
  email: string;
  token: string;
  language: string;
  learnedWords: string[];
}
