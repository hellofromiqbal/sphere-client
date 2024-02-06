/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

/* eslint-disable react/no-unescaped-entities */
const TrendingCard = ({ trendingArticleDetails }) => {
  return (
    <div className="flex gap-4">
      <div>
        <h1 className="text-3xl font-bold opacity-20">0{trendingArticleDetails?.index+1}</h1>
      </div>
      <div className="flex flex-col">
        <Link to={"#"} className="text-xs md:text-xs font-medium opacity-90">{trendingArticleDetails?.author?.fullname}</Link>
        <Link to={`/articles/${trendingArticleDetails?._id}`} className="text-sm font-extrabold lg:leading-5">{trendingArticleDetails?.title}</Link>
        <div className="flex gap-1 mt-1 items-center">
          <small className="opacity-60">Jan 1</small>
          <span className="opacity-60">·</span>
          <small className="opacity-60">9 min read</small>
        </div>
      </div>
    </div>
  )
}

export default TrendingCard