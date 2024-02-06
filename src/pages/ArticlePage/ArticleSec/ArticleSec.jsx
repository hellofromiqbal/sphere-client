/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import InteractionBar from "../../../components/InteractionBar/InteractionBar";
import { selectArticle, setArticle } from "../../../redux/articleSlice";
import { useEffect, useState } from "react";
import DOMPurify from 'dompurify';
import timeGenerator from "../../../helpers/timeGenerator";

const ArticleSec = ({ handleShowResponseSec }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentArticle = useSelector(selectArticle);
  const [articleDetails, setArticleDetails] = useState({});

  useEffect(() => {
    fetch(`${apiUrl}/articles/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.data);
        setArticleDetails(data.data);
        dispatch(setArticle(data.data));
      })
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <section className="p-6 md:px-24 md:py-10 lg:px-72 lg:py-10 flex flex-col gap-8 border-b">
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2 md:gap-4'>
          <h1 className='text-3xl md:text-4xl font-extrabold'>{articleDetails?.title}</h1>
          <p className="text-base md:text-lg lg:text-xl opacity-60">{articleDetails?.summary}</p>
        </div>
        <div className='flex items-center gap-2'>
          <div className=''>
            <div className='bg-black w-[40px] h-[40px] rounded-full'>
              {/* <img src="" alt="" /> */}
            </div>
          </div>
          <div className='flex flex-col'>
            <Link to={`/${articleDetails?.author?.username}`} className='font-semibold w-[80%] md:w-full text-nowrap text-ellipsis whitespace-nowrap overflow-hidden'>{articleDetails?.author?.fullname}</Link>
            <div className="flex">
              {/* <small className="md:text-sm opacity-80">9 min read</small>
              <span>·</span> */}
              <small className="md:text-sm opacity-80">{timeGenerator(articleDetails?.createdAt)}</small>
            </div>
          </div>
        </div>
        <InteractionBar currentArticle={currentArticle} handleResponseIconClick={() => handleShowResponseSec()}/>
      </div>
      <div className='reactQuill flex flex-col gap-2 md:text-lg' dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(articleDetails?.content)}}>
      </div>
      <ul className='flex flex-wrap gap-2'>
        <Link to={"/topics/programming"} className="bg-slate-200 px-4 py-2 rounded-full text-sm">Programming</Link>
        <Link to={"/topics/data-science"} className="bg-slate-200 px-4 py-2 rounded-full text-sm">Data Science</Link>
        <Link to={"/topics/technology"} className="bg-slate-200 px-4 py-2 rounded-full text-sm">Technology</Link>
        <Link to={"/topics/database"} className="bg-slate-200 px-4 py-2 rounded-full text-sm">Database</Link>
      </ul>
      <InteractionBar currentArticle={currentArticle} handleResponseIconClick={() => handleShowResponseSec()} location={"bottom"}/>
    </section>
  )
}

export default ArticleSec