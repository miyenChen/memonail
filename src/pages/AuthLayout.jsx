import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../ui/Header';

const StyledAuth = styled.div`
    display: flex;
    flex-direction: column;
    height: 100dvh;

    & main {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: min(21rem, 100%);
        margin: 4rem auto;
        padding: 1rem;

        & button {
            margin-top: 0.5rem;
        }
        & a {
            color: var(--color-cyan-500);
            font-weight: 700;

            &:hover {
                text-decoration: underline;
                text-underline-offset: 0.25rem;
            }
        }
    }
`;
function AuthLayout() {
    return (
        <StyledAuth>
            <Header />
            {<Outlet />}
        </StyledAuth>
    );
}
export default AuthLayout;
