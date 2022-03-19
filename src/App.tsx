import { Grid } from '@mui/material';
import Header from './components/Header';

export default function App() {
  return (
    <Grid container direction="column">
      <Grid item>
        <Header />
      </Grid>
      <Grid item>Test Content</Grid>
    </Grid>
  );
}
