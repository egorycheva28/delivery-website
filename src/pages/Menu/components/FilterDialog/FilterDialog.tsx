import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form.tsx";
import {useFilterDialog} from "@/pages/Menu/components/FilterDialog/hooks/useFilterDialog.ts";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import type {GetFoodsWithFilterParams} from "@/utils/api/requests/foods/filter";

interface FilterDialogProps {
    filters: GetFoodsWithFilterParams;
    setFilters: (filters: GetFoodsWithFilterParams) => void;
    setIsOpen: (isOpen: boolean) => void;
    isOpen: boolean;
}

const FilterDialog = ({filters, setFilters, setIsOpen, isOpen}: FilterDialogProps) => {
    const { state,
        form,
        functions } = useFilterDialog(filters, setFilters, setIsOpen);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Фильтры</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={functions.onSubmit} className='w-full space-y-4'>
                        <FormField
                            control={form.control}
                            name="ingredients"
                            render={() => (
                                <FormItem>
                                    {state.ingredients.map((ingredient) => (
                                        <FormField
                                            key={ingredient.id}
                                            control={form.control}
                                            name="ingredients"
                                            render={({field}) => (
                                                <FormItem className="flex flex-row items-center gap-2">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value?.includes(ingredient.id)}
                                                            onCheckedChange={(checked) => {
                                                                checked
                                                                    ? field.onChange([...field.value, ingredient.id])
                                                                    : field.onChange(
                                                                        field.value?.filter(
                                                                            (value) => value !== ingredient.id
                                                                        )
                                                                    )
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="text-sm font-normal">
                                                        {ingredient.label}
                                                    </FormLabel>
                                                </FormItem>
                                            )}
                                        />
                                    ))}
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-between items-center">
                            <FormField
                                control={form.control}
                                name="min_price"
                                render={({field}) => (
                                    <FormItem className="w-[190px]">
                                        <FormControl>
                                            <Input placeholder="MIN цена" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="max_price"
                                render={({field}) => (
                                    <FormItem className="w-[190px]">
                                        <FormControl>
                                            <Input placeholder="MAX цена" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type='submit' className='h-10 w-full'>
                            {"Применить"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default FilterDialog