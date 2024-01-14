import { configureStore } from '@reduxjs/toolkit';
import memoReducer from './features/memo/memoSlice';

export default configureStore({
    reducer: {
        memo: memoReducer,
    },
});
