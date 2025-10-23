import BookingSearch from "./BookingSearch.jsx";
import Banner from "./Banner"
import Hotels from "./Hotels.jsx";
function Home(){
    return(
        <>
            <Banner/>
            <div className="container mx-auto relative mb-[50px] ">
                <div className="bg-white lg:absolute lg:left-0
                lg:right-0 lg:p-0 lg:-top-12">
                    <BookingSearch/>
                </div>
            </div>
            <Hotels/>
        </>
    );
}
export default Home