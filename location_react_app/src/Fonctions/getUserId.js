import { Buffer } from "buffer";

export default function getUserId(){
    let token = sessionStorage.getItem("token");
    return parseInt(JSON.parse(Buffer.from(token.split('.')[1], 'base64')).userId);
}