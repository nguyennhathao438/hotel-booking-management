
export default function ItemRoom({Datebook,Img,Name,NumberGuess,PhoneNumber,CheckIn,CheckOut,Pay}){
    return(
        <div className="bg-white grid grid-cols-7 ml-7 mr-10 mb-2">
                            <p className="ml-3 py-3 ">{Datebook}</p>
                            <div className="flex py-3">
                            <img src={Img} className="w-8 h-8 rounded-full mr-1"></img>
                            <p className="text-md">{Name}</p>
                            </div>
                            <p className="py-3 ml-3">{NumberGuess}</p>
                            <p className="py-3 text-center">{PhoneNumber}</p>
                            <p className="ml-7 px-6">{CheckIn}</p>
                            <p className="ml-7 px-6">{CheckOut}</p>
                            <button className="bg-green-400 w-[80px] h-[30px] transition-transform duration-300 hover:-translate-y-2 rounded-lg ml-18 mt-2">
                                <p className="text-white text-md">{Pay}</p>
                            </button>
                        </div>
    );
};