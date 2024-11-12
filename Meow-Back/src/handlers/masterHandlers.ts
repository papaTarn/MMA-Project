// import { Request, Response } from "express-serve-static-core";
import { database, JWT_SECRET } from '../config/database';
import { Request, Response } from 'express';

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

export const getAutoPlaySpeed = async (req: Request, res: Response) => {
  try {
    const pool = await database();
    const queryData = await pool.request()
      .query(`
        SELECT
          ID AS id,  
          CONFIG_NAME AS name,
          CONVERT(INT, CONFIG_VALUE) AS value
        FROM MMA_R_CONFIG 
        WHERE CONFIG_NAME = 'AUTO_PLAY_SPEED'
      `)

    if (queryData?.recordset?.length > 0) {
      return res.status(200).json({
        isSucess: true,
        message: '',
        result: queryData?.recordset
      })
    } else {
      return res.status(200).json({
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

export const getBanner = async (req: Request, res: Response) => {
  try {
    const pool = await database();
    const queryData = await pool.request()
      .query(`
        SELECT 
          ID AS id,
          CONFIG_NAME AS name,
          CONFIG_VALUE AS value
        FROM MMA_R_CONFIG 
        WHERE CONFIG_NAME LIKE '%banner%'
      `)

    if (queryData?.recordset?.length > 0) {
      return res.status(200).json({
        isSucess: true,
        message: '',
        result: queryData?.recordset
      })
    } else {
      return res.status(200).json({
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

export const getAllMessage = async (req: Request, res: Response) => {
  try {
    const pool = await database();
    const queryData = await pool.request()
      .query(`
        SELECT 
          ID AS id, 
          MSG_CODE AS code, 
          MSG_DESC AS value 
        FROM MMA_R_MESSAGE
      `)

    if (queryData?.recordset?.length > 0) {
      return res.status(200).json({
        isSucess: true,
        message: '',
        result: queryData?.recordset
      })
    } else {
      return res.status(200).json({
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

export const getAllCategory = async (req: Request, res: Response) => {
  try {
    const pool = await database();
    const queryData = await pool.request()
      .query(`
        SELECT 
          ID AS id, 
          CATE_NAME AS name 
        FROM MMA_M_CATEGORY
      `)

    if (queryData?.recordset?.length > 0) {
      return res.status(200).json({
        isSucess: true,
        message: '',
        result: queryData?.recordset
      })
    } else {
      return res.status(200).json({
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

export const getAllConfig = async (req: Request, res: Response) => {
  try {
    const pool = await database();
    const queryData = await pool.request()
      .query(`
        SELECT 
          ID AS id,   
          CONFIG_NAME AS name, 
          CONFIG_VALUE AS value 
        FROM MMA_R_CONFIG
      `)

    if (queryData?.recordset?.length > 0) {
      return res.status(200).json({
        isSucess: true,
        message: '',
        result: queryData?.recordset
      })
    } else {
      return res.status(200).json({
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