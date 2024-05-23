import { useContext } from "react"

import { Popover, PopoverContent } from "@radix-ui/react-popover"
import { PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { GlobalContext } from "@/App"
import { ShoppingCart } from "lucide-react"

export function Cart() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("context is missing")

  const { state, handleDeleteFromCart } = context

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex gap-1">
          <ShoppingCart className="cursor-pointer" />
          <span>({state.cart.length}) </span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div>
          {state.cart.length === 0 && <p>No item </p>}
          {state.cart.map((product) => {
            return (
              <div className="mb-2 flex item-center gap-4" key={product.id}>
                <img src={product.image} alt={product.name} className="w-10 h-10 object-contain" />
                <h4>{product.name}</h4>
                <span className="font-bold">{product.price}</span>
                <Button variant='destructive' onClick={() => handleDeleteFromCart(product.id)}>
                  x
                </Button>
              </div>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
