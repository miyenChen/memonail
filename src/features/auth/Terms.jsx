import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

function Terms() {
    const [content, setContent] = useState('');

    const md = '/terms.md';
    useEffect(() => {
        fetch(md)
            .then((res) => res.text())
            .then((text) => setContent(text));
    }, []);
    return <ReactMarkdown children={content} />;
}
export default Terms;
