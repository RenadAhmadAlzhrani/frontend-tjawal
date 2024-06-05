import { Link } from "react-router-dom"
import { Cart } from "./cart"
import { useContext, useState } from "react"
import { GlobalContext } from "../App"
import { ROLE } from "../types"
import { Button } from "./ui/button"
import { ShoppingCartIcon } from "lucide-react"

export function NavBar() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { state } = context

  console.log(state)

  return (
    <>
      <nav className="bg-gray-700 flex justify-between mb-20">
        {/* <img  src="src/img/tt.jpg" alt="logo"/> */}

        <div className="flex items-center">
          <div className="w-12 h-12  flex items-center justify-center mr-4">
            <img src="img/tt.jpg" alt="logo" className="h-35 w-35 text-white" />
          </div>
          <span className="text-2xl font-bold text-[#6366F1]">TAJWAL</span>
        </div>
        <div className="container mx-auto py-4 flex justify-between items-center">
          <div className="flex space-x-10">
            <div className="flex items-center space-x-2">
              <span>
                <Link
                  to="/"
                  className="h-8 w-8 hover:text-[#F79B2E] text-blue-300 transition-colors duration-300 ease-in-out"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <h3>Home</h3>
                </Link>
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {state.user?.role === ROLE.Admin && (
                <span>
                  <Link
                    to="/dashboard"
                    className="h-8 w-8 hover:text-[#F79B2E] text-blue-300 transition-colors duration-300 ease-in-out"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <h3>Dashboard</h3>
                  </Link>
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <span>
                <Link
                  to="/login"
                  className="h-8 w-8 hover:text-[#F79B2E] text-blue-300 transition-colors duration-300 ease-in-out"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <h3>login</h3>
                </Link>
              </span>
            </div>
          </div>
          {/* <div className="lg:flex hidden items-center space-x-2 bg-white py-1 px-2 rounded-full">
          <span></span>
        </div> */}
        </div>
      </nav>
    </>

    /* <NavigationMenu>
        <NavigationMenuList className="gap-4">
          <NavigationMenuItem>
            <Link to="/">
              <NavigationMenuLink>Home</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {state.user?.role === ROLE.Admin && (
             <NavigationMenuItem>
              <Link to="/dashboard">
                <NavigationMenuLink>Dashboard</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )}

          {!state.user && (
            <NavigationMenuItem>
              <Link to="/signup">
                <NavigationMenuLink>Signup</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )}
          {!state.user && (
            <NavigationMenuItem>
              <Link to="/login">
                <NavigationMenuLink>Login</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>)}
        </NavigationMenuList>
      </NavigationMenu>
          
      <Cart /> */
  )
}
