/**
 * Обрабатывает fetch response:
 * - проверяет content-type
 * - парсит JSON, если есть
 * - выбрасывает ошибку с сообщением, если response.ok === false
 */


export interface ApiErrorResponse {
    message?: string;
}

export async function handleResponse<T = unknown>(response: Response, defaultErrorMessage = 'Request failed'): Promise<T | null> {
    const contentType = response.headers.get('content-type');
    const data = contentType?.includes('application/json')
        ? (await response.json()) as T
        : null;

    if (!response.ok) {
        if (response.status === 403) {
            throw new Error('You are not allowed to perform this action');
        }
        throw new Error((data as ApiErrorResponse)?.message || defaultErrorMessage);
    }

    return data as T | null
}