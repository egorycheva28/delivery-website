import {useBasketForm} from "@/pages/Basket/components/BasketForm/hooks/useBasketForm.ts";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";

const BasketForm = () => {
    const { state,
        form,
        functions } = useBasketForm()

    return (
        <Form {...form}>
            <form onSubmit={functions.onSubmit} className='w-full space-y-4'>
                <FormField
                    control={form.control}
                    name='deliveryAddress'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Введите адрес доставки"
                                />
                            </FormControl>
                            <FormMessage>
                                {form.formState?.errors?.deliveryAddress && (
                                    <p className="text-red-600 text-xs mt-1">
                                        {form.formState.errors.deliveryAddress.message}
                                    </p>
                                )}
                            </FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Введите email"
                                />
                            </FormControl>
                            <FormMessage>
                                {form.formState?.errors?.email && (
                                    <p className="text-red-600 text-xs mt-1">
                                        {form.formState.errors.email.message}
                                    </p>
                                )}
                            </FormMessage>
                        </FormItem>
                    )}
                />
                {state.isRegistered && (
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type='password'
                                        placeholder="Введите пароль"
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
                )}
                <div>
                    <Select onValueChange={functions.handleSelectPayment}>
                        <SelectTrigger className="!h-10 max-w-64">
                            <SelectValue placeholder="Выберите способ оплаты" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="card_site">Картой на сайте</SelectItem>
                                <SelectItem value="cash">Наличными курьеру</SelectItem>
                                <SelectItem value="card_courier">Картой курьеру</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {form.formState?.errors?.paymentMethod && (
                        <p className="text-red-600 text-sm mt-1">
                            {form.formState.errors.paymentMethod.message}
                        </p>
                    )}
                </div>
                <Button type='submit' className='h-10 w-full'>
                    {"Оформить заказ"}
                </Button>
            </form>
        </Form>
)
}

export default BasketForm