import { createSelector, createSlice } from "@reduxjs/toolkit";
import { ReactElement } from "react";
import { v4 as uuidv4 } from "uuid";

import { Avatar } from "@ui/icon";
import photo1 from "@img/photo1.png";
import photo2 from "@img/cat1.jpg";
import photo3 from "@img/cat2.jpg";
import photo4 from "@img/cat3.jpg";
import { RootState } from "@/store";

interface IArrayNews {
  avatar: ReactElement<any, any>;
  photo: string;
  like: number;
  id: string;
}

interface INewsSchema {
  arrayNews: IArrayNews[];
  arrayFavourites: string[];
}

const initialState: INewsSchema = {
  arrayNews: [],
  arrayFavourites: [],
};

export const newsSlice = createSlice({
  name: "newsSlice",
  initialState,
  reducers: {
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

export const getArrayFavorites = createSelector(
  newsStateSelector,
  (state) => state.arrayFavourites
);

export const { reducer: newsReducer } = newsSlice;
export const { actions: newsActions } = newsSlice;
