import { apiFetch } from "@/shared/api/apiFetch";

export class UserService {
    // ${process.env.NEXT_PUBLIC_API_URL}
    static async changePassword(oldPassword: string, newPassword: string): Promise<void> {

        const response = await apiFetch(`/user/update`,
            {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ oldPassword, newPassword })
            }
        )

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Password update failed')
        }
    }

    // ${ process.env.NEXT_PUBLIC_API_URL }
    static async deleteAccount(password: string) {

        const response = await apiFetch(`/user/delete`,
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Request failed');
        }
    }

    // ${ process.env.NEXT_PUBLIC_API_URL }
    static async uploadImage(file: File) {
        const data = new FormData();
        data.append('avatar', file);
        const response = await apiFetch(`/user/upload`,
            {
                method: 'POST',
                body: data
            }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'File upload failed');
        }
    }

    // ${ process.env.NEXT_PUBLIC_API_URL }
    static async getImage(id: string) {
        const response = await fetch(`/user/${id}/avatar`, { cache: 'no-store' });

        if (response.status === 204) return null;

        if (!response.ok) {
            throw new Error('Failed to retrieve avatar image');
        }
        return await response.blob();  // Buffer
    }
}

