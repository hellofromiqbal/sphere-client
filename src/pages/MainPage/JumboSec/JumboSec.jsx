import { TbSphere } from "react-icons/tb"

const JumboSec = () => {
  return (
    <section className='h-[60vh] md:h-[45vh] lg:h-[70vh] bg-yellow-400 px-6 md:px-10 lg:px-20 flex items-center relative overflow-hidden'>
      <div className="flex flex-col gap-4">
        <h1 className="text-6xl md:text-7xl font-semibold">Stay Curious.</h1>
        <p className="w-[90%]">Discover stories, thinking, and expertise from writers on any topic.</p>
        <button className="bg-black text-white mt-4 py-2 px-6 rounded-full w-max">Start reading</button>
      </div>
      <TbSphere className='absolute -top-40 md:-right-[26rem] lg:-right-40 md:w-[800px] md:h-[800px] rounded-full bg-blue-500 text-yellow-400'/>
    </section>
  )
}

export default JumboSec