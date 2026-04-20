'use client'

import { DIRI_PRIBADI_PRODUCTS } from '../constants/diri-pribadi.constants'
import { RELATIONSHIP_PRODUCTS } from '../constants/relationship.constants'
import { ProductCardNew } from './product-card-new'

export function DiriPribadiProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {DIRI_PRIBADI_PRODUCTS.map((product) => (
        <ProductCardNew key={product.id} product={product} />
      ))}
    </div>
  )
}

export function RelationshipProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {RELATIONSHIP_PRODUCTS.map((product) => (
        <ProductCardNew key={product.id} product={product} />
      ))}
    </div>
  )
}
