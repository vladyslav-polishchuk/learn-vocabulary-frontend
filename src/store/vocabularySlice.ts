import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getWordsByFrequency from '../businessLogic/getWordsByFrequency';

export interface Word {
  value: string;
  frequency: number;
}

export interface VocabularyState {
  fileName: string;
  words: Word[];
  selectedWord: Word | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: VocabularyState = {
  fileName: '',
  words: [],
  selectedWord: null,
  status: 'idle',
};

export const selectFile = createAsyncThunk(
  'vocabulary/selectFile',
  async (file: File) => {
    const fileName = file.name;
    const words = await getWordsByFrequency(file);

    return { fileName, words };
  }
);

export const vocabularySlice = createSlice({
  name: 'vocabulary',
  initialState,
  reducers: {
    selectWord: (state, action) => {
      state.selectedWord = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectFile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(selectFile.fulfilled, (state, action) => {
        state.status = 'idle';
        state.fileName = action.payload.fileName;
        state.words = action.payload.words;
      });
  },
});

export const { selectWord } = vocabularySlice.actions;

export default vocabularySlice.reducer;
