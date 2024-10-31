// authReducer.js
const valToken = localStorage.getItem("token");
const roleValidate = localStorage.getItem("role")
const emailValidate = localStorage.getItem("email")
const DEFAULT_STATE = {
    token: valToken,
    isAuth: !!valToken,
    role: roleValidate,
    isRole: !!roleValidate,
    email: roleValidate,
    isEmail: !!roleValidate
};

export const authReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "SET_TOKEN":
            localStorage.setItem(`token`, action.token);
            return { ...state, token: action.token, isAuth: true };
        case "SET_ROLE":
            localStorage.setItem(`role`, action.role)
            return { ...state, role: action.role, isRole: true };
        case "LOGOUT":
            localStorage.removeItem("token");
            localStorage.removeItem("role")
            sessionStorage.removeItem("email")
            return { ...state, token: null, isAuth: false, isRole: false ,isEmail: false };
        default:
            return state;
    }
};
