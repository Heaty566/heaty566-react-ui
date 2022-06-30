import _get from 'lodash.get';

export const getObjectWithDefault = <T>(context: any, defaultValues: T) => {
    return Object.keys(defaultValues).reduce<T>((pre, cur) => {
        pre[cur as keyof T] = _get(context, cur, defaultValues[cur as keyof T]);
        return pre;
    }, {} as T);
};
