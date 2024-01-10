import styled from 'styled-components';
import { FiMoreHorizontal } from 'react-icons/fi';
import IconButton from '../../ui/IconButton';
import Card from '../../ui/Card';

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
function ItineraryCard() {
    return (
        <StyledItineraryCard>
            <IconButton>
                <FiMoreHorizontal />
            </IconButton>
            <ImgContainer>
                <img
                    src="https://a0.muscache.com/im/pictures/24abe8fc-4f0d-4de9-b4ca-12d01fcc54d7.jpg?im_w=720"
                    alt=""
                />
            </ImgContainer>
            <div>
                <h3>title</h3>
                <p>
                    <span>Star Date</span>
                    <span> ~ </span>
                    <span>End Date</span>
                </p>
            </div>
        </StyledItineraryCard>
    );
}
export default ItineraryCard;
