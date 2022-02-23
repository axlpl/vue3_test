import { CACHE_TIME, CACHE_NAME } from '@/constants';

export default class HttpClient {
    protected cacheName;

    private cacheTime: number = 0;

    constructor() {
        this.cacheName = CACHE_NAME;
        this.clearCache();
        this.cacheTime = this.getTimestamp();
    }

    public async getRequest<T = any>(url: string): Promise<any> {
        const cache = await caches.open(this.cacheName);

        if (this.cacheTime < this.getTimestamp()) {
            await this.clearCache();
            this.cacheTime = this.getMaxAge();
        }

        const response = await cache.match(url);

        if (!response || !response.ok) {
            await cache.add(url);
            return await this.getRequest(url);
        }

        return await response.json();
    }

    private getTimestamp(): number {
        return +new Date();
    }

    private getMaxAge(): number {
        return this.getTimestamp() + CACHE_TIME;
    }

    private async clearCache() {
        const cache = await caches.keys();

        for (let name of cache) {
            await caches.delete(name);
        }
    }
}
