import axios from 'axios'
import Redis from 'ioredis'

let redis = new Redis(process.env.UPSTASH_REDIS_REST_URL as string);

export const searchSong = async (query:string) => {
  const data = await redis.get(`search-${query}`, (err:any, result:any) => {
    if (result !== null) return JSON.parse(result)
  });

  if (data !== null) return JSON.parse(data)

  const options = {
    method: 'GET',
    url: 'https://shazam.p.rapidapi.com/search',
    params: {term: query, locale: 'en-US', offset: '0', limit: '10'},
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY as string,
      'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
    }
  };

  const dataAxios = axios.request(options).then(function (response) {
    let cleanData:any = []
    const {tracks} = response.data
  
    tracks.hits.map((hit:any) => {
      const {hub, images, title, subtitle, key} = hit.track

      cleanData.push({
        id:key,
        music: hub.actions[1].uri,
        image: images.coverart,
        artist: subtitle,
        title
      })  
    })
    
    redis.set(`search-${query}`, JSON.stringify({songs: cleanData}))
    return {songs: cleanData}
  }).catch(function (error) {
    console.error(error);
  });
  
  return dataAxios
}