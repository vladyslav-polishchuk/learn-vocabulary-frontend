import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface VocabularyState {
  fileName: string;
  fileContent: string;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: VocabularyState = {
  fileName: '',
  fileContent: '',
  status: 'idle',
};

export const selectFile = createAsyncThunk(
  'counter/fetchCount',
  async (file: File) => {
    const fileName = file.name;
    const fileContent = await new Promise((resolve) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.readAsText(file);
    });
    return { fileName, fileContent };
  }
);

export const vocabularySlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(selectFile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(selectFile.fulfilled, (state, action) => {
        state.status = 'idle';
        state.fileName += action.payload.fileName;
        state.fileContent += action.payload.fileContent;
      });
  },
});

export default vocabularySlice.reducer;
