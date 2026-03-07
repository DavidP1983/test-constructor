
import styles from '@/styles/blocks/rules.module.scss';
import clsx from 'clsx';

export const OnboardingRules = () => {

    return (
        <div className={styles.rules}>
            <h1 className={clsx('title', styles.rules__title)}>Test Creation Rules:</h1>
            <ol className={styles.rules__desc}>
                <li className={styles.rules__item}>It is prohibited to create tests containing offensive, discriminatory, or inappropriate content.</li>
                <li className={styles.rules__item}>Profanity, threats, or abusive language are not allowed.</li>
                <li className={styles.rules__item}>Tests must not include personal data, confidential, or sensitive information.</li>
                <li className={styles.rules__item}>Publishing malicious code or content that may compromise system security is prohibited.</li>
                <li className={styles.rules__item}>All tests must comply with the platform’s ethical and professional standards.</li>
            </ol>
        </div>
    );
}