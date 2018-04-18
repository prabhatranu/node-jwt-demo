
 

 
   
    exports.getSuccess= (data)=>{
        return {
            status:200,
            result:data,
            message:'Ok'
        }
    }
 
 
    /**
     * If resource is created.
     * 
     * @param {any} data - It is any value to send as response.
     * @return {object} {status=201,result=data,message='Created'}
     */
    exports.getCreated=(data)=>{
        return{
            status:201,
            result:data,
            message:'Created'
        }
    }
 
 
    /**
     * If any Error is occurred during processng request.
     * 
     * @param {any} data - It is any value to send as response.
     * @return {object} {status=500,result=data,message='Error'}
     */
    exports.getError=(data)=>{
        return {
            status:500,
            result:data,
            message:'Error'
        }
    }
 
 
    /**
     * If request is invalid or request data is invalid.
     * 
     * @param {string} msg - It is string value to send as response message.
     * @return {object} {status=400,result="Bad Request",message='Bad Request'}
     */
    exports.getInvalidRequest=(msg)=>{
        return {
            status:400,
            result:"Bad Request",
            message:msg
        }
    }


    /**
     * If any Error is occurred during processng request.
     * 
     * @param {any} data - It is any value to send as response.
     * @return {object} {status=500,result=data,message='Error'}
     */
    exports.getDeleted=(data)=>{
        return {
            status:202,
            result:data,
            message:'Deleted successfully'
        }
    }