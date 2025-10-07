import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useNewOperatorDialog } from "./hooks/useNewOperatorDialog";
import type { NewOperatorDTO } from "@/utils/types/NewOperatorDTO";

interface NewOperatorDialogProps {
    newOperator: NewOperatorDTO;
    setNewOperator: (newOperator: NewOperatorDTO) => void;
    setIsOpen: (isOpen: boolean) => void;
    isOpen: boolean;
}

const NewOperatorDialog = ({ newOperator, setNewOperator, setIsOpen, isOpen }: NewOperatorDialogProps) => {
    const { state,
        form,
        functions } = useNewOperatorDialog(newOperator, setNewOperator, setIsOpen, isOpen);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Создание нового оператора</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={functions.addNewOperator} className='w-full space-y-4'>
                        <div className="flex flex-col gap-4 items-center">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="w-[100%]">
                                        <FormLabel className="text-sm font-normal">
                                            {"ФИО"}
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="ФИО" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem className="w-[100%]">
                                        <FormLabel className="text-sm font-normal">
                                            {"Номер телефона"}
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Номер телефона" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="w-[100%]">
                                        <FormLabel className="text-sm font-normal">
                                            {"Пароль"}
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Пароль" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type='submit' className='h-10 w-full'>
                            {"Создать"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default NewOperatorDialog;