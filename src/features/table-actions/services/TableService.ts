import { apiFetch } from "@/shared/api/apiFetch";
import { handleResponse } from "@/shared/api/handleResponse";

export class TableService {

    static async createLink(id: string): Promise<{ url: string }> {

        const response = await apiFetch(`/link/get-link/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await handleResponse<{ url: string }>(response, 'Failed to create link');

        if (!data) {
            throw new Error('Empty response from server');
        }

        return data;
    }
}