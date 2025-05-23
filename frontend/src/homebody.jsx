import img1 from "./images/1.png"
import img2 from "./images/2.png"
import img3 from "./images/3.png"
import img4 from "./images/4.png"
import img5 from "./images/5.png"

export default function Homebody () {
    return (
        <div className="bg-blue-200 flex flex-col px-20 py-10 space-y-20" >
            <img src={img1} alt="image1" className="h-72 w-[460px] self-end rounded-lg shadow-xl" />
            <img src={img2} alt="image2" className="h-72 w-[460px] rounded-lg shadow-xl" />
            <img src={img3} alt="image3" className="h-72 w-[460px] self-end rounded-lg shadow-xl" />
            <img src={img4} alt="image4" className="h-72 w-[460px] rounded-lg shadow-xl" />
            <img src={img5} alt="image5" className="h-72 w-[460px] self-end rounded-lg shadow-xl" />
        </div>
    )
}