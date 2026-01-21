import { apiFetch } from "@/shared/api/apiFetch";
import { Config, RequestConfig } from "../../../shared/types/api-type";


class ApiService {
    defaultHeaders: object;
    baseUrl: string;
    constructor(baseUrl: string, defaultHeaders = {}) {
        this.baseUrl = baseUrl;
        this.defaultHeaders = defaultHeaders;
    }

    async request<TResponse = unknown, TData = unknown>({ endpoint, signal, method = "GET", data, headers = {} }: RequestConfig<TData>): Promise<TResponse | null> {

        const config: Config = {
            method,
            headers: { ...this.defaultHeaders, ...headers },
            signal
        }
        if (data !== undefined) {
            config.headers['Content-Type'] = 'application/json';
            config.body = JSON.stringify(data);
        }

        try {
            const response = await apiFetch(`${this.baseUrl}${endpoint}`, config)

            if (response.status === 404) {
                return null
            }

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || `Request failed ${response.status}`)
            }

            return (await response.json()) as TResponse;
        } catch (e) {
            if (e instanceof Error && e.name === 'AbortError') {
                console.error("ApiService ->", e.message)
                console.log("Query Canceled ->", e.name, endpoint)
                throw e;
            } else {
                throw new Error('Unknown error');
            }
        }
    }

    get<TResponse>(endpoint?: string, signal?: AbortSignal, headers = {}) {
        return this.request<TResponse>({ endpoint, signal, method: "GET", headers })
    }
    post<TResponse, TData>(endpoint: string, data: TData, headers = {}) {
        return this.request<TResponse, TData>({ endpoint, method: "POST", data, headers })
    }
    delete<TResponse>(endpoint: string, headers = {}) {
        return this.request<TResponse>({ endpoint, method: "DELETE", headers })
    }
    patch<TResponse, TData>(endpoint: string, data: TData, headers = {}) {
        return this.request<TResponse, TData>({ endpoint, method: "PATCH", data, headers })
    }
}

export const isServer = typeof window === 'undefined';  // определяем среду server or client
const baseURL = isServer ? process.env.API_URL! : process.env.NEXT_PUBLIC_API_URL!
const api = new ApiService(baseURL);

export { api };

