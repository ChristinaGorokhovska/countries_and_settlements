import { useCallback } from "react";

export const useMessage = () => {
    return useCallback((msg) => {
        if (window.M && msg) {
            window.M.toast({ html: msg });
        }
    }, []);
};
