const merge = require("./merge.js")
const checkInterval1 = [
    {
    sequence: 1,
    start: 10,
    end: 1,
    action: 'ADDED'
    },
]

const checkInterval2 = [
    {
    sequence: 1,
    start: "1",
    end: 20,
    action: 'ADDED'
    },
]

const testAdd1 = [
    {
    sequence: 1,
    start: 1,
    end: 20,
    action: 'ADDED'
    },
    {
    sequence: 2,
    start: 55,
    end: 58,
    action: 'ADDED'
    },
    {
    sequence: 3,
    start: 60,
    end: 89,
    action: 'ADDED'
    },
]

const testAdd2 = [
    {
    sequence: 1,
    start: 1,
    end: 20,
    action: 'ADDED'
    },
    {
    sequence: 2,
    start: 0,
    end: 100,
    action: 'ADDED'
    },
]

const testRemove1 = [
    {
    sequence: 1,
    start: 1,
    end: 20,
    action: 'ADDED'
    },
    {
    sequence: 2,
    start: 55,
    end: 58,
    action: 'ADDED'
    },
    {
    sequence: 3,
    start: 60,
    end: 89,
    action: 'ADDED'
    },
    {
    sequence: 4,
    start: 15,
    end: 31,
    action: 'ADDED'
    },
    {
    sequence: 5,
    start: 10,
    end: 15,
    action: 'ADDED'
    },
    {
    sequence: 6,
    start: 1,
    end: 20,
    action: 'REMOVED'
    },
]

const testRemove2 = [
    {
    sequence: 1,
    start: 1,
    end: 20,
    action: 'ADDED'
    },
    {
    sequence: 2,
    start: 55,
    end: 58,
    action: 'ADDED'
    },
    {
    sequence: 3,
    start: 60,
    end: 89,
    action: 'ADDED'
    },
    {
    sequence: 4,
    start: 15,
    end: 31,
    action: 'ADDED'
    },
    {
    sequence: 5,
    start: 60,
    end: 89,
    action: 'REMOVED'
    },
]

const testRemove3 = [
    {
    sequence: 1,
    start: 1,
    end: 20,
    action: 'REMOVED'
    },
]

const testDelete1 = [
    {
    sequence: 1,
    start: 1,
    end: 20,
    action: 'ADDED'
    },
    {
    sequence: 2,
    start: 55,
    end: 58,
    action: 'ADDED'
    },
    {
    sequence: 3,
    start: 60,
    end: 89,
    action: 'ADDED'
    },
    {
    sequence: 4,
    start: 15,
    end: 31,
    action: 'ADDED'
    },
    {
    sequence: 5,
    start: 10,
    end: 15,
    action: 'ADDED'
    },
    {
    sequence: 6,
    start: 1,
    end: 20,
    action: 'REMOVED'
    },
    {
    sequence: 7,
    start: 11,
    end: 30,
    action: 'DELETED'
    }
]

const testDelete2 = [
    {
    sequence: 1,
    start: 1,
    end: 20,
    action: 'DELETED'
    },
]


describe("merge suite", function() {
  test("Should raise an error if distance is not a positive number", function() {
    expect(() => merge(testAdd1, -1)).toThrowError("Distance must be a positive number");
  });

  test("Should raise an error if end is smaller than start", function() {
    expect(() => merge(checkInterval1, 7)).toThrowError("End must be greater than start");
  });

  test("Should raise an error if start or end is not a number", function() {
    expect(() => merge(checkInterval2, 7)).toThrowError("Start and end must be numbers");
  });
  
  test("Should add an interval without overlap", function() {
    expect(merge(testAdd1, 7)).toStrictEqual([ [ 1, 20 ], [ 55, 89 ] ]);
  });

  test("Should add an interval with overlap", function() {
    expect(merge(testAdd2, 7)).toStrictEqual([ [ 0, 100 ] ]);
  });

  test("Should remove interval and output a new interval combo", function() {
    expect(merge(testRemove1, 7)).toStrictEqual([ [ 10, 31 ], [ 55, 89 ] ]);
  });

  test("Should remove interval and return output", function() {
    expect(merge(testRemove2, 7)).toStrictEqual([ [ 1, 31 ], [ 55, 58 ] ]);
  });

  test("Should return empty array if the first action is REMOVED", function() {
    expect(merge(testRemove3, 7)).toStrictEqual([]);
  });

  test("Should delete interval and return output", function() {
    expect(merge(testDelete1, 7)).toStrictEqual([ [ 10, 11 ], [ 30, 31 ], [ 55, 89 ] ]);
  });

  test("Should return empty array if the first action is DELETED", function() {
    expect(merge(testDelete2, 7)).toStrictEqual([]);
  });

});
