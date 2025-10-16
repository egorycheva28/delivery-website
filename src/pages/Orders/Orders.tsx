import CustomPagination from "@/components/Pagination/CustomPagination";
import { useOrders } from "./hooks/useOrders";
import OrderItem from "./components/OrderItem";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import FilterDialog from "./components/FilterDialog/FilterDialog";
import { Switch } from "@/components/ui/switch";

const Orders = () => {
    const { state, functions } = useOrders();

    return (
        <div className="flex flex-col items-center mt-8 gap-8 w-full">
            <span className='text-4xl font-medium'>Управление заказами</span>
            {state.role == 'admin' ? (
                <div className="flex justify-items-start w-[90%]">
                    <Button variant="outline" className="h-10 max-w-64 flex justify-between items-center cursor-pointer"
                        onClick={() => functions.setIsOpen(true)}>
                        <p>{"Фильтры"}</p>
                        <SlidersHorizontal />
                    </Button>
                    <FilterDialog isOpen={state.isOpen} setIsOpen={functions.setIsOpen}
                        isStatus={state.isStatus} setIsStatus={functions.setIsStatus}
                        isOperator={state.isOperator} setIsOperator={functions.setIsOperator}
                        filters={state.filters} setFilters={functions.setFilters}
                    />
                </div>
            ) : (
                <div className="flex justify-items-start w-[90%] items-center gap-4">
                    <span>Являюсь оператором</span>
                    <Switch className="cursor-pointer" checked={state.filters.amOperator}
                        onCheckedChange={(checked: boolean) => functions.setFilters(prev => ({ ...prev, amOperator: checked }))} />
                </div>
            )}
            <div className='flex flex-col items-center w-[90%] border border-black rounded-lg divide-y divide-black'>
                {state.orders.map(order => (
                    <OrderItem order={order} role={state.role} appointOperator={functions.appointOperator}
                        isComment={state.isComment} setIsComment={functions.setIsComment}
                        comment={state.comment} setComment={functions.setComment} changeStatus={functions.changeStatus} />
                ))}
            </div>
            <div className='mb-6'>
                <CustomPagination totalPages={10} />
            </div>
        </div >
    )
}

export default Orders;