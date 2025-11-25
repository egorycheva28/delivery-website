export const getSortingForRequest = (sorting: string): string[] => {
    switch (sorting) {
        case 'priceAsk':
            return ['price', 'asc']
        case 'priceDes':
            return ['price', 'desc']
        case 'ratingAsk':
            return ['rate', 'asc']
        case 'ratingDes':
            return ['rate', 'desc']
        default:
            return ['price', 'asc']
    }
}