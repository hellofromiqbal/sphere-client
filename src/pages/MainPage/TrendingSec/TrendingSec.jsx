/* eslint-disable react/prop-types */
import TrendingCard from "../../../components/TrendingCard/TrendingCard"

const TrendingSec = ({ trendingArticles }) => {
  return (
    <section className="px-6 py-10 md:p-10 lg:px-20 lg:py-10 flex flex-col gap-2 border-b">
      <div className="flex gap-2 text-lg font-semibold">
        <span>🌍</span>
        <h2>Trending on Sphere</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {trendingArticles.map((trendingArticle, index) => (
          <TrendingCard key={trendingArticle?._id} trendingArticleDetails={{ index, ...trendingArticle }}/>
        ))}
      </div>
    </section>
  )
}

export default TrendingSec