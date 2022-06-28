export const addAllOptionSelection = (arr: { label: string; value: any }[]) => {
    return [{ label: 'Tất cả', value: '' }, ...arr];
};
