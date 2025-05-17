
import Services from "../Compoanent/Services"
import Footer from "../Compoanent/Footer"
import Hero from "../Compoanent/Hero"

import AboutUs from "../Compoanent/AboutUs"
import BodyHome from "../Compoanent/BodyHome"
import Blogs from "../Compoanent/sections/Blogs"

const Home =()=>{

    return(
        <div className=" max-w-[1640px] h-[500px] pt-12 bg-sky-200">
            <Hero/>
            <Services/>
           
            <Blogs/>
             <BodyHome/>
            <AboutUs/>
            <Footer/>  
        </div>
    )
}

export default Home