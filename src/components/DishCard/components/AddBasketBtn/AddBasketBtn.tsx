import {useAddBasketBtn} from "@/components/DishCard/components/AddBasketBtn/hooks/useAddBasketBtn.ts";
import type {ComponentProps} from "react";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";

interface AddBasketBtnProps extends ComponentProps<'button'> {
    initialNum?: number;
    idDish: string;
}

const AddBasketBtn = ({ initialNum = 0, idDish, className, ...props }: AddBasketBtnProps) => {
    const { state, functions } = useAddBasketBtn(initialNum, idDish)

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