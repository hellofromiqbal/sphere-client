import { createSlice } from '@reduxjs/toolkit'

const ownProfileSlice = createSlice({
  name: 'ownProfile',
  initialState: {
    ownProfileInfo: {
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
    setOwnProfile: (state, action) => {
      state.ownProfileInfo = action.payload;
    },
    clearOwnProfile: (state) => {
      state.ownProfileInfo = undefined;
    },
    updateOwnProfile: (state, action) => {
      state.ownProfileInfo.username = action.payload.username;
      state.ownProfileInfo.fullname = action.payload.fullname;
      state.ownProfileInfo.bio = action.payload.bio;
      state.ownProfileInfo.about = action.payload.about;
    },
    addNewArticleToOwnArticles: (state, action) => {
      state.ownProfileInfo.articles = [...state.ownProfileInfo.articles, action.payload];
    },
    deleteArticleFromOwnArticles: (state, action) => {
      state.ownProfileInfo.articles = state.ownProfileInfo.articles.filter(articleId => articleId !== action.payload);
    },
    addArticleToOwnArchives: (state, action) => {
      state.ownProfileInfo.archives = [...state.ownProfileInfo.archives, action.payload];
    },
    deleteArticleFromOwnArchives: (state, action) => {
      state.ownProfileInfo.archives = state.ownProfileInfo.archives.filter(articleId => articleId !== action.payload);
    },
    addFollowingToOwnFollowing: (state, action) => {
      state.ownProfileInfo.following = [...state.ownProfileInfo.following, action.payload];
    },
    deleteFollowingFromOwnFollowing: (state, action) => {
      state.ownProfileInfo.following = state.ownProfileInfo.following.filter(userId => userId !== action.payload);
    }
  }
});

export const {
  setOwnProfile,
  clearOwnProfile,
  updateOwnProfile,
  addNewArticleToOwnArticles,
  deleteArticleFromOwnArticles,
  addArticleToOwnArchives,
  deleteArticleFromOwnArchives,
  addFollowingToOwnFollowing,
  deleteFollowingFromOwnFollowing
} = ownProfileSlice.actions;
export const selectOwnProfile = (state) => state.ownProfile.ownProfileInfo;
export default ownProfileSlice.reducer;