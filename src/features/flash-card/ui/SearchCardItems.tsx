import { useFlashCardStore } from '../model';

import styles from '@/styles/flashcard-block/flashcard.module.scss';

export const SearchCardItems = () => {
    const setSearchQuestion = useFlashCardStore(state => state.setSearchQuestion);

    return (
        <div className={styles.block__cards_search}>
            <span className="icon-search"></span>
            <input
                type="search"
                placeholder="Search cards..."
                onChange={(e) => setSearchQuestion(e.target.value)} />
        </div>
    );
}