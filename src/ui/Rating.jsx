import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';

const StyledRating = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    & span:last-child {
        font-weight: 700;
        color: var(--color-gray-400);
    }
`;
const StarContainer = styled.div`
    display: flex;
    gap: 4px;
`;

function Rating({ maxRating = 5, size = 24, defaultRating = 0, onSetRating }) {
    const [rating, setRating] = useState(defaultRating);
    const [tempRating, setTempRating] = useState(0);

    function handleRating(rating) {
        setRating(rating);
        onSetRating(rating);
    }

    return (
        <StyledRating>
            <StarContainer>
                {
                    //只有在新增或修改時設定，平時只展示
                    onSetRating
                        ? Array.from({ length: maxRating }, (_, i) => (
                              <Star
                                  key={i}
                                  // 當點擊排序值的比目前大或相同於目前有顏色的星星時，return true
                                  // 滑鼠hover時，顯示hover的值，滑鼠移開時顯示點擊的值
                                  full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
                                  onRate={() => handleRating(i + 1)}
                                  onHoverIn={() => setTempRating(i + 1)}
                                  onHoverOut={() => setTempRating(0)}
                                  size={size}
                              />
                          ))
                        : Array.from({ length: maxRating }, (_, i) => (
                              <Star
                                  key={i}
                                  full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
                                  size={size}
                              />
                          ))
                }
            </StarContainer>
            <span>{rating}</span>
        </StyledRating>
    );
}

const StyledStar = styled.span`
    cursor: 'pointer';

    ${(props) => props.$customer};

    & svg {
        width: 100%;
        height: 100%;
    }
`;

function Star({ onRate, full, onHoverIn, onHoverOut, size }) {
    const customerStyled = { width: `${size}px`, height: `${size}px` };
    return (
        <StyledStar
            $customer={customerStyled}
            onClick={onRate}
            onMouseEnter={onHoverIn}
            onMouseLeave={onHoverOut}>
            {full ? (
                <FaStar color="var(--color-amber-300)" />
            ) : (
                <FaStar color="var(--color-gray-100)" />
            )}
        </StyledStar>
    );
}

export default Rating;
