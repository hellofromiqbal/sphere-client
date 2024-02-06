import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectOwnProfile, addNewArticleToOwnArticles } from "../../redux/ownProfileSlice";
import ReactQuill from "react-quill";
import { formats, modules } from "../../reactQuil/config";
import 'react-quill/dist/quill.snow.css';

const WriteArticleForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectOwnProfile);
  const [state, setState] = useState({
    title: '',
    summary: '',
    content: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/articles', {
        credentials: 'include',
        cache: 'no-store',
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ authorId: currentUser?._id, ...state })
      });
      if(!res.ok) {
        throw new Error('Failed to post new article.');
      } else {
        const result = await res.json();
        dispatch(addNewArticleToOwnArticles(result.data._id));
        navigate("/home");
      }
    } catch (error) {
      console.log(error.messge);
    }
  };

  return (
    <form className="p-6 md:px-24 md:py-10 lg:px-72 lg:py-10 flex flex-col gap-20 md:gap-14" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Title"
          className="px-4 py-2 w-full border rounded-sm"
          value={state.title}
          onChange={(e) => setState((prevState) => ({ ...prevState, title: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Summary"
          className="px-4 py-2 w-full border rounded-sm"
          value={state.summary}
          onChange={(e) => setState((prevState) => ({ ...prevState, summary: e.target.value }))}
        />
        <div className="h-[50vh] md:h-[40vh]">
          <ReactQuill
            className="h-full"
            theme="snow"
            modules={modules}
            formats={formats}
            placeholder="Article content here..."
            onChange={(e) => setState((prevState) => ({ ...prevState, content: e.target.value }))}
          />
        </div>
      </div>
      <button type="submit" className="text-sm md:text-base bg-green-500 hover:bg-green-600 py-2 rounded-full text-white font-semibold">Post</button>
    </form>
  )
}

export default WriteArticleForm