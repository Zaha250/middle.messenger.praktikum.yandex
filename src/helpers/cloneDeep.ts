export default function cloneDeep<T>(instance : T) : T {
    if ( instance == null){
        return instance;
    }

    // Dates
    if (instance instanceof Date) {
        return new Date(instance.getTime()) as any;
    }

    // Array
    if (instance instanceof Array){
        let cloneArr = [] as any[];
        (instance as any[]).forEach((value)  => {cloneArr.push(value)});
        return cloneArr.map((value: any) => cloneDeep<any>(value)) as any;
    }
    // Objects
    if (instance instanceof Object) {
        let copyInstance = { ...(instance as { [key: string]: any }) } as { [key: string]: any };
        for (let attr in instance) {
            if ( (instance as Object).hasOwnProperty(attr))
                copyInstance[attr] = cloneDeep<any>(instance[attr]);
        }
        return copyInstance as T;
    }
    return instance;
}