import {useProfileOrders} from "@/pages/ProfileOrders/hooks/useProfileOrders.ts";
import ProfileOrderItem from "@/pages/ProfileOrders/components/ProfileOrderItem/ProfileOrderItem.tsx";

const ProfileOrders = () => {
    const { state } = useProfileOrders()

    return (
        <div className="mx-auto mt-4 flex flex-col gap-10 p-8">
            <p className="text-4xl font-medium text-center md:text-start">{"Мои заказы"}</p>
            {state.userOrders.data?.data && state.userOrders.data?.data.length > 0 ? (
                <div className="flex flex-col gap-10">
                    {state.userOrders.data?.data.map(order => (
                        <ProfileOrderItem {...order.reservation}/>
                    ))}
                </div>
            ) : (
                <p className="text-center text-xl font-bold">{"Нет заказов"}</p>
            )}
        </div>
    )
}

export default ProfileOrders;