import { useState } from 'react';
import styled from 'styled-components';

const StyledCurStatus = styled.div`
    position: relative;
    font-size: 0.875rem;
    border-radius: 0.5rem;
    border: 1px solid var(--color-cyan-500);
    color: var(--color-cyan-500);
    padding: 0.1rem 0.25rem;
    margin-right: 0.5rem;
`;
const StyledList = styled.ul`
    position: absolute;
    left: 0.5rem;
    border-radius: 0.5rem;
    background-color: var(--color-gray-100);
    z-index: 99;
`;
const StyledListItem = styled.li`
    list-style: none;
    padding: 0.5rem;
    cursor: pointer;

    &:hover {
        color: var(--color-cyan-500);
    }
`;

const statusMapping = {
    'Todo': '計畫中',
    'Finish': '已完成',
};
function PlanStatus({ onSetStatus, mode }) {
    const [curStatus, setCurStatus] = useState('Todo');
    const [showList, setShowList] = useState(false);

    function handleChangeStatus(value) {
        if (mode === 'edit') {
            onSetStatus(value);
            setCurStatus(value);
            setShowList(false);
        }
    }
    return (
        <div>
            <StyledCurStatus onClick={(e) => setShowList(!showList)}>
                {statusMapping[curStatus]}
            </StyledCurStatus>
            {showList && (
                <StyledList>
                    {Object.keys(statusMapping).map((status) => (
                        <StyledListItem key={status} onClick={() => handleChangeStatus(status)}>
                            {statusMapping[status]}
                        </StyledListItem>
                    ))}
                </StyledList>
            )}
        </div>
    );
}
export default PlanStatus;
