"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const p_limit_1 = require("p-limit");
exports.default = async (concurrency, groups) => {
    const limitRun = p_limit_1.default(concurrency);
    for (const tasks of groups) {
        await Promise.all(tasks.map((task) => limitRun(task)));
    }
};
//# sourceMappingURL=index.js.map