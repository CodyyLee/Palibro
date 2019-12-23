export const createSignature = (sig) => {
    return ({
        type: "SIGNATURE",
        payload: sig
    })
}