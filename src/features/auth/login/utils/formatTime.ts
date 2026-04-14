

export const formatTime = (seconds: number | null) => {
    if (seconds === null) return null;
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;

    return min > 0 ? `${min}m ${sec}s` : `${sec}s`;
}
