/**
 * Server-side V0 API Client
 *
 * IMPORTANT:
 * Never import or execute this module in client-side code.
 * Requires process.env.V0_API_KEY to be set in environment variables.
 */

interface V0ChatOptions {
  message: string;
  modelId?: 'v0-auto' | 'v0-mini' | 'v0-pro' | 'v0-max' | 'v0-max-fast';
  system?: string;
}

export class V0Client {
  private apiKey: string;
  private baseUrl: string = 'https://api.v0.dev/v1';

  constructor() {
    const key = process.env.V0_API_KEY;
    if (!key && process.env.NODE_ENV === 'production') {
      console.warn('V0_API_KEY is not defined in environment variables.');
    }
    this.apiKey = key || '';
  }

  /**
   * Helper to execute authorized fetch requests to V0 platform endpoints
   */
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    if (!this.apiKey) {
      throw new Error('V0 API key missing. Ensure V0_API_KEY is set in environment variables.');
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`V0 API Error (${response.status}): ${errorText}`);
    }

    return response.json() as Promise<T>;
  }

  /**
   * Create a new UI/code generation chat session on V0
   */
  async createChat(options: V0ChatOptions) {
    return this.request('/chats', {
      method: 'POST',
      body: JSON.stringify({
        message: options.message,
        modelConfiguration: {
          modelId: options.modelId || 'v0-auto',
        },
        system: options.system,
      }),
    });
  }
}

export const v0Client = new V0Client();
