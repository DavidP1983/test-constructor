
// ${process.env.NEXT_PUBLIC_API_URL}
export class TableService {

    static async createLink(id: string): Promise<{ url: string }> {

        const response = await fetch(`/link/get-link/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error('Request failed')
        }

        return (await response.json())
    }
}