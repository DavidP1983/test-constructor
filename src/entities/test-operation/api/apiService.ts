import { Config, RequestConfig } from "../../../shared/types/api-type";
import { AllTests } from "../../../shared/types/test-type";


class ApiService {
    defaultHeaders: object;
    baseUrl: string;
    constructor(baseUrl: string, defaultHeaders = {}) {
        this.baseUrl = baseUrl;
        this.defaultHeaders = defaultHeaders;
    }

    async request({ endpoint, method = "GET", data = null, headers = {} }: RequestConfig) {

        const config: Config = {
            method,
            headers: { ...this.defaultHeaders, ...headers }
        }
        if (data) {
            config.headers['Content-Type'] = 'application/json';
            config.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, config)

            if (response.status === 404) {
                return null
            }
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Request failed ${response.status}`)
            }

            return await response.json() ?? null;
        } catch (e) {
            if (e instanceof Error) {
                console.error(e.message)
                throw e;
            }
        }
    }

    get(endpoint?: string, headers = {}) {
        return this.request({ endpoint, method: "GET", data: null, headers })
    }
    getById(endpoint?: string, headers = {}) {
        return this.request({ endpoint, method: "GET", data: null, headers })
    }
    post(endpoint: string, data: AllTests, headers = {}) {
        return this.request({ endpoint, method: "POST", data, headers })
    }
    put(endpoint: string, data: AllTests, headers = {}) {
        return this.request({ endpoint, method: "PUT", data, headers })
    }
    delete(endpoint: string, headers = {}) {
        return this.request({ endpoint, method: "DELETE", data: null, headers })
    }
}


const api = new ApiService("http://localhost:3001/");

export { api };

