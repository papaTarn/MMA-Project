import React from "react";

// Import Component

import { getAllMessage } from "@/services/masterService";
import CartPage from "@/components/pages/cart/Cart";

export default async function Page() {
  const [msgList] = await Promise.all([getAllMessage()]);
  return (
    <React.Fragment>
      <CartPage msgList={msgList} />
    </React.Fragment>
  );
}
