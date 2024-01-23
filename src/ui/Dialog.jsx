import styled from 'styled-components';
import { FiX, FiArrowLeft } from 'react-icons/fi';
import IconButton from './IconButton';

const Overlay = styled.div`
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
    position: fixed;
    top: 50%;
    left: 50%;
    /* 由於對準點在容器左上角，因此將自身移回去 */
    transform: translate(-50%, -50%);
    background-color: var(--color-none);
    border: none;
    width: ${(props) => props.$width};
`;
const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 0.5rem;
    max-height: ${(props) => props.$maxHeight || '700px'};
    margin: 0.5rem;
`;

function Dialog({ children, isOpened = false, onClose, $width = 'min(30rem, 100%);' }) {
    const handleClose = () => {
        onClose(!isOpened);
    };
    return (
        <>
            {isOpened && <Overlay onClick={handleClose} />}
            <StyledDialog open={isOpened} $width={$width}>
                <Container>{children}</Container>
            </StyledDialog>
        </>
    );
}
const StyledClose = styled(IconButton)`
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
`;
function DialogCloseBtn({ isOpened, onClose }) {
    const handleClose = () => {
        onClose(!isOpened);
    };
    return (
        <StyledClose onClick={handleClose}>
            <FiX />
        </StyledClose>
    );
}
const StyledGoBack = styled(IconButton)`
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
`;
function DialogGoBackBtn({ onClick }) {
    return (
        <StyledGoBack onClick={onClick}>
            <FiArrowLeft />
        </StyledGoBack>
    );
}
const DialogTitle = styled.h3`
    text-align: center;
`;
const DialogHeader = styled.header`
    padding: 1rem 1.5rem 0.75rem;
    height: 60px;
    ${(props) => (props.$border ? ' border-bottom:1px solid var(--color-border)' : '')}
`;
const DialogContent = styled.div`
    height: 100%;
    overflow-y: auto;
`;
const ContentPadding = styled.div`
    padding: ${(props) => props.$padding || '1rem'};
`;
const DialogFooter = styled.footer`
    padding: 1rem;
`;

export {
    Dialog,
    DialogHeader,
    DialogContent,
    ContentPadding,
    DialogFooter,
    DialogTitle,
    DialogCloseBtn,
    DialogGoBackBtn,
};
