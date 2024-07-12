import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type SliceState =
  | { _id: null; open: boolean }
  | { _id: number | string; open: boolean };

const initialState = {
  _id: null,
  open: false,
} satisfies SliceState as SliceState;

const deleteModalSlice = createSlice({
  name: "DeleteModal",
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<true>) => {
      return {
        ...state,
        open: action.payload,
      };
    },
    setIsClose: (state, action: PayloadAction<false>) => {
      return {
        ...state,
        open: action.payload,
      };
    },
    setId: (state, action: PayloadAction<number | string>) => {
      return {
        ...state,
        _id: action.payload,
      };
    },
  },
});

export const { setId, setIsClose, setIsOpen } = deleteModalSlice.actions;
export default deleteModalSlice.reducer;
