// 只读属性不能直接创建, 但我们可以通过Object.defineProperty() 或 Object.freeze()设置.

"use strict";
var obj = Object.freeze({name: "Elsa", score: 157});
obj.score = 0;  // TypeError

"use strict";
Object.defineProperty(this, "LUNG_COUNT", {value: 2, writable: false});
LUNG_COUNT = 3;  // TypeError

"use strict";
var frozenArray = Object.freeze([0, 1, 2]);
frozenArray[0]++;  // TypeError

"use strict";
Math.PI = 4;  // TypeError