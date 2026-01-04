
export class UserService {

    static async changePassword(email: string, password: string): Promise<void> {

        const data = {
            email,
            password
        }

        const response = await fetch('/api/user/change-password',
            {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }
        )

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Request failed')
        }

    }

    static async deleteAccount(email: string) {
        // !!! На будущее необходимо брать email /id из auth_token, клиент ничего не знает
        const response = await fetch(`/api/user/delete-account?email=${email}`,
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            }
        );

        if (!response.ok) {
            const error = await response.json();
            console.log(error.message)
            throw new Error(error.message || 'Request failed 404, try again');
        }
    }
}