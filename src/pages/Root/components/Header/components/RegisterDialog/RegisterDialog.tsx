import {useRegisterDialog} from "@/pages/Root/components/Header/components/RegisterDialog/hooks/useRegisterDialog.ts";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {PhoneInput} from "@/components/ui/input-phone.tsx";

interface RegisterDialogProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    login: () => void;
    reload: () => void;
}

const RegisterDialog = ({ isOpen, setIsOpen, login, reload }: RegisterDialogProps) => {
    const { form, functions } = useRegisterDialog(setIsOpen, reload)

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {"Регистрация"}
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={functions.onSubmit} className='w-full space-y-4'>
                        <FormField
                            control={form.control}
                            name='fullName'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        <p>{"ФИО"}</p>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Введите ФИО"
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {form.formState?.errors?.fullName && (
                                            <p className="text-red-600 text-xs mt-1">
                                                {form.formState.errors.fullName.message}
                                            </p>
                                        )}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='phone'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        <p>{"Номер телефона"}</p>
                                    </FormLabel>
                                    <FormControl>
                                        <PhoneInput
                                            {...field}
                                            placeholder="Введите номер телефона"
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {form.formState?.errors?.phone && (
                                            <p className="text-red-600 text-xs mt-1">
                                                {form.formState.errors.phone.message}
                                            </p>
                                        )}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        <p>{"Пароль"}</p>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Введите пароль"
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {form.formState?.errors?.password && (
                                            <p className="text-red-600 text-xs mt-1">
                                                {form.formState.errors.password.message}
                                            </p>
                                        )}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        {form.formState?.errors?.root && (
                            <p className="text-red-600 text-xs text-center mt-1">
                                {form.formState.errors.root.message}
                            </p>
                        )}
                        <Button type='button' variant="secondary" className='h-10 w-full cursor-pointer' onClick={login}>
                            {"Войти"}
                        </Button>
                        <Button type='submit' className='h-10 w-full cursor-pointer'>
                            {"Зарегистрироваться"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default RegisterDialog;