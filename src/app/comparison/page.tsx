// comparison/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Comparison.module.css';
import '../styles/globals.css';
import ComparisonChart from '../../components/ComparisonChart';
import ProviderPieChart from '../../components/ProviderPieChart';

const Comparison = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/streaming-services');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Data from API:', data); // Debug-Log
        setData(data);
      } catch (error) {
        setError('Fehler beim Laden der Daten: ' + error.message);
      }
    };

    fetchData();
  }, []);

  if (error) return <div>{error}</div>;
  if (!data) return <div>Lädt...</div>;

  return (
    <div className={styles.container}>
      <Head>
        <title>Streaming Comparison</title>
      </Head>
      <main className={styles.main}>
        <h2 className={styles.subtitle}>Vergleichstabelle</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Anbieter</th>
              <th>Filme</th>
              <th>Serien</th>
              <th>Preis</th>
              <th>Bewertung</th>
              <th>Score*</th>
            </tr>
          </thead>
          <tbody>
            {data.map(provider => (
              <tr key={provider.name}>
                <td>{provider.name}</td>
                <td>{provider.films}</td>
                <td>{provider.series}</td>
                <td>CHF {provider.price}</td>
                <td>{provider.rating}</td>
                <td>{provider.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className={styles.explanation}>
          <strong>*Berechnung des Scores</strong><br />
          Der Gesamtscore eines Streaming-Dienstes wird anhand der folgenden Kriterien berechnet:<br />
          • Anzahl der Filme: 35% Gewichtung. Jeder Film trägt 0.35 Punkte zum Gesamtscore bei.<br />
          • Anzahl der Serien: 35% Gewichtung. Jede Serie trägt 0.35 Punkte zum Gesamtscore bei.<br />
          • Preis: 20% Gewichtung. Der Preis wird von 30 abgezogen und mit 0.2 multipliziert, wobei niedrigere Preise höhere Scores erzielen.<br />
          • Bewertung: 10% Gewichtung. Jede Bewertungseinheit trägt 0.1 Punkte zum Gesamtscore bei.<br />
        </p>
        <h2 className={styles.subtitle}>Visualisierte Daten</h2>
        <ComparisonChart data={data} />
        <div className={styles.pieChartsContainer}>
          {data.map(provider => (
            <ProviderPieChart key={provider.name} provider={provider} />
          ))}
        </div>
        <Link href="/" className={styles.button}>Zurück zur Übersicht</Link>
      </main>
    </div>
  );
};

export default Comparison;
