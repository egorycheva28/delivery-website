import DishCard from "@/components/DishCard/DishCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { useAddDishDialog } from "./hooks/useAddDishDialog";
import CustomPagination from "@/components/Pagination/CustomPagination";
import AddOrderBtn from "@/components/DishCard/components/AddOrderBtn/AddOrderBtn";

interface AddDishDialogProps {
    isAddDish: boolean;
    setIsAddDish: (isAddDish: boolean) => void;
    order: Order;
}

const AddDishDialog = ({ isAddDish, setIsAddDish, order }: AddDishDialogProps) => {
    const { state, functions } = useAddDishDialog(setIsAddDish);

    return (
        <Dialog open={isAddDish} onOpenChange={setIsAddDish}>
            <DialogContent className="mx-auto max-w-md h-[800px] overflow-hidden w-auto">
                <DialogHeader>
                    <DialogTitle>Меню</DialogTitle>
                </DialogHeader>
                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                    {state.dishes.data?.data.map(dish => (
                        <DishCard key={dish.id} {...dish}>
                            <AddOrderBtn className="w-full" idDish={dish.id} order={order} onClick={functions.reloadDishes} />
                        </DishCard>
                    ))}
                </div>
                <CustomPagination totalPages={state.totalPage} />
            </DialogContent>
        </Dialog>
    )
}

export default AddDishDialog;