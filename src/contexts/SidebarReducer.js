const SidebarReducer = (state, action) => {
    switch (action.type) {
        case "SHOW_SIDEBAR":
            return ({
                ...state,
                isVisible: true,
            });
        case "HIDE_SIDEBAR":
            return ({
                ...state,
                isVisible: false,
            });
        default:
            return state;
    }
}

export default SidebarReducer;