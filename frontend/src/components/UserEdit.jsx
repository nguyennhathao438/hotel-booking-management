export default function UserEdit({
  label,
  placeholder,
  type = "text",
  onChange,
  name,
  value,
}) {
  return (
    <div className="flex flex-col">
      <label className="text-gray-700 font-medium mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        onChange={onChange}
        name={name}
        value={value}
      />
    </div>
  );
}
