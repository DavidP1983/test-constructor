
// ${process.env.NEXT_PUBLIC_API_URL}
export class TableService {

    static async createLink(id: string): Promise<{ url: string }> {

        const response = await fetch(`/link/get-link/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });

        const contentType = response.headers.get('content-type');
        const data = contentType?.includes('application/json')
            ? (await response.json()) as { url: string } :
            { url: '' };


        if (!response.ok) {
            throw new Error('Request failed')
        }

        return data;
    }
}