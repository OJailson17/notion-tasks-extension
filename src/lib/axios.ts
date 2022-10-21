import axios from 'axios';

// const prodUrl = 'https://notion-tasks-extension-server.vercel.app';
const devUrl = 'http://localhost:8082';

export const api = axios.create({
	baseURL: devUrl,
});
