import Hero from "./components/Hero"
import NavBar from "./components/NavBar"
import ProductViewer from "./components/ProductViewer"
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from "gsap/all"
import Showcase from "./components/three/Showcase";

gsap.registerPlugin(ScrollTrigger)

 const App = () => {
  return (
    <main>
        <NavBar />
        <Hero />
        <ProductViewer />
        <Showcase />
      
    </main>
  )
}

export default App