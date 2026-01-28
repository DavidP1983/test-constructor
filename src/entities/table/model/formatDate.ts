
export const formatDate = (date: Date | string | null | undefined): string => {
    if (!date) return '';

    if (typeof date === 'object') {
        const originDate = new Date(date);
        const dd = String(originDate.getDate()).padStart(2, '0');
        const mm = String(originDate.getMonth() + 1).padStart(2, '0')
        const yy = originDate.getFullYear();
        return `${dd}.${mm}.${yy}`;
    }
    const [yy, dd, mm] = date.split('-');
    return `${dd}.${mm}.${yy}`;
}
