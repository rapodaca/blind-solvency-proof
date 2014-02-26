describe("bsolp", function() {
  var bsolp;
  beforeEach(function() {
    bsolp = require('bsolp');
  });
  describe("#generate_private_tree", function() {
    it("returns a tree with a root node given no accounts", function() {
      var accounts = [ ];
      var tree = bsolp.generatePrivateTree(accounts);

      expect(tree.arr).toEqual([
        {
          index: 0,
          data: { amount: 0, hash: 'dummy', value: undefined }
        }
      ]);
    });
    it("returns a Tree with single node given one account", function() {
      var accounts = [
        { user: 'satoshi', balance: 100 }
      ];
      var tree = bsolp.generatePrivateTree(accounts);

      expect(tree.arr).toEqual([
        {
          index: 0,
          data: { hash: 'satoshi', value: 100 }
        }
      ]);
    });
    it("returns a Tree with five nodes given two accounts", function() {
      var accounts = [
        { user: 'satoshi', balance: 100 },
        { user: 'bernanke', balance: 1000 }
      ];
      var tree = bsolp.generatePrivateTree(accounts);

      expect(JSON.parse(tree.serialize())).toEqual([
        { index : 0, data : { value : null, hash : 'MK5kTtAIJfzTBxnQd+iwMF+xinroegbHrBcVavPOP+c=' } },
        { index : 1, data : { value : null, hash : 'C81Jx0pzidKwj/kVEcL6B+0wyUD4qMsZLNhgzmARUk4=' } },
        { index : 2, data : { hash : 'satoshi', value : 100 } },
        { index : 3, data : { hash : 'bernanke', value : 1000 } },
        { index : 4, data : { amount : 0, hash : 'dummy' } }
      ]);
    });
    it("returns a Tree with five nodes given three accounts", function() {
      var accounts = [
        { user: 'satoshi', balance: 100 },
        { user: 'bernanke', balance: 1000 },
        { user: 'gmaxwell', balance: 10 }
      ];
      var tree = bsolp.generatePrivateTree(accounts);

      expect(JSON.parse(tree.serialize())).toEqual([
        { index : 0, data : { value : 1110, hash : 'Nsv9h1L8LS33eFOG+wPnQLBznnufOhVg6HjZ9gQuU+w=' } },
        { index : 1, data : { value : 1010, hash : 'XzyPPOvHnJ37uFaEGaqMqwonpzBTPqg9EP1C8JvRPcI=' } },
        { index : 2, data : { hash : 'satoshi', value : 100 } },
        { index : 3, data : { hash : 'bernanke', value : 1000 } },
        { index : 4, data : { hash : 'gmaxwell', value : 10 } }
      ]);
    });
  });
});