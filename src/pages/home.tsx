import { useQuery, useQueryClient } from "@tanstack/react-query"
import api from "@/api"

import { Product } from "@/types"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

import { NavBar } from "@/components/navbar"
import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { GlobalContext } from "@/App"
import { Link, useSearchParams } from "react-router-dom"
import { Input } from "@/components/ui/input"
import Hero from "@/components/hero"
import Footer from "@/components/footer"

export function Home() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("context is missing")

  const { handleAddToCart } = context

  const [searchParams, setSearchParams] = useSearchParams()
  const defaultSearch = searchParams.get("searchBy") || ""

  const [searchBy, setSearchBy] = useState(defaultSearch)
  const queryClient = useQueryClient()

  const getProducts = async () => {
    try {
      const res = await api.get(`/products?searchBy=${searchBy}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const { data, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { value } = e.target
    setSearchBy(value)
    setSearchParams({
      ...searchParams,
      searchBy: value
    })

    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    }, 1000)
  }

  return (
    <><Hero/>
      <div>
        <form className=" flex gap-4 w-full md:w-1/2 mx-auto mb-10">
          <Input
            type="search"
            placeholder="Sarch For a Product"
            onChange={handleChange}
            value={searchBy}
          />
          <Button type="submit">Search</Button>
        </form>
      </div>

      <section className="mt-16 grid grid-cols-3 gap-4 max-w6xl mx-50" id="product_item">
        {data?.length === 0 && <p> No product found</p>}
        {data?.map((product) => (
          <Card key={product.id} className="w-[300px]" id="hover_content">

            <CardHeader>
              <img alt={product.name} src={product.image} className="mb-4 h-48 object-contain" />
              <CardTitle>{product.name}</CardTitle>
              
            
            </CardHeader>
            <CardContent>
            <CardTitle className="font-size:30px;" >{product.price} sr </CardTitle>
            </CardContent>
            <CardFooter>
              <Button variant="outline">
                <Link to={`/products/${product.id}`}>Details </Link>
              </Button>
             
              <Button className="w-full" onClick={() => handleAddToCart(product)}>
                Add to cart
              </Button>
            </CardFooter>
          </Card>
        ))}
       
      </section>
       <footer> <Footer/> </footer>
      {error && <p className="text-red-500">{error.message}</p>}
    </>
  )
}
