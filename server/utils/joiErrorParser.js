function parseJOIErrors(errObj){
    return errObj.details.map((e)=>e.message).join(", ").replaceAll('"', "'");
}

module.exports = parseJOIErrors;