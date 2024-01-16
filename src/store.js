import { configureStore } from '@reduxjs/toolkit';
import memosReducer from './features/memo/memosSlice';
import locationsReducer from './features/map/locationsSlice';

export default configureStore({
    reducer: {
        memos: memosReducer,
        locations: locationsReducer,
    },
});
