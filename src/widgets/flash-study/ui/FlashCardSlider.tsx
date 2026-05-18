/* eslint-disable @next/next/no-img-element */
import { FlashCardsType } from '@/entities/flash-card/model/types/card.types';
import { SliderCardExample, SliderNavigationButtons, SliderRepetitionButtons, SliderSoundButtons, useSliderLogic } from '@/features/flash-study';
import Accordion from '@/shared/ui/accordion/ui/Accordion';
import { AnimatePresence, motion } from 'motion/react';
import sanitizeHtml from 'sanitize-html';
import { CollectStatusProps } from '../model/types/flash.study.types';

import styles from '@/styles/flashcard-block/flashcard.module.scss';


interface Props extends CollectStatusProps {
    cards: FlashCardsType[];
}

export const FlashCardSlider = ({ cards, setCollectStatus, collectStatus }: Props) => {

    const {
        myRef,
        card,
        cloned,
        volume,
        setVolume,
        handleCloneExample,
        handleCollectStatus,
        handleDragEdn,
        currentCardIndex,
        handleNext,
        handlePrev,
        status
    } = useSliderLogic({ cards, setCollectStatus, collectStatus });

    const sanitized = sanitizeHtml(card.answer.replace(/^\s+/gm, '')) ?? '';


    return (

        <motion.div
            key="slider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}>

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
                                <SliderSoundButtons
                                    setVolume={setVolume}
                                    volume={volume}
                                    card={card} />
                                {
                                    card?.img && (
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
                                    handleCollectStatus={handleCollectStatus}
                                />
                                <div className={styles.block__study_answer}>
                                    <Accordion>
                                        <Accordion.Item
                                            title='Show Answer'
                                            index={0}>
                                            <p
                                                className={styles.answer__content}
                                                dangerouslySetInnerHTML={{ __html: sanitized }}>
                                            </p>

                                            {card?.example &&
                                                (

                                                    <SliderCardExample
                                                        card={card}
                                                        myRef={myRef}
                                                        cloned={cloned}
                                                        handleCloneExample={handleCloneExample} />
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

        </motion.div>

    );
}