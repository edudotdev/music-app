export type TRACK = {
  id: string
  music: string,
  image: string,
  title: string,
  artist: string
}

export type PLAYLIST = {
  uuid: string
  name: string,
  song: TRACK[]
}

export type TEXTINFO = {
  text: string,
  active: boolean
}

export type REPEAT = 'inactive' | 'repeat' | 'repeatOnce' 