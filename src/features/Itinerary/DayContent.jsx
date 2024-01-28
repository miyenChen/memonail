import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import styled from 'styled-components';
import Flex from '../../ui/Flex';
import IconButton from '../../ui/IconButton';
import Button from '../../ui/Button';

const StyledDayContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;
const StyledLoc = styled.div`
    width: 100%;
    border: 1px solid var(--color-cyan-500);
    border-radius: 0.5rem;
    padding: 0.5rem;
`;
const StyledTime = styled.span`
    color: var(--color-amber-500);
    margin-left: 0.5rem;
    cursor: pointer;
`;
function DayContent({ activeDay, startDate, setSchedules, schedules, setMode, mode }) {
    const [timeline, setTimeline] = useState([]);
    const [date, setDate] = useState('');

    //取得目前編輯日期的地點
    useEffect(() => {
        if (schedules && schedules.length > 0) {
            const info = schedules.filter((item) => item.day === activeDay);
            setTimeline(info);
        }
    }, [activeDay, schedules]);

    //取得單日的日期
    useEffect(() => {
        function formatDate(dateString, offsetDays) {
            const date = new Date(
                new Date(dateString).setDate(new Date(dateString).getDate() + offsetDays)
            );
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });

            return `${month}/${day} (${weekday})`;
        }
        setDate(formatDate(startDate, activeDay));
    }, [startDate, activeDay]);

    function handleDeleteLoc(index) {
        const updateLoc = timeline.filter((item, i) => i !== index);
        setSchedules(updateLoc);
    }

    function handleTimeClick(index) {
        if (mode === 'edit') {
            const newTime = prompt('請輸入新的時間');

            if (newTime) {
                setSchedules((pre) => {
                    const data = [...pre];
                    data[index] = { ...data[index], time: newTime };
                    return data;
                });
            }
        }
    }

    return (
        <StyledDayContent>
            <Flex $justifyC="space-between">
                <Flex>
                    <h4>第{activeDay + 1}天</h4>
                </Flex>
                <p>{date}</p>
            </Flex>

            {timeline &&
                timeline.map((loc, index) => (
                    <div key={index}>
                        <StyledLoc>
                            <Flex $justifyC="space-between">
                                <p>
                                    預計時間
                                    <StyledTime onClick={() => handleTimeClick(index)}>
                                        {loc.time}
                                    </StyledTime>
                                </p>
                                {mode === 'edit' && (
                                    <IconButton onClick={() => handleDeleteLoc(index)}>
                                        <FiX />
                                    </IconButton>
                                )}
                            </Flex>
                            <h3>{loc.locInfo.name}</h3>
                            <p>{loc.locInfo.address}</p>
                        </StyledLoc>
                    </div>
                ))}
            {mode === 'edit' && (
                <Button $w100 onClick={() => setMode('loc')}>
                    增加景點
                </Button>
            )}
        </StyledDayContent>
    );
}
export default DayContent;
