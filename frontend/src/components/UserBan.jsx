export default function UserBan({onConfirm, onCancel}) {
    return(
        <div className="">
            <div className="bg-white p-5 rounded-xl shadow-md w-80 text-center">
                <p className="mb-4 font-medium text-gray-700">
                Bạn có chắc chắn muốn ban user này không?
                </p>

            <div className="flex justify-center gap-3">
            <button
                onClick={onConfirm}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
                OK
            </button>

            <button
                onClick={onCancel}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
            >
                Hủy
            </button>
            </div>
      </div>
    </div>
    );
}