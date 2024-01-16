import { configureStore } from '@reduxjs/toolkit';
import memosReducer from './features/memo/memosSlice';

export default configureStore({
    reducer: {
        memos: memosReducer,
    },
});
