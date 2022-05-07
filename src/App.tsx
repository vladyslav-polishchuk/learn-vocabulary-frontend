import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container, Grid } from '@mui/material';
import Header from './components/header/Header';
import HomePage from './pages/Home';
import WordsPage from './pages/Words';
import BooksPage from './pages/Books';
import BookPage from './pages/Book';
import ProfilePage from './pages/Profile';
import NotFoundPage from './pages/NotFound';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ErrorBar from './components/ErrowBar';
import { useEffect } from 'react';
import { getCurrentUser } from './api';
import { useDispatch } from 'react-redux';
import { setUser } from './store/vocabularySlice';
import { useTranslation } from 'react-i18next';
import ScrollTopButton from './components/pure/ScrollTopButton';
import Spinner from './components/pure/Spinner';
import type { RootState } from './store';

export default function App() {
  const { status } = useSelector((state: RootState) => state.vocabulary);
  const dispatch = useDispatch();
  const setCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      dispatch(setUser(user));
    } catch (e) {}
  };

  useEffect(() => {
    setCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useTranslation();

  return (
    <BrowserRouter>
      <Grid container direction="column">
        <Grid item>
          <Header />
        </Grid>
        <Grid item sx={{ my: 5 }}>
          <Container sx={{ mt: '48px' }}>
            <ScrollTopButton />
            <ErrorBar />
          <Spinner loading={status === 'loading'} />

            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/words" element={<WordsPage />}></Route>
              <Route path="/books" element={<BooksPage />}></Route>
              <Route path="/books/:bookId" element={<BookPage />}></Route>
              <Route path="/profile" element={<ProfilePage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/register" element={<RegisterPage />}></Route>
              <Route path="*" element={<NotFoundPage />}></Route>
            </Routes>
          </Container>
        </Grid>
      </Grid>
    </BrowserRouter>
  );
}
