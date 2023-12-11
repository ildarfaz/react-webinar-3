import { getSessionStorage } from "../utils";
import * as languages from './lang/exports';

export const getTitle = (code) => {
    const lang = getSessionStorage("lang") || "en";
    return languages[lang][code];
}

export const title = {
    ADD: "ADD",
    DELETE: "DELETE",
    IN_BASKET: "IN_BASKET",
    EMPTY: "EMPTY",
    STORE: "STORE",
    MAIN: "MAIN",
    BASKET: "BASKET",
    CATEGORY: "CATEGORY",
    PRICE: "PRICE",
    EDITION: "EDITION",
    MADE_IN_COUNTRY: "MADE_IN_COUNTRY",
    GO: "GO",
    CLOSE: "CLOSE",
    TOTAL: "TOTAL",
    PRODUCT: "PRODUCT",
    COUNT: "COUNT"
}