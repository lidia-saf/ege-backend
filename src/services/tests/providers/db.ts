import { Pool } from 'pg';

const pool = new Pool ({
    user: 'lidia',
    host: 'localhost',
    database: 'ege',
    password: '',
    port: 5432
});

export default pool;

