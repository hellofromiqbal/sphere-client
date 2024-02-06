/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import ReactQuill from "react-quill";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { formats, modules } from "../../reactQuil/config";
import 'react-quill/dist/quill.snow.css';

const EditArticleForm = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const [state, setState] = useState({});

  useEffect(() => {
    fetch(`${apiUrl}/articles/${id}`)
      .then((res) => res.json())
      .then((data) => setState(data.data))
      .catch((error) => console.log(error.message));
  }, []);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${apiUrl}/articles/${id}`, {
        credentials: 'include',
        cache: 'no-store',
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state)
      });
      if(!res.ok) {
        throw new Error('Failed to post new article.');
      } else {
        // const result = await res.json();
        // console.log(result.message);
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
            value={state.content}
            placeholder="Article content here..."
            onChange={(newValue) => setState({...state, content: newValue})}
          />
        </div>
      </div>
      <button type="submit" className="text-sm md:text-base bg-green-500 hover:bg-green-600 py-2 rounded-full text-white font-semibold">Save Changes</button>
    </form>
  )
}

export default EditArticleForm