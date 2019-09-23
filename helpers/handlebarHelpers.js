function hbsHelpers(hbs) {
    return hbs.create({
        defaultLayout: 'main',
        helpers: { // This was missing
            inc: function(value, options) {
                console.log('reading it');
                return parseInt(value) + 1;
            },
            toJSON: function(object) {
                return JSON.stringify(object);
            }
        }
    });
}

module.exports = hbsHelpers;