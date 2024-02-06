/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectOwnProfile, updateOwnProfile } from '../../redux/ownProfileSlice';
import ReactQuill from "react-quill";
import { formats, modules } from "../../reactQuil/config";
import 'react-quill/dist/quill.snow.css';

// eslint-disable-next-line react/prop-types
const EditProfileForm = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectOwnProfile);
  const [state, setState] = useState({
    username: currentUser?.username,
    fullname: currentUser?.fullname,
    bio: currentUser?.bio,
    about: currentUser?.about
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/users/update/profile/${currentUser?._id}`, {
        credentials: 'include',
        cache: 'no-store',
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state)
      });
      if(!response) {
        const result = await response.json();
        throw new Error(result.message);
      } else {
        const result = await response.json();
        dispatch(updateOwnProfile(result.data));
        navigate(`/${result.data.username}`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form className="p-6 md:px-24 md:py-10 lg:px-72 lg:py-10 flex flex-col gap-14" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Username"
          className="px-4 py-2 w-full border rounded-sm"
          defaultValue={state?.username?.substring(1)}
          onChange={(e) => setState((prevState) => ({ ...prevState, username: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Fullname"
          className="px-4 py-2 w-full border rounded-sm"
          defaultValue={state?.fullname}
          onChange={(e) => setState((prevState) => ({ ...prevState, fullname: e.target.value }))}
        />
        <textarea
          placeholder="Bio"
          className="px-4 py-2 w-full border rounded-sm resize-none"
          defaultValue={state?.bio}
          onChange={(e) => setState((prevState) => ({ ...prevState, bio: e.target.value }))}
        ></textarea>
        <div className="h-[50vh] md:h-[40vh]">
          <ReactQuill
            className="h-full"
            theme="snow"
            modules={modules}
            formats={formats}
            value={state.about}
            placeholder="About yourself..."
            onChange={(newValue) => setState({...state, about: newValue})}/>
        </div>
      </div>
      <button type="submit" className="text-sm md:text-base bg-green-500 hover:bg-green-600 py-2 rounded-full text-white font-semibold">Save changes</button>
    </form>
  )
}

export default EditProfileForm