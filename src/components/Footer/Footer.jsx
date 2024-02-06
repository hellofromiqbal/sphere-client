import { TbSphere } from "react-icons/tb"
import { Link } from "react-router-dom"
import { IoLogoGooglePlaystore,IoLogoApple } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-4 lg:hidden px-6 pt-4 md:py-5 pb-10 md:px-10 lg:px-20 bg-black text-white">
      <Link to="/" className="text-2xl font-bold flex">
        <TbSphere className='bg-yellow-400 text-black rounded-full'/>
        <span className='-ms-1'>Sphere</span>
      </Link>
      <ul className="flex gap-4 border-b md:border-none pb-4">
        <li className="text-sm"><a href="#">About</a></li>
        <li className="text-sm"><a href="#">Help</a></li>
        <li className="text-sm"><a href="#">Terms</a></li>
        <li className="text-sm"><a href="#">Privacy</a></li>
      </ul>
      <div className="flex md:hidden flex-col gap-4">
        <h4 className="font-bold">Get the Sphere app</h4>
        <div className="flex gap-4">
          <IoLogoGooglePlaystore className="w-[25px] h-[25px]"/>
          <IoLogoApple className="w-[25px] h-[25px]"/>
        </div>
      </div>
    </footer>
  )
}

export default Footer