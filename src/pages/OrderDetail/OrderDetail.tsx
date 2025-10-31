import { Headphones, MessageSquare, RussianRuble, User } from "lucide-react";
import CommentDialog from "../Orders/components/CommentDialog/CommentDialog";
import { useOrderDetail } from "./hooks/useOrderDetail";
import { Button } from "@/components/ui/button";
import DishItem from "./components/DishItem";
import CustomPagination from "@/components/Pagination/CustomPagination";
import HistoryDialog from "./components/HistoryDialog/HistoryDialog";
import AddDishDialog from "./components/AddDichDialog/AddDishDialog";
import ChangeOperatorDialog from "./components/ChangeOperatorDialog/ChangeOperatorDialog";
import { TranslateStatus } from "@/utils/constants/translateStatus";

const OrderDetail = () => {
    const { state, functions } = useOrderDetail();

    return (
        <div className="flex flex-col items-center mt-8 gap-8 w-full">
            {state.authenticated && state.roles.includes('OPERATOR') && state.order.data?.data.status == OrderStatus.NEW ? (
                <div className="flex justify-end w-[90%]">
                    <Button className="cursor-pointer" onClick={functions.makeOperator}>Назначить себя оператором</Button>
                </div>
            ) : (
                null
            )}
            <div className="flex flex-col w-[90%] border border-black rounded-lg divide-y divide-black mb-8">
                <div className="flex flex-row justify-between p-8 items-center">
                    <div className="flex flex-row gap-4">
                        <span className="text-2xl font-medium underline">Заказ </span>
                        {state.authenticated && state.roles.includes('OPERATOR') ? (
                            <MessageSquare className=" flex items-end h-[60%] cursor-pointer" onClick={() => functions.setIsComment(true)} />
                        ) : (
                            null
                        )}
                        {state.order.data?.data && (
                            <CommentDialog isComment={state.isComment} setIsComment={functions.setIsComment}
                                order={state.order.data?.data} comment={state.comment} />
                        )}
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex flex-row items-center">
                            <span className="text-3xl font-medium">{state.order.data?.data.price}</span>
                            <RussianRuble className="w-[22px] h-[22px]" />
                        </div>
                        <span className="font-medium">{state.order.data?.data.payWay}</span>
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center p-8">
                    <div className="flex flex-row items-center gap-4">
                        <User className="w-[36px] h-[36px]" />
                        <div className="flex flex-col gap-1.5">
                            <span className="font-medium">Клиент:</span>
                            <span>{state.order.data?.data.phoneNumber}</span>
                        </div>
                    </div>
                    <div>
                        <Button className="cursor-pointer" onClick={() => functions.setIsHistory(true)}>{TranslateStatus[state.order.data?.data.status || '']}</Button>
                        {state.order.data?.data && (
                            <HistoryDialog isHistory={state.isHistory} setIsHistory={functions.setIsHistory}
                                order={state.order.data?.data} />
                        )}
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center p-8">
                    <div className="flex flex-row items-center gap-4">
                        <Headphones className="w-[36px] h-[36px]" />
                        <div className="flex flex-col gap-1.5">
                            <span className="font-medium">Ответсвенный оператор:</span>
                            {state.order.data?.data.operatorId ? (
                                <span></span>
                            ) : (
                                <span>Оператор не назначен</span>
                            )}
                        </div>
                    </div>
                    {state.authenticated && state.roles.includes('ADMIN') ? (
                        <div>
                            <Button className="cursor-pointer" onClick={() => functions.setIsChangeOperator(true)}>Сменить оператора</Button>
                            <ChangeOperatorDialog isChangeOperator={state.isChangeOperator}
                                setIsChangeOperator={functions.setIsChangeOperator} orderId={state.id || ''} reloadOrder={state.order.refetch} />
                        </div>
                    ) : (
                        null
                    )}
                </div>
                <div className="flex flex-col p-8 gap-8">
                    <div className="flex flex-row justify-between items-center w-full">
                        <span className="text-2xl font-medium">Состав заказа:</span>
                        {state.authenticated && state.roles.includes('OPERATOR') ? (
                            <div>
                                <Button className="cursor-pointer" onClick={() => functions.setIsAddDish(true)}>Добавить блюдо</Button>
                                <AddDishDialog isAddDish={state.isAddDish} setIsAddDish={functions.setIsAddDish} />
                            </div>
                        ) : (
                            null
                        )}
                    </div>
                    <div className="flex flex-col w-full border border-black  divide-y divide-black">
                        {state.order.data?.data.meals.map(meal => (
                            <DishItem key={meal.id} meal={meal} deleteDish={functions.deleteDish} roles={state.roles} authenticated={state.authenticated} />
                        ))}
                    </div>
                    <CustomPagination totalPages={state.totalPage} />
                </div>
            </div>
        </div>
    )
}

export default OrderDetail;