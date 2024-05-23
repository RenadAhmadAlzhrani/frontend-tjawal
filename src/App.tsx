import { createBrowserRouter, RouterProvider } from "react-router-dom"

import "./App.css"
import { Home } from "./pages/home"
import { Dashboard } from "./pages/dashboard"
import { createContext } from "react"
import { useState } from "react"
import { DecodedUser, Product} from "./types"
import { ProductDetails } from "./pages/productDetaills"
import { Login } from "./pages/login"
import { Signup } from "./pages/signup"
import { PrivateRoute } from "./components/ui/PrivateRoute"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup/>,
  },

  {
    path: "/dashboard",
    element:<PrivateRoute>
      <Dashboard />
    </PrivateRoute> 
  },
  
  {
    path: "/products/:productId",
    element: <ProductDetails />,
  },
])

type GlobalContext = {
  cart: Product[]
  user :DecodedUser | null
}
type GlobalContextType = {
  state: GlobalContext
  handleAddToCart: (product: Product) => void
  handleDeleteFromCart:(id:string)=>void
  handleStoreUser:(user :DecodedUser) => void
}
export const GlobalContext = createContext<GlobalContextType | null> (null)

function App() {
  const [state, setState ] = useState<GlobalContext>({
    cart: [],
    user : null
  })
  const handleAddToCart = (product: Product) =>{
    const isDuplicated= state.cart.find((cartItem)=>cartItem.id===product.id)
    if(isDuplicated) return
    setState({
      ...state,
      cart: [...state.cart, product]
    })
  }

  const handleDeleteFromCart = (id : string) => {
    const filteredCart= state.cart.filter((item)=>item.id !==id)
    setState({
      ...state,
      cart:filteredCart
    })
  }

  const handleStoreUser=(user:DecodedUser)=>{
    setState({
    ...state,
    user
  })
  }

  return (
    <div className="App">
      <GlobalContext.Provider value={{ 
        state, 
        handleAddToCart,
        handleDeleteFromCart,
        handleStoreUser }}>
        <RouterProvider router={router} />
      </GlobalContext.Provider>
    </div>
  )
}

export default App
