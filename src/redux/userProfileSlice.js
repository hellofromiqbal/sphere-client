import { createSlice, nanoid } from '@reduxjs/toolkit'

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: {
    userProfileInfo: {
      username: '',
      email: '',
      password: '',
      fullname: '',
      bio: 'Hello there! I am using Sphere.',
      about: '',
      profileImage: null,
      articles: [],
      archives: [],
      followers: [],
      following: [],
      isVerified: false,
      verifyEmailToken: '',
      verifyEmailTokenExpiryDate: null,
      resetPasswordToken: '',
      resetPasswordTokenExpiryDate: null,
    }
  },
  reducers: {
    setUserProfile: (state, action) => {
      state.userProfileInfo = action.payload;
    },
    clearUserProfile: (state) => {
      state.userProfileInfo = undefined;
    },
    addFollowersToUserProfileFollowers: (state, action) => {
      console.log(action.payload);
      state.userProfileInfo.followers = [...state.userProfileInfo.followers, { ...action.payload, _id: nanoid(24) }];
    },
    deleteFollowersFromUserProfileFollowers: (state, action) => {
      state.userProfileInfo.followers = state.userProfileInfo.followers.filter(follower => follower.user._id !== action.payload);
    }
  }
});

export const {
  setUserProfile,
  clearUserProfile,
  addFollowersToUserProfileFollowers,
  deleteFollowersFromUserProfileFollowers
} = userProfileSlice.actions;
export const selectUserProfile = (state) => state.userProfile.userProfileInfo;
export default userProfileSlice.reducer;