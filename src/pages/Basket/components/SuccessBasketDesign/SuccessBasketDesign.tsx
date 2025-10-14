import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";

interface SuccessBasketDesignProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const SuccessBasketDesign = ({ isOpen, setIsOpen }: SuccessBasketDesignProps) => (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle className="text-[#48A540] text-center">
                    {"Заказ оформлен"}
                </DialogTitle>
                <DialogDescription className="text-center text-black">
                    {"Заказ отправлен менеджеру, с вами свяжутся по указанному телефону для подтверждения заказа"}
                </DialogDescription>
            </DialogHeader>
            <Button type='button' className='h-10 w-full' onClick={() => setIsOpen(false)}>
                {"Закрыть"}
            </Button>
        </DialogContent>
    </Dialog>
)

export default SuccessBasketDesign;