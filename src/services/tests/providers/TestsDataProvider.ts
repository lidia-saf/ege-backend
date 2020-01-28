import request from 'request-promise';
import dotenv from 'dotenv';

dotenv.config();

export const getTests = async (query: string) => {
    const key = process.env.PLACEHOLDER_KEY;
    const url = `https://jsonplaceholder.typicode.com/posts`;
    const response = await request(url);
    return JSON.parse(response);
}