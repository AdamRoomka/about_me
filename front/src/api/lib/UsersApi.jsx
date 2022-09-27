import axiosUsers from '../apiUsers';
import axios from "axios";

export async function getAllUsers(token) {
    const res = await axios.create({
        baseURL: "http://localhost:4000/api/v1/auth",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer: ${token}`,
        },
    }).get('/')
    return res;
}

export async function findUserAndDelete(token, userId) {
    const res = await axios.create({
        baseURL: "http://localhost:4000/api/v1/auth/deleteUser",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer: ${token}`,
        },
    }).patch(`/${userId}`)
    return res;
}
export async function findUserAndUpdatePassword(token, userId, data) {
    const res = await axios.create({
        baseURL: "http://localhost:4000/api/v1/auth/updateUserPassword",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer: ${token}`,
        },
    }).patch(`/${userId}`, JSON.stringify(data))
    return res;
}

export async function getAllUserItems(token) {
    const res = await axios.create({
        baseURL: "http://localhost:4000/api/v1/auth/items",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer: ${token}`,
        },
    }).get('/')
    return res;
}

export async function createUserItems(token, data) {
    const res = await axios.create({
        baseURL: "http://localhost:4000/api/v1/auth/items/",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer: ${token}`,
        },
    }).patch('/', JSON.stringify(data))
    return res;
}
export async function findItemAndUpdate(token, subId, data) {
    const res = await axios.create({
        baseURL: "http://localhost:4000/api/v1/auth/items/update",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer: ${token}`,
        },
    }).patch(`/${subId}`, JSON.stringify(data))
    return res;
}
export async function findItemAndDelete(token, subId) {
    const res = await axios.create({
        baseURL: "http://localhost:4000/api/v1/auth/items/delete",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer: ${token}`,
        },
    }).patch(`/${subId}`)
    return res;
}

export async function decodeToken(token) {
    const res = await axios.create({
        baseURL: `http://localhost:4000/api/v1/auth`,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer: ${token}`,
        },
    }).get(`/token`)
    return res;
}

export const createUser = (data) => axiosUsers.post('/auth/register/', JSON.stringify(data));
export const doLogin = (data) => axiosUsers.post('/auth/login/', JSON.stringify(data));

