import AddBasketBtn from "@/components/DishCard/components/AddBasketBtn/AddBasketBtn";
import { Button } from "@/components/ui/button";
import { RussianRuble } from "lucide-react";

interface DishItemProps {
    dish: Dish;
    deleteDish: () => void;
}

const DishItem: React.FC<DishItemProps> = ({ dish, deleteDish }) => {
    return (
        <div className="flex flex-row justify-between items-center w-full p-8">
            <div className="flex flex-row items-center gap-4">
                <img
                    src={dish.photos.length > 0 ? dish.photos[0] : "https://cdn1.ozone.ru/s3/multimedia-d/6319443853.jpg"}
                    alt="dish photo"
                    className="w-[80px] h-[80px] object-cover object-center border-b"
                />
                <div className="flex flex-col gap-1.5">
                    <span className="text-2xl font-medium">{dish.name}</span>
                    <div className="flex flex-row items-center">
                        <span className="text-xl font-normal">{dish.price}</span>
                        <RussianRuble className="w-[16px] h-[16px]" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <AddBasketBtn className="w-full" idDish={dish.id} initialNum={2} />
                <Button className="cursor-pointer" onClick={deleteDish}>Удалить из заказа</Button>
            </div>
        </div>
    )
}

export default DishItem;