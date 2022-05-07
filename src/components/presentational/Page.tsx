import { ReactNode } from 'react';
import { Helmet } from 'react-helmet';

interface PageProps {
  title: string;
  children: ReactNode | ReactNode[];
}

export default function Page({ title, children }: PageProps) {
  return (
    <>
      <Helmet>
        <title>Bookabulary | {title}</title>
      </Helmet>

      {children}
    </>
  );
}
