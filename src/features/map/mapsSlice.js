import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    positionList: [],
    curPosition: [25.04757098753147, 121.51712778252713],
    clickLimit: false,
    mapFloatHeight: '0',
};

export const mapsSlice = createSlice({
    name: 'maps',
    initialState,
    reducers: {
        updatePositionList(state, action) {
            state.positionList = action.payload;
        },
        setCurPosition(state, action) {
            state.curPosition = action.payload;
        },
        setMapFloatHeight(state, action) {
            state.mapFloatHeight = action.payload;
        },

        toggleClickLimit(state, action) {
            state.clickLimit = action.payload;
        },
    },
});

export const { updatePositionList, setCurPosition, setMapFloatHeight, toggleClickLimit } =
    mapsSlice.actions;
export default mapsSlice.reducer;
