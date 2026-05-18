import { FlashCardsType } from "@/entities/flash-card/model/types/card.types";
import { ExampleContent } from "@/entities/flash-study";
import { IconButton } from "@/shared/ui";
import clsx from "clsx";
import type { RefObject } from "react";

import styles from '@/styles/flashcard-block/flashcard.module.scss';

interface Props {
    cloned: boolean;
    handleCloneExample: () => Promise<void>;
    card: FlashCardsType;
    myRef: RefObject<HTMLDivElement | null>;
}

export const SliderCardExample = ({ card, myRef, cloned, handleCloneExample }: Props) => {

    return (
        <div className={styles.example}>
            <IconButton
                title='clone'
                ariaLabel='clone'
                icon={cloned ? 'icon-ok' : 'icon-clone'}
                className={clsx(styles.icons, cloned && styles.copied)}
                onClick={handleCloneExample} />
            <h4>Example</h4>
            <ExampleContent
                card={card.type}
                className={styles.type}
                myRef={myRef}
                example={card?.example ?? ''} />
        </div>
    );
}