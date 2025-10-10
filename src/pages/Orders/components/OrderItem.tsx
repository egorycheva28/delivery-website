import { Button } from "@/components/ui/button";
import { Calendar, MapPin, RussianRuble } from "lucide-react";

interface OrderItemProps {
    order: Order;
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
    return (
        <div className="flex flex-col w-[100%] p-10 gap-6">
            <div className="flex flex-row justify-between">
                <span className="text-2xl font-medium underline">Заказ №{order.number}</span>
                <div className="flex flex-col items-center">
                    <div className="flex flex-row items-center">
                        <span className="text-3xl font-medium">{order.price}</span>
                        <RussianRuble className="w-[22px] h-[22px]" />
                    </div>
                    <span className="font-medium">{order.payment}</span>
                </div>
            </div>
            <div className="flex flex-row gap-8 justify-between items-center">
                <div className="flex flex-row gap-8">
                    <div className="flex flex-row items-center gap-4">
                        <Calendar className="w-[32px] h-[32px]" />
                        <div className="flex flex-col gap-1.5">
                            <span className="font-medium">Дата заказа:</span>
                            <span className="">{order.date}</span>
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-4">
                        <MapPin className="w-[32px] h-[32px]" />
                        <div className="flex flex-col gap-1.5">
                            <span className="font-medium">Адрес доставки:</span>
                            <span className="">{order.address}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <Button className="cursor-pointer">{order.status}</Button>
                </div>
            </div>
        </div>
    )
}

export default OrderItem;