// src/app/components/CartItemCard.tsx
'use client';

import Image from 'next/image';
import { HiTrash } from 'react-icons/hi';
import { useCart } from '@/context/CartContext';

type CartItem = {
  id: string;
  title: string;
  handle: string;
  quantity: number;
  price: string;
  currency: string;
  image?: {
    url: string;
    altText?: string;
  };
};

type CartItemCardProps = {
  item: CartItem;
  onRemove: () => void; // <-- ADDED
};

export default function CartItemCard({ item, onRemove }: CartItemCardProps) {
  // We still use the cart context for quantity updates only
  const { updateItemQuantity } = useCart();

  // Update quantity in context
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = Math.max(1, parseInt(e.target.value) || 1);
    updateItemQuantity(item.id, quantity);
  };

  // Call the parent's remove callback
  const handleRemove = () => {
    onRemove();
  };

  return (
    <div className="flex items-center justify-between p-4 border-b">
      {/* Product Image */}
      <div className="w-24 h-24 relative">
        {item.image?.url ? (
          <Image
            src={item.image.url}
            alt={item.image.altText || item.title}
            fill
            className="object-cover rounded-md"
            sizes="96px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-md">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex-1 ml-4">
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="text-sm text-gray-600">
          Price: {item.currency} {item.price}
        </p>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center space-x-2">
        <label htmlFor={`quantity-${item.id}`} className="text-sm text-gray-700">
          Qty:
        </label>
        <input
          type="number"
          id={`quantity-${item.id}`}
          name={`quantity-${item.id}`}
          min={1}
          value={item.quantity}
          onChange={handleQuantityChange}
          className="w-16 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        className="ml-4 text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full p-2"
        aria-label={`Remove ${item.title} from cart`}
      >
        <HiTrash className="w-5 h-5" />
      </button>
    </div>
  );
}
