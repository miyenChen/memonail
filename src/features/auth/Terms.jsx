import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';

function Terms() {
    const [content, setContent] = useState('');

    // markdown檔案位置
    const md = '/terms.md';
    useEffect(() => {
        fetch(md)
            .then((res) => res.text())
            .then((text) => setContent(text));
    }, []);
    return <Markdown children={content} />;
}
export default Terms;
