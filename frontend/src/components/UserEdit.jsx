export default function UserEdit({
  label,
  placeholder,
  type = "text",
  registerName,
  register,
  error, 
}) {
  return (
    <div className="flex flex-col">
      <label className="text-gray-700 font-medium mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className={`border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...register(registerName)}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
