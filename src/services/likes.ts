import localForage from "localforage"

export const getFavorites = async () => {
  const data = await localForage.getItem('likes').then((result:any) => {
    if (result === null) result = []
    return result
  })

  return data
}