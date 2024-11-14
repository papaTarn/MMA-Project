import { Request, Response } from "express-serve-static-core";
import { database, JWT_SECRET } from '../config/database';

interface CustomRequest extends Request {
  user?: {
    userId?: number,
    email?: string
  };
}

interface IProduct {
  PRODUCT_ID: number,
  PRODUCT_NAME: string,
  PRODUCT_IMG: string,
  PRODUCT_PRICE: number,
  FAVOURITE_FLAG: string,
  RECOMMEND_FLAG: string,
  TOTAL: number,
  TOTAL_PAGE: number
}

interface IProductDetail {
  PRODUCT_ID: number,
  REF_CATEGORY_ID: number,
  PRODUCT_NAME: string,
  PRODUCT_DETAIL: string,
  PRODUCT_IMG: string,
  PRODUCT_PRICE: number
}

export const getRecommend = async (req: CustomRequest, res: Response) => {
  try {
    const pool = await database();
    const { cateId, page, pageSize } = req.body; // req.params => ใช้กับ GET Method, req.body => ใช้กับ POST Method
    const userId = req.user?.userId ?? null;
    const userEmail = req.user?.email ?? null;

    const queryData = await pool.request()
      .input('userId', userId)
      .input('cateId', cateId)
      .input('page', page)
      .input('pageSize', pageSize)
      .query(`EXEC MMA_NSP_GET_RECOMMEND_LIST @cateId, @userId, @page, @pageSize`)

    if (queryData?.recordset?.length > 0) {
      let results = queryData?.recordset?.map((obj: IProduct) => ({
        id: obj.PRODUCT_ID,
        prodName: obj.PRODUCT_NAME,
        prodImg: obj.PRODUCT_IMG,
        prodPrice: obj.PRODUCT_PRICE,
        favFlag: obj.FAVOURITE_FLAG,
      }))

      let mappingData = {
        list: results,
        totalPage: queryData?.recordset[0].TOTAL_PAGE,
        totalRecord: queryData?.recordset[0].TOTAL,
      }

      return res.status(200).json({
        isSuccess: true,
        message: '',
        result: mappingData
      })
    } else {
      return res.status(200).json({
        isSuccess: false,
        message: 'Data not found',
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

export const getProductInfo = async (req: CustomRequest, res: Response) => {
  try {
    const pool = await database();
    const { prodId } = req.params; // req.params => ใช้กับ GET Method, req.body => ใช้กับ POST/PATCH Method
    const userId = req.user?.userId ?? null;
    const userEmail = req.user?.email ?? null;

    const queryData = await pool.request()
      .input('userId', userId)
      .input('prodId', prodId)
      .query(`EXEC MMA_NSP_GET_PRODUCT_BY_ID @prodId, @userId`)

    if (queryData?.recordset?.length > 0) {
      let mappingData = queryData?.recordset?.map((obj: IProductDetail) => ({
        id: obj.PRODUCT_ID,
        refCateId: obj.REF_CATEGORY_ID,
        prodName: obj.PRODUCT_NAME,
        prodDetail: obj.PRODUCT_DETAIL,
        prodImg: obj.PRODUCT_IMG,
        prodPrice: obj.PRODUCT_PRICE
      }))

      return res.status(200).json({
        isSuccess: true,
        message: '',
        result: mappingData
      })
    } else {
      return res.status(200).json({
        isSuccess: false,
        message: 'Data not found',
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

export const getProductListByCate = async (req: CustomRequest, res: Response) => {
  try {
    const pool = await database();
    const { cateId, page, pageSize } = req.body; // req.params => ใช้กับ GET Method, req.body => ใช้กับ POST Method
    const userId = req.user?.userId ?? null;
    const userEmail = req.user?.email ?? null;

    const queryData = await pool.request()
      .input('userId', userId)
      .input('cateId', cateId)
      .input('page', page)
      .input('pageSize', pageSize)
      .query(`EXEC MMA_NSP_GET_CATEGORY_LIST @cateId, @userId, @page, @pageSize`)

    let data = queryData?.recordset?.map((obj: IProduct) => ({
      id: obj.PRODUCT_ID,
      prodName: obj.PRODUCT_NAME,
      prodImg: obj.PRODUCT_IMG,
      prodPrice: obj.PRODUCT_PRICE,
      favFlag: obj.FAVOURITE_FLAG,
      recommendFlag: obj.RECOMMEND_FLAG,
    }))

    let mappingData = {
      list: data,
      totalPage: queryData?.recordset[0].TOTAL_PAGE,
      totalRecord: queryData?.recordset[0].TOTAL,
    }

    return res.status(200).json({
      isSuccess: true,
      message: '',
      result: mappingData
    })
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

export const getFavoriteListByUserId = async (req: CustomRequest, res: Response) => {
  try {
    const pool = await database();
    const userId = req.user?.userId ?? null;
    const userEmail = req.user?.email ?? null;

    if (userId) {
      const queryData = await pool.request()
        .input('userId', userId)
        .query(`
          SELECT 
            p.ID AS id, 
            p.REF_CATEGORY_ID AS refCateId, 
            p.PRODUCT_NAME AS prodName, 
            p.PRODUCT_DETAIL AS prodDetail, 
            p.PRODUCT_IMG AS prodImg, 
            p.PRODUCT_PRICE AS prodPrice
          FROM MMA_T_FAVOURITE c
          LEFT JOIN MMA_T_PRODUCT p ON c.REF_PRODUCT_ID = p.ID
          WHERE REF_USER_ID = @userId
        `)

      if (queryData?.recordset?.length > 0) {
        const mappingData = queryData?.recordset;
        // การใช้ Promise.all() ทำให้สามารถรันคำสั่งที่ต้องรอการทำงาน (เช่น การดึงข้อมูลแบบ async) พร้อมกันหลายคำสั่งได้ โดยไม่ต้องรอให้แต่ละคำสั่งเสร็จสิ้นก่อน
        const results = await Promise.all(
          mappingData.map(async (obj) => {
            const queryDataRecommend = await pool.request()
              .input('id', obj.id)
              .query(`EXEC MMA_NSP_CHECK_RECOMMEND @id`)

            if (queryDataRecommend.recordset.length > 0) {
              return {
                id: obj.id,
                recommendFlag: queryDataRecommend.recordset[0].IS_RECOMMEND || ''
              };
            }

            return { id: obj.id, recommendFlag: '' };
          }));

        mappingData.forEach(item1 => {
          const matchingItem = results.find(item2 => item1.id === item2.id);
          if (matchingItem) {
            item1.recommendFlag = matchingItem.recommendFlag;
          }
        });

        return res.status(200).json({
          isSuccess: true,
          message: '',
          result: mappingData
        });

        // let results = [];
        // for (let obj of mappingData) {
        //   let queryDataRecommend = await pool.query(`EXEC MMA_NSP_CHECK_RECOMMEND ${obj.id}`);

        //   if (queryDataRecommend?.recordset.length > 0) {
        //     let mappingDatas = queryDataRecommend?.recordset?.map((obj: IRecommed) => ({
        //       id: obj.ID,
        //       recommendFlag: obj.IS_RECOMMEND
        //     }))

        //     results.push(...mappingDatas)
        //   }
        // }

        // mappingData.forEach(item1 => {
        //   const matchingItem = results.find(item2 => item1.id === item2.id);
        //   if (matchingItem) {
        //     item1.recommendFlag = matchingItem.recommendFlag ? matchingItem.recommendFlag : '';
        //   }
        // });

        // return res.json({
        //   isSuccess: true,
        //   message: '',
        //   result: mappingData
        // })
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

export const setFavourite = async (req: CustomRequest, res: Response) => {
  try {
    const pool = await database();

    const { refProdId, favFlag } = req.body;
    const userId = req.user?.userId ?? null;
    const userEmail = req.user?.email ?? null;
    const dateNow = new Date(new Date().toUTCString());

    if (userId) {
      const queryData = await pool.request()
        .input('userId', userId)
        .input('refProdId', refProdId)
        .query(`
          SELECT * FROM MMA_T_FAVOURITE
          WHERE REF_USER_ID = @userId AND REF_PRODUCT_ID = @refProdId
        `)

      if (queryData?.recordset?.length > 0) {
        if (!favFlag) {
          await pool.request()
            .input('userId', userId)
            .input('refProdId', refProdId)
            .query(`
              DELETE FROM MMA_T_FAVOURITE
              WHERE REF_USER_ID = @userId AND REF_PRODUCT_ID = @refProdId
            `)

          return res.status(200).json({
            isSuccess: true,
            message: 'Updated favourite successfully.',
            result: []
          });
        } else {
          const result = await pool.request()
            .input('userId', userId)
            .input('refProdId', refProdId)
            .input('userEmail', userEmail)
            .input('createDate', dateNow)
            .query(`
              INSERT INTO MMA_T_FAVOURITE (REF_USER_ID, REF_PRODUCT_ID, CREATE_BY, CREATE_DATE, ROW_VERSION)
              OUTPUT inserted.id
              VALUES (@userId, @refProdId, @userEmail, @createDate, 1)
            `)

          return res.status(201).json({
            isSuccess: true,
            message: 'Added to favourite successfully.',
            result: result.recordset[0]
          });
        }
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

export const getCartByUserId = async (req: CustomRequest, res: Response) => {
  try {
    const pool = await database();
    const userId = req.user?.userId ?? null;
    const userEmail = req.user?.email ?? null;

    if (userId) {
      const queryData = await pool.request()
        .input('userId', userId)
        .query(`
          SELECT 
            p.ID AS id, 
            p.REF_CATEGORY_ID AS refCateId, 
            p.PRODUCT_NAME AS prodName, 
            p.PRODUCT_DETAIL AS prodDetail, 
            p.PRODUCT_IMG AS prodImg, 
            p.PRODUCT_PRICE AS prodPrice, 
            c.QTY AS qty
          FROM MMA_T_CART c
          LEFT JOIN MMA_T_PRODUCT p ON c.REF_PRODUCT_ID = p.ID
          WHERE REF_USER_ID = @userId
        `)

      if (queryData.recordset.length > 0) {
        return res.status(200).json({
          isSuccess: true,
          message: '',
          result: queryData?.recordset
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

export const addCart = async (req: CustomRequest, res: Response) => {
  try {
    const pool = await database();
    const { refProdId, qty } = req.body; // req.params => ใช้กับ GET Method, req.body => ใช้กับ POST Method
    const userId = req.user?.userId ?? null;
    const userEmail = req.user?.email ?? null;
    const dateNow = new Date(new Date().toUTCString());

    if (userId) {
      const queryData = await pool.request()
        .input('userId', userId)
        .input('refProdId', refProdId)
        .query(`
          SELECT ID FROM MMA_T_CART
          WHERE REF_USER_ID = @userId AND REF_PRODUCT_ID = @refProdId
        `)

      if (queryData?.recordset?.length > 0) {
        const totalQTY = qty + queryData.recordset[0].QTY;

        await pool.request()
          .input('userId', userId)
          .input('userEmail', userEmail)
          .input('totalQTY', totalQTY)
          .input('refProdId', refProdId)
          .input('lastUpdateDate', dateNow)
          .query(`
            UPDATE MMA_T_CART
            SET 
              QTY = @totalQTY,
              LASTUPDATE_BY = @userEmail,
              LASTUPDATE_DATE = @lastUpdateDate,
              ROW_VERSION = ROW_VERSION + 1 
            WHERE REF_USER_ID = @userId AND REF_PRODUCT_ID = @refProdId
          `)

        return res.status(200).json({
          isSuccess: true,
          message: 'Updated qty in cart successfully.',
          result: []
        });
      } else {
        await pool.request()
          .input('userId', userId)
          .input('refProdId', refProdId)
          .input('qty', qty)
          .input('userEmail', userEmail)
          .input('createDate', dateNow)
          .query(`
            INSERT INTO MMA_T_CART (REF_USER_ID, REF_PRODUCT_ID, QTY, CREATE_BY, CREATE_DATE, ROW_VERSION)
            OUTPUT inserted.id
            VALUES (@userId, @refProdId, @qty, @userEmail, @createDate, 1)
          `)

        return res.status(200).json({
          isSuccess: true,
          message: 'Added to cart successfully.',
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

export const updateCart = async (req: CustomRequest, res: Response) => {
  try {
    const pool = await database();

    const { refProdId, qty } = req.body;
    const userId = req.user?.userId ?? null;
    const userEmail = req.user?.email ?? null;
    const dateNow = new Date(new Date().toUTCString());

    if (userId) {
      const queryData = await pool.request()
        .input('userId', userId)
        .input('refProdId', refProdId)
        .query(`
          SELECT * FROM MMA_T_CART
          WHERE REF_USER_ID = @userId AND REF_PRODUCT_ID = @refProdId
        `)

      if (queryData?.recordset?.length > 0) {
        const totalQTY = qty + queryData.recordset[0].QTY;

        await pool.request()
          .input('userId', userId)
          .input('userEmail', userEmail)
          .input('refProdId', refProdId)
          .input('totalQTY', totalQTY)
          .input('lastUpdateDate', dateNow)
          .query(`
            UPDATE MMA_T_CART
            SET 
              QTY = @totalQTY, 
              LASTUPDATE_BY = @userEmail,
              LASTUPDATE_DATE = @lastUpdateDate,
              ROW_VERSION = ROW_VERSION + 1 
            WHERE REF_USER_ID = @userId AND REF_PRODUCT_ID = @refProdId
          `)

        return res.status(200).json({
          isSuccess: true,
          message: 'Updated qty in cart successfully.',
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

export const deleteCart = async (req: CustomRequest, res: Response) => {
  try {
    const pool = await database();

    const { prodId } = req.params;
    const userId = req.user?.userId ?? null;
    const userEmail = req.user?.email ?? null;

    if (userId) {
      const queryData = await pool.request()
        .input('prodId', prodId)
        .query(`
          SELECT ID FROM MMA_T_CART
          WHERE ID = @prodId
        `)

      if (queryData?.recordset?.length > 0) {
        await pool.request()
          .input('id', prodId)
          .query(`
            DELETE FROM MMA_T_CART
            WHERE ID = @prodId
        `)

        return res.status(200).json({
          isSuccess: true,
          message: 'Delete product in cart successfully.',
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