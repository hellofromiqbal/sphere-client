import { createSlice, nanoid } from '@reduxjs/toolkit'

const articleSlice = createSlice({
  name: 'article',
  initialState: {
    articleInfo: {
      author: null,
      title: '',
      summary: '',
      content: '',
      likes: [],
      responses: [],
      createdAt: null,
      updatedAt: null,
    }
  },
  reducers: {
    setArticle: (state, action) => {
      state.articleInfo = action.payload;
    },
    clearArticle: (state) => {
      state.articleInfo = undefined;
    },
    addUserToArticleLikes: (state, action) => {
      state.articleInfo.likes = [...state.articleInfo.likes, action.payload];
    },
    deleteUserFromArticleLikes: (state, action) => {
      state.articleInfo.likes = state.articleInfo.likes.filter(userId => userId !== action.payload);
    },
    addResponseToArticleResponses: (state, action) => {
      state.articleInfo.responses = [...state.articleInfo.responses, { ...action.payload, _id: nanoid(24) }];
    },
    deleteResponseFromArticleResponses: (state, action) => {
      state.articleInfo.responses = state.articleInfo.responses.filter(response => response._id !== action.payload);
    }
  }
});

export const {
  setArticle,
  clearArticle,
  addUserToArticleLikes,
  deleteUserFromArticleLikes,
  addResponseToArticleResponses,
  deleteResponseFromArticleResponses
} = articleSlice.actions;
export const selectArticle = (state) => state.article.articleInfo;
export default articleSlice.reducer;