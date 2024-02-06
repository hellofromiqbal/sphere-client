/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import RecommendedTopics from "../../components/RecommendedTopics/RecommendedTopics";

const HomePage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/articles') 
      .then((res) => res.json())
      .then((data) => setArticles(data.data))
      .catch((error) => console.log(error.message));
  }, []);
  
  return (
    <section className="flex flex-col-reverse lg:flex-row">
      <div className="basis-2/3 flex flex-col gap-4 md:gap-10 px-6 py-5 md:p-10 lg:ps-20 lg:py-10">
        {articles?.map((article) => (
          <ArticleCard
            key={article?._id}
            articleDetails={article}
          />
        ))}
      </div>
      <div className="basis-1/3 flex flex-col border-s">
        <RecommendedTopics/>
      </div>
    </section>
  )
}

export default HomePage