

exports.isValid = function(data){
    
    if(data === undefined || data === 'undefined' || data == undefined){
        return false;
    }
 
    if(data === null || data === 'null' || data == null){
        return false;
    }
    
    if(data.length <= 0){
        return false;
    }
 
    return true;
}
 
 