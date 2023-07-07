import axios from "axios";

function setHeader(token) {
    if (token) {
        axios.defaults.headers.common["Authorization"] = token;
        axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    } else {
        axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
        delete axios.defaults.headers.common["Authorization"];
    }
}
export default setHeader;