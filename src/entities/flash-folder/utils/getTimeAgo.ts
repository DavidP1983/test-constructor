import { formatDistanceToNow } from "date-fns";

export const getTimeAgo = (date: string) => {

    const createAt = new Date(date);
    const diff = Date.now() - createAt.getTime();

    if (diff < 60_000) return 'Just now'
    return formatDistanceToNow(createAt, { addSuffix: true });
}