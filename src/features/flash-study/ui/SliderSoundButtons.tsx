import { FlashCardsType } from '@/entities/flash-card/model/types/card.types';
import { IconButton } from '@/shared/ui';
import clsx from 'clsx';
import type { Dispatch, SetStateAction } from 'react';
import { soundSpeechText } from '../model/utils';

import styles from '@/styles/flashcard-block/flashcard.module.scss';


interface Props {
    card: FlashCardsType;
    setVolume: Dispatch<SetStateAction<"on" | "off">>;
    volume: "on" | "off";
}


export const SliderSoundButtons = ({ card, setVolume, volume }: Props) => {


    const classNameVolumeOn = clsx({
        [styles.volume_on]: true,
        [styles.play]: volume === 'on'
    });
    const classNameVolumeOff = clsx({
        [styles.volume_off]: true,
        [styles.play]: volume === 'off'
    });


    return (
        <div className={styles.block__study_question}>
            <h3 className={styles.block__study_title}>{card.question}</h3>
            <div className={styles.block__study_sound}>
                <IconButton
                    icon='icon-volume'
                    className={classNameVolumeOn}
                    ariaLabel='volume on'
                    title='volume on'
                    onClick={() => {
                        soundSpeechText(card.question, card.lang);
                        setVolume('on');
                    }} />
                <IconButton
                    icon='icon-volume-off'
                    className={classNameVolumeOff}
                    ariaLabel='volume off'
                    title='volume off'
                    onClick={() => setVolume('off')} />
            </div>
        </div>

    );
}


// <div className={styles.block__study_question}>
//     <h3 className={styles.block__study_title}>{card.question}</h3>
//     <SliderSoundButtons
//         question={card.question}
//         lang={card.lang}
//         setVolume={setVolume}
//         volume={volume} />
// </div>
