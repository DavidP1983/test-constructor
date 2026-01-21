
type HTTPRequestMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
interface HTTPHeaders {
    [key: string]: string;
}

export interface RequestConfig<TData = unknown> {
    endpoint?: string;
    signal?: AbortSignal
    data?: TData;
    method: HTTPRequestMethods;
    headers?: HTTPHeaders;
}

export interface Config {
    method: HTTPRequestMethods;
    headers: HTTPHeaders;
    body?: string;
    signal?: AbortSignal;
}

