import pool from './db';
import { ITests } from './types';

export const getAllTests = (query: string) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM tests ORDER BY id ASC;`,
        (q_err, q_res) => {
            if (q_err) {
                reject(q_err);
            }
            return resolve(q_res.rows);
        })
    });
}

export const getTestById = (id: string) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM tests WHERE id = ${id};`,
        (q_err, q_res) => {
            if (q_err) {
                reject(q_err);
            }
            return resolve(q_res.rows);
        })
    })
}

export const postTestToDatabase = (payload: ITests) => {
    const { title, type } = payload;
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO tests(title, type) VALUES('${title.replace("\"", "")}', '${type.replace("\"", "")}');`, 
        (q_err, q_res) => {
            if (q_err) return reject(q_err);
            return resolve(q_res.rows);
        })
    })
}

export const putTestToDatabase = (payload: Partial<ITests>, id: string) => {
    const { title, type } = payload;
    return new Promise((resolve, reject) => {
        const query = "UPDATE tests SET " + " title = '" + title?.replace(/\"/gi, "") + "' WHERE id = '" + id + "';"
        pool.query(query,
        (q_err, q_res) => {
            if (q_err) return reject(q_err);
            return resolve(q_res.rows);
        })
    })
}