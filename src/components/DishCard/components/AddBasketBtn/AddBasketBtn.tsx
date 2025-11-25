import {useAddBasketBtn} from "@/components/DishCard/components/AddBasketBtn/hooks/useAddBasketBtn.ts";
import type {ComponentProps} from "react";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";

interface AddBasketBtnProps extends ComponentProps<'button'> {
    dishId: string;
    name: string;
    price: number;
    imageUrl?: string;
    quantity: number;
    reload?: () => void;
}

const AddBasketBtn = ({ dishId, name, price, imageUrl, quantity, reload, className, ...props }: AddBasketBtnProps) => {
    const { state, functions } = useAddBasketBtn(dishId, name, price, quantity, reload, imageUrl)

    return (
        <>
            {state.dishNumber > 0 ? (
                <div className={cn("flex items-center justify-between", className)}>
                    <Button className="h-10" onClick={functions.handleRemoveBasket}>
                        {"-"}
                    </Button>
                    <p className="text-xl">{state.dishNumber}</p>
                    <Button className="h-10" onClick={functions.handleAddBasket}>
                        {"+"}
                    </Button>
                </div>
            ) : (
                <Button className={cn("h-10", className)} {...props} onClick={functions.handleAddBasket}>
                    {"Добавить в корзину"}
                </Button>
            )}
        </>
    )
}

export default AddBasketBtn;