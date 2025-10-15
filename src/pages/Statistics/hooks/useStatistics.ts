import {useMemo, useState} from "react";
import {useDebounceCallback} from "@/utils/hooks/useDebounceCallback/useDebounceCallback.ts";
import {Scale, type TooltipItem} from "chart.js";
import {useSearchParams} from "react-router-dom";

const SEARCH_TIMEOUT = 500;
const ITEMS_PER_PAGE = 20;
export const useStatistics = () => {
    //После подключения запроса удалить
    const generateOperators = (count: number) => {
        const surnames = ['Иванов', 'Петров', 'Сидоров', 'Козлов', 'Федоров', 'Николаев', 'Павлов'];
        const names = ['Иван', 'Петр', 'Алексей', 'Дмитрий', 'Сергей', 'Андрей', 'Михаил'];

        return Array.from({ length: count }, (_, i) => ({
            id: i + 1,
            name: `${surnames[i % surnames.length]} ${names[i % names.length]}`,
            orderCount: Math.floor(Math.random() * 500) + 10
        }));
    };
    const data = generateOperators(1000)

    const [searchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState('');
    const [goToStart, setGoToStart] = useState(false);

    const debouncedSearchByName = useDebounceCallback((name: string) => {
        setSearchTerm(name);
        setGoToStart(prev => !prev)
    }, SEARCH_TIMEOUT);

    const processedData = useMemo(() => {
        let filtered = data;

        if (searchTerm) {
            filtered = data.filter(operator =>
                operator.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return filtered.sort((a, b) => b.orderCount - a.orderCount);
    }, [data, searchTerm]);

    const displayedData = useMemo(() => {
        const currentPage = parseInt(searchParams.get('page') || "1") - 1;
        const startItem = ITEMS_PER_PAGE * currentPage;
        return processedData.slice(startItem, startItem + ITEMS_PER_PAGE)
    }, [processedData, searchParams]);

    const totalPage = useMemo(() => {
        return Math.ceil(processedData.length / ITEMS_PER_PAGE);
    }, [processedData]);

    const options = {
        indexAxis: 'y' as const,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function(context: TooltipItem<'bar'>) {
                        return `${context.parsed.x} заказов`;
                    }
                }
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                },
                ticks: {
                    color: '#6B7280',
                },
                title: {
                    display: true,
                    text: 'Количество заказов',
                    color: '#374151',
                }
            },
            y: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#374151',
                    font: {
                        size: 12,
                        weight: 'normal' as const
                    },
                    callback: function(this: Scale, value: string | number) {
                        const label = this.getLabelForValue(typeof value === 'number' ? value : parseFloat(value));
                        return label.length > 25 ? label.substring(0, 25) + '...' : label;
                    }
                },
            }
        }
    };

    const chartData = {
        labels: displayedData.map(operator => operator.name),
        datasets: [
            {
                label: 'Заказы',
                data: displayedData.map(operator => operator.orderCount),
                backgroundColor: displayedData.map((_operator, index) => {
                    if (index < 3 && !searchParams.get('page')) return 'rgba(16, 185, 129, 0.8)';
                    if (index < 10 && !searchParams.get('page')) return 'rgba(59, 130, 246, 0.8)';
                    return 'rgba(156, 163, 175, 0.7)';
                }),
                borderColor: displayedData.map((_operator, index) => {
                    if (index < 3 && !searchParams.get('page')) return 'rgb(16, 185, 129)';
                    if (index < 10 && !searchParams.get('page')) return 'rgb(59, 130, 246)';
                    return 'rgb(156, 163, 175)';
                }),
                borderWidth: 1,
                borderRadius: 4,
                borderSkipped: false,
                barThickness: 20
            },
        ],
    };

    return {
        state: { options, chartData, displayedData, processedData, totalPage, goToStart },
        functions: { debouncedSearchByName }
    }
}