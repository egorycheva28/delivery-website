import { Button } from "@/components/ui/button.tsx";
import { Calendar, MapPin, MessageSquare, RussianRuble } from "lucide-react";
import CommentDialog from "../CommentDialog/CommentDialog.tsx";
import { SelectStatus } from "@/components/SelectStatus/SelectStatus.tsx";
import { NavLink } from "react-router-dom";
import ReasonDialog from "../ReasonDialog/ReasonDialog.tsx";
import React from "react";
import {useOrderItem} from "@/pages/Orders/components/OrderItem/hooks/useOrderItem.ts";

interface OrderItemProps {
    order: Order;
    reloadOrder: () => void;
}

const OrderItem: React.FC<OrderItemProps> = ({ order, reloadOrder }) => {
    const { state, functions } = useOrderItem(reloadOrder)

    return (
        <div className="flex flex-col w-[100%] p-10 gap-6">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-4 ">
                    <NavLink to={`/order/${order.id}`} className="cursor-pointer">
                        <span className="text-2xl font-medium underline">Заказ №</span>
                    </NavLink>
                    {state.authenticated && state.roles.includes('OPERATOR') ? (
                        <MessageSquare className=" flex items-end h-[60%] cursor-pointer"
                                       onClick={() => functions.setIsComment(true)} />
                    ) : null}
                    <CommentDialog isComment={state.isComment} setIsComment={functions.setIsComment} order={order} />
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex flex-row items-center">
                        <span className="text-3xl font-medium">{order.price}</span>
                        <RussianRuble className="w-[22px] h-[22px]" />
                    </div>
                    <span className="font-medium">{order.payWay}</span>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row  gap-8 justify-between items-start sm:items-center">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex flex-row items-center gap-4">
                        <Calendar className="w-[32px] h-[32px]" />
                        <div className="flex flex-col gap-1.5">
                            <span className="font-medium">Дата заказа:</span>
                            <span className=""></span>
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
                <div className="flex flex-col gap-4">
                    {state.authenticated && state.roles.includes('ADMIN') ? (
                        <SelectStatus
                            selected={{ id: order.status, name: order.status }}
                            statuses={[
                                { id: "NEW", name: "Новый" },
                                { id: "CONFIRMED", name: "Подвтержден" },
                                { id: "COOKING", name: "Готовится" },
                                { id: "WAITING_FOR_COURIER", name: "Ожидает курьера" },
                                { id: "TOOK_BY_COURIER", name: "Передан курьеру" },
                                { id: "COMPLETED", name: "Доставлен" },
                                { id: "CANCELED", name: "Отменен" }
                            ]}
                            onChange={functions.changeStatus}
                            orderId={order.id}
                        />
                    ) : (
                        <SelectStatus
                            selected={{ id: order.status, name: order.status }}
                            statuses={[
                                { id: "NEW", name: "Новый" },
                                { id: "CONFIRMED", name: "Подвтержден" },
                                { id: "CANCELED", name: "Отменен" }
                            ]}
                            onChange={functions.changeStatus}
                            orderId={order.id}
                        />
                    )}
                    <ReasonDialog isReason={state.isReason} setIsReason={functions.setIsReason} order={order}
                        reloadOrder={reloadOrder} />
                    {state.authenticated && state.roles.includes('OPERATOR') && order.status?.includes(OrderStatus.NEW) ? (
                        <Button className="cursor-pointer" onClick={functions.appointOperator}>
                            Назначить себя оператором
                        </Button>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default OrderItem;