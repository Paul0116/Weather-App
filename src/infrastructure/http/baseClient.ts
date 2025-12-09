import axios, { type AxiosInstance } from 'axios';

export class BaseHttpClient {
  protected client: AxiosInstance;

  constructor(baseURL: string, apiKey?: string) {
    this.client = axios.create({
      baseURL,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (apiKey) {
      this.client.interceptors.request.use((config) => {
        config.params = {
          ...config.params,
          key: apiKey,
        };
        return config;
      });
    }

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          throw new Error(`API Error: ${error.response.data.error?.message || error.message}`);
        } else if (error.request) {
          throw new Error('Network error: No response received');
        } else {
          throw new Error(`Request error: ${error.message}`);
        }
      }
    );
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const response = await this.client.get<T>(endpoint, { params });
    return response.data;
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.client.post<T>(endpoint, data);
    return response.data;
  }
}
