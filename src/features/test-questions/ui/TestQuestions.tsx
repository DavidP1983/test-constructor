'use client';
import { AddQuestion } from '@/features/test-actions/add-question/ui/AddQuestion';
import { AllTests } from '@/shared/types/test-type';
import { DragDropContext, Draggable, DraggableStyle, Droppable } from '@hello-pangea/dnd';
import clsx from 'clsx';
import { CSSProperties } from 'react';
import { useReorderQuestions } from '../model/useReorderQuestions';
import { TestQuestionItem } from './TestQuestionItem';
import { renderActions } from './renderActions';


import styles from '@/styles/blocks/create.module.scss';

interface Props {
    singleTest: AllTests | undefined;
}

export const TestQuestion = ({ singleTest }: Props) => {
    const {
        data,
        mode,
        onDragEnd,
        appearingQuestionId,
        disappearingQuestionId
    } = useReorderQuestions(singleTest);


    const getListStyle = (isDraggingOver: boolean) => ({
        background: isDraggingOver ? "lightblue" : "white",
        padding: 20
    });


    const getItemStyle = (isDragging: boolean, draggableStyle: DraggableStyle | undefined): CSSProperties => ({
        userSelect: "none",
        padding: 20,
        margin: `0 0 ${20}px 0`,
        background: isDragging ? "lightgreen" : "linear-gradient(145deg, rgb(178, 188, 198), rgb(161, 171, 181), rgb(200, 207, 214))",
        ...draggableStyle,
    });


    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable
                    droppableId='droppable'
                    direction='vertical'>
                    {(provided, snapshot) => (
                        <div
                            className={styles.create__content}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >

                            {
                                singleTest === undefined &&
                                !data?.length &&
                                <div className={styles.create__question_message}>You have no created questions</div>
                            }

                            {data?.map((item, i) => (
                                <Draggable
                                    isDragDisabled={mode === 'preview'}
                                    key={item.id}
                                    draggableId={item.id}
                                    index={i}>
                                    {(provided, snapshot) => (
                                        <div
                                            className={clsx(styles.create__question, appearingQuestionId === item.id && styles.isAppearing)}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(snapshot.isDragging,
                                                provided.draggableProps.style)}
                                        >
                                            <div className={styles.create__question_content}>
                                                <h3 className={styles.create__question_title}>{i + 1}. {item.title}</h3>
                                                <div className={styles.create__question_choice}>{item.instructions}</div>
                                            </div>
                                            <ul className={styles.create__question_field} key={item.id}>
                                                <TestQuestionItem
                                                    options={item.options}
                                                    type={item.type}
                                                    id={item.id}
                                                    mode={mode}
                                                    appearingQuestionId={appearingQuestionId}
                                                    disappearingQuestionId={disappearingQuestionId} />
                                            </ul>

                                            <div className={styles.create__question_btn}>
                                                {mode !== 'preview'
                                                    ?
                                                    <AddQuestion testId={item.id} />
                                                    :
                                                    null
                                                }
                                            </div>
                                        </div>
                                    )}

                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}

                </Droppable>
            </DragDropContext>
            {renderActions(mode)}
        </>
    )
}

