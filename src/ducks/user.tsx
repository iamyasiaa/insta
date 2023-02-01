import { createSelector, createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/store";

interface IUserSchema {
  name: string;
  photo: string;
  email: string;
}

const initialState: IUserSchema = {
  name: "",
  photo: "",
  email: "",
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setStateUser(state, data) {
      state.name = data.payload.name;
      state.photo = data.payload.photo;
      state.email = data.payload.email;
    },
    clearUser(state) {
      state.name = "";
      state.photo = "";
      state.email = "";
    },
  },
});

const userStateSelector = (state: RootState) => state.userReducer;

export const getUser = createSelector(userStateSelector, (state) => state);

export const { reducer: userReducer } = userSlice;
export const { actions: userActions } = userSlice;
