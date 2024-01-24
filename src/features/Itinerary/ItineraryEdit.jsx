import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FiCalendar, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import Flex from '../../ui/Flex';
import Button from '../../ui/Button';
import IconButton from '../../ui/IconButton';
import TagList from '../../ui/TagList';
import Tag from '../../ui/Tag';
import Input from '../../ui/Input';
import Alert from '../../ui/Alert';
import DayContent from './DayContent';
import ItineraryLocList from './ItineraryLocList';
import { setMapFloatHeight } from '../map/mapsSlice';
import { addItinerary } from './itinerarySlice';

const StyledContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;
const StyledStatus = styled.p`
    font-size: 0.875rem;
    border-radius: 0.5rem;
    border: 1px solid var(--color-cyan-500);
    color: var(--color-cyan-500);
    padding: 0.1rem 0.25rem;
    margin-right: 0.5rem;
`;
const StyledDatePicker = styled.div`
    flex-grow: 1;

    & input {
        outline: none;
        font-size: 1rem;
        border-radius: 0.5rem;
        border: 1px solid var(--color-none);
        width: 100%;
        padding: 0.4rem 1rem 0.4rem 2rem;

        &:focus {
            border: 1px solid var(--color-cyan-500);
        }
    }
`;
const StyledContent = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    border-top: 1px solid var(--color-border);
    padding-top: 0.75rem;
    gap: 0.5rem;
`;

const StyledIconBtn = styled(IconButton)`
    position: absolute;
    top: 0.5rem;
    left: 50%;
    transform: translate(-50%);
`;

function ItineraryEdit() {
    //edit, loc, show
    const [mode, setMode] = useState('edit');
    const [closeFloat, setCloseFloat] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false);
    const [title, setTitle] = useState('新行程計畫');
    const [activeDay, setActiveDay] = useState(0);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [totalDays, setTotalDays] = useState(1);
    const [schedules, setSchedules] = useState([]);
    const dispatch = useDispatch();

    //讓計算天數即時更新
    useEffect(() => {
        function DateDiff(D1, D2) {
            const day1 = new Date(D1);
            const day2 = new Date(D2);

            // 將日期部分標準化為同一天的 00:00:00，以防止時區影響
            day1.setHours(0, 0, 0, 0);
            day2.setHours(0, 0, 0, 0);

            const days = parseInt(Math.abs(day2 - day1) / (1000 * 60 * 60 * 24));
            return days + 1; //當天來回算一天
        }

        if (startDate && endDate) {
            setTotalDays(DateDiff(startDate, endDate));
        }
    }, [startDate, endDate]);

    //視窗初始高度
    useEffect(() => {
        dispatch(setMapFloatHeight('100%'));
    }, []);

    function handleChangeDate(dates) {
        let [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    }

    function handleFloatHeight() {
        setCloseFloat(!closeFloat);
        if (closeFloat) {
            dispatch(setMapFloatHeight('100%'));
        } else {
            dispatch(setMapFloatHeight('auto'));
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!startDate || !endDate) {
            setErrorVisible(true);
            setTimeout(() => {
                setErrorVisible(false);
            }, 5000);
            return;
        }

        const id = uuidv4();
        let dateCreated = new Date();
        dateCreated = dateCreated.toLocaleDateString();

        const newItinerary = {
            id: id,
            status: 'todo',
            title: title,
            img: '',
            dateCreated: dateCreated,
            dateStart: startDate.toLocaleDateString(),
            dateEnd: endDate.toLocaleDateString(),
            totalDays: totalDays,
            Schedules: schedules,
            favorite: 'false',
            shared: 'false',
            member: [],
        };

        dispatch(addItinerary(newItinerary));
    }
    return (
        <StyledContainer>
            <Flex $justifyC="space-between">
                <StyledStatus>計畫中</StyledStatus>
                {mode === 'show' && <Button $size="small">編輯</Button>}
                {mode === 'edit' && (
                    <Button onClick={handleSubmit} $size="small">
                        保存
                    </Button>
                )}

                {/* 控制浮窗高度 */}
                {closeFloat ? (
                    <StyledIconBtn onClick={handleFloatHeight}>
                        <FiChevronUp />
                    </StyledIconBtn>
                ) : (
                    <StyledIconBtn onClick={handleFloatHeight}>
                        <FiChevronDown />
                    </StyledIconBtn>
                )}
            </Flex>
            {errorVisible && <Alert $variation="error">請選擇行程日期</Alert>}

            {mode === 'show' && <h1>{title}</h1>}
            {mode === 'edit' && <Input value={title} onChange={(e) => setTitle(e.target.value)} />}

            <Flex>
                <StyledDatePicker>
                    <DatePicker
                        onChange={handleChangeDate}
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="yyyy/MM/dd"
                        selectsRange
                        placeholderText="開始日期 - 結束日期"
                        isClearable={true}
                        showIcon
                        icon={<FiCalendar />}
                    />
                </StyledDatePicker>
                <div>總天數：{totalDays}</div>
            </Flex>

            {!closeFloat && mode === 'edit' && (
                <StyledContent>
                    <TagList>
                        {totalDays ? (
                            Array.from({ length: totalDays }, (_, index) => (
                                <Tag
                                    key={index}
                                    className={activeDay === index ? 'active' : ''}
                                    onClick={() => setActiveDay(index)}>
                                    DAY {index + 1}
                                </Tag>
                            ))
                        ) : (
                            <p>請先選擇日期</p>
                        )}
                    </TagList>
                    <DayContent
                        activeDay={activeDay}
                        startDate={startDate}
                        schedules={schedules}
                        setSchedules={setSchedules}
                        setMode={setMode}
                    />
                </StyledContent>
            )}

            {!closeFloat && mode === 'loc' && (
                <StyledContent>
                    <ItineraryLocList
                        activeDay={activeDay}
                        setSchedules={setSchedules}
                        onSetMode={setMode}
                    />
                </StyledContent>
            )}
        </StyledContainer>
    );
}
export default ItineraryEdit;
