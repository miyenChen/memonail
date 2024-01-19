import { useSortTags } from './useSortTags';

export function useGetAllTags(list) {
    //將 list 中的 tags 展平後用 Set得到唯一值的數據，再存成Array
    const allTags = Array.from(new Set(list.flatMap((item) => item.tags)));
    const sortedAllTags = useSortTags(allTags);

    return sortedAllTags;
}
