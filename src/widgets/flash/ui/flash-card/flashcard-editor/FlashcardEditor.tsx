import { useSearchCard } from '@/features/flash/model/card/useSearchCard';
import { useFolderFormContext } from '@/features/flash/model/context/FolderFormContext';
import { CardForm } from '@/features/flash/ui/card/card-form/CardForm';
import { useEffect } from 'react';
import { renderFlashcardEditorViewByMode } from './renderFlashcardEditorViewByMode';

import styles from '@/styles/flashcard-block/flashcard.module.scss';


export const FlashCardsEditor = () => {
    const {
        mode,
        folderData,
        searchQuestion,
        handleEditCard,
        navigationActions,
    } = useFolderFormContext();

    const { cards } = useSearchCard(searchQuestion, folderData);
    const { handleNext, handlePrev, currentCardIndex, setCurrentCardIndex } = navigationActions;

    const currentCard = cards[currentCardIndex];

    /* Благодаря useEffect подставляется нужная карточка с данными */
    useEffect(() => {
        if (currentCard && mode === 'edit') {
            handleEditCard(currentCard)
        }
    }, [currentCardIndex, currentCard]);


    /* Данный эффект необходим для корректного получения индекса и передвижения элемента на один назад при удалении*/
    useEffect(() => {
        if (currentCardIndex >= cards.length) {
            setCurrentCardIndex(prev => Math.max(prev - 1, 0));
        }
    }, [cards.length, currentCardIndex]);


    return (
        <div className={styles.block__editor}>

            {
                renderFlashcardEditorViewByMode(
                    {
                        mode,
                        handleNext,
                        handlePrev,
                        currentCardIndex,
                        length: cards.length
                    }
                )
            }

            <CardForm />

        </div>
    );
}