import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import api from "../api"
import { Button } from "../components/ui/button"
import { Input } from "@/components/ui/input"
import { Product, User } from "@/types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { NavBar } from "@/components/navbar"
import { EditDialog } from "@/components/editDialog"

export function Dashboard() {
  const queryClient = useQueryClient()

  const [product, setProduct] = useState({
    name: "",
    categoryId: "",
    image: "",
    price: 0
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProduct({
      ...product,
      [name]: value
    })
  }
  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id)
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }

  const deleteProduct = async (id: string) => {
    try {
      const res = await api.delete(`/products/${id}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("somthing went wrong"))
    }
  }

  const postProduct = async () => {
    try {
      const res = await api.post("/products", product)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("somthing went wrong"))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await postProduct()
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }
  const getProducts = async () => {
    try {
      const res = await api.get("/products")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("somthing went wrong"))
    }
  }

  const getUsers = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  //Queries
  const { data: products, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  })

  // const { data: categories, error: catError } = useQuery<Category[]>({
  //   queryKey: ["categories"],
  //   queryFn: getCategory
  // })
  const { data: users, error: userError } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers
  })

  return (
    <>
      <NavBar />
      <form className="mt-20 w-1/3 mx-auto" onSubmit={handleSubmit}>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">ADD NEW PRODUCT</h4>
        <Input
          name="name"
          className="mt-4"
          type="text"
          placeholder="Name"
          onChange={handleChange}
        />

        <Input
          name="price"
          className="mt-4"
          type="number"
          placeholder="price"
          onChange={handleChange}
        />

        <Input
          name="categoryId"
          type="text"
          className="mt-4"
          placeholder="Category"
          onChange={handleChange}
        />
        <Input
          name="image"
          type="text"
          className="mt-4"
          placeholder="Image"
          onChange={handleChange}
        />

        <div className="flex justify-evenly ">
          <Button type="reset" className="mt-4">
            reset
          </Button>
          <Button type="submit" className="mt-4">
            submit
          </Button>
        </div>
      </form>
      <div>
        <h1 className="scroll-m-20 text-2xl font-somibId tracking-tight"> Products</h1>
        <Table>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>CategoryId</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="text-left">{product.name}</TableCell>
                  <TableCell className="text-left">{product.price}</TableCell>
                  <TableCell className="text-left">{product.categoryId}</TableCell>
                  <TableCell className="text-left">
                    <Button onClick={() => handleDeleteProduct(product.id)}>x</Button>
                    <EditDialog product={product} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Table>
      </div>
    </>
  )
}
