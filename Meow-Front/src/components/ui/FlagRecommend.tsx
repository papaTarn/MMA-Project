import React from 'react';
type Props = {};

function FlagRecommend({ }: Props) {
  return (
    <h4
      style={{
        backgroundColor: '#FF4D00',
        color: '#FFF',
        fontWeight: 'bold',
        padding: '0.1vw 1.2vw',
        borderTopLeftRadius: '5px',
        marginRight: 5
      }}>
      สินค้าขายดี
    </h4>
  );
}

export default FlagRecommend;
