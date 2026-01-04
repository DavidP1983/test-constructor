
type HTTPRequestMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
interface HTTPHeaders {
    [key: string]: string;
}

export interface RequestConfig<TData = unknown> {
    endpoint?: string;
    data?: TData;
    method: HTTPRequestMethods;
    headers?: HTTPHeaders;
}

export interface Config {
    method: HTTPRequestMethods;
    headers: HTTPHeaders;
    body?: string;
}

