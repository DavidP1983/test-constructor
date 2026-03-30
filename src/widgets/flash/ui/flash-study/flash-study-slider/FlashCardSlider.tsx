/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { renderExampleContent } from '@/entities/flash/model/study/renderExampleContent';
import { FlashCardsType } from '@/entities/flash/types/flashTypes';
import { useCardNavigation } from '@/features/flash/model/cardNavigation/useCardNavigation';
import { SliderRepetitionButtons } from '@/features/flash/ui/study/repetition-button/SliderRepetitionButtons';
import { SliderNavigationButtons } from '@/features/flash/ui/study/slider-button/SliderNavigationButtons';
import { SliderSoundButtons } from '@/features/flash/ui/study/sound-button/SliderSoundButtons';
import Accordion from '@/shared/ui/accordion/ui/Accordion';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import sanitizeHtml from 'sanitize-html';

import styles from '@/styles/flashcard-block/flashcard.module.scss';


interface Props {
    cards: FlashCardsType[];
    setCollectStatus: Dispatch<SetStateAction<Record<string, "known" | "repeat">>>;
    collectStatus: Record<string, "known" | "repeat">;
}

export const FlashCardSlider = ({ cards, setCollectStatus, collectStatus }: Props) => {
    const [cloned, setCloned] = useState(false);
    const [volume, setVolume] = useState<'on' | 'off'>('off');

    const myRef = useRef<HTMLDivElement | null>(null);
    const timer = useRef<NodeJS.Timeout | null>(null);
    const navigationActions = useCardNavigation();

    const { handleNext, handlePrev, currentCardIndex } = navigationActions;

    const handleCloneExample = async () => {
        const elem = myRef.current;
        setCloned(true);
        if (elem) {
            await navigator.clipboard.writeText(elem.textContent);

            if (timer.current) {
                clearTimeout(timer.current);
            }
            timer.current = setTimeout(() => {
                setCloned(false);
            }, 3000);
        }
    };


    useEffect(() => {
        return () => {
            if (timer.current) {
                clearTimeout(timer.current)
            }
        }
    }, []);


    const handleCollectStatus = (status: 'known' | 'repeat') => {
        setCollectStatus(prev => ({
            ...prev,
            [card._id]: status
        }));
    }

    const handleDragEdn = (e: any, info: any) => {
        const swipeThreshold = 30;

        if (info.offset.x > swipeThreshold) {
            handlePrev();
        } else if (info.offset.x < -swipeThreshold) {
            handleNext(cards.length);
        }
    }

    const card = cards[currentCardIndex];
    const status = collectStatus[card._id] ?? null;

    return (
        <div className={styles.flashcard__actions}>
            <div className={styles.block__cards_wrapper}>

                <AnimatePresence mode='wait'>
                    <motion.div
                        layout
                        key={currentCardIndex}
                        drag='x'
                        onDragEnd={handleDragEdn}
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0}
                        initial={{ x: 30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -30, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ touchAction: 'pan-y' }}>

                        <div className={styles.block__study} key={card._id}>
                            <div className={styles.block__study_question}>
                                <h3 className={styles.block__study_title}>{card.question}</h3>
                                <SliderSoundButtons
                                    question={card.question}
                                    lang={card.lang}
                                    setVolume={setVolume}
                                    volume={volume} />
                            </div>
                            {
                                card.img && (
                                    <div className={styles.block__study_img}>
                                        <img
                                            src={card?.img ?? ''}
                                            width={100}
                                            height={100}
                                            alt='image from url' />
                                    </div>
                                )
                            }
                            <div className={styles.block__study_difficulty} title='difficulty'>{card.difficulty}</div>
                            <SliderRepetitionButtons
                                card={card}
                                answerStatus={status}
                                collectStatus={handleCollectStatus}
                            />
                            <div className={styles.block__study_answer}>
                                <Accordion>
                                    <Accordion.Item
                                        title='Show Answer'
                                        index={0}>
                                        <p
                                            className={styles.answer__content}
                                            dangerouslySetInnerHTML={{ __html: sanitizeHtml(card.answer) }}>
                                        </p>

                                        {
                                            card.example &&
                                            (
                                                <div className={styles.example}>
                                                    <button
                                                        title='clone'
                                                        aria-label='clone'
                                                        className={clsx(cloned ? 'icon-ok' : 'icon-clone', styles.icons, cloned && styles.copied)}
                                                        onClick={handleCloneExample} />
                                                    <h4>Example</h4>
                                                    {renderExampleContent(card.type, { className: styles.type }, myRef, card.example)}
                                                </div>
                                            )
                                        }
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <SliderNavigationButtons
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                    currentCardIndex={currentCardIndex}
                    length={cards.length}
                    card={card}
                    volume={volume} />
            </div>
        </div>
    );
}