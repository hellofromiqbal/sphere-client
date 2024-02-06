import { useState } from "react";

// eslint-disable-next-line react/prop-types
const SignUpForm = ({ handleClose }) => {
  const [state, setState] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/users/sign-up', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state)
      });
      if(!response) {
        const result = await response.json();
        throw new Error(result.message);
      } else {
        const result = await response.json();
        console.log(result.message);
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
          type="text"
          placeholder="Fullname"
          className="px-4 py-2 w-full border rounded-sm"
          value={state.fullname}
          onChange={(e) => setState({ ...state, fullname: e.target.value })}
        />
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
        <input
          type="password"
          placeholder="Confirm password"
          className="px-4 py-2 w-full border rounded-sm"
          value={state.confirmPassword}
          onChange={(e) => setState({ ...state, confirmPassword: e.target.value })}
        />
      </div>
      <button type="submit" className="text-sm md:text-base bg-green-500 hover:bg-green-600 py-2 rounded-full text-white font-semibold">Sign Up</button>
    </form>
  )
}

export default SignUpForm