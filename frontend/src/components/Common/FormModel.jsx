const ModelForm = ({ title, onClose, children, width = "max-w-md" }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className={`relative ${width} p-6 bg-white dark:bg-base-300 rounded-2xl shadow-2xl border border-gray-200`}
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold transition-colors duration-200"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="mb-5 text-2xl font-semibold text-center text-gray-800">
          {title}
        </h2>
        <div className="space-y-4 overflow-y-auto max-h-[65vh] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent px-1">
          {children}
        </div>
      </div>
    </div>
  );

};
export default ModelForm;