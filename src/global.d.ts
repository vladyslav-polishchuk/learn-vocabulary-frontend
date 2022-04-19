interface Word {
  value: string;
  count?: number;
}

interface Book {
  name: string;
  hash: string;
  words: Word[];
}
