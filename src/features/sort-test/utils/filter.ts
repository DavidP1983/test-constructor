import { CompletedTest } from "@/shared/types/completed-type"
import { FilterStatus } from "@/shared/types/select.types"

export const filterData = (data: CompletedTest[], filter: FilterStatus | null, completedTestsToken: string[],) => {

    switch (filter) {
        case 'passed':
        case 'failed':
            return data.filter(item => item.status === filter)
        case 'new':
            return data.filter(item => completedTestsToken.includes(item.accessToken))
        default:
            return data
    }
}
