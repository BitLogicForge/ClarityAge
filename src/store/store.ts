import { configureStore } from '@reduxjs/toolkit';
import cesdReducer from './cesdSlice';

/**
 * CES-D Assessment Store
 * Privacy-focused: NO localStorage persistence
 * All state exists only in memory for the current session
 *
 * This ensures complete user privacy - no assessment data is stored
 * on the device. When the user closes the tab or refreshes, all data is lost.
 */
export const store = configureStore({
  reducer: {
    cesd: cesdReducer,
  },
  // NO preloadedState - always start fresh
  // NO localStorage subscription - complete privacy
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
