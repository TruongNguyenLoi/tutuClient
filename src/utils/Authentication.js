class Authentication {

    // eslint-disable-next-line
    constructor() {
        
    }

    isAuthentication() {
        const token = localStorage.getItem('token');
        return token;
    }

}

const authentication = new Authentication();
export { authentication };
