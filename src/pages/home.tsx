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

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const defaultSearch = searchParams.get("searchBy") || ""

  const [searchBy, setSearchBy] = useState(defaultSearch)
  const queryClient = useQueryClient()

  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")

  const { handleAddToCart } = context

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
    <>
      <NavBar />
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
      <section className="flex flex-col  justify-center md:flex-row gap-4 justify-between max-w-6xl mx-auto">
        {data?.length === 0 && <p> No product found</p>}
        {data?.map((product) => (
          <Card key={product.id} className="w-[300px]">
            <CardHeader>
              <img alt={product.name} src={product.image} className="mb-4 h-48 object-contain" />
              <CardTitle>{product.name}</CardTitle>
              <CardTitle>{product.price}</CardTitle>
              <CardDescription>Some Description here</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content Here</p>
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
      {error && <p className="text-red-500">{error.message}</p>}
    </>
  )
}
