/*
// returns deep copy like here: https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy
*/
export function clonedObject<Type>(object: Type | null): Type | null {
    if(object === null) return null
    return JSON.parse(JSON.stringify(object))
}