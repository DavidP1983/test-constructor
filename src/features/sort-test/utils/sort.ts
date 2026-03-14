import { CompletedTest } from "@/shared/types/completed-type";
import { SortStatus } from "@/shared/types/select.types";

export const sortData = (data: CompletedTest[], sort: SortStatus | null) => {

    switch (sort) {
        case 'date_desc':
            return data.toSorted((a, b) => {
                const dateA = a.completedAt ? new Date(a.completedAt).getTime() : 0
                const dateB = b.completedAt ? new Date(b.completedAt).getTime() : 0
                return dateB - dateA
            })
        case 'date_asc':
            return data.toSorted((a, b) => {
                const dateA = a.completedAt ? new Date(a.completedAt).getTime() : 0
                const dateB = b.completedAt ? new Date(b.completedAt).getTime() : 0
                return dateA - dateB
            })
        case 'score_desc':
            return data.toSorted((a, b) => b.score - a.score)
        case 'speed_asc':
            return data.toSorted((a, b) => {
                const dateA = a.duration ?? 0
                const dateB = b.duration ?? 0
                return dateA - dateB
            })
        case 'speed_desc':
            return data.toSorted((a, b) => {
                const dateA = a.duration ?? 0
                const dateB = b.duration ?? 0
                return dateB - dateA
            })
        default:
            return data
    }
}