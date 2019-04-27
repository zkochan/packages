declare namespace writeJson5File {
	type Replacer = (this: unknown, key: string, value: any) => unknown;
	type SortKeys = (a: string, b: string) => number;
	type JSONStringifyable = string | number | boolean | null | object;

	interface Options {
		/**
		Indentation as a string or number of spaces. Pass in null for no formatting.

		@default '\t'
		*/
		readonly indent?: string | number | null;

		/**
		Sort the keys recursively. Optionally pass in a compare function.

		@default false
		*/
		readonly sortKeys?: boolean | SortKeys;

		/**
		Passed into `JSON.stringify`.
		*/
		readonly replacer?: Replacer | Array<number | string>;

		/**
		Mode used when writing the file.

		@default 0o666
		*/
		readonly mode?: number;
	}
}

declare const writeJson5File: {
	/**
	Stringify and write JSON to a file atomically.

	Creates directories for you as needed.

	@example
	```
	import writeJson5File = require('write-json5-file');

	(async () => {
		await writeJson5File('foo.json', {foo: true});
	})();
	```
	*/
	(
		filepath: string,
		data: writeJson5File.JSONStringifyable,
		options?: writeJson5File.Options
	): Promise<void>;

	/**
	Stringify and write JSON to a file atomically.

	Creates directories for you as needed.

	@example
	```
	import writeJson5File = require('write-json5-file');

	writeJson5File.sync('foo.json', {foo: true});
	```
	*/
	sync(
		filepath: string,
		data: writeJson5File.JSONStringifyable,
		options?: writeJson5File.Options
	): void;
};

export = writeJson5File;
