import AddBasketBtn from "@/components/DishCard/components/AddBasketBtn/AddBasketBtn";
import { Button } from "@/components/ui/button";
import { RussianRuble } from "lucide-react";

interface DishItemProps {
    meal: Meal;
    handleDeleteDishFromOrder: (dishId: string) => void;
    roles: string[];
    authenticated: boolean;
}

const DishItem: React.FC<DishItemProps> = ({ meal, handleDeleteDishFromOrder, roles, authenticated }) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full p-8 gap-8">
            <div className="flex flex-row items-center gap-4">
                <img
                    src={meal.imageUrl.length > 0 ? meal.imageUrl[0] : "https://cdn1.ozone.ru/s3/multimedia-d/6319443853.jpg"}
                    alt="dish photo"
                    className="w-[80px] h-[80px] object-cover object-center border-b"
                />
                <div className="flex flex-col gap-1.5">
                    <span className="text-2xl font-medium">{meal.name}</span>
                    <div className="flex flex-row items-center">
                        <span className="text-xl font-normal">{meal.price}</span>
                        <RussianRuble className="w-[16px] h-[16px]" />
                    </div>
                </div>
            </div>
            {authenticated && roles.includes('OPERATOR') ? (
                <div className="flex flex-col gap-4">
                    <AddBasketBtn className="w-full" idDish={meal.id} initialNum={2} />
                    <Button className="cursor-pointer" onClick={() => handleDeleteDishFromOrder(meal.id)}>Удалить из заказа</Button>
                </div>
            ) : (
                null
            )}
        </div>
    )
}

export default DishItem;