'use strict';

class ResponseFactory {

	constructor() { }

	defaultResponseObject() {
        return {
            success: null,
            code:    null,
            message: null,
            data:    null
        };
    };

    fail(code, errorMessage = null){
        var responseObject = this.defaultResponseObject();

        responseObject.success = false;
        responseObject.code    = code;
        responseObject.message = errorMessage;

        return responseObject;
    };

    success(responseData = null){
        var responseObject = this.defaultResponseObject();

        responseObject.success = true;
        responseObject.code    = 1;
        responseObject.data    = responseData;

        // Because of the given especification, I'm leaving only the 'data' part of the response
        return responseObject.data;
    };
}

export default ResponseFactory;