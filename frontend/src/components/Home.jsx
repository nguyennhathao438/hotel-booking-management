import Booking from "./Booking";
function Home(){
    return(
        <>
            <div className="container mx-auto relative mb-[50px] ">
                <div className="bg-white lg:absolute lg:left-0
                lg:right-0 lg:p-0 lg:-top-12">
                    <Booking/>
                </div>
            </div>
        </>
    );
}
export default Home