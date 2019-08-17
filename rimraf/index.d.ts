/// <reference types="node" />

import glob = require('glob');
import fs = require('fs');

declare function rimraf(path: string, options?: rimraf.Options): Promise<void>;
declare namespace rimraf {
    function sync(path: string, options?: Options): void;
    let EMFILE_MAX: number;
    let BUSYTRIES_MAX: number;
    interface Options {
        maxBusyTries?: number;
        emfileWait?: boolean;
        disableGlob?: boolean;
        glob?: glob.IOptions | false;

        unlink?: typeof fs.unlink;
        chmod?: typeof fs.chmod;
        stat?: typeof fs.stat;
        lstat?: typeof fs.lstat;
        rmdir?: typeof fs.rmdir;
        readdir?: typeof fs.readdir;

        unlinkSync?: typeof fs.unlinkSync;
        chmodSync?: typeof fs.chmodSync;
        statSync?: typeof fs.statSync;
        lstatSync?: typeof fs.lstatSync;
        rmdirSync?: typeof fs.rmdirSync;
        readdirSync?: typeof fs.readdirSync;
    }
}
export = rimraf;
