import '../global.css'
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

      <title>Project GameHouse</title>
      <meta name="description" content="Projeto de loja de jogos com NextJS + React e API RAWG.io" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://punishedbacklog.com/wp-content/uploads/2025/04/Best-Video-Games-of-All-Time-Top-50-Video-Games-List-The-Punished-Backlog--2048x1106.png" />
    </Head>
    <Component {...pageProps} />
  </QueryClientProvider>
}
