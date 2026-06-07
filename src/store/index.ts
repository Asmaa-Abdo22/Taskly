import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/src/features/auth/store/authSlice";

/**
 * Global Redux store.
 *
 * To add a new feature slice:
 * 1. Create `src/features/<feature>/store/<feature>Slice.ts` with a default reducer export.
 * 2. Import the reducer below and register it in `reducer`, e.g. `projects: projectsReducer`.
 * 3. Use `useAppDispatch` / `useAppSelector` from `@/src/store/hooks` in client components.
 *
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
