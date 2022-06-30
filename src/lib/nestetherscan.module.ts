import {HttpModule} from "@nestjs/axios";
import {DynamicModule, Module, Provider} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";

import {NestherscanAsyncOptions, NestherscanOptionsFactory} from "./nestherscan-async-options.interface";
import {NestetherscanOptions} from "./nestherscan-options.type";

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [],
  exports: []
})
// eslint-disable-next-line functional/no-class
export class NestetherscanModule {

  static forRoot(options?: NestetherscanOptions): DynamicModule {
    return {
      module: NestetherscanModule,
      providers: [{provide: "nestherscan_options", useValue: options ?? {}}]
    }
  }

  static forRootAsync(options: NestherscanAsyncOptions): DynamicModule {
    return {
      module: NestetherscanModule,
      imports: options.imports,
      // eslint-disable-next-line functional/no-this-expression
      providers: this.asyncProviders(options)
    };
  }

  private static asyncProviders(options: NestherscanAsyncOptions): Array<Provider> {
    if (options.useExisting || options.useFactory) {
      // eslint-disable-next-line functional/no-this-expression
      return [this.asyncProvider(options)];
    }

    const {useClass} = options;
    // eslint-disable-next-line functional/no-this-expression
    return [this.asyncProvider(options), {provide: useClass, useClass} as Provider];
  }

  private static asyncProvider(options: NestherscanAsyncOptions): Provider {
    // eslint-disable-next-line functional/no-let
    let params;
    if (options.useFactory) {
      const {useFactory, inject = []} = options;
      params = {useFactory, inject};
    } else {
      params = {
        useFactory: async (factory: NestherscanOptionsFactory) => await factory.options(),
        inject: [options.useExisting || options.useClass],
      };
    }
    return {provide: 'nestherscan_options', ...params} as Provider;
  }
}
