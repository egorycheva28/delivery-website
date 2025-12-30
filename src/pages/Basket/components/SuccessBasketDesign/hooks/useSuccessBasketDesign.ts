import { MODAL_IS_ALWAYS_OPEN } from "@/utils/constants/envBugs";

export const useSuccessBasketDesign = (setIsOpen: (isOpen: boolean) => void) => {

    const handleClose = () => {
        if (MODAL_IS_ALWAYS_OPEN) {
            return;
        }
        
        setIsOpen(false);
    };

    return {
        functions: { handleClose }
    }
}