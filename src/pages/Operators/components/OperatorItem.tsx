import { Button } from "@/components/ui/button";
import type { OperatorDTO } from "@/utils/types/OperatorDTO";
import { Phone } from "lucide-react";

interface OperatorItemProps {
    operator: OperatorDTO;
}

const OperatorItem: React.FC<OperatorItemProps> = ({ operator }) => {
    const deleteOperator = () => {
        //логика удаления оператора
    };

    return (
        <div className="flex flex-col w-[100%] p-10 gap-3">
            <div className="flex flex-row justify-between">
                <span className="text-2xl font-medium">{operator.name}</span>
                <Button className="cursor-pointer" onClick={deleteOperator}>Удалить аккаунт оператора</Button>
            </div>
            <div className="flex flex-row items-center gap-4">
                <Phone className="w-[32px] h-[32px]" />
                <div className="flex flex-col gap-1.5">
                    <span className="font-medium">Номер телефона:</span>
                    <span className="">{operator.phone}</span>
                </div>
            </div>
        </div>
    )
}

export default OperatorItem;