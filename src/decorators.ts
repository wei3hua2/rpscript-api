import R from 'ramda';
import { RpsContext } from '.';

export function emitter (evt:string, mod:string) : Function{
    return function(target: Object, key: string, descriptor: TypedPropertyDescriptor<Function>) {
        const originalMethod = descriptor.value;

        descriptor.value = async function(ctx:RpsContext, opts:Object,  ... args: any[]) {
            ctx.event.emit(evt, mod, key, 'start', args);
            
            const result = await originalMethod.apply(target, R.concat([ctx,opts] , args));

            ctx.event.emit(evt, mod, key, 'end', result);
            
            return result;
        }
        return descriptor;
    }
}
