import { createSlice } from '@reduxjs/toolkit';

const demoData = [
    {
        id: '123',
        dateCreated: '2021/01/14',
        tags: ['陽明山'],
        content:
            '感受大自然的擁抱，用心感受生活的每一個色彩，每一刻都是獨一無二的畫面。 走在城市中，尋找那一抹被遺忘的美好。',
        locations: ['台北', '擎天崗'],
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
        locations: ['Japan'],
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
//將demo中的tags展平後用 Set得到唯一值的數據，再存成Array
const allTags = Array.from(new Set(demoData.flatMap((memo) => memo.tags)));

const initialState = {
    memos: demoData,
    allTags,
};

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
