import { Button } from "@/components/ui/button";
import type { OperatorDTO } from "@/utils/types/OperatorDTO";
import phone from "../icons/phone.png";

interface OperatorItemProps {
    operator: OperatorDTO;
}

const OperatorItem: React.FC<OperatorItemProps> = ({ operator }) => {
    return (
        <div className="flex flex-col w-[100%] p-10 gap-3">
            <div className="flex flex-row justify-between">
                <span className="text-2xl font-medium">{operator.name}</span>
                <Button>Удалить аккаунт оператора</Button>
            </div>
            <div className="flex flex-row items-center gap-4">
                <img src={phone} className="w-[30px] h-[30px]" />
                <div className="flex flex-col gap-1.5">
                    <span className="font-medium">Номер телефона:</span>
                    <span className="">{operator.phone}</span>
                </div>
            </div>
        </div>
    )
}

export default OperatorItem;