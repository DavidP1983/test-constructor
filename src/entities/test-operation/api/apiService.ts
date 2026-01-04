import { Config, RequestConfig } from "../../../shared/types/api-type";


class ApiService {
    defaultHeaders: object;
    baseUrl: string;
    constructor(baseUrl: string, defaultHeaders = {}) {
        this.baseUrl = baseUrl;
        this.defaultHeaders = defaultHeaders;
    }

    async request<TResponse = unknown, TData = unknown>({ endpoint, method = "GET", data, headers = {} }: RequestConfig<TData>): Promise<TResponse | null> {

        const config: Config = {
            method,
            headers: { ...this.defaultHeaders, ...headers }
        }
        if (data !== undefined) {
            config.headers['Content-Type'] = 'application/json';
            config.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, config)

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Request failed ${response.status}`)
            }

            return (await response.json()) as TResponse;
        } catch (e) {
            if (e instanceof Error) {
                console.error(e.message)
                throw e;
            } else {
                throw new Error('Unknown error');
            }
        }
    }

    get<TResponse>(endpoint?: string, headers = {}) {
        return this.request<TResponse>({ endpoint, method: "GET", headers })
    }
    getById<TResponse>(endpoint?: string, headers = {}) {
        try {
            return this.request<TResponse>({ endpoint, method: "GET", headers })

        } catch (e) {
            if (e instanceof Error && e.message.includes('404')) {
                return null
            }
            throw e;
        }
    }
    post<TResponse, TData>(endpoint: string, data: TData, headers = {}) {
        return this.request<TResponse, TData>({ endpoint, method: "POST", data, headers })
    }
    put<TResponse, TData>(endpoint: string, data: TData, headers = {}) {
        return this.request<TResponse, TData>({ endpoint, method: "PUT", data, headers })
    }
    delete<TResponse>(endpoint: string, headers = {}) {
        return this.request<TResponse>({ endpoint, method: "DELETE", headers })
    }
    registration<TResponse, TData>(endpoint: string, data: TData, headers = {}) {
        return this.request<TResponse, TData>({ endpoint, method: "POST", data, headers })
    }
    login<TResponse, TData>(endpoint: string, data: TData, headers = {}) {
        return this.request<TResponse, TData>({ endpoint, method: "PATCH", data, headers })
    }
}


const api = new ApiService(process.env.NEXT_PUBLIC_API_URL!);

export { api };

