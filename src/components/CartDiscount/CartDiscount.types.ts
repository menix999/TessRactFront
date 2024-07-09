import { type getDictionary } from "../../../lib/dictionary";

export interface ICartDiscountProps {
    translation: Awaited<ReturnType<typeof getDictionary>>;
}


export interface ICartDiscountForm {
    discountCode: string;
  }