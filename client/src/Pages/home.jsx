import Doctors from "../Compoanent/Departments"
import NavBar from "../Compoanent/NavBar"
import Services from "../Compoanent/Services"
import Footer from "../Compoanent/Footer"
import LsDoctors from "../Compoanent/LsDoctors"
import Hero from "../Compoanent/Hero"
import Departement from "../Compoanent/Departments"
import AboutUs from "../Compoanent/AboutUs"

const Home =()=>{

    return(
        <div className=" max-w-[1640px] h-[500px] pt-12 bg-sky-200">
            <Hero/>
            <Services/>
           <AboutUs/>
            <Footer/>  
        </div>
    )
}

export default Home