import axios from "axios"

export const getCountryCode = () => {
  const code = axios.get(`https://geo.ipify.org/api/v1?apiKey=${process.env.GEO_KEY}`)
  .then(res =>  res?.data?.location?.country)
  .catch(error => console.log(error))

  return code
}