import { configureStore } from '@reduxjs/toolkit';
import ownProfileReducer from './ownProfileSlice';
import userProfileReducer from './userProfileSlice';
import articleReducer from './articleSlice';

const store = configureStore({
  reducer: {
    ownProfile: ownProfileReducer,
    userProfile: userProfileReducer,
    article: articleReducer
  }
});

export default store;