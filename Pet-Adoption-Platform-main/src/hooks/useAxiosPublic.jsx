import axios from 'axios';

const axiosPublic = axios.create({
    baseURL:'https://htm-2024-server.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;