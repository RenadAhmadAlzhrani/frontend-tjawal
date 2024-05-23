import api from "@/api"
import { NavBar } from "@/components/navbar"
import { Product } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

export function ProductDetails() {
  const { productId } = useParams()
  console.log("params:", productId)

  const getProduct = async () => {
    try {
      const res = await api.get(`/products/${productId}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const {
    data: product,
    error,
    isLoading
  } = useQuery<Product>({
    queryKey: ["product"],
    queryFn: getProduct
  })

  console.log(product)

  if (isLoading) {
    return <p> Loading....</p>
  }
  if (!product) {
    <p>product is not found</p>
  }
  return (
    <>
      <NavBar />
      <div>
        <h3>{product?.name}</h3>
        <img src={product?.image} />
      </div>
    </>
  )
}
