import { createSlice } from '@reduxjs/toolkit';
import { useTagExtraction } from '../../hooks/useTagExtraction';
import { useSortTags } from '../../hooks/useSortTags';
import { useGetAllTags } from '../../hooks/useGetAllTags';

const demoLoctions = [
    {
        id: '123',
        name: '台北',
        position: [20, 50],
        address: '',
        rating: 2,
        tags: ['coffee'],
        memosID: ['456', '123'],
    },
    {
        id: '456',
        name: '擎天崗',
        position: [21, 30],
        address: '',
        rating: 4,
        tags: ['未分類'],
        memosID: ['123'],
    },
    {
        id: '153',
        name: '石三鍋-綠島店',
        position: [65, 24],
        address: '',
        rating: 3,
        tags: ['restaurant'],
        memosID: [],
    },
];

const allTags = useGetAllTags(demoLoctions);
const initialState = { 'locations': demoLoctions, 'allTags': allTags };

export const locationsSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {
        addLocation(state, action) {
            const { content = action.payload.content, ...rest } = action.payload;

            //將content分離成標籤和文字，並將標籤排序
            const data = useTagExtraction(content);
            const { newContent = data.text, tags = data.tags } = data;
            const sortedTags = useSortTags(tags);

            //將處理後的內容儲存到狀態中
            const location = {
                name: newContent,
                tags: sortedTags,
                ...rest,
            };
            state.locations.push(location);

            //從更新後的 locations 取得新的 allTags 並替換
            const newAllTags = useGetAllTags(state.locations);
            state.allTags = newAllTags;
        },
        deleteLocation(state, action) {
            const newArray = state.locations.filter((item) => item.id !== action.payload);
            state.locations = newArray;
        },
        updateMemosID(state, action) {
            //payload 結構 {memos.id, locations:[{locations.id,locations.name},{//其他被選的地點}]}
            const data = action.payload;
            data.locationsID.forEach((dataLocation) => {
                const matches = state.locations.find(
                    (locations) => locations.id === dataLocation.id
                );
                if (matches) {
                    matches.memosID.push(data.id);
                }
            });
        },
    },
});

export const { addLocation, deleteLocation, updateMemosID } = locationsSlice.actions;

export default locationsSlice.reducer;
