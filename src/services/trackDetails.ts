import axios from 'axios'
import Redis from 'ioredis'

let redis = new Redis(process.env.UPSTASH_REDIS_REST_URL as string);

export const trackDetails = async (query:string) => {
  const data = await redis.get(`track-${query}`, (err:any, result:any) => {
    if (result !== null) return JSON.parse(result)
  });

  if (data !== null) return JSON.parse(data)

  const options = {
    method: 'GET',
    url: 'https://shazam.p.rapidapi.com/songs/v2/get-details',
    params: {
      id: query,
      l: 'en-US'
    },
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY as string,
      'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
    }
  };
  

  const dataAxios = axios.request(options).then(function (response) {
    let cleanData:any = {}

    const { id } = response.data.data[0]
    const { attributes } = response.data.data[0]
    const {albumName, durationInMillis, releaseDate, composerName, previews, artwork, artistName, name} = attributes
    const urlImg = artwork.url
    const width = '400', height = '400';
    
    const fixUrlImg = urlImg.replace('{w}', width).replace('{h}', height);

    cleanData = {
      id,
      music: previews[0].url,
      album: albumName,
      duration: durationInMillis,
      releaseDate: releaseDate,
      composer: composerName,
      image: fixUrlImg,
      artist: artistName,
      name
    }
    
    redis.set(`track-${query}`, JSON.stringify(cleanData))
    return cleanData
  }).catch(function (error) {
    console.error(error);
  });
  
  return dataAxios
}