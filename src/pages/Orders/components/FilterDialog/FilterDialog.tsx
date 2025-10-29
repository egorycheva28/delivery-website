import { useFilterDialog } from "./hooks/useFilterDialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Minus, Plus } from "lucide-react";
import type { OrderListFilters } from "../../hooks/useOrders";

interface FilterDialogProps {
    filters: OrderListFilters;
    setFilters: (filters: OrderListFilters) => void;
    setIsOpen: (isOpen: boolean) => void;
    isOpen: boolean;
    setIsStatus: (isOpen: boolean) => void;
    isStatus: boolean;
    setIsOperator: (isOpen: boolean) => void;
    isOperator: boolean;
}

const FilterDialog = ({ filters, setFilters, setIsOpen, isOpen, setIsStatus, isStatus, setIsOperator, isOperator }: FilterDialogProps) => {
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
                    <form onSubmit={functions.onSubmit} className='w-full space-y-4 flex flex-col'>
                        <div className="flex flex-row justify-between items-center cursor-pointer" onClick={() => setIsStatus(!isStatus)}>
                            <span>Фильтры по статусам</span>
                            {isStatus ? (
                                <Minus />
                            ) : (
                                <Plus />
                            )}
                        </div>
                        {isStatus ? (
                            <FormField
                                control={form.control}
                                name="statuses"
                                render={() => (
                                    <FormItem>
                                        {state.statuses.map((status) => (
                                            <FormField
                                                key={status.id}
                                                control={form.control}
                                                name="statuses"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(status.id)}
                                                                onCheckedChange={(checked) => {
                                                                    checked
                                                                        ? field.onChange([...field.value, status.id])
                                                                        : field.onChange(
                                                                            field.value?.filter(
                                                                                (value: string) => value !== status.id
                                                                            )
                                                                        )
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="text-sm font-normal">
                                                            {status.label}
                                                        </FormLabel>
                                                    </FormItem>
                                                )}
                                            />
                                        ))}
                                    </FormItem>
                                )}
                            />
                        ) : (
                            null
                        )}
                        <hr className="border-t border-gray-300" />
                        <div className="flex flex-row justify-between items-center cursor-pointer " onClick={() => setIsOperator(!isOperator)}>
                            <span>Фильтры по операторам</span>
                            {isOperator ? (
                                <Minus />
                            ) : (
                                <Plus />
                            )}
                        </div>
                        {isOperator ? (
                            <FormField
                                control={form.control}
                                name="operators"
                                render={() => (
                                    <FormItem>
                                        {state.operators.data?.data.map((operator) => (
                                            <FormField
                                                key={operator.id}
                                                control={form.control}
                                                name="operators"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(operator.id)}
                                                                onCheckedChange={(checked) => {
                                                                    checked
                                                                        ? field.onChange([...field.value, operator.id])
                                                                        : field.onChange(
                                                                            field.value?.filter(
                                                                                (value: string) => value !== operator.id
                                                                            )
                                                                        )
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="text-sm font-normal">
                                                            {operator.fullName}
                                                        </FormLabel>
                                                    </FormItem>
                                                )}
                                            />
                                        ))}
                                    </FormItem>
                                )}
                            />
                        ) : (
                            null
                        )}
                        <Button type='submit' className='h-10 w-full'>
                            {"Применить"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default FilterDialog;