import {DynamicModule, Module, ModuleMetadata, Provider} from '@nestjs/common';
import {Neo4jTestService} from './neo4j-test.service';
import {NEO4J_MODULE_DRIVER, NEO4J_MODULE_OPTIONS} from './neo4j.constants';
import {createDriver, Neo4jCreateOptions} from './neo4j.utils';

export type Neo4jModuleAsyncOptions = {
  useFactory: (
    ...args: any[]
  ) => Promise<Neo4jCreateOptions> | Neo4jCreateOptions;
  inject?: any[];
} & Pick<ModuleMetadata, 'imports'>;

@Module({})
export class Neo4jTestModule {
  static forRootAsync(options: Neo4jModuleAsyncOptions): DynamicModule {
    return {
      module: Neo4jTestModule,
      global: true,
      imports: options.imports,
      providers: [
        ...this.createAsyncProviders(options),
        {
          provide: NEO4J_MODULE_DRIVER,
          inject: [NEO4J_MODULE_OPTIONS],
          useFactory: (config: Neo4jCreateOptions) => createDriver(config),
        },
        Neo4jTestService,
      ],
      exports: [Neo4jTestService],
    };
  }

  private static createAsyncProviders(
    options: Neo4jModuleAsyncOptions,
  ): Provider[] {
    return [this.createAsyncOptionsProvider(options)];
  }

  private static createAsyncOptionsProvider(
    options: Neo4jModuleAsyncOptions,
  ): Provider {
    return {
      provide: NEO4J_MODULE_OPTIONS,
      useFactory: (...args: any[]) => options.useFactory(...args),
      inject: options.inject,
    };
  }
}
