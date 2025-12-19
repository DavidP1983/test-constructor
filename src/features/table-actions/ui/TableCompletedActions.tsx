import styles from '@/styles/blocks/table.module.scss';

export const TableCompletedActions = () => {
    return (
        <button className={styles.table__bnt_completed} data-btn="open" aria-labelledby="open-test">Open</button>
    )
}