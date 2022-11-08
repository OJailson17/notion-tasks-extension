import axios from 'axios';

const prodUrl = `${import.meta.env.VITE_PROD_URL}`;

export const api = axios.create({
	baseURL: prodUrl,
});
