
export const SkeletonSearch = () => {

  return (
    <>
    {Array(5).fill('').map((i:number, index:number) => (
        <div key={index} className='relative w-auto rounded-xl overflow-hidden'>
          <div className='w-[400px] h-auto max-w-full aspect-square bg-neutral-600 animate-pulse'></div>
          <div className='h-16 p-4 w-full flex flex-col justify-between bg-neutral-900/70 '>
            <p className='h-3 w-24 bg-neutral-600 animate-pulse'></p>
            <p className='h-3 w-16 bg-neutral-600 animate-pulse'></p>
          </div>
        </div>
      ))}
    </>
  )
}
