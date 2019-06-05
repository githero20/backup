exports.local = {
    set: function(key, value) {
        localStorage[key] = value;
        return localStorage[key];
    },
    get: function(key, defaultValue) {
        return localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
        localStorage[key] = JSON.stringify(value);
        return localStorage[key];
    },
    getObject: function(key, value) {
        return JSON.parse(localStorage[key] || '{}');
    },
    clear: function() {
        return localStorage.clear();
    },
    remove: function(key) {
        return localStorage.removeItem(key);
    }
};

exports.session = {
    set: function(key, value) {
        sessionStorage[key] = value;
        return sessionStorage[key];
    },
    get: function(key, defaultValue) {
        return sessionStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
        sessionStorage[key] = JSON.stringify(value);
        return sessionStorage[key];
    },
    getObject: function(key, value) {
        return JSON.parse(sessionStorage[key] || '{}');
    },
    clear: function() {
        return sessionStorage.clear();
    },
    remove: function(key) {
        return sessionStorage.removeItem(key);
    }
};