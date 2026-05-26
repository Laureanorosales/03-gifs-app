import axios from 'axios';

// Instancia de Axios preconfigurada
// Incluye la URL base de Giphy y los parámetros por defecto (idioma y API key)
export const giphyApi = axios.create({
	baseURL: 'https://api.giphy.com/v1/gifs',
	params: {
		lang: 'es',
		api_key: import.meta.env.VITE_GIPHY_API_KEY,
	},
});
