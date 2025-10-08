import AboutItem from "./components/AboutItem";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAbout } from "./hooks/useAbout";
import EditAboutDialog from "./components/EditAboutDialog/EditAboutDialog";

const About = () => {
    const { state, functions } = useAbout();

    return (
        <div className="flex flex-col mt-8 mb-8 gap-12 w-full px-16">
            <div className='flex flex-row justify-between items-center'>
                <span className='text-4xl font-medium text-center flex-1'>О нас</span>
                {state.role == 'admin' ? (
                    <div>
                        <Button className="cursor-pointer" onClick={() => functions.setIsOpen(true)}>{"Редактировать"}</Button>
                        <EditAboutDialog isOpen={state.isOpen} setIsOpen={functions.setIsOpen} abouts={state.abouts} setAbouts={functions.setAbouts}
                            name={state.abouts.name} phoneOperator={state.abouts.phoneOperator} phoneManager={state.abouts.phoneManager}
                            email={state.abouts.email} address={state.abouts.address} information={state.abouts.information} />
                    </div>
                ) : (
                    null
                )}
            </div>
            <span className="text-4xl font-medium text-left">{state.abouts.name}</span>
            <span className="flex text-left text-3xl font-normal">{state.abouts.information}</span>
            <div className="flex flex-col border border-black rounded-lg py-6 px-10 gap-6 w-full">
                <span className="text-2xl font-medium">Доступные средства связи:</span>
                <div className="flex flex-col lg:flex-row justify-between w-full gap-4">
                    <AboutItem icon={<Phone className="w-[40px] h-[40px]" />} title={"Телефон оператора:"} aboutItem={state.abouts.phoneOperator} />
                    <AboutItem icon={<Phone className="w-[40px] h-[40px]" />} title={"Телефон менеджера:"} aboutItem={state.abouts.phoneManager} />
                    <AboutItem icon={<Mail className="w-[40px] h-[40px]" />} title={"Email для связи:"} aboutItem={state.abouts.email} />
                    <AboutItem icon={<MapPin className="w-[40px] h-[40px]" />} title={"Почтовый адрес:"} aboutItem={state.abouts.address} />
                </div>
            </div>
        </div>
    )
}

export default About;