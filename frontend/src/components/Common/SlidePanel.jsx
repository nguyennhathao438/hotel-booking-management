export default function SlidePanel({ isOpen, onClose, children, width = "50%" }) {
    return (
        <>
            {/* Overlay mờ */}
            <div
                className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${
                    isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                onClick={onClose}
            ></div>

            {/* Panel trượt từ trái */}
            <div
                className={`fixed top-0 left-0 h-full bg-white z-50 shadow-xl transform transition-transform duration-300 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
                style={{ width }}
            >
                <div className="p-6 h-full overflow-y-auto">
                    <button
                        className="mb-4 text-gray-500 hover:text-gray-800 font-semibold"
                        onClick={onClose}
                    >
                        Đóng ✕
                    </button>
                    {children}
                </div>
            </div>
        </>
    );
}
