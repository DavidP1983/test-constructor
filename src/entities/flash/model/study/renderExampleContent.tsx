import type { RefObject } from 'react';
import sanitizeHtml from 'sanitize-html';

export const renderExampleContent = (
    card: "code" | "text" | "formula" | undefined,
    style: { className: string },
    myRef: RefObject<HTMLDivElement | null>,
    example: string) => {

    if (card === 'code') {
        return (
            <pre>
                <code
                    ref={myRef}
                    className={style.className}
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(example.replace(/^\s+/gm, '')) }}
                />
            </pre>
        )
    }

    if (card === 'formula' || card === 'text') {
        return <div
            ref={myRef}
            className={style.className}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(example.replace(/^\s+/gm, '')) }}
        />
    }

}

