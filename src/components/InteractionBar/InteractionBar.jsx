/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { GoPencil, GoTrash } from "react-icons/go";
import { IoHeartOutline, IoHeart, IoChatbubbleOutline, IoBookmarksOutline, IoBookmark, IoPlayCircleOutline, IoShareOutline } from "react-icons/io5";
import { deleteArticleFromOwnArticles, addArticleToOwnArchives, deleteArticleFromOwnArchives, selectOwnProfile } from '../../redux/ownProfileSlice';
import { addUserToArticleLikes, deleteUserFromArticleLikes } from '../../redux/articleSlice';

const InteractionBar = ({ currentArticle, handleResponseIconClick, location = 'top' }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectOwnProfile);
  const articleAlreadyArchived = currentUser?.archives?.find((articleId) => articleId === currentArticle?._id);
  const articleAlreadyLiked = currentArticle?.likes?.find((userId) => userId === currentUser?._id);
  
  const handleDelete = async () => {
    try {
      const res = await fetch(`${apiUrl}/articles/${currentArticle?._id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentUserId: currentUser?._id })
      });
      if(!res.ok) {
        throw new Error('Failed to delete article.');
      } else {
        // const result = await res.json();
        // console.log(result.message);
        dispatch(deleteArticleFromOwnArticles(currentArticle?._id));
        navigate(-1);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAddToArchive = async (articleId) => {
    try {
      const res = await fetch(`${apiUrl}/users/update/archives/${currentUser?._id}`, {
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
      const res = await fetch(`${apiUrl}/users/update/archives/${currentUser?._id}`, {
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

  const handleLikeArticle = async (currentUserId) => {
    try {
      const res = await fetch(`${apiUrl}/articles/update/likes/${currentArticle?._id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentUserId })
      });
      if(!res.ok) {
        throw new Error('Failed to like article.');
      } else {
        // const result = await res.json();
        // console.log(result.message);
        dispatch(addUserToArticleLikes(currentUserId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUnlikeArticle = async (currentUserId) => {
    try {
      const res = await fetch(`${apiUrl}/articles/update/likes/${currentArticle?._id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentUserId })
      });
      if(!res.ok) {
        throw new Error('Failed to like article.');
      } else {
        // const result = await res.json();
        // console.log(result.message);
        dispatch(deleteUserFromArticleLikes(currentUserId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={`${location !== 'top' ? 'border-none lg:border-y' : 'md:border-y md:p-2'} flex justify-between gap-4`}>
      <div className={`${location !== 'top' ? 'flex' : 'hidden md:flex'} items-center gap-8`}>
        <button
          className="flex items-center gap-1 text-sm md:text-base opacity-80"
          onClick={articleAlreadyLiked ? () => handleUnlikeArticle(currentUser?._id) : () => handleLikeArticle(currentUser?._id)}
        >
          {articleAlreadyLiked ?
            <IoHeart className='w-[23px] h-[23px]'/>
            :
            <IoHeartOutline className='w-[23px] h-[23px]'/>
          }
          <span className="text-sm">{currentArticle?.likes?.length}</span>
        </button>
        <button className="flex items-center gap-1 text-sm md:text-base opacity-80" onClick={() => handleResponseIconClick()}>
          <IoChatbubbleOutline className='w-[20px] h-[20px]'/>
          <span className="text-sm">{currentArticle?.responses?.length}</span>
        </button>
      </div>
      <div className='flex items-center gap-2 md:gap-8'>
        {currentUser?._id !== currentArticle?.author?._id &&
          <button
            className="flex items-center gap-1 text-sm md:text-base opacity-80"
            onClick={articleAlreadyArchived ? () => handleDeleteFromArchive(currentArticle?._id) : () => handleAddToArchive(currentArticle?._id)}
          >
            {articleAlreadyArchived ?
              <IoBookmark className='w-[20px] h-[20px]'/>
              :
              <IoBookmarksOutline className='w-[20px] h-[20px]'/>
            }
          </button>
        }
        {location === 'top' &&
          <button className="flex items-center gap-1 text-sm md:text-base opacity-80 border md:border-none px-3 md:p-0 py-1 rounded-full">
            <IoPlayCircleOutline className='w-[25px] h-[25px]'/>
            <span className="md:hidden">Listen</span>
          </button>
        }
        {currentUser?._id === currentArticle?.author?._id &&
          <>
            <button className={`flex items-center gap-1 text-sm md:text-base opacity-80 ${location === 'top' && 'border md:border-none px-3 md:p-0 py-1 rounded-full'}`}>
              <IoShareOutline className='w-[23px] h-[23px]'/>
              {location === 'top' && <span className="md:hidden">Share</span>}
            </button>
            <Link to={`/home/edit/${currentArticle?._id}`} className="text-sm md:text-base opacity-60">
              <GoPencil className='w-[20px] h-[20px]'/>
            </Link>
            <button className="text-sm md:text-base opacity-60" onClick={handleDelete}>
              <GoTrash className='w-[19px] h-[19px]'/>
            </button>
          </>
        }
      </div>
    </div>
  )
}

export default InteractionBar