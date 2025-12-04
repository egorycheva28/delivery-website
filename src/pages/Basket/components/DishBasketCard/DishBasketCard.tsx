import AddBasketBtn from "@/components/DishCard/components/AddBasketBtn/AddBasketBtn.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useDishBasketCard} from "@/pages/Basket/components/DishBasketCard/hooks/useDishBasketCard.ts";

interface DishBasketCardProps {
    dishId: string;
    name: string;
    price: number;
    imageUrl?: string;
    quantity: number;
    reload: () => void;
}

const DishBasketCard = ({ dishId, name, price, imageUrl, quantity, reload }: DishBasketCardProps) => {
    const { functions } = useDishBasketCard(dishId, reload)

    return (
        <div className="w-full flex items-center justify-between border p-5 dish-into-basket">
            <div className="flex items-center gap-2">
                <div className="h-[100px] w-[100px] overflow-hidden bg-gray-100">
                    <img
                        src={imageUrl || "https://cdn1.ozone.ru/s3/multimedia-d/6319443853.jpg"}
                        alt="dish photo"
                        className="w-full h-full object-cover object-center border"
                    />
                </div>
                <div>
                    <p>{name}</p>
                    <p>{`${price} ₽`}</p>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <AddBasketBtn className="w-[200px]" dishId={dishId} name={name} price={price} quantity={quantity}
                              imageUrl={imageUrl} reload={reload}/>
                <Button onClick={functions.handleDeleteDishIntoCart}>
                    {"Удалить блюдо"}
                </Button>
            </div>
        </div>
    )
}

export default DishBasketCard