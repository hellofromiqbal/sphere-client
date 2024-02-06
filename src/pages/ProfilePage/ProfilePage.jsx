/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserQuickProfile from './UserQuickProfile/UserQuickProfile';
import UserContent from './UserContent/UserContent';
import { useSelector, useDispatch } from 'react-redux'
import { setOwnProfile, selectOwnProfile } from '../../redux/ownProfileSlice';
import { selectUserProfile, setUserProfile } from '../../redux/userProfileSlice';
import { IoIosCloseCircleOutline } from "react-icons/io";

const ProfilePage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { username } = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectOwnProfile);
  const currentUserProfile = useSelector(selectUserProfile);
  const [showModal, setShowModal] = useState({
    status: false,
    type: ''
  });

  // useEffect(() => {
  //   fetch(`${apiUrl}/users/me`, { credentials: 'include' })
  //     .then((res) => res.json())
  //     .then((data) => dispatch(setOwnProfile(data.data)))
  //     .catch((error) => console.log(error.message));
  // }, []);

  useEffect(() => {
    fetch(`${apiUrl}/users/${username}`, { credentials: 'include' })
    .then((res) => res.json())
    .then((data) => dispatch(setUserProfile(data.data)))
    .catch((error) => console.log(error.message));
  }, [username]);


  const handleVisitButton = (href) => {
    setShowModal({status: false, type: ''});
    navigate(href);
  };

  const handleShowModalContent = (type) => {
    setShowModal({status: true, type});
  };

  return (
    <div className='flex flex-col lg:flex-row-reverse relative'>
      <div className="basis-1/3 flex flex-col md:gap-10 px-6 py-5 md:px-24 md:py-10 lg:ps-10 lg:py-10 border-s">
        <UserQuickProfile
          currentUser={currentUser}
          currentUserProfile={currentUserProfile}
          handleShwoModal={handleShowModalContent}
        />
      </div>
      <div className="basis-2/3 flex flex-col md:gap-10 px-6 md:px-24 md:pb-10 lg:ps-20 lg:py-10">
        <UserContent currentUser={currentUser} currentUserProfile={currentUserProfile}/>
      </div>
      {showModal.status &&
        <div className='fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-10 flex justify-center items-center'>
          <div className='flex flex-col bg-white opacity-100 p-6 rounded-md w-1/2 relative max-h-[70vh]'>
            <button onClick={() => setShowModal({ status: false, type: ''})} className="absolute top-2 right-2">
              <IoIosCloseCircleOutline className="w-[25px] md:w-[25px] h-[25px] md:h-[25px]"/>
            </button>
            <div className='border-b pb-4'>
              <h3 className='text-xl font-bold'>{currentUserProfile?.fullname}'s {showModal.type === 'followers' ? 'followers' : 'following'}</h3>
            </div>
            <ul className='pt-4 flex flex-col gap-2 h-full overflow-auto'>
              {currentUserProfile?.[showModal.type].map((item) => (
                <li key={item?._id} className='pb-2'>
                  <div className='flex justify-between items-center'>
                    <div className='flex flex-col'>
                      <h4 className='font-semibold'>{item?.user?.fullname}</h4>
                      <small>{item?.user?.bio}</small>
                    </div>
                    <div>
                      <button
                        onClick={() => handleVisitButton(`/${item?.user?.username}`)}
                        className='bg-green-500 hover:bg-green-600 text-white text-sm md:text-base py-2 md:px-4 lg:px-4 lg:py-2 w-full md:w-[100px] lg:w-max rounded-full'
                      >Visit</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      }
    </div>
  )
}

export default ProfilePage