import { CompletedTest } from "@/shared/types/completed-type";

// ${ process.env.NEXT_PUBLIC_API_URL }
export class CompletedTestService {

    static async crateAnswer(data: CompletedTest): Promise<{ success: boolean }> {

        const response = await fetch(`/completed/create-completed-test`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const contentType = response.headers.get('content-type');
        const res = contentType?.includes('application/json')
            ? (await response.json()) as { success: boolean } :
            { success: false };

        if (!response.ok) {
            throw new Error('Failed to create completed test')
        }

        return res
    }
}