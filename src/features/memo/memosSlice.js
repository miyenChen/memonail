import { createSlice } from '@reduxjs/toolkit';
import { useTagExtraction } from '../../hooks/useTagExtraction';
import { useSortTags } from '../../hooks/useSortTags';
import { useGetAllTags } from '../../hooks/useGetAllTags';

const demoMemos = [
    {
        id: '123',
        dateCreated: '2021/01/14',
        tags: ['陽明山'],
        content:
            '感受大自然的擁抱，用心感受生活的每一個色彩，每一刻都是獨一無二的畫面。 走在城市中，尋找那一抹被遺忘的美好。',
        locations: [
            { id: '', name: '台北' },
            { id: '', name: '擎天崗' },
        ],
        img: [
            {
                url: 'https://www.futureview360.com/wp-content/uploads/2019/02/800px-Taipei_101_2009_amk-642x1024.jpg',
                name: 'taipei 101',
            },
            {
                url: 'https://myjourney.tw/wp-content/uploads/20191026001621_9.jpg',
                name: 'Qingtiangang Grassland',
            },
        ],
    },
    {
        id: '456',
        dateCreated: '2022/12/31',
        tags: ['ArtisticSoul', 'CreativityUnleashed', 'ArtInspiration', 'coffee'],
        content: '🎨Embracing the beauty of imperfection in every brushstroke🎨',
        locations: [{ id: '', name: '台北' }],
        img: [],
    },
    {
        id: '5566',
        dateCreated: '2023/11/04',
        tags: ['台中', '咖啡廳', 'coffee'],
        content: ' 今天到草悟道走走，天氣真好! 🎃 ',
        locations: [],
        img: [
            {
                url: 'https://www.acouplecooks.com/wp-content/uploads/2021/08/Cafe-Au-Lait-001s.jpg',
                name: 'coffee',
            },
        ],
    },
];

const allTags = useGetAllTags(demoMemos);
const initialState = {
    memos: demoMemos,
    allTags: allTags,
};

export const memosSlice = createSlice({
    name: 'memos',
    initialState,
    reducers: {
        addMemo(state, action) {
            const { content = action.payload.content, ...rest } = action.payload;

            //將content分離成標籤和文字，並將標籤排序
            const data = useTagExtraction(content);
            const { newContent = data.text, tags = data.tags } = data;
            const sortedTags = useSortTags(tags);

            //將處理後的內容儲存到狀態中
            const memo = {
                content: newContent,
                tags: sortedTags,
                ...rest,
            };
            state.memos.push(memo);

            //從更新後的 memos 取得新的 allTags 並替換
            const newAllTags = useGetAllTags(state.memos);
            state.allTags = newAllTags;
        },
    },
});

export const { addMemo } = memosSlice.actions;

export default memosSlice.reducer;
