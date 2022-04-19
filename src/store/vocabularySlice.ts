import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface User {
  learnedWords: string[];
}

export interface VocabularyState {
  selectedBook: Book | null;
  words: Word[];
  books: Book[];
  user: User;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: VocabularyState = {
  selectedBook: null,
  words: [],
  books: [],
  status: 'idle',
  user: {
    learnedWords: [
      'be',
      'am',
      'are',
      'been',
      'being',
      'is',
      'was',
      'were',
      'i',
      'you',
      'the',
      'a',
      'an',
      'to',
      'it',
      'no',
      'not',
      'that',
      'and',
    ],
  },
};

export const selectFile = createAsyncThunk(
  'vocabulary/selectFile',
  async (file: File) => {
    const formData = new FormData();
    formData.append('book', file);

    const response = await fetch('http://localhost:8080/book', {
      method: 'POST',
      body: formData,
    });
    const selectedBook = await response.json();

    return { selectedBook };
  }
);

export const getWords = createAsyncThunk('vocabulary/getWords', async () => {
  const response = await fetch(`http://localhost:8080/word`);
  const words = await response.json();

  return { words };
});

export const getBooks = createAsyncThunk('vocabulary/getBooks', async () => {
  const response = await fetch('http://localhost:8080/book');
  const books = await response.json();

  return { books };
});

export const getBook = createAsyncThunk(
  'vocabulary/getBook',
  async (bookId: string) => {
    const queryParams = bookId ? `?id=${bookId}` : '';
    const response = await fetch(`http://localhost:8080/book${queryParams}`);
    const selectedBook = await response.json();

    return { selectedBook };
  }
);

export const vocabularySlice = createSlice({
  name: 'vocabulary',
  initialState,
  reducers: {
    markAsLearned: (state, action) => {
      state.user.learnedWords.push(action.payload);
    },
    removeFromLearned: (state, action) => {
      state.user.learnedWords = state.user.learnedWords.filter(
        (word) => word !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectFile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(selectFile.fulfilled, (state, action) => {
        state.status = 'idle';
        state.books.push(action.payload.selectedBook);
      });

    builder
      .addCase(getWords.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getWords.fulfilled, (state, action) => {
        state.status = 'idle';
        state.words = action.payload.words;
      });

    builder
      .addCase(getBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.status = 'idle';
        state.books = action.payload.books;
      });

    builder
      .addCase(getBook.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBook.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedBook = action.payload.selectedBook;
      });
  },
});

export const { markAsLearned, removeFromLearned } = vocabularySlice.actions;

export default vocabularySlice.reducer;
