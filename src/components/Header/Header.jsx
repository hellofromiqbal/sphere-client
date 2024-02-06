/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from 'react-router-dom'
import Modal from '../Modal/Modal'
import { TbSphere } from "react-icons/tb";
import { PiNotePencilThin, PiBellThin, PiUserCircleGearThin } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearOwnProfile, selectOwnProfile, setOwnProfile } from '../../redux/ownProfileSlice';
import { useEffect } from 'react';

const Header = ({ handleModal }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const currentUser = useSelector(selectOwnProfile);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${apiUrl}/users/me`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        dispatch(setOwnProfile(data.data));
      })
  }, []);

  const handleSignOut = async () => {
    fetch(`${apiUrl}/users/sign-out`, {
      cache: 'no-store',
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.message);
        dispatch(clearOwnProfile(data.data));
        navigate("/");
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <header className="h-14 shadow-md sticky top-0 bg-white z-50">
      <nav className="flex justify-between items-center h-full px-6 md:px-10 lg:px-20">
        <Link to="/" className="text-2xl font-bold flex">
          <TbSphere className='bg-yellow-400 rounded-full'/>
          <span className='-ms-1'>Sphere</span>
        </Link>
        <div className="flex items-center gap-4 md:gap-8">
          {currentUser ?
            <>
              <Link to="/home/write" className="hidden md:flex items-center gap-1 font-normal">
                <PiNotePencilThin className='w-[25px] h-[25px]'/>
                <span>Write</span>
              </Link>
              <Link to={`/${currentUser?.username}`} className="flex items-center gap-1 font-normal">
                <PiUserCircleGearThin className='w-[25px] h-[25px]'/>
                <span>Profile</span>
              </Link>
              <Link to="/" className="flex items-center gap-1 font-normal">
                <PiBellThin className='w-[25px] h-[25px]'/>
              </Link>
              <button
                onClick={handleSignOut}
                className='px-4 py-1 rounded-full bg-black hover:bg-transparent text-sm md:text-base text-white hover:text-black border-2 border-transparent hover:border-black font-semibold transition-all duration-150'
              >Sign Out</button>
            </>
            :
            <>
            <button
              onClick={() => handleModal(<Modal formType='signIn' handleClose={handleModal}/>)}
              className='px-4 py-2 rounded-full bg-green-500 hover:bg-green-600 text-sm font-semibold text-white transition-all duration-150'
            >Get Started</button>
          </>
          }
        </div>
      </nav>
    </header>
  )
}

export default Header