import { Content } from "./components/Content"
import { Header } from "./components/Header"

export const Home=()=>{
    return(
        <div>
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:50px_40px] [mask-image:radial-gradient(ellipse_90%_90%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none"></div>
            <Header/>
            <Content/>
        </div>
        
    )
}