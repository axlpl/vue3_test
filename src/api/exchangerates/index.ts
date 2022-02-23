import { httpClient } from '@/services/networking';
import { BASE_URL } from '@/constants';
import type IExchangeRate from '@/models/exchange-rate.interface';

export default {
    getExchangeRate(
        currency: string,
    ): Promise<IExchangeRate> {
        const url = `${BASE_URL}exchangerates/rates/a/${currency}/?format=json`;

        return httpClient.getRequest<IExchangeRate>(url);
    },
};
