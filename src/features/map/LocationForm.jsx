import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useReverseGeocode } from '../../hooks/useReverseGeocode';
import { FiEdit, FiCheckSquare } from 'react-icons/fi';
import styled from 'styled-components';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import Rating from '../../ui/Rating';
import IconButton from '../../ui/IconButton';
import Alert from '../../ui/Alert';
import Flex from '../../ui/Flex';
import TagList from '../../ui/TagList';
import Tag from '../../ui/Tag';
import { setMapFloatHeight, toggleEditPosition } from './mapsSlice';
import { addLocation, updateLocEditMode, updateLocation } from './locationsSlice';
import DisplayMemos from './DisplayMemos';

const StyledLoaction = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    gap: 0.75rem;
`;
const StyledAddress = styled.div`
    color: var(--color-cyan-500);
`;
const StyledLocView = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;
const StyledTag = styled(Tag)`
    color: var(--color-amber-400);
    border-color: var(--color-amber-400);
`;
const StyledViewBtns = styled(Flex)`
    position: absolute;
    top: -2rem;
    right: 0;
`;
const DeleteBtn = styled(Button)`
    background-color: var(--color-gray-400);
`;

function LocationForm() {
    const id = useSelector((state) => state.locations.curLocID);
    const locData = useSelector((state) => state.locations.locations);
    const locEditMode = useSelector((state) => state.locations.locEditMode);
    const position = useSelector((state) => state.maps.curPosition);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const apiAddress = useReverseGeocode();

    const [errorMsg, setErrorMsg] = useState('');
    const [addressMode, setAddressMode] = useState('view');
    //新地點、已有地點共通數值
    const [rating, setRating] = useState(0);
    const [content, setContent] = useState('');
    const [address, setAddress] = useState(apiAddress);
    //僅供已有地點設定數值
    const [name, setName] = useState('');
    const [tags, setTags] = useState([]);
    const [links, setLinks] = useState([]);

    useEffect(() => {
        const loc = locData.find((data) => data.id === id);
        if (loc) {
            const {
                locName = loc.name,
                locTags = loc.tags,
                locAddress = loc.address,
                locRating = loc.rating,
                locContent = loc.content,
                locLinks = loc.memosID,
            } = loc;

            setName(locName);
            setTags(locTags);
            setAddress(locAddress);
            setRating(locRating);
            setContent(locContent);
            setLinks(locLinks);

            dispatch(updateLocEditMode('view'));
        }

        dispatch(setMapFloatHeight('auto'));
        setAddress(apiAddress);
    }, [locData, id]);

    useEffect(() => {
        if (locEditMode !== 'view') {
            dispatch(toggleEditPosition(false));
        } else {
            dispatch(toggleEditPosition(true));
        }

        // 在組件卸載時切換回無法編輯模式
        return () => {
            dispatch(toggleEditPosition(false));
        };
    }, [locEditMode]);

    const handleEditAddress = () => {
        setAddressMode('edit');
        //複製當前位置的地址：如果之前有更改過地址，會造成先前地址與當前位置的地址不同步
        setAddress(apiAddress);
    };
    const handleUpdateAddress = () => {
        setAddressMode('view');
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };
    function handleDelete() {
        const confirmed = window.confirm('確認刪除');
        if (confirmed) {
            //deleteLocation刪除地點本身，deleteLocationsID刪除 memo 中的地點
            dispatch(deleteLocation(id));
            dispatch(deleteLocationsID(id));

            window.alert('刪除成功，將導向至首頁');
            navigate('/home', { replace: true });
        } else {
            console.log('取消');
        }
    }

    function handleUpdateLoc() {
        const newData = { id, position, address, rating, content };

        dispatch(updateLocation(newData));
    }
    function handleSubmit(e) {
        e.preventDefault();
        if (!content) {
            setErrorMsg('請輸入地點名稱');
            return;
        }

        let dateCreated = new Date();
        dateCreated = dateCreated.toLocaleDateString();

        const newLocation = {
            id,
            dateCreated,
            position,
            address,
            rating,
            content,
            memosID: [],
        };

        dispatch(addLocation(newLocation));
        navigate('/home');
    }
    return (
        <StyledLoaction>
            {locEditMode === 'view' ? (
                <>
                    <StyledLocView>
                        <TagList>
                            {tags.map((tag, index) => (
                                <StyledTag key={index}>{tag}</StyledTag>
                            ))}
                        </TagList>
                        <h3>{name}</h3>
                        <Rating defaultRating={rating} />
                        <DisplayMemos links={links} />
                    </StyledLocView>

                    <StyledViewBtns>
                        <DeleteBtn $size="small" onClick={handleDelete}>
                            刪除
                        </DeleteBtn>
                        <Button $size="small" onClick={() => dispatch(updateLocEditMode('edit'))}>
                            編輯
                        </Button>
                    </StyledViewBtns>
                </>
            ) : (
                <>
                    {errorMsg && <Alert $variation="error">{errorMsg}</Alert>}
                    <p>{apiAddress}</p>
                    <StyledAddress>
                        <p>儲存的地址：</p>
                        <Flex $gap=".25rem">
                            {addressMode === 'view' ? (
                                <span>{address || apiAddress}</span>
                            ) : (
                                <Input
                                    type="text"
                                    value={address}
                                    onChange={handleAddressChange}
                                    $w100
                                />
                            )}
                            <IconButton
                                onClick={
                                    addressMode === 'view' ? handleEditAddress : handleUpdateAddress
                                }
                                $iconSize="1rem">
                                {addressMode === 'view' ? <FiEdit /> : <FiCheckSquare />}
                            </IconButton>
                        </Flex>
                    </StyledAddress>
                    <Rating defaultRating={rating} onSetRating={setRating} />
                    <Input
                        placeholder="#tag 添加標籤和地點名稱..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        $fz=" 1.2rem"
                    />
                </>
            )}
            {locEditMode === 'edit' && (
                <Flex>
                    <Button type="button" onClick={() => dispatch(updateLocEditMode('view'))} $w100>
                        取消
                    </Button>
                    <Button type="button" onClick={handleUpdateLoc} $w100>
                        更新
                    </Button>
                </Flex>
            )}
            {locEditMode === 'add' && (
                <Button type="button" onClick={handleSubmit}>
                    添加地點
                </Button>
            )}
        </StyledLoaction>
    );
}
export default LocationForm;
