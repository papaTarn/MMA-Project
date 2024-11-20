import { Request, Response } from 'express';
import { database, JWT_SECRET } from '../config/database';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
  user?: {
    userId?: number,
    email?: string
  };
}

export const register = async (req: Request, res: Response) => {
  try {
    const pool = await database();
    const { email, password } = req.body;
    const dateNow = new Date(new Date().toUTCString());

    if (!email) {
      return res.status(200).json({
        isSuccess: false,
        message: 'This field is required.',
        result: []
      })
    } else {
      const queryData = await pool.request()
        .input('email', email)
        .query(`
          SELECT ID 
          FROM MMA_T_USER 
          WHERE EMAIL = @email
        `)

      if (queryData.recordset.length > 0) {
        return res.status(200).json({
          isSuccess: false,
          message: 'Email already in use.',
          result: []
        });
      } else {
        const hashPassword = await bcrypt.hash(password, 10)
        // 10 => จำนวนรอบในการสุ่มข้อมูลในกระบวนการ hashing ยิ่งจำนวนรอบมากยิ่งใช้เวลามากขึ้น ช่วยให้การโจมตีเพื่อเดารหัสผ่านโดยใช้ข้อมูลที่คำนวณไว้ล่วงหน้ายากขึ้น ซึ่งเพิ่มความปลอดภัยแต่ก็เพิ่มเวลาที่ใช้ในการประมวลผลเช่นกัน.
        if (hashPassword) {
          await pool.request()
            .input('email', email)
            .input('hashPassword', hashPassword)
            .input('createDate', dateNow)
            .query(`
              INSERT INTO MMA_T_USER (EMAIL, PASSWORD, CREATE_BY, CREATE_DATE, ROW_VERSION)
              VALUES (@email, @hashPassword, @email, @createDate, 1)
          `)

          return res.status(200).json({
            isSuccess: true,
            message: 'Register Successfully.',
            result: []
          })
        }
      }
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

export const checkLogin = async (req: Request, res: Response) => {
  try {
    const pool = await database();
    const { email, password } = req.body;

    const queryData = await pool.request()
      .input('email', email)
      .query(`
        SELECT ID, EMAIL, PASSWORD
        FROM MMA_T_USER 
        WHERE EMAIL = @email
      `)

    if (queryData.recordset.length > 0) {
      bcrypt.compare(password, queryData.recordset[0].PASSWORD, (err, isLogin) => {
        if (isLogin) {
          const token = jwt.sign({
            email: queryData.recordset[0].EMAIL,
            userId: queryData.recordset[0].ID
          }, JWT_SECRET, { expiresIn: '1d' })

          return res.status(200).json({
            isSuccess: true,
            message: 'Login Success',
            result: {
              token,
              email: queryData.recordset[0].EMAIL,
              userId: queryData.recordset[0].ID
            }
          })
        } else {
          return res.status(200).json({
            isSuccess: false,
            message: 'Please verify your email address and password and try again.',
            result: []
          })
        }
      });
    } else {
      return res.status(200).json({
        isSuccess: false,
        message: 'Please verify your email address and password and try again.',
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

export const getUserById = async (req: CustomRequest, res: Response) => {
  try {
    const pool = await database();
    const userID = req.user?.userId ?? null;
    const userEmail = req.user?.email ?? null;

    if (userID) {
      const queryData = await pool.request()
        .input('userId', userID)
        .query(`
          SELECT
            ID AS id, 
            USER_FNAME AS fname, 
            USER_LNAME AS lname, 
            TEL AS tel, 
            GENDER AS gender, 
            EMAIL AS email, 
            ROW_VERSION AS rowVersion
          FROM MMA_T_USER 
          WHERE ID = @userId
        `)

      if (queryData.recordset.length > 0) {
        return res.status(200).json({
          isSuccess: true,
          message: '',
          result: queryData.recordset
        })
      } else {
        return res.status(200).json({
          isSuccess: false,
          message: 'Data not found',
          result: []
        });
      }
    } else {
      return res.status(403).json({
        isSuccess: false,
        message: 'Invalid token',
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

export const updateProfile = async (req: CustomRequest, res: Response) => {
  try {
    const pool = await database();
    const { fname, lname, tel, gender } = req.body;
    const userID = req.user?.userId ?? null;
    const userEmail = req.user?.email ?? null;
    const dateNow = new Date(new Date().toUTCString());

    if (userID) {
      const queryData = await pool.request()
        .input('userId', userID)
        .query(`
          SELECT ID FROM MMA_T_USER 
          WHERE ID = @userId
        `)

      if (queryData?.recordset?.length > 0) {
        await pool.request()
          .input('userId', userID)
          .input('userEmail', userEmail)
          .input('fname', fname)
          .input('lname', lname)
          .input('tel', tel)
          .input('gender', gender)
          .input('lastUpdateDate', dateNow)
          .query(`
            UPDATE MMA_T_USER
            SET 
              USER_FNAME = @fname, 
              USER_LNAME = @lname, 
              TEL = @tel, 
              GENDER = @gender,
              LASTUPDATE_BY = @userEmail,
              LASTUPDATE_DATE = @lastUpdateDate,
              ROW_VERSION = ROW_VERSION + 1 
            WHERE ID = @userId
          `)

        return res.status(200).json({
          isSuccess: true,
          message: 'Updated Successfully.',
          result: []
        });
      } else {
        return res.status(200).json({
          isSuccess: false,
          message: 'Data not found.',
          result: []
        });
      }
    } else {
      return res.status(403).json({
        isSuccess: false,
        message: 'Invalid token.',
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

export const createAddress = async (req: CustomRequest, res: Response) => {
  try {
    const pool = await database();
    const { fname, lname, tel, address, defaultFlag } = req.body;
    const userID = req.user?.userId ?? null;
    const userEmail = req.user?.email ?? null;
    const dateNow = new Date(new Date().toUTCString());

    if (userID) {
      await pool.request()
        .input('userId', userID)
        .input('userEmail', userEmail)
        .input('fname', fname)
        .input('lname', lname)
        .input('tel', tel)
        .input('address', address)
        .input('defaultFlag', defaultFlag)
        .input('createDate', dateNow)
        .query(`
          INSERT INTO MMA_T_ADDRESS (REF_USER_ID, USER_FNAME, USER_LNAME, TEL, ADDRESS, DEFAULT_FLAG, CREATE_BY, CREATE_DATE, ROW_VERSION)
          OUTPUT inserted.id
          VALUES (@userId, @fname, @lname, @tel, @address, @defaultFlag, @userEmail, @createDate, 1)
        `);

      return res.status(200).json({
        isSuccess: true,
        message: 'Create Successfully.',
        result: []
      });
    } else {
      return res.status(403).json({
        isSuccess: false,
        message: 'Invalid token.',
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

export const getAddressByUserId = async (req: CustomRequest, res: Response) => {
  try {
    const pool = await database();
    const userID = req.user?.userId ?? null;
    const userEmail = req.user?.email ?? null;

    if (userID) {
      const queryData = await pool.request()
        .input('userId', userID)
        .query(`
          SELECT 
            ID AS id, 
            REF_USER_ID AS refUserId, 
            USER_FNAME AS fname, 
            USER_LNAME AS lname, 
            TEL AS tel, 
            ADDRESS AS address, 
            DEFAULT_FLAG AS defaultFlag, 
            ROW_VERSION AS rowVersion
          FROM MMA_T_ADDRESS
          WHERE REF_USER_ID = @userId
        `);

      if (queryData.recordset.length > 0) {
        return res.status(200).json({
          isSuccess: true,
          message: '',
          result: queryData.recordset
        })
      } else {
        return res.status(200).json({
          isSuccess: false,
          message: 'Data not found',
          result: []
        });
      }
    } else {
      return res.status(403).json({
        isSuccess: false,
        message: 'Invalid token',
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

export const updateAddress = async (req: CustomRequest, res: Response) => {
  try {
    const pool = await database();
    const { id, fname, lname, tel, address, defaultFlag } = req.body;
    const userID = req.user?.userId ?? null;
    const userEmail = req.user?.email ?? null;
    const dateNow = new Date(new Date().toUTCString());

    if (userID) {
      const queryData = await pool.request()
        .input('id', id)
        .query(`
          SELECT * FROM MMA_T_ADDRESS 
          WHERE ID = @id
        `);

      if (queryData?.recordset?.length > 0) {
        if (defaultFlag === 'X') {
          await pool.request()
            .input('userId', userID)
            .input('userEmail', userEmail)
            .input('lastUpdateDate', dateNow)
            .query(`
              UPDATE MMA_T_ADDRESS
              SET 
                DEFAULT_FLAG = NULL,
                LASTUPDATE_BY = @userEmail,
                LASTUPDATE_DATE = @lastUpdateDate,
                ROW_VERSION = ROW_VERSION + 1 
              WHERE REF_USER_ID = @userId AND DEFAULT_FLAG = 'X'
            `);
        }

        await pool.request()
          .input('userId', userID)
          .input('userEmail', userEmail)
          .input('fname', fname)
          .input('lname', lname)
          .input('tel', tel)
          .input('address', address)
          .input('defaultFlag', defaultFlag)
          .input('lastUpdateDate', dateNow)
          .query(`
            UPDATE MMA_T_ADDRESS 
            SET 
              USER_FNAME = @fname, 
              USER_LNAME = @lname, 
              TEL = @tel, 
              ADDRESS = @address, 
              DEFAULT_FLAG = @defaultFlag,
              LASTUPDATE_BY = @userEmail,
              LASTUPDATE_DATE = @lastUpdateDate,
              ROW_VERSION = ROW_VERSION + 1 
            WHERE ID = @id AND REF_USER_ID = @userId
          `);

        return res.status(200).json({
          isSuccess: true,
          message: 'Updated Successfully.',
          result: []
        });
      } else {
        return res.status(200).json({
          isSuccess: false,
          message: 'Data not found.',
          result: []
        });
      }
    } else {
      return res.status(403).json({
        isSuccess: false,
        message: 'Invalid token.',
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

export const updateDefaultAddress = async (req: CustomRequest, res: Response) => {
  try {
    const pool = await database();
    const { id, defaultFlag } = req.body;
    const userID = req.user?.userId ?? null;
    const userEmail = req.user?.email ?? null;
    const dateNow = new Date(new Date().toUTCString());

    if (userID) {
      const result = await pool.request()
        .input('id', id)
        .input('defaultFlag', defaultFlag)
        .input('userEmail', userEmail)
        .input('userId', userID)
        .input('lastUpdateDate', dateNow)
        .query(`
          UPDATE MMA_T_ADDRESS
          SET 
            DEFAULT_FLAG = CASE WHEN ID = @id THEN @defaultFlag END, 
            LASTUPDATE_BY = CASE WHEN ID = @id THEN @userEmail END, 
            LASTUPDATE_DATE = CASE WHEN ID = @id THEN @lastUpdateDate END,
            ROW_VERSION = CASE WHEN ID = @id THEN ROW_VERSION + 1 ELSE ROW_VERSION END 
          WHERE REF_USER_ID = @userId
        `);

      if (result?.recordset?.length > 0) {
        return res.status(200).json({
          isSuccess: true,
          message: 'Updated Successfully.',
          result: []
        });
      } else {
        return res.status(200).json({
          isSuccess: false,
          message: 'Data not found',
          result: []
        });
      }
    } else {
      return res.status(403).json({
        isSuccess: false,
        message: 'Invalid token.',
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

export const deleteAddress = async (req: CustomRequest, res: Response) => {
  try {
    const pool = await database();
    const { id } = req.body;
    const userID = req.user?.userId ?? null;
    const userEmail = req.user?.email ?? null;

    if (userID) {
      const queryData = await pool.request()
        .input('userId', userID)
        .input('id', id)
        .query(`
          SELECT ID FROM MMA_T_CART  
          WHERE ID = @id AND REF_USER_ID = @userId
        `);

      if (queryData?.recordset?.length > 0) {
        await pool.request()
          .input('userId', userID)
          .input('id', id)
          .query(`
            DELETE FROM MMA_T_CART  
            WHERE ID = @id AND REF_USER_ID = @userId
          `);

        return res.status(200).json({
          isSuccess: true,
          message: 'Delete address successfully.',
          result: []
        });
      } else {
        return res.status(200).json({
          isSuccess: false,
          message: 'Data not found',
          result: []
        });
      }
    } else {
      return res.status(403).json({
        isSuccess: false,
        message: 'Invalid token',
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

export const getHistoryByUserId = async (req: CustomRequest, res: Response) => {
  try {
    const pool = await database();
    const userID = req.user?.userId ?? null;
    const userEmail = req.user?.email ?? null;

    if (userID) {
      const queryData = await pool.request()
        .input('userId', userID)
        .query(`
          SELECT 
            o.ID AS id, 
            i.REF_PRODUCT_ID AS refProdId, 
            p.PRODUCT_NAME AS prodName, 
            p.PRODUCT_DETAIL AS prodDetail, 
            p.PRODUCT_IMG AS prodImg, 
            i.PRICE AS prodPrice, 
            i.QTY AS qty, 
            o.CREATE_DATE AS createDate
          FROM MMA_T_ORDER o
            LEFT JOIN MMA_T_ORDER_ITEM i ON o.ID = i.REF_ORDER_ID
            LEFT JOIN MMA_T_PRODUCT p ON i.REF_PRODUCT_ID = p.ID
          WHERE o.REF_USER_ID = @userId
          ORDER BY p.PRODUCT_NAME ASC
        `);

      if (queryData?.recordset?.length > 0) {
        // let products = queryData?.recordset
        // const maxOrderId = Math.max(...products.map(product => product.orderId));
        // const lastOrderGroup = products.filter(product => product.orderId === maxOrderId);
        // const otherOrdersGroup = products.filter(product => product.orderId !== maxOrderId);

        // const results = {
        //   lastOrderGroup,
        //   otherOrdersGroup
        // };

        return res.status(200).json({
          isSuccess: true,
          message: '',
          result: queryData?.recordset
        });
      } else {
        return res.status(200).json({
          isSuccess: false,
          message: 'Data not found',
          result: []
        });
      }
    } else {
      return res.status(403).json({
        isSuccess: false,
        message: 'Invalid token',
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