import { configureStore } from "@reduxjs/toolkit";
import { roomSearchSlice } from "./roomSearchSlice";

export const store = configureStore({
  reducer: {
    roomSearch: roomSearchSlice.reducer,
  },
});