import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { email: '', pics: [] },
};

export const snapSlice = createSlice({
  name: 'snap',
  initialState,
  reducers: {
    addEmail: (state, action) => {
      state.value.email = action.payload;
    },
    addPic: (state, action) => {
      //console.log('action.payload de addPic', action.payload);
      state.value.pics.push(action.payload);
    },
    removePic: (state, action) => {
      state.value.pics = state.value.pics.filter((el) => el !== action.payload);
    },
  },
});

export const { addEmail, addPic, removePic } = snapSlice.actions;
export default snapSlice.reducer;
