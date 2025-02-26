import { IUnit } from 'models/unit';
import { ListDataResponse, DataResponse } from '../models/common';
import axiosClient from './axiosClient';
import { IProduct } from 'models';
import { IPlatform } from 'models/platform';
import { IConfig } from 'models/config';
import { IShipping } from 'models/shipping';

const productApi = {
    async getListUnit(): Promise<ListDataResponse<IUnit>> {
        const url = "/unit/get-unit?limit=100&page=1";
        return await axiosClient.get(url);
    },

    async getLisConfig(): Promise<ListDataResponse<IConfig>> {
        const url = "/config/get-config";
        return await axiosClient.get(url);
    },

    async getListShipping(): Promise<ListDataResponse<IShipping>> {
        const url = "/shipping/get-shipping";
        return await axiosClient.get(url);
    },

    async getListPlatform(): Promise<ListDataResponse<IPlatform>> {
        const url = "/platform/get-platform?limit=100&page=1";
        return await axiosClient.get(url);
    },

    async getListProduct(): Promise<ListDataResponse<IProduct>> {
        const url = "/product/get-product?limit=100&page=1";
        return await axiosClient.get(url);
    },

    async saveProduct(body: any): Promise<DataResponse<IProduct | any>> {
        const url = "/product/save-product";
        return await axiosClient.post(url, body);
    },

    async deleteProduct(body: any): Promise<DataResponse<IProduct | any>> {
        const url = "/product/active-product";
        return await axiosClient.put(url, body);
    }
}

export default productApi;