import { Buffer } from "buffer";

export default function getUserId(){
    let token = sessionStorage.getItem("token");
    if(token===null) return null;
    return parseInt(JSON.parse(Buffer.from(token.split('.')[1], 'base64')).userId);
}