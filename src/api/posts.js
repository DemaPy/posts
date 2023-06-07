
import axios from "axios";


const instanceAxios = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
})



export function getPosts(page, limit = 10) {
    return instanceAxios.get(`/posts?_limit=${limit}&_page=${page}`)
}