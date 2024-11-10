import dotenv from 'dotenv';
import path from 'path';
import sql from 'mssql';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const dbConfig: sql.config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER ? process.env.DB_SERVER : '',
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 1433,
  options: {
    encrypt: false,
    trustServerCertificate: false,
  },
};

export const JWT_SECRET = process.env.JWT_SECRET as string;
export const database = async () => {
  try {
    const pool = await sql.connect(dbConfig);
    return pool;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
};

// const connectionString = `Server=${dbConfig.server},${dbConfig.port};Database=${dbConfig.database};User Id=${dbConfig.user};Password=${dbConfig.password};Encrypt=false`;
// export const database = new sql.ConnectionPool(connectionString);