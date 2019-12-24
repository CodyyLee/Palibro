export const addOccurance = (target, role) => {
    return({
        type: "ADD_OCCURANCE",
        role: role,
        total: target
    })
}