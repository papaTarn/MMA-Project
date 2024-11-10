// import { Request, Response } from "express-serve-static-core";
import { database, JWT_SECRET } from '../config/database';
import { Request, Response } from 'express';

interface CustomRequest extends Request {
  user?: {
    userId?: number,
    email?: string
  };
}

interface ICategory {
  ID: number,
  CATE_NAME: string,
}

interface IMessage {
  MSG_CODE: string,
  MSG_DESC: string
}

interface IConfig {
  CONFIG_NAME: string,
  CONFIG_VALUE: string
}

export const getSpeedauto = async (req: CustomRequest, res: Response) => {
  try {
    const pool = await database();
    const result = await pool.query("SELECT CONVERT(INT, config_value) AS numeric_value FROM mma_r_config WHERE config_name = 'AUTO_PLAY_SPEED'");

    return res.json({
      isSucess: true,
      message: 'SPEEDDD',
      result: result.recordset,
    });
  } catch (err) {
    if (err instanceof Error && err.message.includes('EREQUEST')) {
      res.status(400).json({ error: 'Bad Request: Invalid SQL query' });
    } else if (err instanceof Error && err.message.includes('ECONNREFUSED')) {
      res.status(503).json({ error: 'Service Unavailable: Database connection refused' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export const getAllMessage = async (req: CustomRequest, res: Response) => {
  try {
    const pool = await database();
    const queryData = await pool.request()
      .query(`
        SELECT 
          MSG_CODE AS code, 
          MSG_DESC AS desc 
        FROM MMA_R_MESSAGE
      `)

    if (queryData?.recordset?.length > 0) {
      return res.json({
        isSucess: true,
        message: '',
        result: queryData?.recordset
      })
    } else {
      res.status(404).json({
        isSucess: false,
        message: 'Data not found.',
        result: []
      });
    }
  } catch (err) {
    if (err instanceof Error && err.message.includes('EREQUEST')) {
      res.status(400).json({ error: 'Bad Request: Invalid SQL query' });
    } else if (err instanceof Error && err.message.includes('ECONNREFUSED')) {
      res.status(503).json({ error: 'Service Unavailable: Database connection refused' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export const getAllCategory = async (req: CustomRequest, res: Response) => {
  try {
    const pool = await database();
    const queryData = await pool.request()
      .query(`
        SELECT 
          ID AS id, 
          CATE_NAME AS cateName 
        FROM MMA_M_CATEGORY
      `)

    if (queryData?.recordset?.length > 0) {
      return res.json({
        isSucess: true,
        message: '',
        result: queryData?.recordset
      })
    } else {
      res.status(404).json({
        isSucess: false,
        message: 'Data not found.',
        result: []
      });
    }
  } catch (err) {
    if (err instanceof Error && err.message.includes('EREQUEST')) {
      res.status(400).json({ error: 'Bad Request: Invalid SQL query' });
    } else if (err instanceof Error && err.message.includes('ECONNREFUSED')) {
      res.status(503).json({ error: 'Service Unavailable: Database connection refused' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export const getAllConfig = async (req: CustomRequest, res: Response) => {
  try {
    const pool = await database();
    const queryData = await pool.request()
      .query(`
        SELECT 
          CONFIG_NAME AS name, 
          CONFIG_VALUE AS value 
        FROM MMA_R_CONFIG
      `)

    if (queryData?.recordset?.length > 0) {
      return res.json({
        isSucess: true,
        message: '',
        result: queryData?.recordset
      })
    } else {
      res.status(404).json({
        isSucess: false,
        message: 'Data not found.',
        result: []
      });
    }
  } catch (err) {
    if (err instanceof Error && err.message.includes('EREQUEST')) {
      res.status(400).json({ error: 'Bad Request: Invalid SQL query' });
    } else if (err instanceof Error && err.message.includes('ECONNREFUSED')) {
      res.status(503).json({ error: 'Service Unavailable: Database connection refused' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}