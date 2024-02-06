/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { GoMail } from "react-icons/go";
import { useDispatch } from 'react-redux';
import { addFollowingToOwnFollowing, deleteFollowingFromOwnFollowing } from '../../../redux/ownProfileSlice';
import { addFollowersToUserProfileFollowers, deleteFollowersFromUserProfileFollowers } from "../../../redux/userProfileSlice";

const UserQuickProfile = ({ currentUser, currentUserProfile, handleShwoModal }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const userAlreadyFollowing = currentUserProfile?.followers?.find((follower) => follower?.user?._id === currentUser?._id);

  const handleFollowing = async (currentUserId) => {
    try {
      const res = await fetch(`${apiUrl}/users/update/following/${currentUserProfile?._id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentUserId })
      });
      if(!res.ok) {
        throw new Error('Failed to follow user.');
      } else {
        // const result = await res.json();
        // console.log(result.message);
        dispatch(addFollowingToOwnFollowing({ user: currentUserProfile, createdAt: new Date().toISOString() }));
        dispatch(addFollowersToUserProfileFollowers({ user: currentUser, createdAt: new Date().toISOString() }));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUnfollowing = async (currentUserId) => {
    try {
      const res = await fetch(`${apiUrl}/users/update/following/${currentUserProfile?._id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentUserId })
      });
      if(!res.ok) {
        throw new Error('Failed to follow user.');
      } else {
        // const result = await res.json();
        // console.log(result.message);
        dispatch(deleteFollowingFromOwnFollowing(currentUserId));
        dispatch(deleteFollowersFromUserProfileFollowers(currentUserId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className="flex flex-col md:flex-row md:justify-between lg:flex-col lg:justify-normal gap-4 lg:min-h-screen">
      <div className='flex lg:flex-col items-center lg:items-start gap-4'>
        <div className='md:hidden lg:block'>
          <div className='bg-black w-[50px] lg:w-[80px] h-[50px] lg:h-[80px] rounded-full'>
            {/* <img src="" alt="" /> */}
          </div>
        </div>
        <div className='flex flex-col justify-center'>
          <Link to={`/${currentUserProfile?.username}`} className='text-xl md:text-4xl lg:text-base'>{currentUserProfile?.fullname}</Link>
          <div className="flex flex-row gap-4">
            <button onClick={() => handleShwoModal('followers')} className="w-max text-sm opacity-60 md:block">{currentUserProfile?.followers?.length} Followers</button>
            <button onClick={() => handleShwoModal('following')} className="w-max text-sm opacity-60 md:block">{currentUserProfile?.following?.length} Following</button>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex">
        <small>{currentUserProfile?.bio}</small>
      </div>
      {currentUserProfile?._id !== currentUser?._id ?
        <div className='flex gap-2'>
          <button
            type="submit"
            className={`${userAlreadyFollowing ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-sm md:text-base rounded-full text-white flex justify-center items-center h-[30px] w-full py-2 px-8`}
            onClick={userAlreadyFollowing ? () => handleUnfollowing(currentUser?._id) : () => handleFollowing(currentUser?._id)}
          >{userAlreadyFollowing ? 'Unfollow' : 'Follow'}</button>
          <button type="submit" className="text-sm md:text-base bg-green-500 hover:bg-green-600 rounded-full text-white font-semibold flex justify-center items-center h-[30px] py-2 px-2">
            <GoMail className='w-[20px] h-[20px]'/>
          </button>
        </div>
        :
        <Link to={`/${currentUserProfile?.username}/edit`} className="text-sm font-semibold text-green-500 hover:text-green-600">Edit profile</Link>
      }
    </section>
  )
}

export default UserQuickProfile