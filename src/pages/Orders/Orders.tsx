import CustomPagination from "@/components/Pagination/CustomPagination";
import { useOrders } from "./hooks/useOrders";
import OrderItem from "./components/OrderItem";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import FilterDialog from "./components/FilterDialog/FilterDialog";

const Orders = () => {
    const { state, functions } = useOrders();

    return (
        <div className="flex flex-col items-center mt-8 gap-8 w-full">
            {state.role == 'admin' ? (
                <div>
                    <div>
                        <Button variant="outline" className="h-10 max-w-64 flex justify-between items-center"
                            onClick={() => functions.setIsOpen(true)}>
                            <p>{"Фильтры"}</p>
                            <SlidersHorizontal />
                        </Button>
                        <FilterDialog isOpen={state.isOpen} setIsOpen={functions.setIsOpen}
                           />
                    </div>
                    <div>
                        <Button variant="outline" className="h-10 max-w-64 flex justify-between items-center"
                            onClick={() => functions.setIsOpen(true)}>
                            <p>{"Фильтры"}</p>
                            <SlidersHorizontal />
                        </Button>
                        <FilterDialog isOpen={state.isOpen} setIsOpen={functions.setIsOpen}
                            />
                    </div>
                </div>
            ) : (
                <div>

                </div>
            )}
            <div className='flex flex-col items-center w-[90%] border border-black rounded-lg divide-y divide-black'>
                {state.orders.map(order => (
                    <OrderItem order={order} />
                ))}
            </div>
            <div className='mb-6'>
                <CustomPagination totalPages={10} />
            </div>
        </div >
    )
}

export default Orders;