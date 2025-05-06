const mongoose = require('mongoose');

const validateMangoDbId = id => {
    const isVaild=  mongoose.Types.ObjectId.isValid(id);
    if (!isVaild) {
        throw new Error('Invalid MongoDb ID');
    }
}


module.exports =   validateMangoDbId ;