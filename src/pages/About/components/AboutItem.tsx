import type { AboutDTO } from "@/utils/types/AboutDTO";

interface AboutItemProps {
    icon: React.ReactNode;
    title: string;
    aboutItem: AboutDTO;

}

const AboutItem: React.FC<AboutItemProps> = ({ icon, aboutItem, title }) => {
    return (
        <div className="flex flex-row gap-6 items-center justify-center w-full">
            {icon}
            <div className="flex flex-col gap-2">
                <span className="text-lg font-medium">{title}</span>
                <span className="text-lg font-normal">{aboutItem.answer}</span>
            </div>
        </div>
    )
}

export default AboutItem;