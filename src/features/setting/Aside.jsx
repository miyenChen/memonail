import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledAside = styled.aside`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;

    & a {
        color: var(--color-cyan-500);
        font-weight: 700;
        padding: 0 0.75rem;

        &:hover {
            text-decoration: underline;
            text-underline-offset: 0.25rem;
        }
        &.active {
            border-left: 2px solid var(--color-cyan-500);
        }
    }
`;
function Aside() {
    return (
        <StyledAside>
            <NavLink to="profile">個人檔案</NavLink>
            <NavLink to="account">帳戶管理</NavLink>
        </StyledAside>
    );
}
export default Aside;
