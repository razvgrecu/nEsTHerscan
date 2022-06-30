import {ModuleMetadata, Type} from "@nestjs/common";

import {NestetherscanOptions} from "./nestherscan-options.type";

// eslint-disable-next-line functional/no-mixed-type
export interface NestherscanAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  readonly useExisting?: Type<NestherscanOptionsFactory>;
  readonly useClass?: Type<NestherscanOptionsFactory>;
  readonly useFactory?: (...args: readonly any[]) => NestetherscanOptions | Promise<NestetherscanOptions>;
  readonly inject?: readonly any[];
}

export interface NestherscanOptionsFactory {
  // eslint-disable-next-line functional/no-method-signature
  options(): NestetherscanOptions | Promise<NestetherscanOptions>;
}
