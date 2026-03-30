import { soundSpeechText } from '@/features/flash/model/study/utils/soundSpeechText';
import clsx from 'clsx';
import type { Dispatch, SetStateAction } from 'react';

import styles from '@/styles/flashcard-block/flashcard.module.scss';


interface Props {
    question: string;
    lang: "ru" | "en" | "fr";
    setVolume: Dispatch<SetStateAction<"on" | "off">>;
    volume: "on" | "off";
}

export const SliderSoundButtons = ({ question, lang, setVolume, volume }: Props) => {


    const classNameVolumeOn = clsx({
        ['icon-volume']: true,
        [styles.volume_on]: true,
        [styles.play]: volume === 'on'
    });
    const classNameVolumeOff = clsx({
        ['icon-volume-off']: true,
        [styles.volume_off]: true,
        [styles.play]: volume === 'off'
    });


    return (
        <div className={styles.block__study_sound}>
            <button
                className={classNameVolumeOn}
                aria-label='volume on'
                title='volume on'
                onClick={() => {
                    soundSpeechText(question, lang);
                    setVolume('on');
                }} />
            <button
                className={classNameVolumeOff}
                aria-label='volume off'
                title='volume off'
                onClick={() => setVolume('off')} />
        </div>
    );
}