// server-only
import { ApiError } from "./ApiError";

// Прослойка refresh-token для route change-password / delete-account
let refreshPromise: Promise<void> | null = null;

export const apiFetch = async (input: RequestInfo, init: RequestInit = {}) => {
    console.log("API FETCH", input)
    const res = await fetch(input, {
        ...init,
        credentials: 'include',
        headers: {
            ...(init.headers || {}),
        },
    });

    // Если accessToken не умер возвращаем  результат
    if (res.status !== 401) return res;


    // Если accessToken  умер  ${process.env.NEXT_PUBLIC_API_URL}
    if (!refreshPromise) {
        refreshPromise = fetch(`/user/refresh`, {
            method: 'POST',
            credentials: 'include',
        })
            .then((r) => {
                if (!r.ok) throw new Error('Refresh failed');
            })
            .finally(() => refreshPromise = null);
    }


    try {
        await refreshPromise;
    } catch {
        throw new ApiError(401, 'User not authorized');
    }

    // После обновления accessToken делаем повторный запрос
    return fetch(input, {
        ...init,
        credentials: 'include',
        headers: {
            ...(init.headers || {}),
        },
    });
}