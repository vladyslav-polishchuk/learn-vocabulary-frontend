import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { serverUrl } from '../settings';

interface Credentials {
  email: string;
  password: string;
}

export interface User {
  email: string;
  token: string;
  learnedWords: string[];
}

export interface VocabularyState {
  selectedBook: Book | null;
  words: Word[];
  books: Book[];
  user: User | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: VocabularyState = {
  selectedBook: null,
  words: [],
  books: [],
  status: 'idle',
  user: null,
};

export const selectFile = createAsyncThunk(
  'vocabulary/selectFile',
  async (file: File) => {
    const formData = new FormData();
    formData.append('book', file);

    const response = await fetch(`${serverUrl}/book`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
    const selectedBook = await response.json();

    return { selectedBook };
  }
);

export const getWords = createAsyncThunk('vocabulary/getWords', async () => {
  const response = await fetch(`${serverUrl}/word`);
  const words = await response.json();

  return { words };
});

export const getBooks = createAsyncThunk('vocabulary/getBooks', async () => {
  const response = await fetch(`${serverUrl}/book`);
  const books = await response.json();

  return { books };
});

export const getBook = createAsyncThunk(
  'vocabulary/getBook',
  async (bookId: string) => {
    const queryParams = bookId ? `?id=${bookId}` : '';
    const response = await fetch(`${serverUrl}/book${queryParams}`);
    const selectedBook = await response.json();

    return { selectedBook };
  }
);

export const login = createAsyncThunk(
  'vocabulary/login',
  async ({ email, password }: Credentials) => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const response = await fetch(`${serverUrl}/login`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    const result = await response.json();
    return result;
  }
);

export const register = createAsyncThunk(
  'vocabulary/register',
  async ({ email, password }: Credentials) => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const response = await fetch(`${serverUrl}/register`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    const result = await response.json();
    return result;
  }
);

export const vocabularySlice = createSlice({
  name: 'vocabulary',
  initialState,
  reducers: {
    markAsLearned: (state, action) => {
      state.user?.learnedWords.push(action.payload);
    },
    removeFromLearned: (state, action) => {
      if (state.user) {
        state.user.learnedWords = state.user.learnedWords.filter(
          (word) => word !== action.payload
        );
      }
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

    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      });

    builder
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      });
  },
});

export const { markAsLearned, removeFromLearned } = vocabularySlice.actions;

export default vocabularySlice.reducer;
