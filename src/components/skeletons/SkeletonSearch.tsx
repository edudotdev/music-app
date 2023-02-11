
export const SkeletonSearch = () => {

  return (
    <>
    {Array(5).fill('').map((i:number, index:number) => (
        <div key={index} className='relative w-auto rounded-xl overflow-hidden'>
          <div className='w-[400px] h-auto max-w-full aspect-square bg-neutral-600 animate-pulse'></div>
          <div className='h-20 p-4 w-full flex flex-col justify-between bg-neutral-800 '>
            <p className='h-4 lg:h-5 w-24 bg-neutral-700 animate-pulse'></p>
            <p className='h-4 lg:h-5 w-16 bg-neutral-700 animate-pulse'></p>
          </div>
        </div>
      ))}
    </>
  )
}
