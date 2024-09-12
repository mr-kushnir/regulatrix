import axios from 'axios'

const baseURL = "http://localhost:8088/api"
// const baseURL = 'https://regulatrix.ru/api'
// const baseURL = 'http://portainer.regulatrix.ru:8088/api'

export const server = axios.create({baseURL})