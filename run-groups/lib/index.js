"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pLimit = require("p-limit");
exports.default = async (concurrency, groups) => {
    const limitRun = pLimit(concurrency);
    for (const tasks of groups) {
        await Promise.all(tasks.map((task) => limitRun(task)));
    }
};
//# sourceMappingURL=index.js.map