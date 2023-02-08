import axios from 'axios'
import Redis from 'ioredis'

let redis = new Redis(process.env.UPSTASH_REDIS_REST_URL as string);

export const discover = async () => {
  const data = await redis.get('discover', (err:any, result:any) => {
    if (result !== null) return JSON.parse(result)
  });

  if (data !== null) return JSON.parse(data)

  const options = {
    method: 'GET',
    url: 'https://shazam-core.p.rapidapi.com/v1/charts/world',
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY_TWO,
      'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
    }
  };
  

  const dataAxios = axios.request(options).then(function (response) {
    let cleanData:any = []
  
    response.data.map((hit:any, index: number) => {
      const {hub, images, title, subtitle, key} = hit
      console.log(index)

      if(hub.actions === undefined) return

      cleanData.push({
        id:key,
        music: hub.actions[1].uri,
        image: images.coverart,
        artist: subtitle,
        title
      })  
    })
    redis.set('discover', JSON.stringify({discover:cleanData}))
    return {discover:cleanData}
  }).catch(function (error) {
    console.error(error);
  });
  
  return dataAxios
}