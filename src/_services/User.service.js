import Axios from "./Axios";

// Service Users
let getUser = () => {
    return Axios.get(`/api/user`)
}

let SignUp = (data) => {
    return Axios.post("/api/register", data);
}

let SignIn = (data) => {
    return Axios.post("/api/login", data);
}

let SignOut = (credential) => {
    return Axios.post("/api/logout",credential);
}
export const UserService = {
    getUser, SignUp, SignIn, SignOut
}