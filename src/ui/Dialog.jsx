import styled from 'styled-components';
import { FiX } from 'react-icons/fi';
import IconButton from './IconButton';

const Backgroud = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--color-bg-overlay);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledDialog = styled.dialog`
    background-color: var(--color-none);
    border: none;
    width: min(30rem, 100%);
    margin: auto;
`;
const Container = styled.div`
    position: relative;
    background-color: #fff;
    border-radius: 0.5rem;
    margin: 0.5rem;
    padding: 2rem 1.5rem;
`;
const CloseButon = styled(IconButton)`
    position: absolute;
    right: 0.5rem;
    top: 0rem;
    background-color: var(--color-none);
    margin: 0;
`;

function Dialog({ children, isOpened, onClose }) {
    const handleClose = () => {
        onClose(!isOpened);
    };
    return (
        <>
            {isOpened && <Backgroud onClick={handleClose} />}
            <StyledDialog open={isOpened}>
                <Container>
                    <CloseButon onClick={handleClose}>
                        <FiX />
                    </CloseButon>
                    {children}
                </Container>
            </StyledDialog>
        </>
    );
}
export default Dialog;
