// streamingScraper.js

import puppeteer from 'puppeteer';

export const scrapeStreamingData = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Scrape prices from moneyland.ch
  await page.goto('https://www.moneyland.ch/de/guenstig-video-streaming-schweiz', { waitUntil: 'domcontentloaded' });

  let data = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('table tbody tr'));
    const providersToInclude = ['Netflix Standard', 'Amazon Prime Video', 'Apple TV Plus', 'Disney Plus Standard'];

    return rows.map(row => {
      const columns = row.querySelectorAll('td');
      const name = columns[0]?.innerText.trim();
      const price = columns[1]?.innerText.trim().replace('CHF ', '');

      if (providersToInclude.includes(name)) {
        return {
          name,
          price,
        };
      } else {
        return null;
      }
    }).filter(provider => provider !== null); // Filter to exclude non-matching rows
  });

  // Manually add Blue+ data
  data.push({
    name: 'Blue+',
    price: '19.90', // Example price, replace with actual data if needed
  });

  console.log('Scraped Price Data:', data);

  // Manually add additional data
  const additionalData = [
    {
      name: 'Netflix Standard',
      films: 4556 ,
      series: 2314 ,
      rating: 3,
    },
    {
      name: 'Amazon Prime Video',
      films: 5748,
      series: 1270 ,
      rating: 2.6,
    },
    {
      name: 'Apple TV Plus',
      films: 100,
      series: 70,
      rating: 2.8,
    },
    {
      name: 'Disney Plus Standard',
      films: 1000,
      series: 350,
      rating: 3.2,
    },
    {
      name: 'Blue+',
      films: 8000,
      series: 2000,
      rating: 5,
    },
  ];

  console.log('Additional Data:', additionalData);

  // Merge the data based on the provider name
  data = data.map(provider => {
    const additionalInfo = additionalData.find(item => item.name === provider.name);
    if (additionalInfo) {
      return {
        ...provider,
        films: additionalInfo.films,
        series: additionalInfo.series,
        rating: additionalInfo.rating,
      };
    } else {
      return provider;
    }
  });

  console.log('Merged Data:', data);

  await browser.close();
  return data;
};

