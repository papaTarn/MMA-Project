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
  ID: number,
  PRODUCT_ID: number,
  REF_CATEGORY_ID: number,
  PRODUCT_NAME: string,
  PRODUCT_DETAIL: string,
  PRODUCT_IMG: string,
  PRODUCT_PRICE: number,
  FAVOURITE_FLAG: string,
  RECOMMEND_FLAG: string
}

export const getRecommend = async (req: CustomRequest, res: Response) => {
  try {
    const pool = await database();
    const { cateId, page, pageSize } = req.body; // req.params => ใช้กับ GET Method, req.body => ใช้กับ POST Method
    const userID = req.user?.userId ?? null;
    const userEmail = req.user?.email ?? null;

    const queryData = await pool.request()
      .input('userId', userID)
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
        recommendFlag: 'X'
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
    const userID = req.user?.userId ?? null;
    const userEmail = req.user?.email ?? null;

    const queryData = await pool.request()
      .input('userId', userID)
      .input('prodId', prodId)
      .query(`EXEC MMA_NSP_GET_PRODUCT_BY_ID @prodId, @userId`)

    if (queryData?.recordset?.length > 0) {
      let mappingData = queryData?.recordset?.map((obj: IProductDetail) => ({
        id: obj.PRODUCT_ID,
        refCategoryId: obj.REF_CATEGORY_ID,
        prodName: obj.PRODUCT_NAME,
        prodDetail: obj.PRODUCT_DETAIL,
        prodImg: obj.PRODUCT_IMG,
        prodPrice: obj.PRODUCT_PRICE,
        favFlag: obj.FAVOURITE_FLAG,
        recommendFlag: obj.RECOMMEND_FLAG,
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
    const userID = req.user?.userId ?? null;
    const userEmail = req.user?.email ?? null;

    const queryData = await pool.request()
      .input('userId', userID)
      .input('cateId', cateId)
      .input('page', page)
      .input('pageSize', pageSize)
      .query(`EXEC MMA_NSP_GET_CATEGORY_LIST @cateId, @userId, @page, @pageSize`)

    if (queryData?.recordset?.length > 0) {
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
    } else {
      return res.status(200).json({
        isSuccess: false,
        message: '',
        result: []
      })
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

export const getFavoriteListByUserId = async (req: CustomRequest, res: Response) => {
  try {
    const pool = await database();
    const userID = req.user?.userId ?? null;
    const userEmail = req.user?.email ?? null;

    if (userID) {
      const queryData = await pool.request()
        .input('userId', userID)
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

    const { refProdId } = req.body;
    const userID = req.user?.userId ?? null;
    const userEmail = req.user?.email ?? null;
    const dateNow = new Date(new Date().toUTCString());

    if (userID) {
      const queryData = await pool.request()
        .input('userId', userID)
        .input('refProdId', refProdId)
        .query(`
          SELECT * FROM MMA_T_FAVOURITE
          WHERE REF_USER_ID = @userId AND REF_PRODUCT_ID = @refProdId
        `)

      if (queryData?.recordset?.length > 0) {
        await pool.request()
          .input('userId', userID)
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
          .input('userId', userID)
          .input('refProdId', refProdId)
          .input('userEmail', userEmail)
          .input('createDate', dateNow)
          .query(`
              INSERT INTO MMA_T_FAVOURITE (REF_USER_ID, REF_PRODUCT_ID, CREATE_BY, CREATE_DATE, ROW_VERSION)
              OUTPUT INSERTED.id
              VALUES (@userId, @refProdId, @userEmail, @createDate, 1)
            `)

        return res.status(201).json({
          isSuccess: true,
          message: 'Added to favourite successfully.',
          result: result.recordset[0]
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
    const userID = req.user?.userId ?? null;
    const userEmail = req.user?.email ?? null;

    if (userID) {
      const queryData = await pool.request()
        .input('userId', userID)
        .query(`
          SELECT 
            c.ID AS id, 
            p.ID AS prodId, 
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

export const getCountCartByUserId = async (req: CustomRequest, res: Response) => {
  try {
    const pool = await database();
    const userID = req.user?.userId ?? null;
    const userEmail = req.user?.email ?? null;

    if (userID) {
      const queryData = await pool.request()
        .input('userId', userID)
        .query(`
          SELECT 
            COUNT(*) AS count
          FROM MMA_T_CART
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
    const { refProdId, qty, status } = req.body; // req.params => ใช้กับ GET Method, req.body => ใช้กับ POST Method
    const userID = req.user?.userId ?? null;
    const userEmail = req.user?.email ?? null;
    const dateNow = new Date(new Date().toUTCString());

    if (userID) {
      const queryData = await pool.request()
        .input('userId', userID)
        .input('refProdId', refProdId)
        .query(`
          SELECT ID, QTY FROM MMA_T_CART
          WHERE REF_USER_ID = @userId AND REF_PRODUCT_ID = @refProdId
        `)

      if (queryData?.recordset?.length > 0) {
        let totalQTY: number = qty;
        if (status == 1) { // 1 = Add to Cart, 2 = Cart
          totalQTY = qty + queryData.recordset[0].QTY;
          if (totalQTY > 99) {
            totalQTY = 99
          }
        }

        await pool.request()
          .input('userId', userID)
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
          .input('userId', userID)
          .input('refProdId', refProdId)
          .input('qty', qty)
          .input('userEmail', userEmail)
          .input('createDate', dateNow)
          .query(`
            INSERT INTO MMA_T_CART (REF_USER_ID, REF_PRODUCT_ID, QTY, CREATE_BY, CREATE_DATE, ROW_VERSION)
            OUTPUT INSERTED.id
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

    const { cartList } = req.body;
    const userID = req.user?.userId ?? null;
    const userEmail = req.user?.email ?? null;
    const dateNow = new Date(new Date().toUTCString());

    if (userID) {
      const results = await Promise.all(
        cartList.map(async (obj: any) => {
          await pool.request()
            .input('id', obj.id)
            .query(`
              DELETE FROM MMA_T_CART
              WHERE ID = @id
            `)
        })
      );

      return res.status(200).json({
        isSuccess: true,
        message: '',
        result: []
      });
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
    const userID = req.user?.userId ?? null;
    const userEmail = req.user?.email ?? null;

    if (userID) {
      const queryData = await pool.request()
        .input('id', prodId)
        .query(`
          SELECT ID FROM MMA_T_CART
          WHERE ID = @id
        `)

      if (queryData?.recordset?.length > 0) {
        await pool.request()
          .input('id', prodId)
          .query(`
            DELETE FROM MMA_T_CART
            WHERE ID = @id
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

export const purchaseOrder = async (req: CustomRequest, res: Response) => {
  try {
    const pool = await database();
    const transaction = pool.transaction(); // เพื่อทำงานหลายคำสั่ง SQL ในกลุ่มเดียวกัน

    const { refAddressID, items } = req.body;
    const userID = req.user?.userId ?? null;
    const userEmail = req.user?.email ?? null;
    const dateNow = new Date(new Date().toUTCString());

    try {
      if (userID) {
        // เริ่ม Transaction
        await transaction.begin();
        const orderResult = await transaction
          .request()
          .input("userID", userID)
          .input("refAddressID", refAddressID)
          .input('userEmail', userEmail)
          .input('createDate', dateNow)
          .query(`
          INSERT INTO MMA_T_ORDER (REF_USER_ID, REF_ADDRESS_ID, CREATE_BY, CREATE_DATE, ROW_VERSION)
          OUTPUT INSERTED.id
          VALUES (@userID, @refAddressID, @userEmail, @createDate, 1)
        `);

        const orderID = orderResult.recordset[0].id;

        // เพิ่มข้อมูลลงใน MMA_T_ORDER_ITEM
        for (const item of items) {
          await transaction
            .request()
            .input("refOrderID", orderID)
            .input("refProductID", item.prodID)
            .input("price", item.price)
            .input("qty", item.qty)
            .input('userEmail', userEmail)
            .input('createDate', dateNow)
            .query(`
              INSERT INTO MMA_T_ORDER_ITEM (REF_ORDER_ID, REF_PRODUCT_ID, PRICE, QTY, CREATE_BY, CREATE_DATE, ROW_VERSION)
              VALUES (@refOrderID, @refProductID, @price, @qty, @userEmail, @createDate, 1)
            `);
        }

        // ลบข้อมูลใน MMA_T_CART
        await transaction.request()
          .input("userID", userID)
          .query(`
            DELETE FROM MMA_T_CART WHERE REF_USER_ID = @userID
        `);

        // Commit เมื่อสำเร็จ
        await transaction.commit();
        return res.status(200).json({
          isSuccess: true,
          message: 'Order inserted successfully',
          result: []
        });
      } else {
        return res.status(403).json({
          isSuccess: false,
          message: 'Invalid token',
        });
      }
    } catch (error) {
      // Rollback: ยกเลิกการเปลี่ยนแปลงทั้งหมด หากเกิดข้อผิดพลาด
      await transaction.rollback();
      return res.status(500).json({
        isSuccess: false,
        message: 'Failed to insert order',
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

export const getProductAll = async (req: CustomRequest, res: Response) => {
  try {
    const pool = await database();
    const { prodName, cateId, page, pageSize } = req.body; // req.params => ใช้กับ GET Method, req.body => ใช้กับ POST/PATCH Method
    const userID = req.user?.userId ?? null;
    const userEmail = req.user?.email ?? null;

    const queryData = await pool.request()
      .input('paramProdName', prodName)
      .input('paramCateId', cateId)
      .input('paramPage', page)
      .input('paramPageSize', pageSize)
      .query(`
        DECLARE @prodName NVARCHAR(200) = @paramProdName;
        DECLARE @cateID INT = @paramCateID; 
        DECLARE @page INT = @paramPage;
        DECLARE @pageSize INT = @paramPageSize;
          WITH ProductWithRowNumber AS ( -- เพื่อใช้เป็นตารางชั่วคราวสำหรับการคำนวณหรือจัดเรียงข้อมูล
            SELECT ROW_NUMBER() OVER (ORDER BY ID) AS RowNum, * -- ฟังก์ชัน ROW_NUMBER() สร้างลำดับหมายเลขแถวโดยอิงตามคอลัมน์ ID ที่ใช้เรียงลำดับ
            FROM MMA_T_PRODUCT
            WHERE PRODUCT_NAME LIKE '%' + @prodName + '%' AND REF_CATEGORY_ID = @cateID
          )
          SELECT 
            listProduct.*, 
            CEILING((SELECT COUNT(*) * 1.0 / @pageSize FROM MMA_T_PRODUCT WHERE PRODUCT_NAME LIKE '%' + @prodName + '%' AND REF_CATEGORY_ID = @cateID)) AS totalPage,
            (SELECT COUNT(*) FROM MMA_T_PRODUCT WHERE PRODUCT_NAME LIKE '%' + @prodName + '%' AND REF_CATEGORY_ID = @cateID) AS totalRecord                   
          FROM ProductWithRowNumber AS listProduct
          WHERE RowNum BETWEEN ((@page - 1) * @pageSize + 1) AND (@page * @pageSize)
        `)

    if (queryData?.recordset?.length > 0) {
      let data = queryData?.recordset?.map((obj: IProductDetail) => ({
        id: obj.ID,
        refCateId: obj.REF_CATEGORY_ID,
        prodName: obj.PRODUCT_NAME,
        prodDetail: obj.PRODUCT_DETAIL,
        prodImg: obj.PRODUCT_IMG,
        prodPrice: obj.PRODUCT_PRICE
      }))

      let mappingData = {
        list: data,
        totalPage: queryData?.recordset[0].totalRecord,
        totalRecord: queryData?.recordset[0].totalPage,
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

export const orderHistoryAll = async (req: CustomRequest, res: Response) => {
  try {
    const pool = await database();
    const { startDate, endDate } = req.body;
    const userIDToken = req.user?.userId ?? null;
    const userEmailToken = req.user?.email ?? null;

    if (userIDToken) {
      console.log(startDate, endDate)
      const queryData = await pool.request()
        .input('paramStartDate', startDate)
        .input('paramEndDate', endDate)
        .query(`
          SELECT DISTINCT  
            o.ID AS orderId, 
            o.CREATE_DATE AS orderDate,
            o.REF_USER_ID AS userId,
            o.FULLNAME AS fullName, 
            o.TEL AS tel, 
            o.ADDRESS AS address, 
            SUM(i.PRICE) OVER (PARTITION BY o.ID) AS totalPrice, -- ใช้กำหนดกลุ่ม (partition) สำหรับการคำนวณ.
            SUM(i.QTY) OVER (PARTITION BY o.ID) AS totalQTY -- ใช้กำหนดกลุ่ม (partition) สำหรับการคำนวณ.
          FROM MMA_T_ORDER o
            JOIN MMA_T_ORDER_ITEM i ON o.ID = i.REF_ORDER_ID
            LEFT JOIN MMA_T_PRODUCT p ON i.REF_PRODUCT_ID = p.ID
          ORDER BY o.ID DESC
        `);

      if (queryData?.recordset?.length > 0) {
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

export const orderHistoryById = async (req: CustomRequest, res: Response) => {
  try {
    const pool = await database();
    const { userId, orderId } = req.body;
    const userIDToken = req.user?.userId ?? null;
    const userEmailToken = req.user?.email ?? null;

    if (userIDToken) {
      console.log(userId, orderId)
      const queryData = await pool.request()
        .input('paramUserId', userId)
        .input('paramOrderId', orderId)
        .query(`
          DECLARE @userId INT = @paramUserId;
          DECLARE @orderId INT = @paramOrderId;
          SELECT 
            o.ID AS orderId, 
            o.CREATE_DATE AS orderDate,
            o.FULLNAME AS fullName, 
            o.TEL AS tel, 
            o.ADDRESS AS address, 
            i.REF_PRODUCT_ID AS refProdId, 
            p.PRODUCT_NAME AS prodName, 
            p.PRODUCT_DETAIL AS prodDetail, 
            p.PRODUCT_IMG AS prodImg, 
            i.PRICE AS prodPrice, 
            i.QTY AS qty, 
            SUM(i.PRICE) OVER (PARTITION BY o.ID) AS totalPrice, -- ใช้กำหนดกลุ่ม (partition) สำหรับการคำนวณ.
            SUM(i.QTY) OVER (PARTITION BY o.ID) AS totalQTY
          FROM MMA_T_ORDER o
            LEFT JOIN MMA_T_ORDER_ITEM i ON o.ID = i.REF_ORDER_ID
            LEFT JOIN MMA_T_PRODUCT p ON i.REF_PRODUCT_ID = p.ID
          WHERE o.REF_USER_ID = @userId AND (@orderId IS NULL OR o.ID = @orderId)
          ORDER BY o.ID DESC, p.PRODUCT_NAME ASC
        `);

      if (queryData?.recordset?.length > 0) {
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