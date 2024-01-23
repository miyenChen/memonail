import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addMemo } from './memosSlice';
import { updateMemosID } from '../map/locationsSlice';
import { v4 as uuidv4 } from 'uuid';
import { FiImage, FiMapPin, FiX } from 'react-icons/fi';
import styled from 'styled-components';
import IconButton from '../../ui/IconButton';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import {
    Dialog,
    DialogHeader,
    DialogContent,
    DialogFooter,
    DialogCloseBtn,
    DialogTitle,
    DialogGoBackBtn,
    ContentPadding,
} from '../../ui/Dialog';
import AddMemoLocations from './AddMemoLocations';

const StyledForm = styled(Form)`
    max-height: 640px;
`;
const BorderContainer = styled.div`
    display: flex;
    align-items: center;
    border-radius: 0.25rem;
    border: 1px solid var(--color-border);
    padding: 0.5rem;
    margin-bottom: 0.75rem;
    gap: 0.25rem;

    & p {
        width: 100%;
    }
`;
const Textarea = styled.textarea`
    resize: none;
    color: var(--color-gray-700);
    border: none;
    font-size: 1.5rem;
    width: 100%;
    height: ${(props) => (props.$height ? props.$height : '10.5rem')};

    &::placeholder {
        color: var(--color-gray-400);
        font-size: 1.5rem;
    }
    &:focus {
        outline: none;
        color: var(--color-gray-700);
        font-size: 1.5rem;
    }
`;
const ImgList = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
`;
const ImgListItem = styled.li`
    position: relative;
    list-style: none;
    & div {
        position: absolute;
        top: 0.25rem;
        right: 0.25rem;
    }
`;

const AddMemo = ({ isOpened = false, onClose }) => {
    const fileInputRef = useRef(null);
    const [content, setContent] = useState('');
    const [imgFiles, setImgFiles] = useState([]);
    const [locationsID, setLocationsID] = useState([]);
    const [textareaHeight, setTextareaHeight] = useState('');
    const [step, setStep] = useState('primary');
    const [selectedLoc, setSelectedLoc] = useState([]);

    const dispatch = useDispatch();

    function handleReturnPrimary() {
        setStep('primary');
    }
    function handleOpenAddImg(e) {
        e.preventDefault(); //阻止打開檔案時關閉 Dialog
        fileInputRef.current.click(); //將icon點擊的指向到input
    }
    function handleFileChange(e) {
        const files = e.target.files;
        if (files.length > 0) {
            const newFile = files[0];
            setImgFiles((img) => [...img, newFile]);
        }
    }
    function handleContent(e) {
        //取得內容和取得換行次數
        const value = e.target.value;
        const reg = new RegExp('\n', 'gm');
        const matchText = value.match(reg);
        setContent(value);

        if (matchText && matchText.length > 5) {
            //大於初始高度時，多的行數 *增加的高度
            const newHeight = (matchText.length - 5) * 1.75 + 10.5;
            setTextareaHeight(`${newHeight}rem`);
        } else {
            setTextareaHeight(`10.5rem`);
        }
    }
    function handleLocDelete(index) {
        const newLoc = selectedLoc.filter((_, i) => i !== index);
        setSelectedLoc(newLoc);
    }
    function handleImgDelete(index) {
        const updatedFiles = imgFiles.filter((_, i) => i !== index);
        setImgFiles(updatedFiles);
    }
    function handleAddPositions() {
        const saveID = selectedLoc.map((item) => item.id);
        console.log(saveID);
        setLocationsID(saveID);
        handleReturnPrimary();
    }
    function handleSubmit(e) {
        e.preventDefault();
        let dateCreated = new Date();
        dateCreated = dateCreated.toLocaleDateString();

        const id = uuidv4();
        const newMemo = { id, content, locationsID, dateCreated };
        const updateLocations = { id, locationsID };
        dispatch(addMemo(newMemo));
        dispatch(updateMemosID(updateLocations));
        console.log(newMemo);
        onClose(!isOpened);
        setContent('');
        setImgFiles([]);
        setLocationsID([]);

        //文字框高度初始化
        setTextareaHeight('');
    }

    return (
        <Dialog isOpened={isOpened} onClose={onClose}>
            <DialogHeader $border>
                <DialogCloseBtn isOpened={isOpened} onClose={onClose} />
                {step === 'primary' && <DialogTitle>新增筆記</DialogTitle>}
                {step === 'addPosition' && (
                    <>
                        <DialogGoBackBtn onClick={handleReturnPrimary} />
                        <DialogTitle>地點</DialogTitle>
                    </>
                )}
            </DialogHeader>
            <StyledForm onSubmit={handleSubmit}>
                <DialogContent>
                    <ContentPadding>
                        {step === 'primary' && (
                            <>
                                <Textarea
                                    $height={textareaHeight}
                                    value={content}
                                    onChange={handleContent}
                                    placeholder="#tag 紀錄任何的小發現..."></Textarea>
                                {selectedLoc.length > 0 && (
                                    <div>
                                        {selectedLoc.map((location, index) => (
                                            <BorderContainer key={index}>
                                                <p>{location.name}</p>
                                                <IconButton
                                                    onClick={() => handleLocDelete(index)}
                                                    $bg="var(--color-gray-0)">
                                                    <FiX />
                                                </IconButton>
                                            </BorderContainer>
                                        ))}
                                    </div>
                                )}
                                {imgFiles.length > 0 && (
                                    <BorderContainer>
                                        <ImgList>
                                            {imgFiles.map((file, index) => (
                                                <ImgListItem key={index} $column={true}>
                                                    <IconButton
                                                        onClick={() => handleImgDelete(index)}
                                                        $bg="var(--color-gray-0)">
                                                        <FiX />
                                                    </IconButton>
                                                    <img
                                                        width="100%"
                                                        src={URL.createObjectURL(file)}
                                                        alt={`Uploaded ${index + 1}`}
                                                    />
                                                </ImgListItem>
                                            ))}
                                        </ImgList>
                                    </BorderContainer>
                                )}
                            </>
                        )}
                        {step === 'addPosition' && (
                            <AddMemoLocations onSetSelected={setSelectedLoc} />
                        )}
                    </ContentPadding>
                </DialogContent>
                <DialogFooter>
                    {step === 'primary' && (
                        <>
                            <BorderContainer>
                                <IconButton
                                    onClick={handleOpenAddImg}
                                    $color="var(--color-amber-500)">
                                    <FiImage />
                                </IconButton>
                                <IconButton
                                    onClick={() => setStep('addPosition')}
                                    $color="var(--color-red-500)">
                                    <FiMapPin />
                                </IconButton>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                            </BorderContainer>
                            <Button type="submit" $w100>
                                新增
                            </Button>
                        </>
                    )}

                    {step === 'addPosition' && (
                        <Button type="button" onClick={handleAddPositions} $w100>
                            添加地點 x {selectedLoc.length}
                        </Button>
                    )}
                </DialogFooter>
            </StyledForm>
        </Dialog>
    );
};

export default AddMemo;
