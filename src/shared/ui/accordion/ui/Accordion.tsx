
import clsx from 'clsx';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ContextApi } from '../model/context.api';

import styles from '@/styles/blocks/accordion.module.scss';

const Accordion = ({ children }: { children: React.ReactNode }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);


    const handleToggleAccordion = (index: number) => {
        setActiveIndex(prev => prev === index ? null : index);
    }

    const transferValue = useMemo(() => ({ activeIndex, handleToggleAccordion }), [activeIndex]);

    return (
        <ContextApi.Provider value={transferValue}>
            <div className={styles.accordion}>{children}</div>
        </ContextApi.Provider>
    )
}

const AccordionItem = ({ title, index, children }: { title: string, index: number, children: React.ReactNode }) => {
    const { activeIndex, handleToggleAccordion } = useContext(ContextApi);
    const myRef = useRef<HTMLDivElement | null>(null);

    const isActive = activeIndex === index;

    useEffect(() => {
        const currentElem = myRef.current;
        if (!currentElem) return;

        if (isActive && myRef.current) {
            currentElem.style.maxHeight = `${currentElem.scrollHeight}px`;
        } else {
            currentElem.style.maxHeight = '0px';
        }
    }, [isActive]);


    return (
        <div className={styles.accordion__item}>
            <button
                className={styles.accordion__header}
                onClick={() => handleToggleAccordion(index)}
            >
                <span className={clsx('icon-right-open-big', { [styles.active]: isActive })}></span>
                <h2>{title}</h2>
            </button>
            <div className={styles.accordion__body} ref={myRef}>{children}</div>
        </div>
    );
}

AccordionItem.displayName = 'AccordionItem';
Accordion.Item = AccordionItem
export default Accordion