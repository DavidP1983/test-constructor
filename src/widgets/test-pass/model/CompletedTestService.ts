import { handleResponse } from "@/shared/api/handleResponse";
import { CompletedTest } from "@/shared/types/completed-type";

export class CompletedTestService {

    static async crateAnswer(data: CompletedTest): Promise<{ success: boolean }> {

        const response = await fetch(`/completed/create-completed-test`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const res = await handleResponse<{ success: boolean }>(response, 'Failed to create completed test');

        if (!res) {
            throw new Error('Empty response from server');
        }

        return res
    }
}