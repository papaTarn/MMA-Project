import React from "react";

// Import Component
import CartPage from "@/components/pages/cart/Cart";
import { getAllMessage } from "@/services/masterService";

export default async function Page() {
  const [msgList] = await Promise.all([getAllMessage()]);
  return (
    <React.Fragment>
      <CartPage msgList={msgList} />
    </React.Fragment>
  );
}
