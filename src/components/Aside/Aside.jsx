import { Link } from "react-router-dom"
import AsideFooter from "./AsideFooter/AsideFooter"

const Aside = () => {
  return (
    <aside className="flex flex-col lg:sticky lg:top-14 p-6 md:p-10 lg:px-20 lg:py-10 border-b lg:border-none">
      <div className="flex flex-col gap-4">
        <h3 className="font-semibold">Discover more of what matters to you</h3>
        <ul className="flex flex-row flex-wrap gap-2">
          <Link to={"#"} className="bg-slate-100 px-4 py-2 rounded-full text-sm">Programming</Link>
          <Link to={"#"} className="bg-slate-100 px-4 py-2 rounded-full text-sm">Data Science</Link>
          <Link to={"#"} className="bg-slate-100 px-4 py-2 rounded-full text-sm">Technology</Link>
          <Link to={"#"} className="bg-slate-100 px-4 py-2 rounded-full text-sm">Self Improvement</Link>
          <Link to={"#"} className="bg-slate-100 px-4 py-2 rounded-full text-sm">Writing</Link>
          <Link to={"#"} className="bg-slate-100 px-4 py-2 rounded-full text-sm">Relationships</Link>
          <Link to={"#"} className="bg-slate-100 px-4 py-2 rounded-full text-sm">Machine Learning</Link>
          <Link to={"#"} className="bg-slate-100 px-4 py-2 rounded-full text-sm">Productivity</Link>
          <Link to={"#"} className="bg-slate-100 px-4 py-2 rounded-full text-sm">Politics</Link>
        </ul>
        <Link to={"#"} className="text-sm font-semibold text-green-500 hover:text-green-600">See more topics</Link>
      </div>
      <AsideFooter/>
    </aside>
  )
}

export default Aside