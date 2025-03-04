import React, { useEffect, useState } from "react"

const Typewriter = ({text, delay, infinite}) => {

    const [currentText, setCurrentText] = useState('');
    const [currentIdx, setCurrentIdx] = useState(0);
    const [line, setLine] = useState([]);

    // logic behind the typing animation

    useEffect(() => {
        if (currentIdx < text.length) {
            const timeout = setTimeout(() => {
                const currentChar = text[currentIdx];

                // Check if the character is a newline
                if (currentChar === '\n') {
                    setLine(prevLine => [...prevLine, currentText]);
                    setCurrentText('');
                } else {
                    setCurrentText(prevText => prevText + currentChar);
                }

                setCurrentIdx(prevIdx => prevIdx + 1);
            }, delay);

            return () => clearTimeout(timeout);
        } else if (infinite) {
            const timeout = setTimeout(() => {
                setCurrentIdx(0);
                setCurrentText('');
                setLine([]);
            }, 5000);

            return () => clearTimeout(timeout);
        }
    }, [currentIdx, text, delay, infinite]);

    return (
        <span>
            {line.map((lineContent, index) => (
                <p key={index}>{lineContent}</p>
            ))}
            <p>{currentText}</p>
        </span>
    );
};


export default Typewriter;