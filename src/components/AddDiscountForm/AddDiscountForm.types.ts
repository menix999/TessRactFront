import { type getDictionary } from "../../../lib/dictionary";

export interface IAddDiscountFormProps {
    translation: Awaited<ReturnType<typeof getDictionary>>;
}

export interface IAddDiscountForm {
    discountSymbol: string;
    discountValue: string;
    discountExpirationDate: Date
}