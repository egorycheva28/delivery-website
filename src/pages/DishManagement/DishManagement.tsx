import DishCard from "@/components/DishCard/DishCard";
import { useDishManagement } from "./hooks/useDishManagement";
import { Button } from "@/components/ui/button";
import CustomPagination from "@/components/Pagination/CustomPagination";
import { Lock, LockOpen, PencilLine, Trash2 } from "lucide-react";
import NewDishDialog from "./components/NewDishDialog/NewDishDialog";
import EditDishDialog from "./components/EditDishDialog/EditDishDialog";

const DishManagement = () => {
    const { state, functions } = useDishManagement();

    return (
        <div className="flex flex-col mt-8 mb-8 gap-12 w-full px-16">
            <div className='flex flex-row justify-between items-center'>
                <span className='text-4xl font-medium text-center flex-1'>Управление блюдами</span>
                <Button className="cursor-pointer" onClick={() => functions.setIsOpen(true)}>{"Добавить блюдо"}</Button>
                <NewDishDialog isOpen={state.isOpen} setIsOpen={functions.setIsOpen} newDish={state.newDish} setNewDish={functions.setNewDish}
                    reloadDishes={state.dishes.refetch} />
            </div>
            <div className="flex items-center justify-around flex-wrap gap-16">
                {state.displayedData.map(dish => (
                    <DishCard key={dish.id} {...dish}>
                        <div className="flex flex-row justify-between items-center w-full">
                            {dish.isAvailable ? (
                                <Button className="cursor-pointer" onClick={() => functions.handleDoAvailable(dish.id, false)}><Lock /></Button>
                            ) : (
                                <Button className="cursor-pointer" onClick={() => functions.handleDoAvailable(dish.id, true)}><LockOpen /></Button>
                            )}
                            <div className="flex flex-row gap-1">
                                <Button className="cursor-pointer" onClick={() => functions.setEditDishId(dish.id)}><PencilLine /></Button>
                                <EditDishDialog isOpen={state.editDishId === dish.id} setIsOpen={(open) => !open && functions.setEditDishId(null)}
                                    newDish={state.newDish} setNewDish={functions.setNewDish} />
                                <Button className="cursor-pointer" onClick={() => functions.handleDeleteDish(dish.id)}><Trash2 /></Button>
                            </div>
                        </div>
                    </DishCard>
                ))}
            </div>
            <CustomPagination totalPages={10} />
        </div>
    )
}

export default DishManagement;