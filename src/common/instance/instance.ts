import axios from "axios";

const settings = { baseURL: 'https://social-network.samuraijs.com/api/1.1/', withCredentials: true, headers: {'API-KEY': 'de9dfb38-bbeb-4144-92bb-c678d03a06f8'}}
export const instanse = axios.create(settings)
