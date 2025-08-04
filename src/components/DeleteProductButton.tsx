'use client';

import { useState } from 'react';

// ✅ Define props interface
interface Props {
  productId: string;
  onDelete: (id: string) => void;
}

// ✅ Client component that calls the parent-provided delete handler
export default function DeleteProductButton({ productId, onDelete }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleClick = async () => {
    setIsDeleting(true);
    await onDelete(productId);
    setIsDeleting(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isDeleting}
      className="text-red-600 underline"
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}
