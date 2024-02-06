/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectOwnProfile } from '../../redux/ownProfileSlice';
import { setArticle } from '../../redux/articleSlice';

const ResponseForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectOwnProfile);
  const [state, setState] = useState({
    currentUserId: currentUser?._id,
    text: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/articles/update/responses/${id}`, {
        credentials: 'include',
        cache: 'no-store',
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state)
      });
      if(!res.ok) {
        throw new Error('Failed to post new article.');
      } else {
        const result = await res.json();
        dispatch(setArticle(result.data));
      }
    } catch (error) {
      console.log(error.messge);
    }
  };

  return (
    <form className="pt-2 pb-6 md:py-6 border-b flex flex-col gap-4" onSubmit={handleSubmit}>
      <textarea
        placeholder="What are your thougths?"
        className="px-4 py-2 w-full border rounded-sm resize-none"
        value={state.text}
        onChange={(e) => setState({ ...state, text: e.target.value })}
      >
      </textarea>
      <button type="submit" className="w-max self-end text-sm bg-green-500 hover:bg-green-600 py-1 px-3 rounded-full text-white">Respond</button>
    </form>
  )
}

export default ResponseForm