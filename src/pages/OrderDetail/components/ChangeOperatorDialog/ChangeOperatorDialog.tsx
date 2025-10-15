import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { useChangeOperatorDialog } from "./hooks/useChangeOperatorDialog";
import OperatorItem from "@/pages/Operators/components/OperatorItem";

interface HistoryDialogProps {
    isHistory: boolean;
    setIsHistory: (isHistory: boolean) => void;
}

const HistoryDialog = ({ isHistory, setIsHistory }: HistoryDialogProps) => {
    const { state, functions } = useChangeOperatorDialog(isHistory, setIsHistory);

    return (
        <Dialog open={isHistory} onOpenChange={setIsHistory}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>История статусов</DialogTitle>
                </DialogHeader>
                <div>
                    {state.listOperators.map(operator => (
                        <OperatorItem  operator={operator} /*changeOperator={functions.changeOperator}*/ />
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default HistoryDialog;