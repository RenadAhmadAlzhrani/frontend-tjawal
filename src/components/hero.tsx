import { Link } from "react-router-dom";
import { NavBar } from "./navbar";


export default function Hero () {
  return (
    <><NavBar /><header className=" container flex flex-col md:flex-row items-center md:my-24">

          <img src="/src/img/H.jpg" />

          <div className="flex flex-col w-full lg:w-1/3 justify-center items-start p-8">
              <h1 className="text-3xl md:text-5xl p-2 text-blue-800 tracking-loose">TAJWAL</h1>
              <h2 className="text-3xl md:text-5xl leading-relaxed md:leading-snug mb-2  text-blue-900">Experience the Elegance of Classic Cars.
              </h2>
              <p className="text-sm md:text-base text-black-50 mb-4">Discover our remarkable fleet of meticulously maintained vintage and classic cars, ready to provide you with an unforgettable journey of sophistication and authenticity.</p>
              <a href="#"
                  className="bg-transparent hover:bg-yellow-300 text-black-300 hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border border-blue-800 hover:border-transparent">
                  BOOK Now</a>

          </div>


      </header></>
   ) }