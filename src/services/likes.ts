import localForage from "localforage"

export const getFavorites = async () => {
  const data = await localForage.getItem('likedSongs').then((result:any) => {
    if (result === null) result = []
    return result
  })

  return data
}