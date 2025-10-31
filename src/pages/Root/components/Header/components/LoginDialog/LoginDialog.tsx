import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {useLoginDialog} from "@/pages/Root/components/Header/components/LoginDialog/hooks/useLoginDialog.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {PhoneInput} from "@/components/ui/input-phone.tsx";

interface LoginDialogProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    register: () => void;
}

const LoginDialog = ({isOpen, setIsOpen, register}: LoginDialogProps) => {
    const { form, functions } = useLoginDialog(setIsOpen);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {"Авторизация"}
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={functions.onSubmit} className='w-full space-y-4'>
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
                            <p className="text-red-600 text-center mt-1">
                                {form.formState.errors.root.message}
                            </p>
                        )}
                        <Button type='button' variant="secondary" className='h-10 w-full cursor-pointer'
                                onClick={register}>
                            {"Зарегистрироваться"}
                        </Button>
                        <Button type='submit' className='h-10 w-full cursor-pointer'>
                            {"Войти"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default LoginDialog;