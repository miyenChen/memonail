//用來將帶有#tag的內容分離成文字和標籤
export function useTagExtraction(initialContent) {
    //中英文標籤
    const regex = /#([\p{L}\d]+)/gu;
    const matches = [...initialContent.matchAll(regex)];
    //matches = ['#5', '5', index: 0, input: '#5 test', groups: undefined]
    //matches.map 得到的 array 會帶有重複，所以用 set + array.from 過濾一次
    let newTags = Array.from(new Set(matches.map((match) => match[1])));
    console.log(newTags);
    if (newTags.length === 0) {
        newTags.push('未分類');
    }
    const newText = initialContent.replace(regex, '');

    const data = {
        text: newText,
        tags: newTags,
    };

    return data;
}
