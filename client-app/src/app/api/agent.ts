import axios, { AxiosResponse } from 'axios';
import { User } from '../models/user';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'https://localhost:7099/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post:<T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put:<T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del:<T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Users = {
    list: () => requests.get<User[]>('/user'),
    details: (id: string) => requests.get<User>(`/activities/${id}`),
    create: (User: User) => axios.post<void>('/user', User),
    update: (user: User) => axios.put<void>(`/activities/${user.id}`, user),
    delete: (id: number) => axios.delete<void>(`/user/${id}`)
}

const agent = {
    Users
}

export default agent;