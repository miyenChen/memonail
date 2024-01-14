import styled from 'styled-components';
import { FiMapPin, FiImage } from 'react-icons/fi';
import TagList from '../../ui/TagList';
import Tag from '../../ui/tag';
import Card from '../../ui/Card';

const StyledMemoList = styled(Card)`
    display: flex;
    align-items: center;
`;
const TextContainer = styled.div`
    flex: 1;
    height: 100%;
    margin-right: 0.75rem;

    & p:first-child {
        font-size: 0.875rem;
        width: 700;
    }
`;
const TagContainer = styled(TagList)`
    margin: 0.25rem 0 0.5rem;
    & li {
        color: var(--color-amber-400);
        border-color: var(--color-amber-400);
    }
`;
const ImgContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-gray-200);
    border-radius: 0.25rem;
    width: 5rem;
    height: 5rem;
`;
const LocationContainer = styled.div`
    display: flex;
    border-top: var(--divider);
    margin-top: 0.5rem;
    gap: 0.5rem;
`;
const LocationItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.25rem;

    & p {
        padding: 0.25rem 0;
        font-size: 0.875rem;
    }
    & svg {
        color: var(--color-red-500);
    }
`;

function MemoListCard({ dateCreated = '', content = '', locations = [], imgfiles = [] }) {
    const regex = /#([\p{L}\d]+)/gu;
    const matches = [...content.matchAll(regex)];
    const tags = matches.map((match) => match[1]);
    const newText = content.replace(regex, '');

    return (
        <StyledMemoList>
            <TextContainer>
                <p>{dateCreated}</p>
                <TagContainer>
                    {tags.map((tag, index) => (
                        <Tag key={index}>{tag}</Tag>
                    ))}
                </TagContainer>
                <p>{newText}</p>
                {locations.length > 0 && (
                    <LocationContainer>
                        {locations.map((loction, index) => (
                            <LocationItem key={index}>
                                <FiMapPin />
                                <p>{loction}</p>
                            </LocationItem>
                        ))}
                    </LocationContainer>
                )}
            </TextContainer>
            <ImgContainer>
                {imgfiles.length === 0 ? (
                    <FiImage />
                ) : (
                    <img src={imgfiles[0] || ''} alt="" width="100%" />
                )}
            </ImgContainer>
        </StyledMemoList>
    );
}
export default MemoListCard;
