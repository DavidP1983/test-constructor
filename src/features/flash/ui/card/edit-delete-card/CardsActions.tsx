import { FlashCardsType } from '@/entities/flash/types/flashTypes';
import { useFolderFormContext } from '@/features/flash/model/context/FolderFormContext';
import styles from '@/styles/flashcard-block/flashcard.module.scss';


export const CardsActions = ({ card }: { card: FlashCardsType }) => {
    const { handleDeleteCard, handleEditCard, mode } = useFolderFormContext();
    return (
        <div className={styles.icons}>
            {
                mode === 'create' && (<button
                    className="icon-pencil"
                    data-btn='Edit'
                    aria-label="Edit card"
                    onClick={() => handleEditCard(card)}></button>)
            }
            <button
                className="icon-trash-empty"
                data-btn='Delete'
                aria-label="Delete card"
                onClick={() => handleDeleteCard(card._id)}></button>
        </div>
    );
}

// () => {
//     if (mode === 'create') return;
//     handleEditCard(item)
//     setCurrentCardIndex(i)
// }}
