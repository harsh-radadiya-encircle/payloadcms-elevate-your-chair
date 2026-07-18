import { env } from "~/env";

type FetchOptions = {
  depth?: number;
  draft?: boolean;
  limit?: number;
  page?: number;
  sort?: string;
  where?: Record<string, string | number | boolean>;
  slug?: string;
};

export class PayloadClient {
  private baseURL: string;
  private token?: string;

  constructor({
    baseURL = env.NEXT_PUBLIC_CMS_URL ?? "http://localhost:3001",
    token,
  }: {
    baseURL?: string;
    token?: string;
  } = {}) {
    this.baseURL = baseURL;
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
      ...options.headers,
    };

    const res = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!res.ok) {
      throw new Error(
        `Payload request failed: ${res.status} ${res.statusText}`,
      );
    }

    return res.json() as Promise<T>;
  }

  async fetchCollection<T>(
    collection: string,
    {
      depth = 1,
      draft = false,
      limit = 100,
      page,
      sort,
      where = {},
      slug,
    }: FetchOptions = {},
  ): Promise<T[]> {
    const queryParams = new URLSearchParams({
      depth: String(depth),
      draft: String(draft),
      limit: String(limit),
    });

    if (page !== undefined) {
      queryParams.append("page", String(page));
    }
    
    if (sort !== undefined) {
      queryParams.append("sort", sort);
    }

    if (slug) {
      queryParams.append("where[slug][equals]", slug);
    }

    Object.entries(where).forEach(([key, val]) => {
      queryParams.append(`where[${key}][equals]`, String(val));
    });

    const endpoint = `/api/${collection}?${queryParams.toString()}`;
    const res = await this.request<{ docs: T[] }>(endpoint);
    return res.docs;
  }

  async fetchPaginated<T>(
    collection: string,
    {
      depth = 1,
      draft = false,
      limit = 10,
      page = 1,
      sort,
      where = {},
      slug,
    }: FetchOptions = {},
  ): Promise<{ docs: T[], hasNextPage: boolean, totalDocs: number }> {
    const queryParams = new URLSearchParams({
      depth: String(depth),
      draft: String(draft),
      limit: String(limit),
      page: String(page),
    });
    
    if (sort !== undefined) {
      queryParams.append("sort", sort);
    }

    if (slug) {
      queryParams.append("where[slug][equals]", slug);
    }

    Object.entries(where).forEach(([key, val]) => {
      queryParams.append(`where[${key}][equals]`, String(val));
    });

    const endpoint = `/api/${collection}?${queryParams.toString()}`;
    const res = await this.request<{ docs: T[], hasNextPage: boolean, totalDocs: number }>(endpoint);
    return res;
  }

  async fetchGlobal<T>(globalSlug: string): Promise<T | null> {
    try {
      return await this.request<T>(`/api/globals/${globalSlug}`);
    } catch {
      return null;
    }
  }

  async createCollection<T>(
    collection: string,
    data: Record<string, unknown>,
  ): Promise<T> {
    const endpoint = `/api/${collection}`;
    return await this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}
