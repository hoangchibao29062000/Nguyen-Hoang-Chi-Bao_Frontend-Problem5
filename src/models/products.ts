import { IConfig } from "./config";
import { IPlatform } from "./platform";
import { IShipping } from "./shipping";
import { IUnit } from "./unit";

export interface IProductTest {
  id: string | undefined;
  name_product: string;
  create_at: string | undefined;
  update_at: string | undefined;
}

export interface IProduct {
  id: string | undefined;
  id_unit: IUnit | undefined;
  id_platform: IPlatform | undefined;
  name_product: string;
  images: string;
  price_input: number | string;
  price_sell: number | string;
  quantity_imported: number | string;
  quantity_tock: number | string;
  description_product: string;
  percent_profit: number;//
  profit: number;//
  is_sale: boolean;
  price_sale_list: number;
  profit_sale: number;
  percent_sale: number;
  is_voucher: boolean;
  percent_voucher: number;
  price_voucher_list: number;
  profit_voucher: number;
  percent_costs_platform: number;
  costs_platform: number;
  percent_costs_payment: number;
  costs_payment: number;
  percent_costs_box: number;
  costs_box: number;
  percent_costs_operating: number;
  costs_operating: number;
  percent_costs_tax: number;
  costs_tax: number;
  percent_costs_ads: number;
  costs_ads: number;
  percent_costs_affilate: number;
  costs_affilate: number;
  list_shipping: string;
  total_costs: number;
  price_listing: number;
  active: boolean;
  create_at?: Date | string;
  update_at?: Date | string;
}

export type TPlatfromEcommerce = {
  name_platfrom: "Tiktok" | "Shoppe";
}

export interface IProductState {
  success: boolean;
  saveProduct: IProduct | undefined;
  listProduct: IProduct[] | any;
  listUnit: IUnit[] | any;
  listPlatform: IPlatform[] | any;
  listConfig: IConfig[] | any;
  listShipping: IShipping[] | any;
}