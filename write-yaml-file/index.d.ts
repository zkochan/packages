declare module "write-yaml-file" {
	import type { ToStringOptions } from 'yaml';

	interface WriteYamlFileOptions extends ToStringOptions {
		readonly mode?: number;
		readonly makeDir?: boolean;
	}

	interface WriteYamlFile {
		(filepath: string, data: any, opts?: WriteYamlFileOptions): Promise<void>;
		sync(filepath: string, data: any, opts?: WriteYamlFileOptions): void;
	}

	const writeYamlFile: WriteYamlFile;

	export = writeYamlFile;
}
