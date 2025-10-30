import {useProfile} from "@/pages/Profile/hooks/useProfile.ts";
import {Button} from "@/components/ui/button.tsx";
import EditPassword from "./components/EditPassword/EditPasswordDialog";
//<EditPassword isOpen={state.isOpen} setIsOpen={functions.setIsOpen} editUserPassword={state.editUserPassword} setEditUserPassword={functions.setEditUserPassword}}/>

const Profile = () => {
    const { state, functions } = useProfile()
 
    return (
        <div className="flex flex-col mt-40 mb-40 w-full px-16">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col border border-black rounded-lg mr-20 py-6 px-10 gap-6 w-full">
                    <span className='text-4xl font-medium text-center flex-1'>Ваши данные</span>
                    <div className="flex flex-col">
                        <label htmlFor="fullName">ФИО:</label>
                        <input type="text" id="fullName" value={state.UserProfile.name} readOnly />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="phoneNumber">Номер телефона:</label>
                        <input type="text" id="phoneNumber" value={state.UserProfile.phone} readOnly />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password">Пароль:</label>
                        <input type="password" id="password" value={state.UserProfile.password} readOnly />
                    </div>
                    <div>
                        <Button className="cursor-pointer" onClick={() => functions.setIsOpen(true)}>{"Изменить пароль"}</Button>
                        <EditPassword isOpen={state.isOpen} setIsOpen={functions.setIsOpen} editUserPassword={state.editUserPassword} setEditUserPassword={functions.setEditUserPassword}/>
                    </div>
                </div>
                <div className="flex flex-col border border-black rounded-lg py-6 px-10 gap-6 w-full">
                    <span className='text-4xl font-medium text-center flex-1'>Ваши заказы</span>
                    <div className="flex flex-row justify-between">
                        <label htmlFor="inProcess">Заказы в обработке:</label>
                        <input className="w-[40px] h-[20px]" type="number" id="inProcess" value={state.UserOrders.inProcess} readOnly />
                    </div>
                    <div className="flex flex-row justify-between">
                        <label htmlFor="completed">Заказы завершено:</label>
                        <input className="w-[40px] h-[20px]" type="number" id="completed" value={state.UserOrders.completed} readOnly />
                    </div>
                    <Button>Подробнее</Button>
                </div>
            </div>
        </div>
    )
}

export default Profile