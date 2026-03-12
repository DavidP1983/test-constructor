
import styles from '@/styles/blocks/emptystate.module.scss';

interface EmptyStateProps {
    title?: string;
    description?: string;
    children?: React.ReactNode;
}

// Заглушка для отображения пустых данных как например в AllTestsPageClient
export const EmptyState = ({ title, description, children }: EmptyStateProps) => {

    return (
        <div className={styles.emptystate}>
            <div className={styles.emptystate__desc}>
                {title && <h3>{title}</h3>}
                {description && <p>{description}</p>}
            </div>
            {children}
        </div>
    )
}