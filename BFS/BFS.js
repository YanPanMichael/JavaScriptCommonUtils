// 创建 BFS 步骤
//     (1) 创建一个队列Q。
//     (2) 将v标注为被发现的（灰色），并将v入队列Q。
//     (3) 如果Q非空，则运行以下步骤：
//        (a) 将u从Q中出队列；
//        (b) 将标注u为被发现的（灰色）；
//        (c) 将u所有未被访问过的邻点（白色）入队列；
//        (d) 将u标注为已被探索的（黑色）。

var initializeColor = function () {
  //创建一个数组 保存相对应节点颜色信息
  var color = [];
  for (var i = 0; i < vertices.length; i++) {
      color[vertices[i]] = 'white'; //赋值 white 表示没有被访问过
  }
  return color;
}

this.bfs = function (v, callback) {
  var color = initializeColor(), //初始化所有节点的颜色信息是白色
      queue = new Queue(); //存储待访问和待探索的顶点
  queue.enqueue(v); //起始定点  直接入队
  while (!queue.isEmpty()) { //队列非空
      var u = queue.dequeue(), //操作队列，从中移除一个顶点
          neighbors = adjList.get(u); //取得包含所有邻点的邻接表
      color[u] = 'grey'; // 表示已经访问但未探索
      for (var i = 0; i < neighbors.length; i++) { // 对u的每个邻点
          var w = neighbors[i]; // 取值
          if (color[w] === 'white') { // 如果没有进行访问
              color[w] = 'grey'; // 标记访问
              queue.enqueue(w); // 将该顶点加入队列中
          }
      }
      color[u] = 'black'; // 已经访问并已经探索完成
      if (callback) { // 回调函数...
          callback(u);
      }
  }
}

// 给定一个图G和源顶点v，找出对每个顶点u， u和v之间最短路径的距离。对于给定顶点v，广度优先算法会访问所有与其距离为1的顶点，接着是距离为2的顶点，以此类推。
// 创建两个数组：
// 从v到u的距离d[u]；
// 前溯点pred[u]，用来推导出从v到其他每个顶点u的最短路径。
for (var i = 0; i < vertices.length; i++) { //循环遍历数组赋值
  d[vertices[i]] = 0; //用0来初始化数组d  表示距离
  pred[vertices[i]] = null; //null来初始化数组pred   存储前溯点
}
while (!queue.isEmpty()) { //队列非空
  var u = queue.dequeue(), //操作队列，从中移除一个顶点
      neighbors = adjList.get(u); //取得包含所有邻点的邻接表
  color[u] = 'grey'; // 表示已经访问但未探索
  for (var i = 0; i < neighbors.length; i++) { // 对u的每个邻点
      var w = neighbors[i]; // 取值
      if (color[w] === 'white') {
          color[w] = 'grey';
          d[w] = d[u] + 1; //给d[u]加1来设置v和w之间的距离
          pred[w] = u; //顶点u的邻点w时，则设置w的前溯点值为u
          queue.enqueue(w);
      }
  }
  color[u] = 'black';
}