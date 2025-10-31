import {Badge} from "@/components/ui/badge.tsx";
import {NavLink} from "react-router-dom";
import {Card, CardContent, CardTitle} from "@/components/ui/card.tsx";

interface OrderDishItemProps {
    id: string;
    imageUrl: string[];
    name: string;
    price: number;
    quantity: number;
}

const OrderDishItem = ({ id, imageUrl, name, price, quantity }: OrderDishItemProps) => (
    <Card className="w-[300px] h-[350px] min-h-[350px] flex flex-col overflow-hidden relative pt-0">
        <CardContent className="p-0 flex-grow">
            <Badge className="absolute top-0 left-0">
                {`Количество ${quantity}`}
            </Badge>
            <Badge className="absolute top-0 right-0">
                {`${price} ₽`}
            </Badge>
            <NavLink to={`/dish/${id}`} className="cursor-pointer">
                <div className="h-[300px] overflow-hidden bg-gray-100">
                    <img
                        src={imageUrl[0] || "https://cdn1.ozone.ru/s3/multimedia-d/6319443853.jpg"}
                        alt="dish photo"
                        className="w-full h-full object-cover object-center border-b"
                    />
                </div>
            </NavLink>
            <CardTitle className="text-center text-xl mt-2">
                {name}
            </CardTitle>
        </CardContent>
    </Card>
)

export default OrderDishItem