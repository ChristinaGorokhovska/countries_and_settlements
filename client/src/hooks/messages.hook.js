import { useCallback } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export const useMessage = () => {
    return useCallback((msg) => {
        toast(msg);
    }, []);
};
