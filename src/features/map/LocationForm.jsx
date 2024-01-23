import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useReverseGeocode } from '../../hooks/useReverseGeocode';
import { FiEdit, FiCheckSquare } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import Rating from '../../ui/Rating';
import IconButton from '../../ui/IconButton';
import Alert from '../../ui/Alert';
import { addLocation } from './locationsSlice';
import { useNavigate } from 'react-router-dom';
import { setMapFloatHeight } from './mapsSlice';

const StyledLoactionForm = styled(Form)`
    height: 100%;
    gap: 0.75rem;
`;
const StyledAddress = styled.div`
    color: var(--color-cyan-500);
`;
const StyledInput = styled(Input)`
    font-size: 1.2rem;
`;
const Flex = styled.div`
    display: flex;
    align-items: center;
    gap: ${(props) => props.$gap};
`;
function LocationForm() {
    const navigate = useNavigate();
    const position = useSelector((state) => state.maps.curPosition);
    const apiAddress = useReverseGeocode();
    const dispatch = useDispatch();
    const [rating, setRating] = useState(0);
    const [content, setContent] = useState('');
    const [address, setAddress] = useState(apiAddress);
    const [mode, setMode] = useState('view');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        dispatch(setMapFloatHeight('auto'));
    }, []);

    const handleEditAddress = () => {
        setMode('edit');
        //複製當前位置的地址：如果之前有更改過地址，會造成先前地址與當前位置的地址不同步
        setAddress(apiAddress);
    };
    const handleUpdateAddress = () => {
        setMode('view');
    };
    const handleInputChange = (e) => {
        setAddress(e.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
        if (!content) {
            setErrorMsg('請輸入地點名稱');
            return;
        }
        let dateCreated = new Date();
        dateCreated = dateCreated.toLocaleDateString();

        const id = uuidv4();
        const newLocation = { id, dateCreated, position, address, rating, content, memosID: [] };
        console.log(newLocation);

        dispatch(addLocation(newLocation));
        navigate('/home');
        // setRating(0);
        // setContent('');
        // setAddress('');
    }
    return (
        <StyledLoactionForm onSubmit={handleSubmit}>
            {errorMsg && <Alert $variation="error">{errorMsg}</Alert>}
            <p>{apiAddress}</p>
            <StyledAddress>
                <p>儲存的地址：</p>
                <Flex $gap=".25rem">
                    {mode === 'view' ? (
                        <span>{address || apiAddress}</span>
                    ) : (
                        <Input type="text" value={address} onChange={handleInputChange} $w100 />
                    )}
                    <IconButton
                        onClick={mode === 'view' ? handleEditAddress : handleUpdateAddress}
                        $iconSize="1rem">
                        {mode === 'view' ? <FiEdit /> : <FiCheckSquare />}
                    </IconButton>
                </Flex>
            </StyledAddress>
            <Rating onSetRating={setRating} />
            <StyledInput
                placeholder="#tag 添加標籤和地點名稱..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <Button type="submit">添加地點</Button>
        </StyledLoactionForm>
    );
}
export default LocationForm;
