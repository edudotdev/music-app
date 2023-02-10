import { MagnifyingGlass } from "phosphor-react";
import { searchSong } from '@/services/search'
import { CardSong } from "@/components/molecules";


export default async function Search ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  const query = searchParams?.song as string

  const {songs} = await searchSong(query)

  console.log(query)

  return (
    <>
      <h2 className='flex gap-5 text-neutral-100 font-bold text-4xl'>
        {/* <MagnifyingGlass size={40} color="#dbeafe" weight="fill" /> */}
        <span className='text-blue-100'>Search - <span className='text-blue-300'>{query}</span></span>
      </h2>
      <div className='grid gap-10 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
      {songs?.map((song:any) => ((
          <div key={song.id}>
            <CardSong song={song} />
          </div>
        )))}
      </div>
</>
  )
}