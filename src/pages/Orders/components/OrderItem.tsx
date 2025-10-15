import { Button } from "@/components/ui/button";
import { Calendar, MapPin, MessageSquare, RussianRuble } from "lucide-react";
import CommentDialog from "./CommentDialog/CommentDialog";
import { SelectStatus } from "@/components/SelectStatus/SelectStatus";

interface OrderItemProps {
    order: Order;
    role: string;
    appointOperator: () => void;
    isComment: boolean;
    setIsComment: (isComment: boolean) => void;
    comment: NewComment;
    setComment: (newComment: NewComment) => void;
    changeStatus: () => void;
}

const OrderItem: React.FC<OrderItemProps> = ({ order, role, appointOperator, isComment, setIsComment, comment, setComment, changeStatus }) => {

    return (
        <div className="flex flex-col w-[100%] p-10 gap-6">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-4 ">
                    <span className="text-2xl font-medium underline">Заказ №{order.number}</span>
                    {role == 'operator' ? (
                        <MessageSquare className=" flex items-end h-[60%] cursor-pointer" onClick={() => setIsComment(true)} />
                    ) : (
                        null
                    )}
                    <CommentDialog isComment={isComment} setIsComment={setIsComment} order={order} comment={comment} setComment={setComment} />
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex flex-row items-center">
                        <span className="text-3xl font-medium">{order.price}</span>
                        <RussianRuble className="w-[22px] h-[22px]" />
                    </div>
                    <span className="font-medium">{order.payment}</span>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row  gap-8 justify-between items-start sm:items-center">
                <div className="flex flex-col lg:flex-row gap-8">
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
                <div className="flex flex-col gap-4">
                    {role == 'admin' ? (
                        <SelectStatus
                            selected={{ id: order.status, name: order.status }}
                            statuses={[
                                { id: "new", name: "Новый" },
                                { id: "confirmed", name: "Подвтержден" },
                                { id: "inPreparation", name: "Готовится" },
                                { id: "awaiting", name: "Ожидает курьера" },
                                { id: "handed", name: "Передан курьеру" },
                                { id: "delievered", name: "Доставлен" },
                                { id: "cancelled", name: "Отменен" }
                            ]}
                            onChange={changeStatus}
                        />
                    ) : (
                        <SelectStatus
                            selected={{ id: order.status, name: order.status }}
                            statuses={[
                                { id: "new", name: "Новый" },
                                { id: "confirmed", name: "Подвтержден" },
                                { id: "cancelled", name: "Отменен" }
                            ]}
                            onChange={changeStatus}
                        />
                    )}
                    <CommentDialog isComment={isComment} setIsComment={setIsComment} order={order} comment={comment} setComment={setComment} />
                    {role == 'operator' && order.status == 'new' ? (
                        <Button className="cursor-pointer" onClick={appointOperator}>Назначить себя оператором</Button>
                    ) : (
                        null
                    )}
                </div>
            </div>
        </div>
    )
}

export default OrderItem;