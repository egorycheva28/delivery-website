import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useHistoryDialog } from "./hooks/useHistoryDialog";

interface HistoryDialogProps {
    isHistory: boolean;
    setIsHistory: (isHistory: boolean) => void;
}

const HistoryDialog = ({ isHistory, setIsHistory }: HistoryDialogProps) => {
    const { } = useHistoryDialog(isHistory, setIsHistory);

    return (
        <Dialog open={isHistory} onOpenChange={setIsHistory}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>История статусов</DialogTitle>
                </DialogHeader>

            </DialogContent>
        </Dialog>
    )
}

export default HistoryDialog;