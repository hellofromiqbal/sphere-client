import { useEffect, useState } from "react"
import SignUpForm from "../SignUpForm/SignUpForm";
import SignInForm from "../SignInForm/SignInForm";
import { IoIosCloseCircleOutline } from "react-icons/io";

// eslint-disable-next-line react/prop-types
const Modal = ({formType, handleClose}) => {
  const [currentForm, setCurrentForm] = useState();
  const handleSignInButton = () => {
    setCurrentForm('signIn');
  };
  const handleSignUpButton = () => {
    setCurrentForm('signUp');
  };
  useEffect(() => {
    setCurrentForm(formType);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-white bg-opacity-90 z-10 flex justify-center items-center" >
      <div className="bg-white p-6 rounded-md w-[90%] md:w-[60%] lg:w-[40%] flex flex-col gap-4 relative shadow-lg">
        <button onClick={() => handleClose()} className="absolute top-2 md:top-4 right-2 md:right-4">
          <IoIosCloseCircleOutline className="w-[25px] md:w-[25px] h-[25px] md:h-[25px]"/>
        </button>
        <h1 className="text-2xl md:text-3xl font-medium text-center">
          {currentForm === 'signUp' ? 'Join Sphere.' : 'Welcome back.'}
        </h1>
        {currentForm === 'signUp' ? <SignUpForm handleClose={() => handleClose()}/> : <SignInForm handleClose={() => handleClose()}/>}
        <div className="text-center">
          {currentForm === 'signUp' ?
            <p className="text-sm">Already have an account? <button onClick={handleSignInButton} className="text-green-500 hover:text-green-600 font-semibold underline">Sign In</button> here.</p>
            :
            <p className="text-sm">Do not have an account? <button onClick={handleSignUpButton} className="text-green-500 hover:text-green-600 font-semibold underline">Sign Up</button> here.</p>
          }
        </div>
      </div>
    </div>
  )
}

export default Modal