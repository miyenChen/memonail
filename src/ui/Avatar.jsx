import styled from 'styled-components';

const StyledAvatar = styled.img`
    display: block;
    aspect-ratio: 1;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    outline: 2px solid var(--color-gray-100);

    width: ${(props) => props.$width};
`;
function Avatar({ width = '3rem' }) {
    return <StyledAvatar src={'default-user.jpg'} alt={`Avatar`} $width={width} />;
}
export default Avatar;
