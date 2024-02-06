/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GoPencil, GoTrash } from "react-icons/go"
import { IoBookmarksOutline, IoBookmark } from "react-icons/io5";
import { addArticleToOwnArchives, deleteArticleFromOwnArchives, deleteArticleFromOwnArticles, selectOwnProfile } from "../../redux/ownProfileSlice";
import timeGenerator from "../../helpers/timeGenerator";

const ArticleCard = ({ articleDetails }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectOwnProfile);

  const articleAlreadyArchived = currentUser?.archives.find((articleId) => articleId === articleDetails?._id);
  
  const articleAuthorId = articleDetails?.author?._id || articleDetails?.author;

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3000/articles/${articleDetails?._id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentUserId: currentUser?._id })
      });
      if(!res.ok) {
        throw new Error('Failed to delete article.');
      } else {
        // const result = await res.json();
        // console.log(result.message);
        dispatch(deleteArticleFromOwnArticles(articleDetails?._id));
        navigate(0);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAddToArchive = async (articleId) => {
    try {
      const res = await fetch(`http://localhost:3000/users/update/archives/${currentUser?._id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleId })
      });
      if(!res.ok) {
        throw new Error('Failed to archive article.');
      } else {
        // const result = await res.json();
        // console.log(result.message);
        dispatch(addArticleToOwnArchives(articleId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteFromArchive = async (articleId) => {
    try {
      const res = await fetch(`http://localhost:3000/users/update/archives/${currentUser?._id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleId })
      });
      if(!res.ok) {
        throw new Error('Failed to unarchive article.');
      } else {
        // const result = await res.json();
        // console.log(result.message);
        dispatch(deleteArticleFromOwnArchives(articleId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex gap-4 max-h-[100px] md:max-h-[150px]">
      <div className="basis-2/3 flex flex-col gap-1">
        <Link to={`/${articleDetails?.author?.username}`} className="text-xs font-medium opacity-90 w-max">{articleDetails?.author?.fullname}</Link>
        <Link to={`/articles/${articleDetails?._id}`} className="h-full overflow-hidden">
          <h2 to={`/articles/${articleDetails?._id}`} className="text-sm md:text-base lg:text-lg font-extrabold md:font-extrabold leading-4 md:leading-5 lg:leading-5">{articleDetails?.title}</h2>
          <p className="hidden md:block opacity-60 pt-1">{articleDetails?.summary}</p>
        </Link>
        <div className="flex items-end justify-between">
          <div className="flex gap-1 md:mt-2 items-center">
            <small className="text-xs md:text-sm opacity-60">{timeGenerator(articleDetails?.createdAt)}</small>
            {/* <span className="opacity-60">·</span>
            <small className="text-xs md:text-sm opacity-60">6 min read</small> */}
          </div>
          <div className="flex items-end gap-4">
            {articleAuthorId === currentUser?._id ?
              <>
                <Link to={`/home/edit/${articleDetails?._id}`} className="text-sm md:text-base opacity-60">
                  <GoPencil className='w-[20px] h-[20px]'/>
                </Link>
                <button className="text-sm md:text-base opacity-60" onClick={handleDelete}>
                  <GoTrash className='w-[19px] h-[19px]'/>
                </button>
              </>
              :
              <button className="text-sm md:text-base opacity-60"
                onClick={articleAlreadyArchived ? () => handleDeleteFromArchive(articleDetails?._id) : () => handleAddToArchive(articleDetails?._id)}
              >
                {articleAlreadyArchived ?
                  <IoBookmark className='w-[20px] h-[20px]'/>
                  :
                  <IoBookmarksOutline className='w-[20px] h-[20px]'/>
                }
              </button>
            }
          </div>
        </div>
      </div>
      <div className="relative basis-1/3 bg-red-500">
        <Link to={`/articles/${articleDetails?._id}`}>
          <img src="https://images.unsplash.com/photo-1682686578842-00ba49b0a71a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8" alt="img" className="object-cover w-full h-full"/>
        </Link>
      </div>
    </div>
  )
}

export default ArticleCard