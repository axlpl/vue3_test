export default interface IExchangeRate {
    code: string;
    currency: string;
    rates: Array<{effectiveDate: string, mid: number, no: string}>;
    table: string;
};
