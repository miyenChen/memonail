import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LogoGroup from '../ui/LogoGroup';

const StyledHeader = styled.header`
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5rem;
`;
function Header({ children }) {
    return (
        <StyledHeader>
            <Link to="/">
                <LogoGroup />
            </Link>
            {children}
        </StyledHeader>
    );
}
export default Header;
