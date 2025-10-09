export default function UserEdit({label,placeholder,type = "text",onChange,name,value}) {
    return (
        <div>
            <div className="flex space-x-1 justify-between mb-5">
                <p className="py-4">{label}</p>
                    <input 
                    type={type}
                    placeholder={placeholder}
                    className="border border-gray-300 rounded-lg p-2 w-[400px]"
                    onChange={onChange}
                    name={name}
                    value={value}
                    >
                    </input>
            </div>          
        </div>
    );
}