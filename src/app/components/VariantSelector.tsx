// src/components/VariantSelector.tsx
'use client';

import { useState } from 'react';

type VariantNode = {
  id: string;
  title: string;
  priceV2?: {
    amount?: string;
    currencyCode?: string;
  };
  image?: {
    url: string;
    altText?: string;
  };
};

type VariantSelectorProps = {
  variants: { node: VariantNode }[];
  compact?: boolean;
};

export default function VariantSelector({ variants, compact }: VariantSelectorProps) {
  const [selectedVariant, setSelectedVariant] = useState<VariantNode>(variants[0].node);

  return (
    <div className={compact ? 'variant-selector-compact' : 'variant-selector'}>
      <label htmlFor="variant" className="block text-sm font-medium text-gray-700">
        Variant
      </label>
      <select
        id="variant"
        name="variant"
        value={selectedVariant.id}
        onChange={(e) => {
          const variant = variants.find((v) => v.node.id === e.target.value)?.node;
          if (variant) setSelectedVariant(variant);
        }}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
      >
        {variants.map(({ node }) => (
          <option key={node.id} value={node.id}>
            {node.title} - {node.priceV2?.amount} {node.priceV2?.currencyCode}
          </option>
        ))}
      </select>
    </div>
  );
}