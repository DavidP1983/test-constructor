import { User } from "@/shared/types/user-type";

// ${ process.env.NEXT_PUBLIC_API_URL }
export class AuthService {

    // Registration 
    static async registration(name: string, email: string, password: string): Promise<User> {

        const response = await fetch(`/user/registration`, {
            method: "POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Registration failed')
        }

        return (await response.json()) as User
    }


    // Login ${process.env.NEXT_PUBLIC_API_URL}
    static async login(email: string, password: string): Promise<User> {

        const response = await fetch(`/user/login`, {
            method: "POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Request failed')
        }
        return (await response.json()) as User
    }


    // Logout ${process.env.NEXT_PUBLIC_API_URL}
    static async logout() {
        const response = await fetch(`/user/logout`,
            {
                method: 'POST',
                credentials: 'include',
            }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Logout failed')
        }
    }

}