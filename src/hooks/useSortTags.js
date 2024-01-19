//對Tags進行排序
export function useSortTags(tags) {
    tags.sort((a, b) => {
        //獲得比較的兩者的第一個字母
        const aFirstChar = a.charAt(0).toLowerCase();
        const bFirstChar = b.charAt(0).toLowerCase();

        //用字母的 Unicode 值進行比較
        if (aFirstChar < bFirstChar) return -1;
        if (aFirstChar > bFirstChar) return 1;

        //如果第一個字母相同用 localeCompare 比較整個字串，得到 -1 || 1 || 0
        return a.localeCompare(b);
    });

    //如果有 "未分類" 提出來排到第一個
    const hasUncategorized = tags.includes('未分類');
    const sortedTags = hasUncategorized
        ? ['未分類', ...tags.filter((tag) => tag !== '未分類')]
        : tags;
    return sortedTags;
}
