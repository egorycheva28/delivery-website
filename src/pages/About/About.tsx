import { useState } from "react";
import AboutItem from "./components/AboutItem";
import type { AboutDTO } from "@/utils/types/AboutDTO";
import { Mail, MapPin, Phone } from "lucide-react";

const About = () => {
    const [about] = useState<AboutDTO>({
        answer: '8 (999) 999-99-99'
    });

    return (
        <div className="flex flex-col mt-8 gap-12 w-full px-16">
            <span className='text-4xl font-medium text-center'>О нас</span>
            <span className="text-4xl font-medium text-left">HITs Delivery service</span>
            <span className="flex text-left text-3xl font-normal">Доставим быстро и качественно!</span>
            <div className="flex flex-col border border-black rounded-lg p-6 gap-6 w-full">
                <span className="text-2xl font-medium">Доступные средства связи:</span>
                <div className="flex flex-row gap-8">
                    <AboutItem icon={<Phone className="w-[40px] h-[40px]" />} title={"Телефон оператора:"} aboutItem={about} />
                    <AboutItem icon={<Phone className="w-[40px] h-[40px]" />} title={"Телефон менеджера:"} aboutItem={about} />
                    <AboutItem icon={<Mail className="w-[40px] h-[40px]" />} title={"Email для связи:"} aboutItem={about} />
                    <AboutItem icon={<MapPin className="w-[40px] h-[40px]" />} title={"Почтовый адрес:"} aboutItem={about} />
                </div>
            </div>
        </div>
    )
}

export default About;