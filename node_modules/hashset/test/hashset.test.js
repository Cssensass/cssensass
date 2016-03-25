var assert = require('assert');
var HashSet = require('../hashset.js');

describe('constructor', function() {
    it('should initialze an array as a single value.', function() {
        var arr = [1, 2, 3, 4];
        var hashset = new HashSet(arr);
        assert.strictEqual(hashset.length, 1);
        assert.strictEqual(hashset.contains(arr), true);
    });

    it('should also instantiate an new instance even new operation is omitted', function() {
        var hashset = HashSet(1, 2, 3);
        assert.strictEqual(hashset instanceof HashSet, true);
        assert.strictEqual(hashset.length, 3);
    });
});

describe('#contains', function() {
    it('should return false if element is not added yet.', function() {
        var hashset = new HashSet();
        assert.strictEqual(hashset.contains('a'), false);
    });

    it('should return true if element is added.', function() {
        var hashset = new HashSet('a');
        assert.strictEqual(hashset.contains('a'), true);

        hashset = new HashSet();
        hashset.add('a');
        assert.strictEqual(hashset.contains('a'), true);

        hashset = new HashSet(1, 2, 3);
        assert.strictEqual(hashset.contains(2), true);
    });

    it('should differentiate string and number', function() {
        var hashset = new HashSet(1);
        hashset.add('1');
        assert.strictEqual(hashset.contains(1), true);
        assert.strictEqual(hashset.contains('1'), true);
        var hashset = new HashSet(1, '1', [1]);
        assert.strictEqual(hashset.length, 3);
    });

    it('should compare reference types', function() {
        var arr = [1, 2, 3, 4];
        var hashset = new HashSet();
        hashset.add(arr);
        assert.strictEqual(hashset.contains(arr), true);
    });
});

describe('#add', function() {
    it('should has length 2 when adding 2 objects', function() {
        var a = [];
        var b = [];
        var hashset = new HashSet();
        hashset.add(a);
        hashset.add(b);
        assert.strictEqual(hashset.length, 2);
        assert.strictEqual(hashset.contains(a), true);
        assert.strictEqual(hashset.contains(b), true);
    });

    it('should return true if successfully added an element', function() {
        var hashset = new HashSet();
        assert.strictEqual(hashset.add(1), true);
        assert.strictEqual(hashset.add('abc'), true);
    });

    it('should return false if failed to add an element', function() {
        var hashset = new HashSet(1);
        assert.strictEqual(hashset.add(1), false);
    });
});

describe('#remove', function() {
    it('should not throw error when removing an no-existing element.', function() {
        var hashset = new HashSet();
        assert.doesNotThrow(function() {
            hashset.remove('a');
        });
    });

    it('should return true if successfully removed an element', function() {
        var hashset = new HashSet(1, 2, 3);
        assert.strictEqual(hashset.remove(1), true);
        assert.strictEqual(hashset.remove(2), true);
    });

    it('should return false if failed to remove and element', function() {
        var hashset = new HashSet(1, 2, 3);
        assert.strictEqual(hashset.remove(4), false);
        var obj1 = {};
        var obj2 = {};
        hashset = new HashSet(obj1);
        assert.strictEqual(hashset.remove(obj2), false);
    });
});

describe('#toArray', function() {
    it('should export all values to an array', function() {
        var hashset = new HashSet(1, 2, 3);
        assert.strictEqual(hashset.toArray().length, 3);
        var obj1 = [1];
        var obj2 = {};
        hashset = new HashSet(1, '1', obj1, obj2);
        var arr = hashset.toArray();
        assert.strictEqual(arr.length, 4);
        assert.strictEqual(arr[0], 1);
        assert.strictEqual(arr[1], '1');
        assert.strictEqual(arr[2], obj1);
        assert.strictEqual(arr[3], obj2);
    });
});

describe('#length', function() {
    it('should be readonly property', function() {
        var hashset = new HashSet(1, 2, 3);
        assert.strictEqual(hashset.length, 3);
        hashset.length = 100;
        assert.strictEqual(hashset.length, 3);
    });
});

describe('#isSubSetOf', function() {
    it('should return true if left side is an empty hashset', function() {
        var hashset1 = new HashSet();
        var hashset2 = new HashSet();
        var result = hashset1.isSubSetOf(hashset2);
        assert.strictEqual(result, true);

        hashset2.add(4, 5);
        result = hashset1.isSubSetOf(hashset2);
        assert.strictEqual(result, true);
    });

    it('should return false if right side is empty hashset and left side not', function() {
        var hashset1 = new HashSet(1);
        var hashset2 = new HashSet();
        var result = hashset1.isSubSetOf(hashset2);
        assert.strictEqual(result, false);
    });

    it('should return false if right side has value not existing in lef side', function() {
        var hashset1 = new HashSet(1, 2, 3);
        var hashset2 = new HashSet(1, 2, 4);
        var result = hashset1.isSubSetOf(hashset2);
        assert.strictEqual(result, false);
    });
});

describe('#isSuperSetOf', function() {
    it('should return true if right side is an empty hashset', function() {
        var hashset1 = new HashSet();
        var hashset2 = new HashSet();
        var result = hashset1.isSuperSetOf(hashset2);
        assert.strictEqual(result, true);

        hashset1.add(2);
        result = hashset1.isSuperSetOf(hashset2);
        assert.strictEqual(result, true);
    });

    it('should return true if left side and right side are identical', function() {
        var hashset1 = new HashSet(1, 2, 3);
        var hashset2 = new HashSet(1, 2, 3);
        var result1 = hashset1.isSuperSetOf(hashset2);
        var result2 = hashset2.isSuperSetOf(hashset1);

        assert.strictEqual(result1, true);
        assert.strictEqual(result2, true);
    });

    it('should return true if left side contains all elements from right side', function() {
        var hashset1 = new HashSet(1, 2, 3);
        var hashset2 = new HashSet(2, 3);
        var result1 = hashset1.isSuperSetOf(hashset2);
        var result2 = hashset2.isSuperSetOf(hashset1);

        assert.strictEqual(result1, true);
        assert.strictEqual(result2, false);
    });

    it('should return false if right side hash set has value not existing in left side', function() {
        var hashset1 = new HashSet(1, 2, 3);
        var hashset2 = new HashSet(2, 3, 4);
        var result = hashset1.isSuperSetOf(hashset2);
        assert.strictEqual(result, false);
    });
});

describe('#equals', function() {
    it('should return true when testing 2 empty hash sets', function() {
        var hashset1 = new HashSet();
        var hashset2 = new HashSet();
        var result = hashset1.equals(hashset2);
        result = result && hashset2.equals(hashset1);
        assert.strictEqual(result, true);
    });

    it('should return false when lengths of 2 hash sets do not match', function() {
        var hashset1 = new HashSet();
        var hashset2 = new HashSet(1);
        var result = hashset1.equals(hashset2);
        assert.strictEqual(result, false);
    });

    it('should return true if 2 hash sets have identical values', function() {
        var hashset1 = new HashSet(1, 2, 3, 4, 5);
        var hashset2 = new HashSet(1, 2, 3, 4, 5);
        var result = hashset1.equals(hashset2);
        assert.strictEqual(result, true);
        result = hashset2.equals(hashset1);
        assert.strictEqual(result, true);
    });

    it('should return false if 2 hash set have different values', function() {
        var hashset1 = new HashSet(1, 2, 6, 4, 5);
        var hashset2 = new HashSet(1, 2, 3, 4, 5);
        var result = hashset1.equals(hashset2);
        assert.strictEqual(result, false);
        result = hashset2.equals(hashset1);
        assert.strictEqual(result, false);
    });
});

describe('#unionWith', function() {
    it('should remain unchanged when union with an empty hash set', function() {
        var hashset1 = new HashSet(1, 2, 3);
        var hashset2 = new HashSet();
        hashset1.unionWith(hashset2);
        assert.strictEqual(hashset1.length, 3);
    });

    it('should merge 2 hash sets', function() {
        var hashset1 = new HashSet(1, 2);
        var hashset2 = new HashSet(2, 3);
        hashset1.unionWith(hashset2);
        assert.strictEqual(hashset1.length, 3);
        assert.strictEqual(hashset1.contains(1), true);
        assert.strictEqual(hashset1.contains(2), true);
        assert.strictEqual(hashset1.contains(3), true);
    });

    it('should merge 2 objects even they have same literal value', function() {
        var obj1 = {};
        var obj2 = {};
        var hashset1 = new HashSet(obj1);
        var hashset2 = new HashSet(obj2);
        hashset1.unionWith(hashset2);
        assert.strictEqual(hashset1.length, 2);
        assert.strictEqual(hashset1.contains(obj1), true);
        assert.strictEqual(hashset1.contains(obj2), true);
    });
});

describe('#intersectWith', function() {
    it('should remain an empty when an empty hashset intersecting with another.', function() {
        var hashset1 = new HashSet();
        var hashset2 = new HashSet();
        var hashset3 = new HashSet(1, 2, 3);
        hashset1.intersectWith(hashset2);
        assert.strictEqual(hashset1.length, 0);
        hashset1.intersectWith(hashset3);
        assert.strictEqual(hashset1.length, 0);
    });

    it('should update the hash set to intersection of both', function() {
        var hashset1 = new HashSet(1, 2, 3);
        var hashset2 = new HashSet(2, 3, 4);
        hashset1.intersectWith(hashset2);
        assert.strictEqual(hashset1.length, 2);
        assert.strictEqual(hashset1.contains(2), true);
        assert.strictEqual(hashset1.contains(3), true);
    });

    it('should exclude differnt reference values even they have same literal value', function() {
        var obj1 = {};
        var obj2 = {};
        var hashset1 = new HashSet(obj1);
        var hashset2 = new HashSet(obj2);
        hashset1.intersectWith(hashset2);
        assert.strictEqual(hashset1.length, 0);
    });
});