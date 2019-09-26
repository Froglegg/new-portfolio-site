let hbsHelpers = { 
    inc: function(value, options) {
        console.log('reading it');
        return parseInt(value) + 1;
    },
    toJSON: function(object) {
        return JSON.stringify(object);
    }
}

module.exports = hbsHelpers;