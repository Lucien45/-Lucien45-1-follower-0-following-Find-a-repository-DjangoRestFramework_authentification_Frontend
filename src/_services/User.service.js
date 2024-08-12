import Axios_Auth from "./Axios_Auth";

// Service Users
let getUser = () => {
    return Axios_Auth.get(`/api/user`)
}

let SignUp = (data) => {
    return Axios_Auth.post("/api/register", data);
}

let SignIn = (data) => {
    return Axios_Auth.post("/api/login", data);
}

let SignOut = (credential) => {
    return Axios_Auth.post("/api/logout",credential);
}
export const UserService = {
    getUser, SignUp, SignIn, SignOut
}