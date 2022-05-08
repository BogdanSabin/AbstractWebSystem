import { RPCClient } from "./clients";
const msg = {
    api: 'auth',
    method: 'login', //'login',
    data: { token: 'token', usr: { email: 'email', password: 'password' } }
}
RPCClient.CoreBzlClient.sendMessage(msg, function (error, data) {
    console.log("error");
    console.log(error);
    console.log("data");
    console.log(data);
})