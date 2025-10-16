import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { useChangeOperatorDialog } from "./hooks/useChangeOperatorDialog";
import CustomPagination from "@/components/Pagination/CustomPagination";
import ChangeOperatorItem from "./components/ChangeOperatorItem";

interface ChangeOperatorDialogProps {
    isChangeOperator: boolean;
    setIsChangeOperator: (isChangeOperator: boolean) => void;
}

const ChangeOperatorDialog = ({ isChangeOperator, setIsChangeOperator }: ChangeOperatorDialogProps) => {
    const { state, functions } = useChangeOperatorDialog(isChangeOperator, setIsChangeOperator);

    return (
        <Dialog open={isChangeOperator} onOpenChange={setIsChangeOperator}>
            <DialogContent className="mx-auto max-w-md h-[700px] overflow-hidden w-auto">
                <DialogHeader>
                    <DialogTitle>Операторы</DialogTitle>
                </DialogHeader>
                <div className="flex-1 overflow-y-auto p-4 flex flex-col ">
                    {state.listOperators.map(operator => (
                        <ChangeOperatorItem operator={operator} changeOperator={functions.changeOperator} />
                    ))}
                </div>
                <CustomPagination totalPages={10} />
            </DialogContent>
        </Dialog>
    )
}

export default ChangeOperatorDialog;