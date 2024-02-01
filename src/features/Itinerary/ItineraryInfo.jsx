import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FiCalendar, FiChevronDown, FiChevronUp } from 'react-icons/fi';
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
import PlanStatus from './PlanStatus';
import ItineraryLocList from './ItineraryLocList';
import { setCurPosition, setMapFloatHeight, updatePositionList } from '../map/mapsSlice';
import { addItinerary, updateItinerary } from './itinerarySlice';

const StyledContainer = styled.main`
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;
const StyledHeader = styled.header`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
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

function ItineraryInfo() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = useSelector((state) => state.itinerarys.itinerarys);
    const dataType = useSelector((state) => state.itinerarys.dataType);

    //edit, loc, view
    const [mode, setMode] = useState('edit');
    const [closeFloat, setCloseFloat] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false);
    const [activeDay, setActiveDay] = useState(0);
    const [title, setTitle] = useState('新行程計畫');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [totalDays, setTotalDays] = useState(1);
    const [schedules, setSchedules] = useState([]);
    const [status, setStatus] = useState('Todo');
    const [favorite, setFavorite] = useState(false);
    const [dateCreated, setDateCreated] = useState(new Date().toLocaleDateString());
    const { id } = useParams();

    useEffect(() => {
        //點擊已創建的行程時，帶入相關資料
        if (dataType === 'already') {
            setMode('view');
            const match = data.find((item) => item.id === id);
            const storedStartDate = new Date(match.startDate);
            const storedEndDate = new Date(match.endDate);
            const locPos = match.schedules.map((item) => item.locInfo);

            if (locPos.length > 0) {
                dispatch(setCurPosition(locPos[0].position));
                dispatch(updatePositionList(locPos));
            }

            //將相應資料設定到狀態中
            setTitle(match.title);
            setStartDate(storedStartDate);
            setEndDate(storedEndDate);
            setTotalDays(match.totalDays);
            setSchedules(match.schedules);
            setStatus(match.status);
            setFavorite(match.favorite);
            setDateCreated(match.dateCreated);
        }

        return () => {
            dispatch(updatePositionList([]));
        };
    }, []);

    // 添加地點時，更新 map 座標顯示，並將畫面中心設在第一個地點
    useEffect(() => {
        const locList = schedules.map((item) => item.locInfo);
        if (locList.length > 0) {
            dispatch(setCurPosition(locList[0].position));
            dispatch(updatePositionList(locList));
        }

        return () => {
            dispatch(updatePositionList([]));
        };
    }, [schedules]);

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
        let newItinerary = {
            id: id,
            status: status,
            title: title,
            dateCreated: dateCreated,
            startDate: startDate.toLocaleDateString(),
            endDate: endDate.toLocaleDateString(),
            totalDays: totalDays,
            schedules: schedules,
            favorite: favorite,
        };
        if (dataType === 'new') {
            dispatch(addItinerary(newItinerary));
            navigate('/itinerary');
        }
        if (dataType === 'already') {
            dispatch(updateItinerary(newItinerary));
            setMode('view');
        }
    }
    return (
        <StyledContainer>
            <StyledHeader>
                <Flex $justifyC="space-between">
                    <PlanStatus onSetStatus={setStatus} mode={mode} />
                    {mode === 'view' && (
                        <Button onClick={() => setMode('edit')} $size="small">
                            編輯
                        </Button>
                    )}
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

                {mode === 'view' && <h1>{title}</h1>}
                {mode !== 'view' && (
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                )}

                <Flex>
                    {mode === 'view' && (
                        <p>
                            <span>{startDate.toLocaleDateString()}</span>
                            <span> ~ </span>
                            <span>{endDate.toLocaleDateString()}</span>
                        </p>
                    )}
                    {mode !== 'view' && (
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
                    )}
                    <div>總天數：{totalDays}</div>
                </Flex>
            </StyledHeader>
            {!closeFloat && (
                <StyledContent>
                    {mode === 'loc' ? (
                        <ItineraryLocList
                            activeDay={activeDay}
                            setSchedules={setSchedules}
                            onSetMode={setMode}
                        />
                    ) : (
                        <>
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
                                mode={mode}
                            />
                        </>
                    )}
                </StyledContent>
            )}
        </StyledContainer>
    );
}
export default ItineraryInfo;
