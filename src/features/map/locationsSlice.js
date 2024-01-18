import { createSlice } from '@reduxjs/toolkit';

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

function sortTags(allTags) {
    allTags.sort((a, b) => {
        //獲得兩者的第一個字母
        const aFirstChar = a.charAt(0).toLowerCase();
        const bFirstChar = b.charAt(0).toLowerCase();

        //用字母的 Unicode 值進行比較
        if (aFirstChar < bFirstChar) return -1;
        if (aFirstChar > bFirstChar) return 1;

        //如果第一個字母相同用 localeCompare 比較整個字串，得到 -1 || 1 || 0
        return a.localeCompare(b);
    });
    //將 "未分類" 提出來排到第一個
    const sortedTags = ['未分類', ...allTags.filter((tag) => tag !== '未分類')];

    return sortedTags;
}

const allTags = Array.from(new Set(demoLoctions.flatMap((location) => location.tags)));
const sortedTags = sortTags(allTags);

const initialState = { 'locations': demoLoctions, 'allTags': sortedTags };

export const locationsSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {
        addLocation(state, action) {
            const { content = action.payload.content, ...rest } = action.payload;

            //將content中的tags和文字分別存
            const regex = /#([\p{L}\d]+)/gu;
            const matches = [...content.matchAll(regex)];
            let tags = matches.map((match) => match[1]);
            if (tags.length === 0) {
                tags.push('未分類');
            }
            const newText = content.replace(regex, '');

            const location = {
                name: newText,
                tags,
                ...rest,
            };
            state.locations.push(location);
        },
        updateMemosID(state, action) {
            //payload 結構 {memos.id, locations:[{locations.id,locations.name},{//其他被選的地點}]}
            const data = action.payload;
            data.locations.forEach((dataLocation) => {
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

export const { addLocation, updateMemosID } = locationsSlice.actions;

export default locationsSlice.reducer;
