import type { Word } from '../store/vocabularySlice';

const alphabeth = new Set([
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '-',
  "'",
]);

export default async function getWordsByFrequency(file: File): Promise<Word[]> {
  const fileContent = await new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.readAsText(file);
  });

  if (!fileContent || typeof fileContent !== 'string') return [];

  const lowerCaseText = fileContent.toLowerCase();

  const allWords = [];
  let currentWord = '';
  for (let char of lowerCaseText) {
    if (alphabeth.has(char)) {
      currentWord += char;
    } else {
      if (
        currentWord.length > 1 &&
        currentWord.length < 15 &&
        !parseInt(currentWord)
      ) {
        allWords.push(currentWord);
      }

      currentWord = '';
    }
  }

  const wordsByFrequencyMap = new Map<string, number>();
  allWords.forEach((word) => {
    const wordFrequency = wordsByFrequencyMap.get(word) ?? 0;
    wordsByFrequencyMap.set(word, wordFrequency + 1);
  });

  const result = [...wordsByFrequencyMap.keys()].sort(
    (a, b) =>
      (wordsByFrequencyMap.get(b) || 0) - (wordsByFrequencyMap.get(a) || 0)
  );

  return result.slice(0, 500).map((value) => ({
    value,
    frequency: wordsByFrequencyMap.get(value) ?? 1,
  }));
}
