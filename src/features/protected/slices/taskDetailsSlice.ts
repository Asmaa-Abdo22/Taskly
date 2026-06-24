import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../types/protected.types";
import { getTaskDetailsPopupApi } from "../actions/GetTaskDetailsPopu";

type TaskDetailsState = {
  selectedTaskId: string | null;
  task: Task | null;
  loading: boolean;
  error: string | null;
};

const initialState: TaskDetailsState = {
  selectedTaskId: null,
  task: null,
  loading: false,
  error: null,
};

export const getTaskDetailsPopup = createAsyncThunk(
  "taskDetails/getTaskDetailsPopup",
  async ({ projectId, taskId }: { projectId: string; taskId: string }) => {
    const { response, result } = await getTaskDetailsPopupApi(
      projectId,
      taskId,
    );

    if (!response.ok) {
      throw new Error("Failed to load task details");
    }

    return result;
  },
);

const taskDetailsSlice = createSlice({
  name: "taskDetails",
  initialState,
  reducers: {
    openTaskDetails: (state, action: PayloadAction<string>) => {
      state.selectedTaskId = action.payload;
    },

    closeTaskDetails: (state) => {
      state.selectedTaskId = null;
      state.task = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getTaskDetailsPopup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getTaskDetailsPopup.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload;
      })

      .addCase(getTaskDetailsPopup.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load task details";
      });
  },
});

export const { openTaskDetails, closeTaskDetails } = taskDetailsSlice.actions;

export default taskDetailsSlice.reducer;
