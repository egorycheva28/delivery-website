import { useForm } from "react-hook-form"
import type { GetFilterSchema } from "../constants/FilterSchema"
import type { OrderListFilters } from "@/pages/Orders/hooks/useOrders"

export const useFilterDialog = (
    filters: OrderListFilters,
    setFilters: (filters: OrderListFilters) => void,
    setIsOpen: (isOpen: boolean) => void) => {

    const statuses = [
        {
            id: "new",
            label: "Новый",
        },
        {
            id: "confirmed",
            label: "Подтвержден",
        },
        {
            id: "inPreparation",
            label: "Готовится",
        },
        {
            id: "awaiting",
            label: "Ожидает курьера",
        },
        {
            id: "handed",
            label: "Передан курьеру",
        },
        {
            id: "delievered",
            label: "Доставлен",
        },
        {
            id: "cancelled",
            label: "Отменен",
        }
    ] as const

    const operators = [
        {
            id: "1",
            label: "Оператор 1",
        },
        {
            id: "2",
            label: "Оператор 2",
        },
        {
            id: "3",
            label: "Оператор 3",
        },
        {
            id: "4",
            label: "Оператор 4",
        },
        {
            id: "5",
            label: "Оператор 5",
        }
    ] as const

    const filterForm = useForm<GetFilterSchema>({
        defaultValues: {
            statuses: filters.statuses || [],
            operators: filters.operators || []
        }
    })

    const onSubmit = filterForm.handleSubmit(
        (data) => {
            setFilters({
                ...filters,
                statuses: data.statuses,
                operators: data.operators
            })
            setIsOpen(false)
        }
    )

    return {
        state: { statuses, operators },
        form: filterForm,
        functions: { onSubmit }
    }
}