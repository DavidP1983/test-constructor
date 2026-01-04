import { User } from "@/shared/types/user-type";


export class AuthService {

    // Registration
    static async registration(name: string, email: string, password: string): Promise<User> {

        const data = {
            name,
            email,
            password,
        }

        const response = await fetch('/api/auth/registration', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Request failed')
        }

        return (await response.json()) as User
    }


    // Login
    static async login(email: string, password: string): Promise<User> {

        const data = {
            email,
            password
        }

        const response = await fetch('/api/auth/login', {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Request failed')
        }
        return (await response.json()) as User
    }


    // Logout
    static async logout() {

        const response = await fetch('/api/auth/logout', { method: 'POST' })

        if (!response.ok) {
            throw new Error('Logout failed')
        }
    }

}