import AboutItem from "./components/AboutItem";
import { Mail, MapPin, Phone } from "lucide-react";
import { useAbout } from "./hooks/useAbout";

const About = () => {
    const { state } = useAbout();

    return (
        <div className="flex flex-col mt-8 mb-8 gap-12 w-full px-16">
            <div className='flex flex-row justify-between items-center'>
                <span className='text-4xl font-medium text-center flex-1'>О нас</span>
            </div>
            <span className="text-4xl font-medium text-left">{state.abouts.data?.data.companyName}</span>
            <span className="flex text-left text-3xl font-normal">Доставим быстро и качественно!</span>
            <div className="flex flex-col border border-black rounded-lg py-6 px-10 gap-6 w-full">
                <span className="text-2xl font-medium">Доступные средства связи:</span>
                <div className="flex flex-col lg:flex-row justify-between w-full gap-4">
                    <AboutItem icon={<Phone className="w-[40px] h-[40px]" />} title={"Телефон оператора:"} aboutItem={state.getAboutInfo?.operatorPhone ?? 'Нет данных'} />
                    <AboutItem icon={<Phone className="w-[40px] h-[40px]" />} title={"Телефон менеджера:"} aboutItem={state.getAboutInfo?.managerPhone ?? 'Нет данных'} />
                    <AboutItem icon={<Mail className="w-[40px] h-[40px]" />} title={"Email для связи:"} aboutItem={state.getAboutInfo?.contactEmail ?? 'Нет данных'} />
                    <AboutItem icon={<MapPin className="w-[40px] h-[40px]" />} title={"Почтовый адрес:"} aboutItem={state.getAboutInfo?.mailAddress ?? 'Нет данных'} />
                </div>
            </div>
        </div>
    )
}

export default About;