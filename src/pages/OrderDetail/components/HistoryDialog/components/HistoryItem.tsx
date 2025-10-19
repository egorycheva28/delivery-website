interface HistoryItemProps {
    status: Status;
    order: Order;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ status, order }) => {
    return (
        <div className="flex flex-col gap-1">
            <span className={`font-medium ${status.name == order.status ? 'text-green-600' : 'text-black'}`}>{status.name}</span>
            <span className={`${status.name == order.status ? 'text-green-600' : 'text-black'}`}>Дата</span>
        </div>
    )
}

export default HistoryItem;