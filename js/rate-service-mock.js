import axios from "axios";

const api_url = 'http://localhost:4500/api/rates';

export const findAll = () => axios.get(api_url)