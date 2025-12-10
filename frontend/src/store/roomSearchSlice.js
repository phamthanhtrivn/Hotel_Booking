import { createSlice } from "@reduxjs/toolkit";

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const initialState = {
  checkIn: today.toISOString(),
  checkOut: tomorrow.toISOString(),
  guests: 2,
  children: [8],
  roomType: "ALL",
};

export const roomSearchSlice = createSlice({
  name: "roomSearch",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFilters: () => initialState,
  },
});

export const { setFilters, resetFilters } = roomSearchSlice.actions;

export default roomSearchSlice.reducer;
