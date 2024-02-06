/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import JumboSec from "./JumboSec/JumboSec"
import TrendingSec from "./TrendingSec/TrendingSec"
import ArticleListSec from "./ArticleListSec/ArticleListSec"

const MainPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [trendingArticles, setTrendingArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetch(`${apiUrl}/articles`)
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.data);
        setTrendingArticles(data.data.slice(0, 6));
      })
      .catch((error) => console.log(error.message));
  }, []);
  return (
    <div className="flex flex-col">
      <JumboSec/>
      <TrendingSec trendingArticles={trendingArticles}/>
      <ArticleListSec articles={articles}/>
    </div>
  )
}

export default MainPage