/* eslint-disable react/prop-types */
import ArticleCard from "../../../components/ArticleCard/ArticleCard"
import Aside from "../../../components/Aside/Aside"

const ArticleListSec = ({ articles }) => {
  return (
    <section className="flex flex-col-reverse lg:flex-row">
      <div className="basis-3/5 flex flex-col gap-4 md:gap-10 px-6 py-5 md:p-10 lg:ps-20 lg:py-10">
        {articles?.map((article) => (
          <ArticleCard key={article?._id} articleDetails={article}/>
        ))}
      </div>
      <div className="basis-2/5 flex flex-col">
        <Aside/>
      </div>
    </section>
  )
}

export default ArticleListSec