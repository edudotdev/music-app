import axios from 'axios';
import { kvService } from '@/services/kvService';

export interface Song {
  id: string;
  music: string;
  image: string;
  artist: string;
  title: string;
}

export const searchSong = async (query: string) => {
  console.log("searchSong dynamic query:", query);
  
  const cacheKey = `s-${query.toLowerCase().trim()}`;

  try {
    const cachedData = await kvService.get<{ songs: Song[] }>(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    console.log("🌐 Cache miss. Fetching data from Shazam API...", query);

    const options = {
      method: 'GET',
      url: 'https://shazam.p.rapidapi.com/v2/search',
      params: {
        term: query,
        locale: 'en-US',
        offset: '0',
        limit: '5'
      },
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY as string,
        'x-rapidapi-host': 'shazam.p.rapidapi.com',
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.request(options);
    
    const songsData = response.data?.results?.songs?.data;

    const cleanData: Song[] = songsData?.map((item: any) => {
      const { id } = item;
      const { name, artistName, artwork, previews } = item.attributes;

      return {
        id: id || '',
        music: previews?.[0]?.url || '',
        image: artwork?.url ? artwork.url.replace('{w}', '400').replace('{h}', '400') : '',
        artist: artistName || '',
        title: name || ''
      };
    }) || [];

    const result = { songs: cleanData };

    await kvService.set(cacheKey, result, 86400);

    return result;

  } catch (error) {
    console.error("Error in searchSong service:", error);
    return { songs: [] };
  }
};