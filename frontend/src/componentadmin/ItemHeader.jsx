export default function ItemHeader({ Icon, title, value, detail, onDetailClick }) {
  return (
    <div className="bg-gradient-to-b from-white to-yellow-500 h-[110px] w-[220px] rounded-lg transition-transform duration-300 hover:-translate-y-2 relative">
      <Icon className="bg-yellow-600 text-white h-10 w-10 absolute top-5 left-2 px-1 py-2" />
      <h2 className="text-amber-900 text-sm absolute top-4 left-15">{title}</h2>
      <p className="font-bold text-xl absolute top-9 left-15">{value}</p>

      {onDetailClick ? (
        <button
          onClick={onDetailClick}
          className="text-sm font-medium absolute bottom-2 left-13 text-blue-600 hover:text-blue-800"
        >
          {detail}
        </button>
      ) : (
        <p className="text-sm font-medium absolute bottom-2 left-13">{detail}</p>
      )}
    </div>
  );
}