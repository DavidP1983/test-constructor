import { FlashCardsType } from '@/entities/flash-card/model/types/card.types';
import { IconButton } from '@/shared/ui';
import { useShallow } from 'zustand/shallow';
import { useFlashCardStore, useUpsertFlow } from '../../model';

import styles from '@/styles/flashcard-block/flashcard.module.scss';

export const CardItemActions = ({ card }: { card: FlashCardsType }) => {
    const { deleteCardMutation, mode } = useUpsertFlow();
    const { setCardFieldsData, clearCardFields } = useFlashCardStore(useShallow((state) => ({
        setCardFieldsData: state.setCardFieldsData,
        clearCardFields: state.clearCardFields
    })));


    return (
        <div className={styles.icons}>
            {
                mode === 'edit' && (
                    <IconButton
                        className=''
                        ariaLabel='Edit card'
                        dataAttr='Edit'
                        icon={'icon-pencil'}
                        onClick={() => setCardFieldsData(card)} />
                )
            }
            <IconButton
                className=''
                ariaLabel={'Delete card'}
                icon={'icon-trash-empty'}
                dataAttr='Delete'
                onClick={() => {
                    deleteCardMutation(card._id);
                    clearCardFields();
                }} />
        </div>
    );
}

