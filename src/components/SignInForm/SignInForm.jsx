import { useState } from "react"
import { useDispatch } from 'react-redux';
import { setOwnProfile } from "../../redux/ownProfileSlice";
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const SignInForm = ({ handleClose }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/users/sign-in`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(state)
      });
      if(!response.ok) {
        const result = await response.json();
        throw new Error(result.message);
      } else {
        const result = await response.json();
        dispatch(setOwnProfile(result.data));
        navigate("/home");
        handleClose();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <input
          type="email"
          placeholder="Email"
          className="px-4 py-2 w-full border rounded-sm"
          value={state.email}
          onChange={(e) => setState({ ...state, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="px-4 py-2 w-full border rounded-sm"
          value={state.password}
          onChange={(e) => setState({ ...state, password: e.target.value })}
        />
      </div>
      <button type="submit" className="text-sm md:text-base bg-green-500 hover:bg-green-600 py-2 rounded-full text-white font-semibold">Sign In</button>
    </form>
  )
}

export default SignInForm