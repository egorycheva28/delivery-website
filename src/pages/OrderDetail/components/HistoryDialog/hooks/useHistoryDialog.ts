import { useEffect, useState } from "react"

export const useHistoryDialog = (isHistory: boolean,
    setIsHistory: (isHistory: boolean) => void) => {
    const [history, setHistory] = useState<Status[]>();

    useEffect(() => {
        //логика получения истории заказов
    }, [isHistory]);

    return {
        state: {},
        functions: {}
    }
}