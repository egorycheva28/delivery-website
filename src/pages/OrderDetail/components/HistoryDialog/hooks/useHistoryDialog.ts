import { useEffect, useState } from "react"

export const useHistoryDialog = (isHistory: boolean) => {
    const [history, setHistory] = useState<Status[]>(
        [
            {
                id: "new",
                name: "Новый"
            },
            {
                id: "confirmed",
                name: "Подвтержден"
            },
            {
                id: "inPreparation",
                name: "Готовится"
            },
            {
                id: "awaiting",
                name: "Ожидает курьера"
            },
            {
                id: "handed",
                name: "Передан курьеру"
            },
            {
                id: "delievered",
                name: "Доставлен"
            },
            {
                id: "cancelled",
                name: "Отменен"
            }
        ]
    );

    useEffect(() => {
        //логика получения истории заказов
    }, [isHistory]);

    return {
        state: { history },
        functions: { setHistory }
    }
}