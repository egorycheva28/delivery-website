import React from "react";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Plus} from "lucide-react";

interface PaymentMethodProps {
    cardOrCashIcon: React.ReactNode,
    onlineOrOfflineIcon: React.ReactNode,
    title: string
}

const PaymentMethod = ({ cardOrCashIcon, onlineOrOfflineIcon, title }: PaymentMethodProps) => (
    <Card className="w-[300px]">
        <CardContent>
            <div className="flex items-center justify-center gap-2 mb-4">
                {cardOrCashIcon}
                <Plus className="w-6 h-6" />
                {onlineOrOfflineIcon}
            </div>
            <p className="text-center">{title}</p>
        </CardContent>
    </Card>
)

export default PaymentMethod