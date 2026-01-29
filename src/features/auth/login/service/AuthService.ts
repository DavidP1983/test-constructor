import { handleResponse } from "@/shared/api/handleResponse";
import { User } from "@/shared/types/user-type";

export class AuthService {

    // Registration 
    static async registration(name: string, email: string, password: string): Promise<User> {

        const response = await fetch(`/user/registration`, {
            method: "POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });


        const data = await handleResponse<User>(response, 'Registration failed');

        if (!data) {
            throw new Error('Empty response from server');
        }
        return data

    }


    // Login 
    static async login(email: string, password: string): Promise<User> {

        const response = await fetch(`/user/login`, {
            method: "POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await handleResponse<User>(response, 'Login failed');


        if (!data) {
            throw new Error('Empty response from server');
        }
        return data
    }


    // Logout 
    static async logout() {
        const response = await fetch(`/user/logout`,
            {
                method: 'POST',
                credentials: 'include',
            }
        );

        await handleResponse<void>(response, 'Logout failed');
    }

}