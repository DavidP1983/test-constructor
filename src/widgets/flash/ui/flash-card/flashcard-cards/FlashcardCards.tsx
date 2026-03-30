import { CardList } from '@/entities/flash/ui/card/card-list/CardList';
import { useSearchCard } from '@/features/flash/model/card/useSearchCard';
import { useFolderFormContext } from '@/features/flash/model/context/FolderFormContext';
import { AddCard } from '@/features/flash/ui/card/add-card/AddCard';
import { SearchCards } from '@/features/flash/ui/card/search-cards/SearchCards';
import Image from "next/image";

import styles from '@/styles/flashcard-block/flashcard.module.scss';


export const FlashcardCards = () => {
    const { searchQuestion, folderData } = useFolderFormContext();
    const { cards } = useSearchCard(searchQuestion, folderData);

    return (
        <div className={styles.block__cards}>
            <div className={styles.title}>Cards <span>({cards.length})</span></div>
            <SearchCards />
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
                            src="/assets/no-card-yet.webp" />
                    </div>
            }
            <AddCard />
        </div>
    );
};

