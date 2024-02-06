/* eslint-disable react/prop-types */
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { selectOwnProfile } from "../../redux/ownProfileSlice";
import { GoTrash } from "react-icons/go";
import { deleteResponseFromArticleResponses, selectArticle } from "../../redux/articleSlice";
import timeGenerator from "../../helpers/timeGenerator";

const ResponseCard = ({ response }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectOwnProfile);
  const currentArticle = useSelector(selectArticle);
  const handleDelete = async (currentResponseId) => {
    try {
      const res = await fetch(`http://localhost:3000/articles/update/responses/${id}`, {
        credentials: 'include',
        cache: 'no-store',
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentUserId: currentUser?._id, currentResponseId })
      });
      if(!res.ok) {
        throw new Error('Failed to post new article.');
      } else {
        dispatch(deleteResponseFromArticleResponses(currentResponseId));
      }
    } catch (error) {
      console.log(error.messge);
    }
  };

  return (
    <div key={response?._id} className="flex flex-col gap-2 py-4 border-b">
      <div className="flex items-center gap-2">
        <div className=''>
          <div className='bg-black w-[40px] h-[40px] rounded-full'>
            {/* <img src="" alt="" /> */}
          </div>
        </div>
        <div className='flex w-full justify-between'>
          <div className="flex flex-col">
            <Link to={`/${response?.user?.username}`} className='text-sm'>{response?.user?.fullname}</Link>
            <small className="opacity-60">{timeGenerator(response?.createdAt)}</small>
          </div>
          {currentUser?._id === response?.user?._id || currentUser?._id === currentArticle?.author?._id ?
            <button className="self-start text-sm md:text-base opacity-60" onClick={() => handleDelete(response?._id)}>
              <GoTrash className='w-[16px] h-[16px]'/>
            </button>
            :
            ''
          }
        </div>
      </div>
      <div>
        <small>{response?.text}</small>
      </div>
    </div>
  )
};

export default ResponseCard;