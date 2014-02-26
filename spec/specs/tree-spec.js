describe("Tree", function() {
  var Tree;
  var tree;
  beforeEach(function() {
    Tree = require('tree');
    tree = new Tree();
  });
  describe("#insert", function() {
    it("adds first Node to array", function() {
      tree.insert('first');

      expect(tree.arr).toEqual([
        { index: 0, data: 'first' }
      ]);
    });
    it("adds second Node to array", function() {
      tree.insert('first');
      tree.insert('second');

      expect(tree.arr).toEqual([
        { index: 0, data: 'first' },
        { index: 1, data: 'second' }
      ]);
    });
  });
  describe("#root", function() {
    it("returns undefined by default", function() {
      expect(tree.root()).toBeUndefined();
    });
    it("returns Node given one is present", function() {
      tree.insert('data');

      expect(tree.root().data).toEqual('data');
    });
  });
  describe("#getDepth", function() {
    it("returns -1 given no argument and no nodes", function() {
      expect(tree.getDepth()).toEqual(-1);
    });
    it("returns 0 given root", function() {
      tree.insert('first');

      expect(tree.getDepth(tree.root())).toEqual(0);
    });
    it("returns 1 given second node", function() {
      tree.insert('first');
      tree.insert('second');

      expect(tree.getDepth(tree.arr[1])).toEqual(1);
    });
  });
});