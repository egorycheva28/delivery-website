import * as SelectPrimitive from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"

type Status = { id: string; name: string }

interface SelectStatusProps {
    selected: Status
    statuses: Status[]
    onChange: (id: string, orderId: string) => void
    orderId: string
}

export const SelectStatus = ({ selected, statuses, onChange, orderId }: SelectStatusProps) => {
    const handleChange = (id: string) => {
        onChange(id, orderId);
    };
    return (
        <SelectPrimitive.Root value={selected.id} onValueChange={handleChange}>
            <SelectPrimitive.Trigger asChild>
                <Button>
                    <SelectPrimitive.Value>{selected.name}</SelectPrimitive.Value>
                    <ChevronDownIcon className="ml-2" />
                </Button>
            </SelectPrimitive.Trigger>

            <SelectPrimitive.Portal>
                <SelectPrimitive.Content className="flex bg-white rounded-md shadow-md mt-12" align="center">
                    <SelectPrimitive.Viewport className="p-1">
                        {statuses.map(status => (
                            <SelectPrimitive.Item
                                key={status.id}
                                value={status.id}
                                className={cn(
                                    "cursor-pointer select-none py-2 px-4 hover:bg-input/50 rounded-md",
                                    status.id === selected.id
                                )}
                            >
                                <div className="flex flex-row">
                                    <SelectPrimitive.ItemText>{status.name}</SelectPrimitive.ItemText>
                                    {status.id === selected.id && <CheckIcon className="ml-auto" />}
                                </div>
                            </SelectPrimitive.Item>
                        ))}
                    </SelectPrimitive.Viewport>
                </SelectPrimitive.Content>
            </SelectPrimitive.Portal>
        </SelectPrimitive.Root>
    )
}

