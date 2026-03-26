import { useFolderFormContext } from '@/features/flash/model/context/FolderFormContext';
import styles from '@/styles/flashcard-block/flashcard.module.scss';

export const SearchCards = () => {
    const { setSearchQuestion } = useFolderFormContext();

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