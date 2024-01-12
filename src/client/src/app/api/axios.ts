import axios from 'axios'
import { cookies } from 'next/headers'

const instance = axios.create({

    withCredentials: true,
})
export default instance;