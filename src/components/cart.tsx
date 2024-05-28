import { useContext } from "react"

import { Popover, PopoverContent } from "@radix-ui/react-popover"
import { PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { GlobalContext } from "@/App"
import { ShoppingCart } from "lucide-react"
import { Product } from "@/types"

export function Cart() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("context is missing")

  const { state, handleDeleteFromCart, handleAddToCart } = context

  const groups = state.cart.reduce((acc, obj) => {
    const key = obj.id
    const curGroup = acc[key] ?? []
    return { ...acc, [key]: [...curGroup, obj] }
  }, {} as { [prodectId: string]: Product[] })

  const total = state.cart.reduce((acc, curr) => {
    return acc + curr.price
  }, 0)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex gap-1">
          <ShoppingCart className="cursor-pointer" />
          <span>({Object.keys(groups).length}) </span>
        </div>
      </PopoverTrigger>
      <PopoverContent  className="w-80 bg-white">
        <div>
          {state.cart.length === 0 && <p>No item </p>}
          {Object.keys(groups).map((key) => {
            const products = groups[key]
            const product = products[0]
            const total = products.reduce((acc, curr) => {
              return acc + curr.price
            }, 0)

            return (
              <div className="mb-2 flex item-center gap-4" key={product.id}>
                <img src={product.image} alt={product.name} className="w-10 h-10 object-contain" />
                <h4>{product.name}</h4>
                <span className="font-bold">{total}</span>
                <span className="font-bold">{products.length}</span>
                <Button variant="outline" onClick={() => handleDeleteFromCart(product.id)}>
                  -
                </Button>
                <Button variant="outline" onClick={() => handleAddToCart(product.id)}>
                  +
                </Button>
              </div>
            )
          })}
        </div>
        <p>Total:{total}</p>
      </PopoverContent>
    </Popover>
  )
}
