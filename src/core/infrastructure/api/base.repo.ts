
type EndpointConfig = {
    method: "GET" | "POST" | "PUT" | "DELETE";
    url: string; // URL with placeholders like /tech/:id
};

type Endpoints = {
    [key: string]: EndpointConfig;
};

export abstract class ApiBaseRepository {
    private readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    protected abstract defineEndpoints(): Endpoints;

    protected getEndpoint(key: string): EndpointConfig {
        const endpoints = this.defineEndpoints();
        const endpoint = endpoints[key];

        if (!endpoint) {
            throw new Error(`Endpoint '${key}' not found.`);
        }

        return endpoint;
    }

    protected buildUrl(endpointKey: string, params: Record<string, string>): string {
        const endpoint = this.getEndpoint(endpointKey);
        let url = `${this.baseUrl}/${endpoint.url}`;

        for (const key in params) {
            url = url.replace(`:${key}`, params[key]);
        }

        return url;
    }

    protected async request<T>(
        endpointKey: string,
        options?: RequestInit,
        params?: Record<string, string> // Add params here
    ): Promise<T> {
        let url: string;
        if (params) {
            url = this.buildUrl(endpointKey, params);
        } else {
            const endpoint = this.getEndpoint(endpointKey);
            url = `${this.baseUrl}/${endpoint.url}`;
        }

        const endpointData = this.getEndpoint(endpointKey);

        const response = await fetch(url, {
            method: endpointData.method,
            ...options,
        });

        if (!response.ok) {
            throw new Error(
                `Request failed with status ${response.status} for endpoint ${endpointKey}`
            );
        }

        return (await response.json()) as T;
    }
}