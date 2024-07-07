// pages/api/streaming-services.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { scrapeStreamingData } from '../../src/app/scrapers/streamingScraper';

const calculateScores = (data) => {
  return data.map(service => {
    const filmScore = service.films * 0.35;
    const seriesScore = service.series * 0.35;
    const priceScore = (20 - parseFloat(service.price)) * 0.2;
    const ratingScore = service.rating * 0.1;

    const totalScore = filmScore + seriesScore + priceScore + ratingScore;

    return {
      ...service,
      score: totalScore.toFixed(2)
    };
  });
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await scrapeStreamingData();
    console.log('Data from scraper:', data); // Debug-Log
    let scoredData = calculateScores(data);
    console.log('Scored Data:', scoredData); // Debug-Log

    scoredData = scoredData.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));

    res.status(200).json(scoredData);
  } catch (error) {
    console.error('Error fetching data:', error); // Debug-Log
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};
