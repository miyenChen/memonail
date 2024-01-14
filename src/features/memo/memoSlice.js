import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    memo: [{ dateCreated: '', content: '', cardID: '', locations: [] }],
};
export const memoSlice = createSlice({
    name: 'memo',
    initialState,
    reducers: {},
});

export const {} = memoSlice.actions;

export default memoSlice.reducer;
