import React, { useState } from 'react';
import { Card, Col, Flex, Row } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { ProductItem } from '@/models/productModel';
import useModal from '@/hooks/useModal';
import useNotification from '@/hooks/useNotification';
import { setFavourite } from '@/services/productService';
import FlagRecommend from './FlagRecommend';
import Link from 'next/link';

interface Props {
  recommend: ProductItem[];
  current: number;
  onClickReturn: (current: number) => void;
}

const urlImg = 'http://localhost:3001/images/';
export default function CardProduct({ recommend, current, onClickReturn }: Props) {
  const { success, errors, warning, info } = useNotification();
  const { modalConfirm, modalInfo, modalWarning, modalError } = useModal();
  const [loading, setLoading] = useState(true);

  const toggleFavorite = async (id: number) => {
    try {
      let items = {
        refProdId: id,
      };

      setLoading(true);
      await setFavourite(items);
      onClickReturn(current);
    } catch (err: any) {
      modalError({
        title: err?.message,
        content: err?.description,
        onOk: () => {},
        onCancel: () => {},
      });
    }
  };

  return (
    <React.Fragment>
      {recommend.map((product: any) => (
        <Col span={4} key={product.id}>
          <Link href={`/categorys/${product.id}`}>
            <Card hoverable bodyStyle={{ padding: 0 }}>
              <Row style={{ padding: 0 }}>
                <Col span={24}>
                  <img
                    alt={product.prodImg}
                    src={`${urlImg}${product.prodImg}`}
                    style={{ objectFit: 'cover', borderRadius: '5px', width: '100%' }}
                    width={100}
                    height={180}
                  />
                </Col>
              </Row>

              <Row style={{ padding: 7 }}>
                <Col span={20} style={{ wordWrap: 'break-word' }}>
                  <Flex gap="large" align="start" vertical>
                    <div style={{ display: 'flex' }}>
                      <span>{`${product.prodName}`}</span>
                    </div>
                    <div
                      style={{
                        fontWeight: 'bold',
                        color: '#ff4d00',
                      }}>{`(ID:${product.id}) $${product.prodPrice}`}</div>
                  </Flex>
                </Col>
              </Row>
            </Card>
          </Link>

          <div
            style={{
              position: 'absolute',
              top: '-0.5px',
              left: '9px',
              borderTopLeftRadius: '5px',
            }}>
            <FlagRecommend />
          </div>

          <div
            onClick={() => toggleFavorite(product.id)}
            style={{
              position: 'absolute',
              bottom: '55px',
              right: '8%',
            }}>
            {product.favFlag ? (
              <HeartFilled style={{ color: '#F44336', fontSize: '1.2rem' }} />
            ) : (
              <HeartOutlined style={{ fontSize: '1.2rem' }} />
            )}
          </div>
        </Col>
      ))}
    </React.Fragment>
  );
}
