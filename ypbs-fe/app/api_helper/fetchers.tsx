import axios from 'axios';
import { COMMON_PATH } from './URLs';

const axiosInstance = axios.create({
    baseURL: "", 
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const getFetcher = async (url: string) => {
    try {
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const putFetcher = async (url: string, data: any) => {
    try {
        const response = await axiosInstance.put(url, data);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const postFetcher = async (url: string, data: any) => {
    try {
        const response = await axiosInstance.post(url, data);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const deleteFetcher = async (url: string) => {
    try {
        const response = await axiosInstance.delete(url);
        return response.data;
    } catch (error) {
        return error;
    }
}


