import { useState, useRef } from 'react';
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
} from '../../ui/Dialog';

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
`;
const Wrapper = styled.div`
    padding: 1rem;
`;
const Textarea = styled.textarea`
    resize: none;
    color: var(--color-gray-700);
    border: none;
    font-size: 1.5rem;
    width: 100%;
    height: ${(props) => (props.$height ? props.$height : '10rem')};

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

const AddMemo = ({ openAddCard = false, onClose }) => {
    const fileInputRef = useRef(null);
    const [content, setContent] = useState('');
    const [imgFiles, setImgFiles] = useState([]);
    const [locations, setLocations] = useState([]);
    const [contentHeight, setContentHeight] = useState(160);
    const [textareaHeight, setTextareaHeight] = useState('');

    const handleIconClick = (e) => {
        e.preventDefault(); //阻止打開檔案時關閉 Dialog
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            const newFiles = Array.from(files);
            setImgFiles((prevFiles) => [...prevFiles, ...newFiles]);
        }
    };

    function handleContent(e) {
        let contentScrollHeight = e.target.scrollHeight;

        setContent(e.target.value);

        if (contentScrollHeight > contentHeight) {
            setTextareaHeight(`${contentScrollHeight}px`);
            setContentHeight(contentScrollHeight);
        }
    }

    function handleImgDelete(index) {
        const updatedFiles = imgFiles.filter((_, i) => i !== index);
        setImgFiles(updatedFiles);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const dateCreated = new Date();

        console.log(content, imgFiles, locations, dateCreated);

        onClose(!openAddCard);
        setContent('');
        setImgFiles([]);
        setLocations([]);
    }
    return (
        <Dialog isOpened={openAddCard} onClose={onClose}>
            <DialogHeader $border>
                <DialogCloseBtn isOpened={openAddCard} onClose={onClose} />
                <DialogTitle>新增筆記</DialogTitle>
            </DialogHeader>
            <StyledForm onSubmit={handleSubmit}>
                <DialogContent>
                    <Wrapper>
                        <Textarea
                            $height={textareaHeight}
                            value={content}
                            onChange={handleContent}
                            placeholder="紀錄任何的小發現..."></Textarea>
                        {locations.length > 0 && (
                            <div>
                                <BorderContainer>地點</BorderContainer>
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
                    </Wrapper>
                </DialogContent>
                <DialogFooter>
                    <BorderContainer>
                        <IconButton onClick={handleIconClick} $color="var(--color-amber-500)">
                            <FiImage />
                        </IconButton>
                        <IconButton
                            onClick={() => console.log('map')}
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
                </DialogFooter>
            </StyledForm>
        </Dialog>
    );
};

export default AddMemo;
