import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import LoginUserForm
    from "@/pages/Root/components/Header/components/LoginDialog/components/LoginUserForm/LoginUserForm.tsx";

interface LoginDialogProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    register: () => void;
}

const LoginDialog = ({isOpen, setIsOpen, register}: LoginDialogProps) => (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>
                    {"Авторизация"}
                </DialogTitle>
            </DialogHeader>
                <LoginUserForm setIsOpen={setIsOpen} register={register}/>
        </DialogContent>
    </Dialog>
)

export default LoginDialog;