import {Cookies} from "react-cookie";
import {JWT_TOKEN_NAME} from "../app-constant/constant";

class BaseService {

    commonHeader = () => {
        const cookies = new Cookies();
        return {
            'Authorization' : 'Bearer ' + cookies.get(JWT_TOKEN_NAME)
        }
    }

}

export default BaseService;