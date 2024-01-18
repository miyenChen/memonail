import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    curPosition: [25.04757098753147, 121.51712778252713],
};

export const mapsSlice = createSlice({
    name: 'maps',
    initialState,
    reducers: {
        setCurPosition(state, action) {
            state.curPosition = action.payload;
        },
    },
});

export const { setCurPosition } = mapsSlice.actions;
export default mapsSlice.reducer;
