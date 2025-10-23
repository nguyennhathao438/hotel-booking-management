import { motion, AnimatePresence } from "framer-motion"; // eslint-disable-line no-unused-vars
import { AlertCircle, CheckCircle, XCircle } from "lucide-react";

export default function NotificationModal({ show, type = "info", message, onClose }) {
    if (!show) return null;

    const iconMap = {
        success: <CheckCircle className="text-green-500 w-10 h-10" />,
        error: <XCircle className="text-red-500 w-10 h-10" />,
        warning: <AlertCircle className="text-yellow-500 w-10 h-10" />,
        info: <AlertCircle className="text-blue-500 w-10 h-10" />,
    };

    const colorMap = {
        success: "bg-green-50 ",
        error: "bg-red-50 ",
        warning: "bg-yellow-50 ",
        info: "bg-blue-50 ",
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
                >
                    <motion.div
                        initial={{ y: -50 }}
                        animate={{ y: 0 }}
                        exit={{ y: -50 }}
                        className={`w-[90%] sm:w-[400px] ${colorMap[type]} shadow-xl rounded-2xl p-5 text-center`}
                    >
                        <div className="flex justify-center mb-3">{iconMap[type]}</div>
                        <p className="text-gray-800 font-medium text-lg mb-3">{message}</p>
                        <button
                            onClick={onClose}
                            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-all duration-300"
                        >
                            Đóng
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
