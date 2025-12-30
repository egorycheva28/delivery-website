import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useSuccessBasketDesign } from "./hooks/useSuccessBasketDesign";

interface SuccessBasketDesignProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const SuccessBasketDesign = ({ isOpen, setIsOpen }: SuccessBasketDesignProps) => {
    const { functions } = useSuccessBasketDesign(setIsOpen);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen} >
            <DialogContent id="succest-making-order-dialog" className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-[#48A540] text-center">
                        {"Заказ оформлен"}
                    </DialogTitle>
                    <DialogDescription className="text-center text-black">
                        {"Заказ отправлен менеджеру, с вами свяжутся по указанному телефону для подтверждения заказа"}
                    </DialogDescription>
                </DialogHeader>
                <Button type='button' className='h-10 w-full' onClick={functions.handleClose}>
                    {"Закрыть"}
                </Button>
            </DialogContent>
        </Dialog>
    )
}

export default SuccessBasketDesign;