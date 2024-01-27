import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    curPosition: [25.04757098753147, 121.51712778252713],
    clickLimit: false,
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
        toggleEditPosition(state, action) {
            state.clickLimit = action.payload;
        },
    },
});

export const { setCurPosition, setMapFloatHeight, toggleEditPosition } = mapsSlice.actions;
export default mapsSlice.reducer;
