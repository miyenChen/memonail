import { createSlice } from '@reduxjs/toolkit';

const initialState = { memos: [], allTags: [] };

export const memosSlice = createSlice({
    name: 'memos',
    initialState,
    reducers: {
        addMemo(state, action) {
            const { content = action.payload.content, ...rest } = action.payload;

            //將content中的tags和文字分別存
            const regex = /#([\p{L}\d]+)/gu;
            const matches = [...content.matchAll(regex)];
            const tags = matches.map((match) => match[1]);
            const newText = content.replace(regex, '');

            //將處理後的內容儲存到狀態中
            const memo = {
                content: newText,
                tags,
                ...rest,
            };
            state.memos.push(memo);

            memo.tags.forEach((tag) => {
                if (!state.allTags.includes(tag)) {
                    state.allTags.push(tag);
                }
            });
        },
    },
});

export const { addMemo } = memosSlice.actions;

export default memosSlice.reducer;
