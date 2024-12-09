import { Button, Result } from 'antd';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
      />
    </div>
  );
}
