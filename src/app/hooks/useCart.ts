import useSWR from 'swr';

export type CartItemWithProduct = {
  id: string;
  qty: number;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
};

const fetcher = (url: string) => fetch(url).then(r => r.json());

export function useCart() {
  const { data, error, mutate } = useSWR<CartItemWithProduct[]>('/api/cart', fetcher, {
    refreshInterval: 0,
    revalidateOnFocus: false,
  });

  const addItem = async (productId: string, qty = 1) => {
    await fetch('/api/cart', { method: 'POST', body: JSON.stringify({ productId, qty }) });
    mutate();
  };

  const updateQty = async (productId: string, qty: number) => {
    await fetch('/api/cart', { method: 'PATCH', body: JSON.stringify({ productId, qty }) });
    mutate();
  };

  const removeItem = async (productId: string) => {
    await fetch('/api/cart', { method: 'DELETE', body: JSON.stringify({ productId }) });
    mutate();
  };

  return { items: data || [], error, addItem, updateQty, removeItem, mutate };
}