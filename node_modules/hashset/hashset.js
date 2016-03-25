var hash = require('string-hash');

module.exports = function HashSet() {
    if (!(this instanceof HashSet)) {
        var hashset = new HashSet();
        for (var i = 0; i < arguments.length; ++i)
            hashset.add(arguments[i]);

        return hashset;
    }

    var length = 0;
    var map = Object.create(null);

    // defines the length property as read-only
    Object.defineProperty(this, 'length', {
        get: function() {
            return length;
        }
    });

    [].forEach.call(arguments, function(v) {
        add(v);
    });

    // exporting public methods
    this.contains = contains;
    this.equals = equals;
    this.add = add;
    this.remove = remove;
    this.toArray = toArray;
    this.isSubSetOf = isSubSetOf;
    this.isSuperSetOf = isSuperSetOf;
    this.unionWith = unionWith;
    this.intersectWith = intersectWith;

    // helper functions
    function contains(val) {
        var type = toString.call(val);
        if (map[type] === undefined)
            return false;

        var key = hash('' + val);
        if (map[type][key] === undefined)
            return false;

        var arr = map[type][key];
        for (var i = 0; i < arr.length; ++i) {
            if (arr[i] === val) return true;
        }

        return false;
    }

    function add(val) {
        var type = toString.call(val);
        if (map[type] === undefined) {
            map[type] = Object.create(null);
        }

        var key = hash('' + val);
        if (map[type][key] === undefined) {
            map[type][key] = [val];
            length++;
            return true;
        } else {
            var i = 0;
            var pos = -1;
            var arr = map[type][key];
            for (; i < arr.length; ++i) {
                if (arr[i] === val)
                    return false;

                if (arr[i] === undefined)
                    pos = i;
            }

            if (pos >= 0)
                arr[pos] = val;
            else
                arr.push(val);
            
            length++;
            return true;
        }
    }

    function remove(val) {
        var type = toString.call(val);
        if (map[type] === undefined)
            return false;

        var key = hash('' + val);
        if (map[type][key] === undefined)
            return false;

        var arr = map[type][key];
        for (var i = 0; i < arr.length; ++i) {
            if (arr[i] === val) {
                arr[i] = undefined;
                length--;
                return true;
            }
        }

        return false;
    }

    function toArray() {
        var subkeys;
        var values = [];
        var keys = Object.keys(map);

        keys.forEach(function(key) {
            subkeys = Object.keys(map[key]);
            subkeys.forEach(function(subkey) {
                var arr = map[key][subkey];
                for (var i = 0; i < arr.length; ++i) {
                    values.push(arr[i]);
                }
            });
        });

        return values;
    }

    function isSubSetOf(hashset) {
        if (length < 1)
            return true;

        if (hashset.length < 1)
            return false;

        var values = toArray();
        for (var i in values) {
            if (!hashset.contains(values[i]))
                return false;
        }

        return true;
    }

    function isSuperSetOf(hashset) {
        if (hashset.length === 0)
            return true;

        if (this.length < hashset.length)
            return false;

        var values = hashset.toArray();
        for (var i in values) {
            if (!contains(values[i]))
                return false;
        }

        return true;
    }

    function unionWith(hashset) {
        var values = hashset.toArray();
        values.forEach(function(v) {
            add(v);
        });
    }

    function equals(hashset) {
        if (length !== hashset.length)
            return false;

        var values = hashset.toArray();
        for (var i in values) {
            if (!contains(values[i]))
                return false;
        }

        return true;
    }

    function intersectWith(hashset) {
        if (length === 0) return;

        var values = toArray();
        for (var i = 0; i < values.length; ++i) {
            if (!hashset.contains(values[i]))
                remove(values[i]);
        }
    }
}