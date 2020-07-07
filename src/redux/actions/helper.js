export const saveToLocalStorage = (updates) => {
    updates.forEach(update => {
        localStorage.setItem(update.key, JSON.stringify(update.value))
    })
}

export const getItemFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key))
}
