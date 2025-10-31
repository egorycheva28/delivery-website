import {useOrderDishes} from "@/pages/OrderDishes/hooks/useOrderDishes.ts";
import OrderDishItem from "@/pages/OrderDishes/components/OrderDishItem/OrderDishItem.tsx";

const OrderDishes = () => {
    const { state } = useOrderDishes()

    return (
        <div className="mx-auto mt-4 flex flex-col gap-10 p-8">
            {state.order.data && state.order.data.data.meals.length > 0 && (
                <div className="flex items-center justify-around flex-wrap gap-10">
                    {state.order.data.data.meals.map(dish => (
                        <OrderDishItem {...dish} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default OrderDishes;