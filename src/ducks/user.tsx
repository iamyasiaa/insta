import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

import { RootState } from "@/store";
import axios from "axios";

export const getLocationUser = createAsyncThunk(
  "locationUser/fetchGetLocationUser",
  async (data: any, thunkAPI) => {
    try {
      return await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.lat},${data.lng}&key=AIzaSyBW4xq61iVDCqDE6IxQfC_2baHEIc-vcog`
      );
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

interface IUserSchema {
  name: string;
  photo: string;
  email: string;
  location: string;
}

const initialState: IUserSchema = {
  name: "",
  photo: "",
  email: "",
  location: "",
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
  extraReducers: (builder) => {
    builder.addCase(getLocationUser.fulfilled, (state, action: any) => {
      state.location = action.payload.data.results[0].formatted_address;
    });
  },
});

const userStateSelector = (state: RootState) => state.userReducer;

export const getUser = createSelector(userStateSelector, (state) => state);

export const { reducer: userReducer } = userSlice;
export const { actions: userActions } = userSlice;
