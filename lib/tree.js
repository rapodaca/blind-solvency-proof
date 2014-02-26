var util = require('util');

// Simple perfect binary tree implementation
// See: https://ece.uwaterloo.ca/~cmoreno/ece250/4.05.PerfectBinaryTrees.pdf
var Node = function (options) {
  this.index = options.index || 0;
  this.data = options.data || null;
  //this.parent = options.parent || null;
  //this.left = null;
  //this.right = null;
};

var Tree = function () {
  this.arr = [];
};

Tree.fromArray = function (arr) {
  var tree = new Tree();
  if (Array.isArray(arr)) {
    for (var i = 0; i < arr.length; i++) {
      tree.insert(arr[i]);
    }
  }
  return tree;
};

Tree.prototype.insert = function (element) {
  var node = new Node({
    data: element,
    index: this.arr.length
  });

  this.arr.push(node);
};

Tree.prototype.root = function () {
  return this.arr[0];
};

Tree.prototype.getDepth = function (node) {
  var n = this.arr.length;
  if (node) {
    n = node.index + 1;
  }

  //http://stackoverflow.com/questions/3019278/any-way-to-specify-the-base-of-math-log-in-javascript
  return Math.ceil((Math.log(n + 1) / Math.log(2) - 1));
};

Tree.prototype.left = function (node) {
  return this.arr[2 * node.index + 1];
};
Tree.prototype.right = function (node) {
  return this.arr[2 * node.index + 2];
};
Tree.prototype.parent = function (node) {
  return this.arr[Math.floor((node.index - 1) / 2)];
};
Tree.prototype.sibbling = function (node) {
  if (node.index % 2 === 0) {
    return this.arr[node.index - 1];
  }
  else {
    return this.arr[node.index + 1];
  }
};

function repeat(str, depth) {
  var spacing = '';
  for (var i = 0; i < depth; i++) {
    spacing += str;
  }
  return spacing;
}

Tree.prototype.prettyPrint = function (cb) {
  console.log(this.prettyPrintStr(cb));
};

Tree.prototype.prettyPrintStr = function (cb, node, spacing) {
  if (typeof cb !== 'function') {
    cb = function (node) {
      return util.inspect(node.data);
    };
  }
  if (!node) {
    node = this.root();
  }

  spacing = spacing || '';

  var str = '',
    depth = this.getDepth(node);

  spacing += ' ';
  //str += 'depth: ' + this.getDepth(node) + ' ';

  str += cb(node);
  if (this.left(node) || this.left(node)) {
    str += '\n';
    str += spacing + '|_ ';
    str += this.prettyPrintStr(cb, this.left(node), spacing + '|');
  }
  if (this.right(node)) {
    str += '\n';
    str += spacing + '|_ ';
    str += this.prettyPrintStr(cb, this.right(node), spacing + ' ');
  }

  return str;
};

// shallow copy
Tree.prototype.clone = function () {
  var clone = new Tree();
  clone.arr = this.arr.slice(0);
  return clone;
};

// Traverse nodes level by level, starting from the bottom
Tree.prototype.reverseLevelTraverse = function (cb) {
  for (var i = this.arr.length - 1; i >= 0; i--) {
    cb(this.arr[i]);
  }
};

Tree.prototype.reverseLevelSearch = function (predicate) {
  for (var i = this.arr.length - 1; i >= 0; i--) {
    if (predicate(this.arr[i])) {
      return this.arr[i];
    }
  }
  return false;
};

// Extract the path of a node from node to end (or root)
// @return array of nodes
Tree.prototype.extractPath = function (start, end) {
  if (!end) end = this.root();

  var node = start;
  var path = [ node ];

  while (node !== end && node !== this.root()) {
    node = this.parent(node);
    path.push(node);
  }

  return path;
};

// deletes every node from tree except the nodes passed as argument
Tree.prototype.slice = function (selected_nodes) {
  var new_arr = new Array(this.arr.length);
  var max_index = 0;
  for (var i = 0; i < selected_nodes.length; i++) {
    var node = selected_nodes[i];
    if (node.index > max_index) max_index = node.index;
    new_arr[node.index] = node;
  }
  // cut out end of array
  new_arr = new_arr.slice(0, max_index + 1);
  this.arr = new_arr;
  return this;
};

Tree.prototype.serialize = function () {
  return JSON.stringify(this.arr);
};

Tree.deserialize = function (str) {
  var tree = new Tree();
  tree.arr = JSON.parse(str);
  return tree;
};

module.exports = Tree;
