import {
  Card,
  CardHeader,
  CardActions,
  Stack,
  Tooltip,
  CardActionArea,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import { serverUrl } from '../settings';

interface BookCardProps {
  book: Book;
  onBookSelect: () => any;
}

export default function BookCard({ book, onBookSelect }: BookCardProps) {
  const title = (
    <Stack direction="row" spacing={1}>
      {book.name}
    </Stack>
  );
  const downloadUrl = `${serverUrl}/book?id=${book.hash}&download=true`;

  return (
    <Card>
      <CardActionArea onClick={onBookSelect}>
        <CardHeader title={title} />
        <CardActions disableSpacing>
          <Tooltip title="Share with others">
            <IconButton sx={{ ml: 'auto' }} component="span">
              <ShareIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download">
            <IconButton
              component="a"
              href={downloadUrl}
              download
              onClick={(e: any) => e.stopPropagation()}
            >
              <DownloadIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
