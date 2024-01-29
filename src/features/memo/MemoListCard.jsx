import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiMapPin, FiImage, FiMap, FiMoreHorizontal, FiTrash2, FiEdit } from 'react-icons/fi';
import styled from 'styled-components';
import IconButton from '../../ui/IconButton';
import Flex from '../../ui/Flex';
import TagList from '../../ui/TagList';
import Tag from '../../ui/Tag';
import Card from '../../ui/Card';
import Icon from '../../ui/Icon';
import { deleteMemo } from './memosSlice';
import AddMemo from './AddMemo';

const StyledMemoList = styled(Card)`
    display: flex;
    align-items: center;
    position: relative;
`;
const TextContainer = styled.div`
    flex: 1;
    height: 100%;
    margin-right: 0.75rem;

    & p:first-child {
        font-size: 0.875rem;
        width: 700;
    }
    & pre {
        white-space: pre-wrap;
    }
`;
const TagContainer = styled(TagList)`
    margin: 0.25rem 0 0.5rem;
    & li {
        color: var(--color-amber-400);
        border-color: var(--color-amber-400);
    }
`;
const ImgContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-gray-200);
    border-radius: 0.25rem;
    width: 5rem;
    height: 5rem;
    overflow: hidden;
`;
const LocationContainer = styled.div`
    display: flex;
    border-top: var(--divider);
    margin-top: 0.5rem;
    gap: 0.5rem;
`;
const LocationItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.25rem;

    & p {
        padding: 0.25rem 0;
        font-size: 0.875rem;
    }
    & svg {
        color: var(--color-red-500);
    }
`;
const StyledMenu = styled.ul`
    position: absolute;
    right: 0.2rem;
    top: 4.2rem;
    border-radius: 0.5rem;
    background-color: var(--color-gray-100);
    width: 8rem;
    z-index: 99;
`;
const StyledMenuItem = styled.li`
    list-style: none;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    padding: 0.5rem;
    gap: 0.25rem;
    cursor: pointer;

    &:hover {
        color: var(--color-cyan-500);
    }
`;

function MemoListCard({ memo, img = [] }) {
    const {
        id = memo.id,
        content = memo.content,
        tags = memo.tags,
        dateCreated = memo.dateCreated,
        locationsID = memo.locationsID,
    } = memo;
    const data = useSelector((state) => state.locations.locations);
    const [locationNames, setLocationNames] = useState('');
    const [showCardMenu, setShowCardMenu] = useState(false);
    const [openEditMemo, setOpenEditMemo] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setLocationNames(data.filter((location) => locationsID.includes(location.id)));
    }, [memo]);

    function handleDeleteMemo() {
        dispatch(deleteMemo(id));
    }
    function handleOpenEditMemo() {
        setShowCardMenu(false);
        setOpenEditMemo(true);
    }
    return (
        <StyledMemoList>
            <TextContainer>
                <p>{dateCreated}</p>
                <TagContainer>
                    {tags.map((tag, index) => (
                        <Tag key={index}>{tag}</Tag>
                    ))}
                </TagContainer>
                <pre>{content}</pre>
                {locationNames.length > 0 && (
                    <LocationContainer>
                        {locationNames.map((loction, index) => (
                            <LocationItem key={index}>
                                <FiMapPin />
                                <p>{loction.name}</p>
                            </LocationItem>
                        ))}
                    </LocationContainer>
                )}
            </TextContainer>
            <div>
                <Flex>
                    <IconButton $color="var(--color-cyan-500)" $iconSize="1.2rem">
                        <FiMap />
                    </IconButton>
                    <IconButton onClick={() => setShowCardMenu(!showCardMenu)}>
                        <FiMoreHorizontal />
                    </IconButton>
                    {showCardMenu && (
                        <StyledMenu>
                            <StyledMenuItem onClick={handleOpenEditMemo}>
                                <Icon>
                                    <FiEdit />
                                </Icon>
                                <p>編輯</p>
                            </StyledMenuItem>
                            <StyledMenuItem onClick={handleDeleteMemo}>
                                <Icon>
                                    <FiTrash2 />
                                </Icon>
                                <p>刪除</p>
                            </StyledMenuItem>
                        </StyledMenu>
                    )}
                </Flex>
                <ImgContainer>
                    {img.length > 0 ? (
                        <img src={img[0].url} alt={img[0].name} width="100%" />
                    ) : (
                        <FiImage />
                    )}
                </ImgContainer>
            </div>
            {openEditMemo && (
                <AddMemo isOpened={openEditMemo} onClose={setOpenEditMemo} memo={memo} />
            )}
        </StyledMemoList>
    );
}
export default MemoListCard;
