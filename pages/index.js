import Head from 'next/head';
import Sidebar from '../components/Sidebar';

export default function Home() {
  return (
    <div className="bg-black h-screen">
      <Head>
        <title>Spotify 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Sidebar />
        {/* center */}
      </main>
      <div>{/* player */}</div>
    </div>
  );
}
