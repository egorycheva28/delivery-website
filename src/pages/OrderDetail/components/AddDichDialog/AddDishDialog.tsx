import AddBasketBtn from "@/components/DishCard/components/AddBasketBtn/AddBasketBtn";
import DishCard from "@/components/DishCard/DishCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { useAddDishDialog } from "./hooks/useAddDishDialog";
import CustomPagination from "@/components/Pagination/CustomPagination";

interface AddDishDialogProps {
    isAddDish: boolean;
    setIsAddDish: (isAddDish: boolean) => void;
}

const AddDishDialog = ({ isAddDish, setIsAddDish }: AddDishDialogProps) => {
    const { state } = useAddDishDialog(isAddDish);

    return (
        <Dialog open={isAddDish} onOpenChange={setIsAddDish}>
            <DialogContent className="mx-auto max-w-md h-[800px] overflow-hidden w-auto">
                <DialogHeader>
                    <DialogTitle>Меню</DialogTitle>
                </DialogHeader>
                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                    {state.dishes.map(dish => (
                        <DishCard key={dish.id} {...dish}>
                            <AddBasketBtn className="w-full" idDish={dish.id} />
                        </DishCard>
                    ))}
                </div>
                <CustomPagination totalPages={10} />
            </DialogContent>
        </Dialog>
    )
}

export default AddDishDialog;