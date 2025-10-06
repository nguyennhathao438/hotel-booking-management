import { CloudDownloadIcon,PlusIcon } from "lucide-react";
export default function Customers(){
    return(
        <div className="bg-gray-50 ml-[300px]">
            <div className="flex border-4 items-center justify-between bg-red-600 w-[90%] px-6 py-4 mx-auto">
                <div>
                    <h2 className="text-2xl font-semibold">Customers List</h2>
                    <p className="text-sm text-gray-500">You have total 1,261 users.</p>
                </div>

                <div>
                    <button>
                        <CloudDownloadIcon/>
                        <p>Export</p>
                    </button>
                    <button>
                        <PlusIcon/>
                    </button>
                </div>
            </div>

            <div>
                
            </div>
        </div>
    );
}