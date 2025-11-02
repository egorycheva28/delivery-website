import {Card, CardContent} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {NavLink} from "react-router-dom";
import {getOrderStatus} from "@/utils/helpers/getOrderStatus.ts";

interface ProfileOrderItemProps {
    id: string,
    orderNumber: number;
    price: number;
    date: string;
    status: OrderStatus;
}

const ProfileOrderItem = ({ id, orderNumber, date, price, status }: ProfileOrderItemProps) => (
    <Card className="w-full">
        <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
                <p className="text-2xl font-medium underline">{`Заказ ${orderNumber ? orderNumber : ""}`}</p>
                <p className="text-2xl font-medium">{`${price} ₽`}</p>
            </div>
            <div className="flex items-center justify-between">
                <p className="font-bold">{`Дата заказа: ${date}`}</p>
                <p className="font-bold">{`Статус заказа: ${getOrderStatus(status)}`}</p>
            </div>
            <NavLink to={`/orderDishes/${id}`} className="w-full">
                <Button className="cursor-pointer w-full">
                    {"Состав заказа"}
                </Button>
            </NavLink>
        </CardContent>
    </Card>
)

export default ProfileOrderItem;