import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    curPosition: [25.04757098753147, 121.51712778252713],
    mapFloatHeight: '0',
};

export const mapsSlice = createSlice({
    name: 'maps',
    initialState,
    reducers: {
        setCurPosition(state, action) {
            state.curPosition = action.payload;
        },
        setMapFloatHeight(state, action) {
            state.mapFloatHeight = action.payload;
        },
    },
});

export const { setCurPosition, setMapFloatHeight } = mapsSlice.actions;
export default mapsSlice.reducer;
