import { CompletedTest } from "@/shared/types/completed-type";


export class CompletedTestService {

    static async crateAnswer(data: CompletedTest): Promise<{ success: boolean }> {

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/completed/create-completed-test`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to create completed test')
        }

        return (await response.json())
    }
}