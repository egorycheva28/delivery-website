import {useBasket} from "@/pages/Basket/hooks/useBasket.ts";
import DishBasketCard from "@/pages/Basket/components/DishBasketCard/DishBasketCard.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import BasketForm from "@/pages/Basket/components/BasketForm/BasketForm.tsx";

const Basket = () => {
    const { state, functions } = useBasket()

    return(
        <div className="mx-auto mt-4 flex flex-col gap-10 p-8">
            {state.dishes.length > 0 ? (
                <>
                    <div className="flex items-center justify-between">
                        <p className="text-xl font-bold">{"Корзина"}</p>
                        <Button className="h-10" onClick={functions.handleDeleteAll}>
                            {"Удалить все"}
                        </Button>
                    </div>
                    <Card className="w-full overflow-hidden p-0">
                        <CardContent className="p-0">
                            {state.dishes.map(dishBasket => (
                                <DishBasketCard key={dishBasket.id} {...dishBasket} />
                            ))}
                        </CardContent>
                    </Card>
                    <div className="flex items-center justify-between border-b-2 border-black font-bold text-xl">
                        <p>{"Итоговая сумма:"}</p>
                        <p>{`${state.totalAmount} ₽`}</p>
                    </div>
                    <BasketForm/>
                </>
            ) : (
                <p className="text-center text-xl font-bold">{"Корзина пуста"}</p>
            )}
        </div>
    )
}

export default Basket