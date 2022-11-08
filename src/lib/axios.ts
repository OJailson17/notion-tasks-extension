import axios from 'axios';

const prodUrl = `${import.meta.env.VITE_DEV_URL}`;

export const api = axios.create({
	baseURL: prodUrl,
});
