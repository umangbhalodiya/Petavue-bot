import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../apiServer/axios";

const initialState = {
  chats: [],
};

export const signUp = createAsyncThunk("/bot/signup", async (body) => {
  try {
    const response = await axiosInstance.post(`user/signup`, body);
    return response.data;
  } catch (e) {
    return e.response.data;
  }
});

export const botSlice = createSlice({
  name: "bot",
  initialState: initialState,
  reducers: {
    setBotStates(state, action) {
      return { ...state, ...action.payload };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.chats = action?.payload?.payload?.chats;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setUpdatedUser } = botSlice.actions;
export default botSlice.reducer;
