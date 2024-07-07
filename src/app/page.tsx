// page.tsx

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import './styles/globals.css';
import styles from './styles/Home.module.css';

const streamingProviders = [
  { name: 'Netflix', logo: '/images/netflix.png', url: 'https://www.netflix.com' },
  { name: 'Amazon Prime Video', logo: '/images/prime-video.svg', url: 'https://www.primevideo.com' },
  { name: 'Apple TV+', logo: '/images/apple-tv.png', url: 'https://tv.apple.com' },
  { name: 'Disney+', logo: '/images/disney.jfif', url: 'https://www.disneyplus.com' },
  { name: 'blue+', logo: '/images/blue+.png', url: 'https://www.blueplus.ch' },
];

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Streaming Comparison</title>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Vergleichsportal für Streamingdienste</h1>
        <p className={styles.subtitle}>Finde den richtigen Streamingdienst</p>
        <Link href="/comparison" className={`${styles.button} ${styles.largeButton}`}>Jetzt vergleichen...</Link>
        <div className={styles.grid}>
          {streamingProviders.map(provider => (
            <div key={provider.name} className={styles.card}>
              <Image src={provider.logo} alt={`${provider.name} logo`} className={styles.logo} width={250} height={250} />
              <h3>{provider.name}</h3>
              <Link href={provider.url} legacyBehavior>
                <a className={styles.button} target="_blank" rel="noopener noreferrer">Zur Webseite</a>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
