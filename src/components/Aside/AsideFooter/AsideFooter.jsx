import { Link } from 'react-router-dom'

const AsideFooter = () => {
  return (
    <footer className="mt-4 pt-4 border-t hidden lg:block">
      <ul className="flex flex-row flex-wrap gap-x-6 gap-y-2">
        <Link to={"#"} className="text-sm opacity-70">Help</Link>
        <Link to={"#"} className="text-sm opacity-70">Status</Link>
        <Link to={"#"} className="text-sm opacity-70">About</Link>
        <Link to={"#"} className="text-sm opacity-70">Careers</Link>
        <Link to={"#"} className="text-sm opacity-70">Blog</Link>
        <Link to={"#"} className="text-sm opacity-70">Privacy</Link>
        <Link to={"#"} className="text-sm opacity-70">Terms</Link>
        <Link to={"#"} className="text-sm opacity-70">Text to speech</Link>
        <Link to={"#"} className="text-sm opacity-70">Teams</Link>
      </ul>
    </footer>
  )
}

export default AsideFooter