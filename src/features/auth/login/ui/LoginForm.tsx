'use client';
import { SpinnerForBtn } from '@/shared/ui/spinner/SpinnerForBtn';
import clsx from 'clsx';
import { useLogin } from '../model/useLogin';


import styles from '@/styles/blocks/form.module.scss';

export const LoginForm = () => {
    const {
        handleToggle,
        handleFieldValue,
        handleRegistration,
        handleLogin,
        type,
        fieldValue,
        fieldErrors,
        isLoading,
        isLoginLoading,
        errorMessage
    } = useLogin();

    return (
        <main className={styles.auth} >
            <h1 className='title'>Create, Customize, and Share Tests with Ease</h1>
            <div className="container">
                <div className={styles.auth__form}>
                    <form className={styles.form} onSubmit={handleRegistration}>
                        <fieldset>
                            <div className={styles.form__field}>
                                <input
                                    inputMode="text"
                                    value={fieldValue.name}
                                    name="name"
                                    id="name"
                                    data-attr="name"
                                    placeholder=" "
                                    autoComplete="on"
                                    required
                                    onChange={handleFieldValue} />
                                <label htmlFor="name">Name</label>
                                <div className={clsx(styles.form__errorFields, fieldErrors.name && styles.active)}>{fieldErrors.name}</div>
                            </div>
                            <div className={styles.form__field}>
                                <input
                                    inputMode="email"
                                    value={fieldValue.email}
                                    name="email"
                                    id="email"
                                    data-attr="email"
                                    placeholder=" "
                                    autoComplete="on"
                                    required
                                    onChange={handleFieldValue} />
                                <label htmlFor="email">Email</label>
                                <div className={clsx(styles.form__errorFields, fieldErrors.email && styles.active)}>{fieldErrors.email}</div>
                            </div>

                            <div className={styles.form__field}>
                                <input
                                    type={type}
                                    value={fieldValue.password}
                                    name="password"
                                    id="password"
                                    data-attr="password"
                                    placeholder=" "
                                    required
                                    onChange={handleFieldValue} />
                                <label htmlFor="password">Password</label>
                                <div className={clsx(styles.form__errorFields, fieldErrors.password && styles.active)}>{fieldErrors.password}</div>

                                <button
                                    className={styles.eye}
                                    type="button"
                                    onClick={handleToggle}>
                                    <i className={type === 'password' ? "icon-eye" : 'icon-eye-off'}></i>
                                </button>
                            </div>

                        </fieldset>
                        <div className={clsx(styles.form__error, errorMessage && styles.active)}>{errorMessage ?? ''}</div>
                        <button type="submit" className={styles.form__registration} disabled={isLoading}>Registration {isLoading && <SpinnerForBtn />}</button>
                    </form>
                    <div className={styles.form__alternative}>or</div>
                    <button
                        className={styles.form__login}
                        disabled={isLoginLoading}
                        onClick={handleLogin}>Login {isLoginLoading && <SpinnerForBtn />}</button>
                </div>
            </div>
        </main>
    )
}