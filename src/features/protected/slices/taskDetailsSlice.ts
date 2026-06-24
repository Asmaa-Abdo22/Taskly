import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TaskDetailsState = {
  selectedTaskId: string | null;
};

const initialState: TaskDetailsState = {
  selectedTaskId: null,
};

const taskDetailsSlice = createSlice({
  name: "taskDetails",
  initialState,
  reducers: {
    openTaskDetails: (state, action: PayloadAction<string>) => {
      state.selectedTaskId = action.payload;
    },

    closeTaskDetails: (state) => {
      state.selectedTaskId = null;
    },
  },
});

export const {
  openTaskDetails,
  closeTaskDetails,
} = taskDetailsSlice.actions;

export default taskDetailsSlice.reducer;