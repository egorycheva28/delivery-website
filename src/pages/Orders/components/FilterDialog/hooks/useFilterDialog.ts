import { useForm } from "react-hook-form"
import type { GetFilterSchema } from "../constants/FilterSchema"
import type { OrderListFilters } from "@/pages/Orders/hooks/useOrders"
import { useGetOperatorsQuery } from "@/utils/api/hooks/useGetOperatorsQuery"

export const useFilterDialog = (
    filters: OrderListFilters,
    setFilters: (filters: OrderListFilters) => void,
    setIsOpen: (isOpen: boolean) => void) => {

    const statuses = [
        {
            id: "NEW",
            label: "Новый",
        },
        {
            id: "CONFIRMED",
            label: "Подтвержден",
        },
        {
            id: "COOKING",
            label: "Готовится",
        },
        {
            id: "WAITING_FOR_COURIER",
            label: "Ожидает курьера",
        },
        {
            id: "TOOK_BY_COURIER",
            label: "Передан курьеру",
        },
        {
            id: "COMPLETED",
            label: "Доставлен",
        },
        {
            id: "CANCELED",
            label: "Отменен",
        }
    ] as const

    const operators = useGetOperatorsQuery()

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