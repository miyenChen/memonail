import { createSlice } from '@reduxjs/toolkit';

const demoLoctions = [
    { id: '123', name: '1', position: [20, 50], rating: 0, tags: ['coffee'], memosID: ['5566'] },
    { id: '456', name: '2', position: [21, 30], rating: 0, tags: [], memosID: ['123'] },
    { id: '153', name: '3', position: [65, 24], rating: 0, tags: ['restaurant'], memosID: [] },
];
const allTags = Array.from(new Set(demoLoctions.flatMap((location) => location.tags)));

const initialState = { 'locations': demoLoctions, allTags };

export const locationsSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {},
});

export const {} = locationsSlice.actions;

export default locationsSlice.reducer;
