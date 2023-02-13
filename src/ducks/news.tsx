import { createSelector, createSlice } from "@reduxjs/toolkit";
import { ReactElement } from "react";

import { RootState } from "@/store";

interface IArrayNews {
  avatar: ReactElement<any, any>;
  photo: string;
  like: number;
  id: string;
  comments: string;
}

interface INewsSchema {
  arrayNews: IArrayNews[];
  arrayFavourites: string[];
  arrayComments: string[];
}

const initialState: INewsSchema = {
  arrayNews: [],
  arrayFavourites: [],
  arrayComments: [],
};

export const newsSlice = createSlice({
  name: "newsSlice",
  initialState,
  reducers: {
    addNewComments(state, action) {
      state.arrayComments = [...state.arrayComments, action.payload];
    },
    addedArrayFavourites(state, action) {
      state.arrayFavourites = [...state.arrayFavourites, action.payload];
      state.arrayNews = state.arrayNews.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            like: item.like + 1,
          };
        }

        return {
          ...item,
        };
      });
    },
    remoteArrayFavourites(state, action) {
      state.arrayFavourites = state.arrayFavourites.filter(
        (item) => item !== action.payload
      );
      state.arrayNews = state.arrayNews.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            like: item.like - 1 ? item.like - 1 : 0,
          };
        }

        return {
          ...item,
        };
      });
    },
  },
});

const newsStateSelector = (state: RootState) => state.newsReducer;
const commentsStateSelector = (state: RootState) => state.newsReducer;

export const getArrayFavorites = createSelector(
  newsStateSelector,
  (state) => state.arrayFavourites
);
export const getArrayComments = createSelector(
  commentsStateSelector,
  (state) => state.arrayComments
);

export const { reducer: newsReducer } = newsSlice;
export const { actions: newsActions } = newsSlice;
