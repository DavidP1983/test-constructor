
export const formatDuration = (seconds: number | null | undefined): string => {
    if (!seconds || seconds < 0) return "00:00:00";

    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export const formatDate = (dateString: string | undefined): string => {
    if (!dateString) {
        return ''
    }
    const date = new Date(dateString);

    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(date);
};
