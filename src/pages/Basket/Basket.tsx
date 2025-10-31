import {useBasket} from "@/pages/Basket/hooks/useBasket.ts";
import DishBasketCard from "@/pages/Basket/components/DishBasketCard/DishBasketCard.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import BasketForm from "@/pages/Basket/components/BasketForm/BasketForm.tsx";
import SuccessBasketDesign from "@/pages/Basket/components/SuccessBasketDesign/SuccessBasketDesign.tsx";

const Basket = () => {
    const { state, functions } = useBasket()

    return(
        <div className="mx-auto mt-4 flex flex-col gap-10 p-8">
            {state.cart.data && state.cart.data.data.items.length > 0 ? (
                <>
                    <div className="flex items-center justify-between">
                        <p className="text-4xl font-medium">{"Корзина"}</p>
                        <Button className="h-10" onClick={functions.handleDeleteAll}>
                            {"Удалить все"}
                        </Button>
                    </div>
                    <Card className="w-full overflow-hidden p-0">
                        <CardContent className="p-0">
                            {state.cart.data?.data.items.map(dishBasket => (
                                <DishBasketCard key={dishBasket.dishId} {...dishBasket} reload={state.cart.refetch}/>
                            ))}
                        </CardContent>
                    </Card>
                    <div className="flex items-center justify-between border-b-2 border-black font-bold text-xl">
                        <p>{"Итоговая сумма:"}</p>
                        <p>{`${state.cart.data?.data.total} ₽`}</p>
                    </div>
                    <BasketForm openSuccessBasketDesign={functions.handleSuccessBasketDesign}/>
                    <SuccessBasketDesign isOpen={state.isOpen} setIsOpen={functions.setIsOpen}/>
                </>
            ) : (
                <p className="text-center text-xl font-bold">{"Корзина пуста"}</p>
            )}
        </div>
    )
}

export default Basket