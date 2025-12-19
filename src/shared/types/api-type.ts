import { AllTests } from "./test-type";

type HTTPRequestMethods = "GET" | "POST" | "PUT" | "DELETE";
interface HTTPHeaders {
    [key: string]: string;
}

export interface RequestConfig {
    endpoint?: string;
    data: AllTests | null;
    method: HTTPRequestMethods;
    headers: HTTPHeaders;
}

export interface Config {
    method: HTTPRequestMethods;
    headers: HTTPHeaders;
    body?: string;
}

