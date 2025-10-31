import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import type {RateDialogSchema} from "@/pages/DishDetail/components/RateDialog/constants/RateDialogSchema.ts";
import {useRateDialog} from "@/pages/DishDetail/components/RateDialog/hooks/useRateDialog.ts";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Slider} from "@/components/ui/slider.tsx";
import {Button} from "@/components/ui/button.tsx";

interface RateDialogProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    dishId: string;
    initialData?: RateDialogSchema;
    reload: () => void;
}

const RateDialog = ({ isOpen, setIsOpen, dishId, reload, initialData }: RateDialogProps) => {
    const { form, functions } = useRateDialog(setIsOpen, dishId, reload, initialData);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {"Оцените блюдо"}
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={functions.onSubmit} className='w-full space-y-4'>
                        <FormField
                            control={form.control}
                            name='rating'
                            render={({ field }) => (
                                <FormItem>
                                    <Slider
                                        value={[field.value]}
                                        onValueChange={functions.handleSliderChange}
                                        max={5}
                                        min={1}
                                        step={0.1}
                                        className="w-full"
                                    />
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Введите рейтинг"
                                            type="number"
                                            min={1}
                                            max={5}
                                            step="0.1"
                                            onChange={(e) => {
                                                field.onChange(functions.clampRating(e.target.value));
                                            }}
                                            onBlur={() => {
                                                if (!field.value) {
                                                    field.onChange(1);
                                                }
                                                field.onBlur();
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {form.formState?.errors?.rating && (
                                            <p className="text-red-600 text-xs mt-1">
                                                {form.formState.errors.rating.message}
                                            </p>
                                        )}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        <Button type='submit' className='h-10 w-full'>
                            {"Оценить"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default RateDialog