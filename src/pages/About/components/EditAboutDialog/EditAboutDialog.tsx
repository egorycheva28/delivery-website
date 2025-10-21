import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useEditAboutDialog } from "./hooks/useEditAboutDialog";

interface NewOperatorDialogProps {
    abouts?: About;
    setIsOpen: (isOpen: boolean) => void;
    isOpen: boolean;
    reloadAbout: () => void;
}

const EditAboutDialog = ({ abouts, setIsOpen, isOpen, reloadAbout }: NewOperatorDialogProps) => {
    const { form, functions } = useEditAboutDialog(setIsOpen, isOpen, reloadAbout, abouts);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Редактирование информации "О нас"</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={functions.onSubmit} className='w-full space-y-4'>
                        <div className="flex flex-col gap-4 items-center">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field, fieldState }) => (
                                    <FormItem className="w-[100%]">
                                        <FormLabel className="text-sm font-normal">
                                            {"Наименование компании"}
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Наименование компании" {...field} />
                                        </FormControl>
                                        {fieldState.error && (
                                            <p className="text-red-600 text-xs mt-1">{fieldState.error.message}</p>
                                        )}
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phoneOperator"
                                render={({ field, fieldState }) => (
                                    <FormItem className="w-[100%]">
                                        <FormLabel className="text-sm font-normal">
                                            {"Телефон оператора"}
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Телефон оператора" {...field} />
                                        </FormControl>
                                        {fieldState.error && (
                                            <p className="text-red-600 text-xs mt-1">{fieldState.error.message}</p>
                                        )}
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phoneManager"
                                render={({ field, fieldState }) => (
                                    <FormItem className="w-[100%]">
                                        <FormLabel className="text-sm font-normal">
                                            {"Телефон менеджера"}
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Телефон менеджера" {...field} />
                                        </FormControl>
                                        {fieldState.error && (
                                            <p className="text-red-600 text-xs mt-1">{fieldState.error.message}</p>
                                        )}
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field, fieldState }) => (
                                    <FormItem className="w-[100%]">
                                        <FormLabel className="text-sm font-normal">
                                            {"Email для связи"}
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Email для связи" {...field} />
                                        </FormControl>
                                        {fieldState.error && (
                                            <p className="text-red-600 text-xs mt-1">{fieldState.error.message}</p>
                                        )}
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field, fieldState }) => (
                                    <FormItem className="w-[100%]">
                                        <FormLabel className="text-sm font-normal">
                                            {"Почтовый адрес"}
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Почтовый адрес" {...field} />
                                        </FormControl>
                                        {fieldState.error && (
                                            <p className="text-red-600 text-xs mt-1">{fieldState.error.message}</p>
                                        )}
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex flex-row gap-10">
                            <Button type='button' onClick={() => setIsOpen(false)} className='h-10 w-[45%] cursor-pointer'>
                                {"Отмена"}
                            </Button>
                            <Button type='submit' className='h-10 w-[45%] cursor-pointer'>
                                {"Сохранить"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default EditAboutDialog;