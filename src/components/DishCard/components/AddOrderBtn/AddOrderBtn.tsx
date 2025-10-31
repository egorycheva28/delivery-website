import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";
import { useAddOrderBtn } from "./hooks/useAddOrderBtn";

interface AddOrderBtnProps extends ComponentProps<'button'> {
    initialNum?: number;
    idDish: string;
    order: Order;
}

const AddOrderBtn = ({ initialNum = 0, idDish, order, className, ...props }: AddOrderBtnProps) => {
    const { state, functions } = useAddOrderBtn(initialNum, idDish, order)

    return (
        <>
            {state.dishNumber > 0 ? (
                <div className={cn("flex items-center justify-between", className)}>
                    <Button className="h-10" onClick={functions.handleRemoveOrder}>
                        {"-"}
                    </Button>
                    <p className="text-xl">{state.dishNumber}</p>
                    <Button className="h-10" onClick={functions.handleAddOrder}>
                        {"+"}
                    </Button>
                </div>
            ) : (
                <Button className={cn("h-10", className)} {...props} onClick={functions.handleAddOrder}>
                    {"Добавить в корзину"}
                </Button>
            )}
        </>
    )
}

export default AddOrderBtn;