export default function Footer(){
    return(
        <footer className="bg-gray-800 px-4 md:px-16 lg:px-28 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                    <h2 className="text-lg font-bold mb-3 text-white">
                     About Us
                     </h2>
                    <p className="text-gray-300">We are a team dedicated to providing the best products and services to our customers</p>
                </div>
                <div>
                    <h2 className="text-lg font-bold mb-3 text-white">
                    Quick Links
                    </h2>
                    <ul>
                        <li><a href="" className="hover:underline text-gray-300">Home</a></li>
                        <li><a href="" className="hover:underline text-gray-300">Room</a></li>
                        <li><a href="" className="hover:underline text-gray-300">Spa</a></li>
                        <li><a href="" className="hover:underline text-gray-300">Login</a></li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-lg font-bold mb-3 text-white">
                    Company Links
                    </h2>
                    <ul>
                        <li><a href="" className="hover:underline text-gray-300">Our Services</a></li>
                        <li><a href="" className="hover:underline text-gray-300">Contact</a></li>
                        <li><a href="" className="hover:underline text-gray-300">Privacy Policy</a></li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-lg font-bold mb-3 text-white">Resources</h2>
                    <ul>
                        <li><a href="" className="hover:underline text-gray-300">Home</a></li>
                        <li><a href="" className="hover:underline text-gray-300">About</a></li>
                        <li><a href="" className="hover:underline text-gray-300">Services</a></li>
                        <li><a href="" className="hover:underline text-gray-300">Login</a></li>
                    </ul>
                </div>
            </div>
            <div className="border-gray-600 border-t p-4 mt-4 text-center text-gray-300"> 
                <p>© 2025 Code With Yousaf. All Rights Reserved.</p>
            </div>
        </footer>
    );
};