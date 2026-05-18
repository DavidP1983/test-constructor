import type { RefObject } from "react";
import sanitizeHtml from 'sanitize-html';

interface Props {
    card: "code" | "text" | "formula" | undefined;
    className: string;
    myRef: RefObject<HTMLDivElement | null>;
    example: string;
}

export const ExampleContent = ({ card, className, myRef, example }: Props) => {

    const sanitized = sanitizeHtml(example.replace(/^\s+/gm, '')) ?? '';

    if (card === 'code') {
        return (
            <pre>
                <code
                    ref={myRef}
                    className={className}
                    dangerouslySetInnerHTML={{ __html: sanitized }}
                />
            </pre>
        );
    }


    return (
        <div
            ref={myRef}
            className={className}
            dangerouslySetInnerHTML={{ __html: sanitized }}
        />
    );
}