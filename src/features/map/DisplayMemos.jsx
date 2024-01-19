import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const StyledTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 700;
    color: var(--color-cyan-500);
    margin-top: 0.5rem;

    & p {
        flex: 1;
    }
    &:hover {
        box-shadow: 0px -2px 0px 0px var(--color-gray-200) inset;
    }
`;
const CountedLinks = styled.span`
    margin-right: 0.75rem;
    color: ${(props) => (props.$color ? 'var(--color-amber-500)' : 'var(--color-gray-400)')};
`;
const LinkedMemosContainer = styled.ul`
    display: flex;
    flex-direction: column;
    max-height: 40rem;
    margin-top: 0.5rem;
    gap: 0.5rem;

    overflow: auto;
    &::-webkit-scrollbar {
        display: none;
    }

    & li {
        list-style: none;
        border-radius: 0.5rem;
        border: 1px solid var(--color-border);
        padding: 0.5rem;

        &:hover {
            box-shadow: var(--box-shadow);
        }
    }
`;
const StylePre = styled.pre`
    white-space: pre-wrap;
`;
function DisplayMemos({ links }) {
    const memos = useSelector((state) => state.memos.memos);
    const [linkedMemos, setLinkedMemos] = useState('');
    const [showMemos, setShowMemos] = useState(false);

    useEffect(() => {
        setLinkedMemos(memos.filter((memo) => links.includes(memo.id)));
    }, []);

    function handleShowedMemos() {
        setShowMemos(!showMemos);
    }

    return (
        <>
            <StyledTitle onClick={handleShowedMemos}>
                <p>Memos Link</p>
                <CountedLinks $color={links.length > 0 ? true : false}>{links.length}</CountedLinks>
            </StyledTitle>
            {showMemos ? (
                <LinkedMemosContainer>
                    {linkedMemos.map((memolink, index) => (
                        <li key={index}>
                            <StylePre>{memolink.content}</StylePre>
                        </li>
                    ))}
                </LinkedMemosContainer>
            ) : null}
        </>
    );
}
export default DisplayMemos;
