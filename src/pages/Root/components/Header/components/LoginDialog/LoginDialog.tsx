import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import LoginUserForm
    from "@/pages/Root/components/Header/components/LoginDialog/components/LoginUserForm/LoginUserForm.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import LoginOperatorForm
    from "@/pages/Root/components/Header/components/LoginDialog/components/LoginOperatorForm/LoginOperatorForm.tsx";

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
            <Tabs defaultValue="user">
                <TabsList className="w-full">
                    <TabsTrigger value="user">{"Клиент"}</TabsTrigger>
                    <TabsTrigger value="operator">{"Оператор"}</TabsTrigger>
                </TabsList>
                <TabsContent value="user">
                    <LoginUserForm setIsOpen={setIsOpen} register={register}/>
                </TabsContent>
                <TabsContent value="operator">
                    <LoginOperatorForm setIsOpen={setIsOpen} register={register}/>
                </TabsContent>
            </Tabs>
        </DialogContent>
    </Dialog>
)

export default LoginDialog;