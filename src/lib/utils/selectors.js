const emptyError = { status: "empty" }

export const selectError = () => (state) => { return state.error ?? emptyError }

const defaultParams = { status: "void" }

export const selectParams = () => (state) => {
    return state.params ?? defaultParams
}

const defaultSelectedDate = { status: "empty" }

export const selectSelectedDate = (inputId) => (state) => {
    return state.selectedDate.dates[inputId] ?? defaultSelectedDate
}