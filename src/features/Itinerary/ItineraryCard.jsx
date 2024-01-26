import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FiMoreHorizontal, FiHeart, FiTrash2 } from 'react-icons/fi';
import { GoHeartFill } from 'react-icons/go';
import styled from 'styled-components';
import IconButton from '../../ui/IconButton';
import Card from '../../ui/Card';
import Flex from '../../ui/Flex';
import Icon from '../../ui/Icon';
import { deleteItinerary, updateFavorite } from './itinerarySlice';

const StyledItineraryCard = styled(Card)`
    display: flex;
    flex-direction: column;
    justify-content: end;
    position: relative;

    & button {
        position: absolute;
        bottom: 0.75rem;
        right: 0.75rem;
    }
    & p {
        font-size: 0.875rem;
    }
`;
const ImgContainer = styled.div`
    width: 100%;
    height: 200px;
    overflow: hidden;
    margin-bottom: 0.75rem;

    & img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
`;
const StyledStatus = styled.span`
    border-radius: 0.5rem;
    background-color: var(--color-amber-400);
    color: var(--color-gray-0);
    width: min-content;
    padding: 0 0.5rem;
`;
const StyledInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
`;
const StyledList = styled.ul`
    position: absolute;
    right: 0.2rem;
    bottom: 3.4rem;
    border-radius: 0.5rem;
    background-color: var(--color-gray-100);
    width: 8rem;
    z-index: 99;
`;
const StyledListItem = styled.li`
    list-style: none;
    display: flex;
    align-items: center;
    padding: 0.5rem;
    gap: 0.25rem;
    cursor: pointer;

    &:hover {
        color: var(--color-cyan-500);
    }
`;

function ItineraryCard({ itinerary, onClick }) {
    const {
        id = itinerary.id,
        status = itinerary.status,
        title = itinerary.title,
        dateStart = itinerary.dateStart,
        dateEnd = itinerary.dateEnd,
        member = itinerary.member,
    } = itinerary;
    const [favorite, setFavorite] = useState(itinerary.favorite);
    const [showOption, setShowOption] = useState(false);
    const dispatch = useDispatch();

    function handleFavorite() {
        const newFavorite = !favorite;
        dispatch(updateFavorite({ id, favorite: newFavorite }));
        setFavorite(newFavorite);
        setShowOption(false);
    }
    function handleDelete() {
        dispatch(deleteItinerary(id));
    }
    return (
        <StyledItineraryCard onClick={onClick}>
            <ImgContainer>
                <img
                    src="https://a0.muscache.com/im/pictures/24abe8fc-4f0d-4de9-b4ca-12d01fcc54d7.jpg?im_w=720"
                    alt=""
                />
            </ImgContainer>
            <div>
                <Flex>
                    <StyledStatus>{status}</StyledStatus>
                    <h3>{title}</h3>
                </Flex>
                <Flex $justifyC="space-between">
                    <StyledInfo>
                        <p>
                            <span>{dateStart}</span>
                            <span> ~ </span>
                            <span>{dateEnd}</span>
                        </p>
                        {member && <p>{member}</p>}
                    </StyledInfo>
                    <IconButton $position="relative" onClick={() => setShowOption(!showOption)}>
                        <FiMoreHorizontal />
                    </IconButton>
                    {showOption ? (
                        <StyledList>
                            {favorite ? (
                                <StyledListItem onClick={handleFavorite}>
                                    <Icon>
                                        <GoHeartFill />
                                    </Icon>
                                    <p>取消收藏</p>
                                </StyledListItem>
                            ) : (
                                <StyledListItem onClick={handleFavorite}>
                                    <Icon>
                                        <FiHeart />
                                    </Icon>
                                    <p>添加至收藏</p>
                                </StyledListItem>
                            )}
                            <StyledListItem onClick={handleDelete}>
                                <Icon>
                                    <FiTrash2 />
                                </Icon>
                                <p>刪除</p>
                            </StyledListItem>
                        </StyledList>
                    ) : (
                        ''
                    )}
                </Flex>
            </div>
        </StyledItineraryCard>
    );
}
export default ItineraryCard;
