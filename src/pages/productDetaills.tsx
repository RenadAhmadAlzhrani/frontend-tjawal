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
      <div  className="flex justify-center items-center flex-col">
        <p >Discover the Alluring World of Classic Cars and Enjoy an Epic Driving Experience!

           We offer you a remarkable fleet of exquisite vintage and classic cars, meticulously maintained to provide you with a journey filled with elegance and authenticity.

            Whether it's your wedding celebration or a special corporate event,
               we will elevate the elegance with our unique car selections. Enjoy exceptional moments and capture the most sophisticated photos.

                  Don't miss the chance to live in the past with all its sophistication.
                              Book your classic car now and be the star of the day!</p>
        <h3>{product?.name}</h3>
        <img src={product?.image} />
      </div>
    </>
  )
}
