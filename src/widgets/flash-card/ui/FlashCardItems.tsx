import { CardList, SearchCardItems, useUpsertFlow } from '@/features/flash-card';
import { AddCardButton } from '@/features/flash-card/ui/AddCardButton';
import Image from "next/image";

import styles from '@/styles/flashcard-block/flashcard.module.scss';


export const FlashCardItems = () => {
    const { cards } = useUpsertFlow();

    return (
        <div className={styles.block__cards}>
            <div className={styles.title}>Cards <span>({cards.length})</span></div>
            <SearchCardItems />
            {
                cards?.length
                    ?
                    <CardList cards={cards} />
                    :
                    <div className={styles.block__cards_empty}>
                        <Image
                            width={450}
                            height={300}
                            alt="no card yet"
                            src="/assets/no-card-yet.webp"
                            preload />
                    </div>
            }
            <AddCardButton />
        </div>
    );
};

