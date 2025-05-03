
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model task
 * 
 */
export type task = $Result.DefaultSelection<Prisma.$taskPayload>
/**
 * Model profile
 * 
 */
export type profile = $Result.DefaultSelection<Prisma.$profilePayload>
/**
 * Model category
 * 
 */
export type category = $Result.DefaultSelection<Prisma.$categoryPayload>
/**
 * Model task_category
 * 
 */
export type task_category = $Result.DefaultSelection<Prisma.$task_categoryPayload>
/**
 * Model pomodoro_sessions
 * 
 */
export type pomodoro_sessions = $Result.DefaultSelection<Prisma.$pomodoro_sessionsPayload>
/**
 * Model pomodoro_task
 * 
 */
export type pomodoro_task = $Result.DefaultSelection<Prisma.$pomodoro_taskPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const TaskStatus = {
    Completed: 'Completed',
    Incomplete: 'Incomplete',
  } as const;
}


export const IconType: {
  preset: 'preset',
  custom: 'custom'
};

export type IconType = (typeof IconType)[keyof typeof IconType]


export const PomoStatus: {
  active: 'active',
  paused: 'paused',
  completed: 'completed'
};

export type PomoStatus = (typeof PomoStatus)[keyof typeof PomoStatus]


export const TimerType: {
  work: 'work',
  short: 'short',
  long: 'long'
};

export type TimerType = (typeof TimerType)[keyof typeof TimerType]



export type TaskStatus = $Enums.TaskStatus

export const TaskStatus: typeof $Enums.TaskStatus

export type IconType = $Enums.IconType

export const IconType: typeof $Enums.IconType

export type PomoStatus = $Enums.PomoStatus

export const PomoStatus: typeof $Enums.PomoStatus

export type TimerType = $Enums.TimerType

export const TimerType: typeof $Enums.TimerType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.task`: Exposes CRUD operations for the **task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.task.findMany()
    * ```
    */
  get task(): Prisma.taskDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.profile`: Exposes CRUD operations for the **profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profiles
    * const profiles = await prisma.profile.findMany()
    * ```
    */
  get profile(): Prisma.profileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.categoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.task_category`: Exposes CRUD operations for the **task_category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Task_categories
    * const task_categories = await prisma.task_category.findMany()
    * ```
    */
  get task_category(): Prisma.task_categoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pomodoro_sessions`: Exposes CRUD operations for the **pomodoro_sessions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pomodoro_sessions
    * const pomodoro_sessions = await prisma.pomodoro_sessions.findMany()
    * ```
    */
  get pomodoro_sessions(): Prisma.pomodoro_sessionsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pomodoro_task`: Exposes CRUD operations for the **pomodoro_task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pomodoro_tasks
    * const pomodoro_tasks = await prisma.pomodoro_task.findMany()
    * ```
    */
  get pomodoro_task(): Prisma.pomodoro_taskDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    task: 'task',
    profile: 'profile',
    category: 'category',
    task_category: 'task_category',
    pomodoro_sessions: 'pomodoro_sessions',
    pomodoro_task: 'pomodoro_task'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "task" | "profile" | "category" | "task_category" | "pomodoro_sessions" | "pomodoro_task"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      task: {
        payload: Prisma.$taskPayload<ExtArgs>
        fields: Prisma.taskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.taskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$taskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.taskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$taskPayload>
          }
          findFirst: {
            args: Prisma.taskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$taskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.taskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$taskPayload>
          }
          findMany: {
            args: Prisma.taskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$taskPayload>[]
          }
          create: {
            args: Prisma.taskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$taskPayload>
          }
          createMany: {
            args: Prisma.taskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.taskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$taskPayload>[]
          }
          delete: {
            args: Prisma.taskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$taskPayload>
          }
          update: {
            args: Prisma.taskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$taskPayload>
          }
          deleteMany: {
            args: Prisma.taskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.taskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.taskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$taskPayload>[]
          }
          upsert: {
            args: Prisma.taskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$taskPayload>
          }
          aggregate: {
            args: Prisma.TaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTask>
          }
          groupBy: {
            args: Prisma.taskGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.taskCountArgs<ExtArgs>
            result: $Utils.Optional<TaskCountAggregateOutputType> | number
          }
        }
      }
      profile: {
        payload: Prisma.$profilePayload<ExtArgs>
        fields: Prisma.profileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.profileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.profileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profilePayload>
          }
          findFirst: {
            args: Prisma.profileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.profileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profilePayload>
          }
          findMany: {
            args: Prisma.profileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profilePayload>[]
          }
          create: {
            args: Prisma.profileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profilePayload>
          }
          createMany: {
            args: Prisma.profileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.profileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profilePayload>[]
          }
          delete: {
            args: Prisma.profileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profilePayload>
          }
          update: {
            args: Prisma.profileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profilePayload>
          }
          deleteMany: {
            args: Prisma.profileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.profileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.profileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profilePayload>[]
          }
          upsert: {
            args: Prisma.profileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profilePayload>
          }
          aggregate: {
            args: Prisma.ProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfile>
          }
          groupBy: {
            args: Prisma.profileGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.profileCountArgs<ExtArgs>
            result: $Utils.Optional<ProfileCountAggregateOutputType> | number
          }
        }
      }
      category: {
        payload: Prisma.$categoryPayload<ExtArgs>
        fields: Prisma.categoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.categoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.categoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>
          }
          findFirst: {
            args: Prisma.categoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.categoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>
          }
          findMany: {
            args: Prisma.categoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>[]
          }
          create: {
            args: Prisma.categoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>
          }
          createMany: {
            args: Prisma.categoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.categoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>[]
          }
          delete: {
            args: Prisma.categoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>
          }
          update: {
            args: Prisma.categoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>
          }
          deleteMany: {
            args: Prisma.categoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.categoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.categoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>[]
          }
          upsert: {
            args: Prisma.categoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.categoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.categoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      task_category: {
        payload: Prisma.$task_categoryPayload<ExtArgs>
        fields: Prisma.task_categoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.task_categoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$task_categoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.task_categoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$task_categoryPayload>
          }
          findFirst: {
            args: Prisma.task_categoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$task_categoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.task_categoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$task_categoryPayload>
          }
          findMany: {
            args: Prisma.task_categoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$task_categoryPayload>[]
          }
          create: {
            args: Prisma.task_categoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$task_categoryPayload>
          }
          createMany: {
            args: Prisma.task_categoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.task_categoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$task_categoryPayload>[]
          }
          delete: {
            args: Prisma.task_categoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$task_categoryPayload>
          }
          update: {
            args: Prisma.task_categoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$task_categoryPayload>
          }
          deleteMany: {
            args: Prisma.task_categoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.task_categoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.task_categoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$task_categoryPayload>[]
          }
          upsert: {
            args: Prisma.task_categoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$task_categoryPayload>
          }
          aggregate: {
            args: Prisma.Task_categoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTask_category>
          }
          groupBy: {
            args: Prisma.task_categoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<Task_categoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.task_categoryCountArgs<ExtArgs>
            result: $Utils.Optional<Task_categoryCountAggregateOutputType> | number
          }
        }
      }
      pomodoro_sessions: {
        payload: Prisma.$pomodoro_sessionsPayload<ExtArgs>
        fields: Prisma.pomodoro_sessionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.pomodoro_sessionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pomodoro_sessionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.pomodoro_sessionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pomodoro_sessionsPayload>
          }
          findFirst: {
            args: Prisma.pomodoro_sessionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pomodoro_sessionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.pomodoro_sessionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pomodoro_sessionsPayload>
          }
          findMany: {
            args: Prisma.pomodoro_sessionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pomodoro_sessionsPayload>[]
          }
          create: {
            args: Prisma.pomodoro_sessionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pomodoro_sessionsPayload>
          }
          createMany: {
            args: Prisma.pomodoro_sessionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.pomodoro_sessionsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pomodoro_sessionsPayload>[]
          }
          delete: {
            args: Prisma.pomodoro_sessionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pomodoro_sessionsPayload>
          }
          update: {
            args: Prisma.pomodoro_sessionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pomodoro_sessionsPayload>
          }
          deleteMany: {
            args: Prisma.pomodoro_sessionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.pomodoro_sessionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.pomodoro_sessionsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pomodoro_sessionsPayload>[]
          }
          upsert: {
            args: Prisma.pomodoro_sessionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pomodoro_sessionsPayload>
          }
          aggregate: {
            args: Prisma.Pomodoro_sessionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePomodoro_sessions>
          }
          groupBy: {
            args: Prisma.pomodoro_sessionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Pomodoro_sessionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.pomodoro_sessionsCountArgs<ExtArgs>
            result: $Utils.Optional<Pomodoro_sessionsCountAggregateOutputType> | number
          }
        }
      }
      pomodoro_task: {
        payload: Prisma.$pomodoro_taskPayload<ExtArgs>
        fields: Prisma.pomodoro_taskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.pomodoro_taskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pomodoro_taskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.pomodoro_taskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pomodoro_taskPayload>
          }
          findFirst: {
            args: Prisma.pomodoro_taskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pomodoro_taskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.pomodoro_taskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pomodoro_taskPayload>
          }
          findMany: {
            args: Prisma.pomodoro_taskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pomodoro_taskPayload>[]
          }
          create: {
            args: Prisma.pomodoro_taskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pomodoro_taskPayload>
          }
          createMany: {
            args: Prisma.pomodoro_taskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.pomodoro_taskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pomodoro_taskPayload>[]
          }
          delete: {
            args: Prisma.pomodoro_taskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pomodoro_taskPayload>
          }
          update: {
            args: Prisma.pomodoro_taskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pomodoro_taskPayload>
          }
          deleteMany: {
            args: Prisma.pomodoro_taskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.pomodoro_taskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.pomodoro_taskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pomodoro_taskPayload>[]
          }
          upsert: {
            args: Prisma.pomodoro_taskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pomodoro_taskPayload>
          }
          aggregate: {
            args: Prisma.Pomodoro_taskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePomodoro_task>
          }
          groupBy: {
            args: Prisma.pomodoro_taskGroupByArgs<ExtArgs>
            result: $Utils.Optional<Pomodoro_taskGroupByOutputType>[]
          }
          count: {
            args: Prisma.pomodoro_taskCountArgs<ExtArgs>
            result: $Utils.Optional<Pomodoro_taskCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    task?: taskOmit
    profile?: profileOmit
    category?: categoryOmit
    task_category?: task_categoryOmit
    pomodoro_sessions?: pomodoro_sessionsOmit
    pomodoro_task?: pomodoro_taskOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    tasks: number
    category: number
    pomodoro_sessions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | UserCountOutputTypeCountTasksArgs
    category?: boolean | UserCountOutputTypeCountCategoryArgs
    pomodoro_sessions?: boolean | UserCountOutputTypeCountPomodoro_sessionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: taskWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCategoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: categoryWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPomodoro_sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: pomodoro_sessionsWhereInput
  }


  /**
   * Count Type TaskCountOutputType
   */

  export type TaskCountOutputType = {
    task_category: number
  }

  export type TaskCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task_category?: boolean | TaskCountOutputTypeCountTask_categoryArgs
  }

  // Custom InputTypes
  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCountOutputType
     */
    select?: TaskCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountTask_categoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: task_categoryWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    task_category: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task_category?: boolean | CategoryCountOutputTypeCountTask_categoryArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountTask_categoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: task_categoryWhereInput
  }


  /**
   * Count Type Pomodoro_sessionsCountOutputType
   */

  export type Pomodoro_sessionsCountOutputType = {
    pomodoro_task: number
  }

  export type Pomodoro_sessionsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pomodoro_task?: boolean | Pomodoro_sessionsCountOutputTypeCountPomodoro_taskArgs
  }

  // Custom InputTypes
  /**
   * Pomodoro_sessionsCountOutputType without action
   */
  export type Pomodoro_sessionsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pomodoro_sessionsCountOutputType
     */
    select?: Pomodoro_sessionsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Pomodoro_sessionsCountOutputType without action
   */
  export type Pomodoro_sessionsCountOutputTypeCountPomodoro_taskArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: pomodoro_taskWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    UserID: number | null
  }

  export type UserSumAggregateOutputType = {
    UserID: number | null
  }

  export type UserMinAggregateOutputType = {
    UserID: number | null
    User_Email: string | null
    User_Password: string | null
  }

  export type UserMaxAggregateOutputType = {
    UserID: number | null
    User_Email: string | null
    User_Password: string | null
  }

  export type UserCountAggregateOutputType = {
    UserID: number
    User_Email: number
    User_Password: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    UserID?: true
  }

  export type UserSumAggregateInputType = {
    UserID?: true
  }

  export type UserMinAggregateInputType = {
    UserID?: true
    User_Email?: true
    User_Password?: true
  }

  export type UserMaxAggregateInputType = {
    UserID?: true
    User_Email?: true
    User_Password?: true
  }

  export type UserCountAggregateInputType = {
    UserID?: true
    User_Email?: true
    User_Password?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    UserID: number
    User_Email: string
    User_Password: string
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    UserID?: boolean
    User_Email?: boolean
    User_Password?: boolean
    profile?: boolean | User$profileArgs<ExtArgs>
    tasks?: boolean | User$tasksArgs<ExtArgs>
    category?: boolean | User$categoryArgs<ExtArgs>
    pomodoro_sessions?: boolean | User$pomodoro_sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    UserID?: boolean
    User_Email?: boolean
    User_Password?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    UserID?: boolean
    User_Email?: boolean
    User_Password?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    UserID?: boolean
    User_Email?: boolean
    User_Password?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"UserID" | "User_Email" | "User_Password", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | User$profileArgs<ExtArgs>
    tasks?: boolean | User$tasksArgs<ExtArgs>
    category?: boolean | User$categoryArgs<ExtArgs>
    pomodoro_sessions?: boolean | User$pomodoro_sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      profile: Prisma.$profilePayload<ExtArgs> | null
      tasks: Prisma.$taskPayload<ExtArgs>[]
      category: Prisma.$categoryPayload<ExtArgs>[]
      pomodoro_sessions: Prisma.$pomodoro_sessionsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      UserID: number
      User_Email: string
      User_Password: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `UserID`
     * const userWithUserIDOnly = await prisma.user.findMany({ select: { UserID: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `UserID`
     * const userWithUserIDOnly = await prisma.user.createManyAndReturn({
     *   select: { UserID: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `UserID`
     * const userWithUserIDOnly = await prisma.user.updateManyAndReturn({
     *   select: { UserID: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends User$profileArgs<ExtArgs> = {}>(args?: Subset<T, User$profileArgs<ExtArgs>>): Prisma__profileClient<$Result.GetResult<Prisma.$profilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    tasks<T extends User$tasksArgs<ExtArgs> = {}>(args?: Subset<T, User$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$taskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    category<T extends User$categoryArgs<ExtArgs> = {}>(args?: Subset<T, User$categoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pomodoro_sessions<T extends User$pomodoro_sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$pomodoro_sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pomodoro_sessionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly UserID: FieldRef<"User", 'Int'>
    readonly User_Email: FieldRef<"User", 'String'>
    readonly User_Password: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.profile
   */
  export type User$profileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profile
     */
    select?: profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profile
     */
    omit?: profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profileInclude<ExtArgs> | null
    where?: profileWhereInput
  }

  /**
   * User.tasks
   */
  export type User$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the task
     */
    select?: taskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the task
     */
    omit?: taskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: taskInclude<ExtArgs> | null
    where?: taskWhereInput
    orderBy?: taskOrderByWithRelationInput | taskOrderByWithRelationInput[]
    cursor?: taskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * User.category
   */
  export type User$categoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    where?: categoryWhereInput
    orderBy?: categoryOrderByWithRelationInput | categoryOrderByWithRelationInput[]
    cursor?: categoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * User.pomodoro_sessions
   */
  export type User$pomodoro_sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pomodoro_sessions
     */
    select?: pomodoro_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pomodoro_sessions
     */
    omit?: pomodoro_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pomodoro_sessionsInclude<ExtArgs> | null
    where?: pomodoro_sessionsWhereInput
    orderBy?: pomodoro_sessionsOrderByWithRelationInput | pomodoro_sessionsOrderByWithRelationInput[]
    cursor?: pomodoro_sessionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Pomodoro_sessionsScalarFieldEnum | Pomodoro_sessionsScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model task
   */

  export type AggregateTask = {
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  export type TaskAvgAggregateOutputType = {
    TaskID: number | null
    UserID: number | null
  }

  export type TaskSumAggregateOutputType = {
    TaskID: number | null
    UserID: number | null
  }

  export type TaskMinAggregateOutputType = {
    TaskID: number | null
    Task_Title: string | null
    Task_Description: string | null
    Task_Start_Date: Date | null
    Task_End_Date: Date | null
    Task_Start_Time: Date | null
    Task_End_Time: Date | null
    Task_Icon: string | null
    Task_Status: $Enums.TaskStatus | null
    Task_Color: string | null
    UserID: number | null
  }

  export type TaskMaxAggregateOutputType = {
    TaskID: number | null
    Task_Title: string | null
    Task_Description: string | null
    Task_Start_Date: Date | null
    Task_End_Date: Date | null
    Task_Start_Time: Date | null
    Task_End_Time: Date | null
    Task_Icon: string | null
    Task_Status: $Enums.TaskStatus | null
    Task_Color: string | null
    UserID: number | null
  }

  export type TaskCountAggregateOutputType = {
    TaskID: number
    Task_Title: number
    Task_Description: number
    Task_Start_Date: number
    Task_End_Date: number
    Task_Start_Time: number
    Task_End_Time: number
    Task_Icon: number
    Task_Status: number
    Task_Color: number
    UserID: number
    _all: number
  }


  export type TaskAvgAggregateInputType = {
    TaskID?: true
    UserID?: true
  }

  export type TaskSumAggregateInputType = {
    TaskID?: true
    UserID?: true
  }

  export type TaskMinAggregateInputType = {
    TaskID?: true
    Task_Title?: true
    Task_Description?: true
    Task_Start_Date?: true
    Task_End_Date?: true
    Task_Start_Time?: true
    Task_End_Time?: true
    Task_Icon?: true
    Task_Status?: true
    Task_Color?: true
    UserID?: true
  }

  export type TaskMaxAggregateInputType = {
    TaskID?: true
    Task_Title?: true
    Task_Description?: true
    Task_Start_Date?: true
    Task_End_Date?: true
    Task_Start_Time?: true
    Task_End_Time?: true
    Task_Icon?: true
    Task_Status?: true
    Task_Color?: true
    UserID?: true
  }

  export type TaskCountAggregateInputType = {
    TaskID?: true
    Task_Title?: true
    Task_Description?: true
    Task_Start_Date?: true
    Task_End_Date?: true
    Task_Start_Time?: true
    Task_End_Time?: true
    Task_Icon?: true
    Task_Status?: true
    Task_Color?: true
    UserID?: true
    _all?: true
  }

  export type TaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which task to aggregate.
     */
    where?: taskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tasks to fetch.
     */
    orderBy?: taskOrderByWithRelationInput | taskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: taskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned tasks
    **/
    _count?: true | TaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskMaxAggregateInputType
  }

  export type GetTaskAggregateType<T extends TaskAggregateArgs> = {
        [P in keyof T & keyof AggregateTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask[P]>
      : GetScalarType<T[P], AggregateTask[P]>
  }




  export type taskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: taskWhereInput
    orderBy?: taskOrderByWithAggregationInput | taskOrderByWithAggregationInput[]
    by: TaskScalarFieldEnum[] | TaskScalarFieldEnum
    having?: taskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCountAggregateInputType | true
    _avg?: TaskAvgAggregateInputType
    _sum?: TaskSumAggregateInputType
    _min?: TaskMinAggregateInputType
    _max?: TaskMaxAggregateInputType
  }

  export type TaskGroupByOutputType = {
    TaskID: number
    Task_Title: string
    Task_Description: string | null
    Task_Start_Date: Date | null
    Task_End_Date: Date | null
    Task_Start_Time: Date | null
    Task_End_Time: Date | null
    Task_Icon: string | null
    Task_Status: $Enums.TaskStatus
    Task_Color: string
    UserID: number
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  type GetTaskGroupByPayload<T extends taskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskGroupByOutputType[P]>
            : GetScalarType<T[P], TaskGroupByOutputType[P]>
        }
      >
    >


  export type taskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    TaskID?: boolean
    Task_Title?: boolean
    Task_Description?: boolean
    Task_Start_Date?: boolean
    Task_End_Date?: boolean
    Task_Start_Time?: boolean
    Task_End_Time?: boolean
    Task_Icon?: boolean
    Task_Status?: boolean
    Task_Color?: boolean
    UserID?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    task_category?: boolean | task$task_categoryArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type taskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    TaskID?: boolean
    Task_Title?: boolean
    Task_Description?: boolean
    Task_Start_Date?: boolean
    Task_End_Date?: boolean
    Task_Start_Time?: boolean
    Task_End_Time?: boolean
    Task_Icon?: boolean
    Task_Status?: boolean
    Task_Color?: boolean
    UserID?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type taskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    TaskID?: boolean
    Task_Title?: boolean
    Task_Description?: boolean
    Task_Start_Date?: boolean
    Task_End_Date?: boolean
    Task_Start_Time?: boolean
    Task_End_Time?: boolean
    Task_Icon?: boolean
    Task_Status?: boolean
    Task_Color?: boolean
    UserID?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type taskSelectScalar = {
    TaskID?: boolean
    Task_Title?: boolean
    Task_Description?: boolean
    Task_Start_Date?: boolean
    Task_End_Date?: boolean
    Task_Start_Time?: boolean
    Task_End_Time?: boolean
    Task_Icon?: boolean
    Task_Status?: boolean
    Task_Color?: boolean
    UserID?: boolean
  }

  export type taskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"TaskID" | "Task_Title" | "Task_Description" | "Task_Start_Date" | "Task_End_Date" | "Task_Start_Time" | "Task_End_Time" | "Task_Icon" | "Task_Status" | "Task_Color" | "UserID", ExtArgs["result"]["task"]>
  export type taskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    task_category?: boolean | task$task_categoryArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type taskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type taskIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $taskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "task"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      task_category: Prisma.$task_categoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      TaskID: number
      Task_Title: string
      Task_Description: string | null
      Task_Start_Date: Date | null
      Task_End_Date: Date | null
      Task_Start_Time: Date | null
      Task_End_Time: Date | null
      Task_Icon: string | null
      Task_Status: $Enums.TaskStatus
      Task_Color: string
      UserID: number
    }, ExtArgs["result"]["task"]>
    composites: {}
  }

  type taskGetPayload<S extends boolean | null | undefined | taskDefaultArgs> = $Result.GetResult<Prisma.$taskPayload, S>

  type taskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<taskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskCountAggregateInputType | true
    }

  export interface taskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['task'], meta: { name: 'task' } }
    /**
     * Find zero or one Task that matches the filter.
     * @param {taskFindUniqueArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends taskFindUniqueArgs>(args: SelectSubset<T, taskFindUniqueArgs<ExtArgs>>): Prisma__taskClient<$Result.GetResult<Prisma.$taskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Task that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {taskFindUniqueOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends taskFindUniqueOrThrowArgs>(args: SelectSubset<T, taskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__taskClient<$Result.GetResult<Prisma.$taskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {taskFindFirstArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends taskFindFirstArgs>(args?: SelectSubset<T, taskFindFirstArgs<ExtArgs>>): Prisma__taskClient<$Result.GetResult<Prisma.$taskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {taskFindFirstOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends taskFindFirstOrThrowArgs>(args?: SelectSubset<T, taskFindFirstOrThrowArgs<ExtArgs>>): Prisma__taskClient<$Result.GetResult<Prisma.$taskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {taskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.task.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.task.findMany({ take: 10 })
     * 
     * // Only select the `TaskID`
     * const taskWithTaskIDOnly = await prisma.task.findMany({ select: { TaskID: true } })
     * 
     */
    findMany<T extends taskFindManyArgs>(args?: SelectSubset<T, taskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$taskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Task.
     * @param {taskCreateArgs} args - Arguments to create a Task.
     * @example
     * // Create one Task
     * const Task = await prisma.task.create({
     *   data: {
     *     // ... data to create a Task
     *   }
     * })
     * 
     */
    create<T extends taskCreateArgs>(args: SelectSubset<T, taskCreateArgs<ExtArgs>>): Prisma__taskClient<$Result.GetResult<Prisma.$taskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tasks.
     * @param {taskCreateManyArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends taskCreateManyArgs>(args?: SelectSubset<T, taskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tasks and returns the data saved in the database.
     * @param {taskCreateManyAndReturnArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tasks and only return the `TaskID`
     * const taskWithTaskIDOnly = await prisma.task.createManyAndReturn({
     *   select: { TaskID: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends taskCreateManyAndReturnArgs>(args?: SelectSubset<T, taskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$taskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Task.
     * @param {taskDeleteArgs} args - Arguments to delete one Task.
     * @example
     * // Delete one Task
     * const Task = await prisma.task.delete({
     *   where: {
     *     // ... filter to delete one Task
     *   }
     * })
     * 
     */
    delete<T extends taskDeleteArgs>(args: SelectSubset<T, taskDeleteArgs<ExtArgs>>): Prisma__taskClient<$Result.GetResult<Prisma.$taskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Task.
     * @param {taskUpdateArgs} args - Arguments to update one Task.
     * @example
     * // Update one Task
     * const task = await prisma.task.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends taskUpdateArgs>(args: SelectSubset<T, taskUpdateArgs<ExtArgs>>): Prisma__taskClient<$Result.GetResult<Prisma.$taskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tasks.
     * @param {taskDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.task.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends taskDeleteManyArgs>(args?: SelectSubset<T, taskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {taskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends taskUpdateManyArgs>(args: SelectSubset<T, taskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks and returns the data updated in the database.
     * @param {taskUpdateManyAndReturnArgs} args - Arguments to update many Tasks.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tasks and only return the `TaskID`
     * const taskWithTaskIDOnly = await prisma.task.updateManyAndReturn({
     *   select: { TaskID: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends taskUpdateManyAndReturnArgs>(args: SelectSubset<T, taskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$taskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Task.
     * @param {taskUpsertArgs} args - Arguments to update or create a Task.
     * @example
     * // Update or create a Task
     * const task = await prisma.task.upsert({
     *   create: {
     *     // ... data to create a Task
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task we want to update
     *   }
     * })
     */
    upsert<T extends taskUpsertArgs>(args: SelectSubset<T, taskUpsertArgs<ExtArgs>>): Prisma__taskClient<$Result.GetResult<Prisma.$taskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {taskCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.task.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends taskCountArgs>(
      args?: Subset<T, taskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskAggregateArgs>(args: Subset<T, TaskAggregateArgs>): Prisma.PrismaPromise<GetTaskAggregateType<T>>

    /**
     * Group by Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {taskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends taskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: taskGroupByArgs['orderBy'] }
        : { orderBy?: taskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, taskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the task model
   */
  readonly fields: taskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for task.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__taskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    task_category<T extends task$task_categoryArgs<ExtArgs> = {}>(args?: Subset<T, task$task_categoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$task_categoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the task model
   */
  interface taskFieldRefs {
    readonly TaskID: FieldRef<"task", 'Int'>
    readonly Task_Title: FieldRef<"task", 'String'>
    readonly Task_Description: FieldRef<"task", 'String'>
    readonly Task_Start_Date: FieldRef<"task", 'DateTime'>
    readonly Task_End_Date: FieldRef<"task", 'DateTime'>
    readonly Task_Start_Time: FieldRef<"task", 'DateTime'>
    readonly Task_End_Time: FieldRef<"task", 'DateTime'>
    readonly Task_Icon: FieldRef<"task", 'String'>
    readonly Task_Status: FieldRef<"task", 'TaskStatus'>
    readonly Task_Color: FieldRef<"task", 'String'>
    readonly UserID: FieldRef<"task", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * task findUnique
   */
  export type taskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the task
     */
    select?: taskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the task
     */
    omit?: taskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: taskInclude<ExtArgs> | null
    /**
     * Filter, which task to fetch.
     */
    where: taskWhereUniqueInput
  }

  /**
   * task findUniqueOrThrow
   */
  export type taskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the task
     */
    select?: taskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the task
     */
    omit?: taskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: taskInclude<ExtArgs> | null
    /**
     * Filter, which task to fetch.
     */
    where: taskWhereUniqueInput
  }

  /**
   * task findFirst
   */
  export type taskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the task
     */
    select?: taskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the task
     */
    omit?: taskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: taskInclude<ExtArgs> | null
    /**
     * Filter, which task to fetch.
     */
    where?: taskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tasks to fetch.
     */
    orderBy?: taskOrderByWithRelationInput | taskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tasks.
     */
    cursor?: taskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * task findFirstOrThrow
   */
  export type taskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the task
     */
    select?: taskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the task
     */
    omit?: taskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: taskInclude<ExtArgs> | null
    /**
     * Filter, which task to fetch.
     */
    where?: taskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tasks to fetch.
     */
    orderBy?: taskOrderByWithRelationInput | taskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tasks.
     */
    cursor?: taskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * task findMany
   */
  export type taskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the task
     */
    select?: taskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the task
     */
    omit?: taskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: taskInclude<ExtArgs> | null
    /**
     * Filter, which tasks to fetch.
     */
    where?: taskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tasks to fetch.
     */
    orderBy?: taskOrderByWithRelationInput | taskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing tasks.
     */
    cursor?: taskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tasks.
     */
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * task create
   */
  export type taskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the task
     */
    select?: taskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the task
     */
    omit?: taskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: taskInclude<ExtArgs> | null
    /**
     * The data needed to create a task.
     */
    data: XOR<taskCreateInput, taskUncheckedCreateInput>
  }

  /**
   * task createMany
   */
  export type taskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many tasks.
     */
    data: taskCreateManyInput | taskCreateManyInput[]
  }

  /**
   * task createManyAndReturn
   */
  export type taskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the task
     */
    select?: taskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the task
     */
    omit?: taskOmit<ExtArgs> | null
    /**
     * The data used to create many tasks.
     */
    data: taskCreateManyInput | taskCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: taskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * task update
   */
  export type taskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the task
     */
    select?: taskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the task
     */
    omit?: taskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: taskInclude<ExtArgs> | null
    /**
     * The data needed to update a task.
     */
    data: XOR<taskUpdateInput, taskUncheckedUpdateInput>
    /**
     * Choose, which task to update.
     */
    where: taskWhereUniqueInput
  }

  /**
   * task updateMany
   */
  export type taskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update tasks.
     */
    data: XOR<taskUpdateManyMutationInput, taskUncheckedUpdateManyInput>
    /**
     * Filter which tasks to update
     */
    where?: taskWhereInput
    /**
     * Limit how many tasks to update.
     */
    limit?: number
  }

  /**
   * task updateManyAndReturn
   */
  export type taskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the task
     */
    select?: taskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the task
     */
    omit?: taskOmit<ExtArgs> | null
    /**
     * The data used to update tasks.
     */
    data: XOR<taskUpdateManyMutationInput, taskUncheckedUpdateManyInput>
    /**
     * Filter which tasks to update
     */
    where?: taskWhereInput
    /**
     * Limit how many tasks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: taskIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * task upsert
   */
  export type taskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the task
     */
    select?: taskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the task
     */
    omit?: taskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: taskInclude<ExtArgs> | null
    /**
     * The filter to search for the task to update in case it exists.
     */
    where: taskWhereUniqueInput
    /**
     * In case the task found by the `where` argument doesn't exist, create a new task with this data.
     */
    create: XOR<taskCreateInput, taskUncheckedCreateInput>
    /**
     * In case the task was found with the provided `where` argument, update it with this data.
     */
    update: XOR<taskUpdateInput, taskUncheckedUpdateInput>
  }

  /**
   * task delete
   */
  export type taskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the task
     */
    select?: taskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the task
     */
    omit?: taskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: taskInclude<ExtArgs> | null
    /**
     * Filter which task to delete.
     */
    where: taskWhereUniqueInput
  }

  /**
   * task deleteMany
   */
  export type taskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tasks to delete
     */
    where?: taskWhereInput
    /**
     * Limit how many tasks to delete.
     */
    limit?: number
  }

  /**
   * task.task_category
   */
  export type task$task_categoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the task_category
     */
    select?: task_categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the task_category
     */
    omit?: task_categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: task_categoryInclude<ExtArgs> | null
    where?: task_categoryWhereInput
    orderBy?: task_categoryOrderByWithRelationInput | task_categoryOrderByWithRelationInput[]
    cursor?: task_categoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Task_categoryScalarFieldEnum | Task_categoryScalarFieldEnum[]
  }

  /**
   * task without action
   */
  export type taskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the task
     */
    select?: taskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the task
     */
    omit?: taskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: taskInclude<ExtArgs> | null
  }


  /**
   * Model profile
   */

  export type AggregateProfile = {
    _count: ProfileCountAggregateOutputType | null
    _avg: ProfileAvgAggregateOutputType | null
    _sum: ProfileSumAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  export type ProfileAvgAggregateOutputType = {
    UserID: number | null
  }

  export type ProfileSumAggregateOutputType = {
    UserID: number | null
  }

  export type ProfileMinAggregateOutputType = {
    UserID: number | null
    Username: string | null
    User_profile_icon_type: $Enums.IconType | null
    User_profile_icon_path: string | null
  }

  export type ProfileMaxAggregateOutputType = {
    UserID: number | null
    Username: string | null
    User_profile_icon_type: $Enums.IconType | null
    User_profile_icon_path: string | null
  }

  export type ProfileCountAggregateOutputType = {
    UserID: number
    Username: number
    User_profile_icon_type: number
    User_profile_icon_path: number
    _all: number
  }


  export type ProfileAvgAggregateInputType = {
    UserID?: true
  }

  export type ProfileSumAggregateInputType = {
    UserID?: true
  }

  export type ProfileMinAggregateInputType = {
    UserID?: true
    Username?: true
    User_profile_icon_type?: true
    User_profile_icon_path?: true
  }

  export type ProfileMaxAggregateInputType = {
    UserID?: true
    Username?: true
    User_profile_icon_type?: true
    User_profile_icon_path?: true
  }

  export type ProfileCountAggregateInputType = {
    UserID?: true
    Username?: true
    User_profile_icon_type?: true
    User_profile_icon_path?: true
    _all?: true
  }

  export type ProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which profile to aggregate.
     */
    where?: profileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of profiles to fetch.
     */
    orderBy?: profileOrderByWithRelationInput | profileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: profileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned profiles
    **/
    _count?: true | ProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfileMaxAggregateInputType
  }

  export type GetProfileAggregateType<T extends ProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfile[P]>
      : GetScalarType<T[P], AggregateProfile[P]>
  }




  export type profileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: profileWhereInput
    orderBy?: profileOrderByWithAggregationInput | profileOrderByWithAggregationInput[]
    by: ProfileScalarFieldEnum[] | ProfileScalarFieldEnum
    having?: profileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfileCountAggregateInputType | true
    _avg?: ProfileAvgAggregateInputType
    _sum?: ProfileSumAggregateInputType
    _min?: ProfileMinAggregateInputType
    _max?: ProfileMaxAggregateInputType
  }

  export type ProfileGroupByOutputType = {
    UserID: number
    Username: string | null
    User_profile_icon_type: $Enums.IconType
    User_profile_icon_path: string
    _count: ProfileCountAggregateOutputType | null
    _avg: ProfileAvgAggregateOutputType | null
    _sum: ProfileSumAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  type GetProfileGroupByPayload<T extends profileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfileGroupByOutputType[P]>
            : GetScalarType<T[P], ProfileGroupByOutputType[P]>
        }
      >
    >


  export type profileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    UserID?: boolean
    Username?: boolean
    User_profile_icon_type?: boolean
    User_profile_icon_path?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type profileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    UserID?: boolean
    Username?: boolean
    User_profile_icon_type?: boolean
    User_profile_icon_path?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type profileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    UserID?: boolean
    Username?: boolean
    User_profile_icon_type?: boolean
    User_profile_icon_path?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type profileSelectScalar = {
    UserID?: boolean
    Username?: boolean
    User_profile_icon_type?: boolean
    User_profile_icon_path?: boolean
  }

  export type profileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"UserID" | "Username" | "User_profile_icon_type" | "User_profile_icon_path", ExtArgs["result"]["profile"]>
  export type profileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type profileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type profileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $profilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "profile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      UserID: number
      Username: string | null
      User_profile_icon_type: $Enums.IconType
      User_profile_icon_path: string
    }, ExtArgs["result"]["profile"]>
    composites: {}
  }

  type profileGetPayload<S extends boolean | null | undefined | profileDefaultArgs> = $Result.GetResult<Prisma.$profilePayload, S>

  type profileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<profileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfileCountAggregateInputType | true
    }

  export interface profileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['profile'], meta: { name: 'profile' } }
    /**
     * Find zero or one Profile that matches the filter.
     * @param {profileFindUniqueArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends profileFindUniqueArgs>(args: SelectSubset<T, profileFindUniqueArgs<ExtArgs>>): Prisma__profileClient<$Result.GetResult<Prisma.$profilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Profile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {profileFindUniqueOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends profileFindUniqueOrThrowArgs>(args: SelectSubset<T, profileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__profileClient<$Result.GetResult<Prisma.$profilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {profileFindFirstArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends profileFindFirstArgs>(args?: SelectSubset<T, profileFindFirstArgs<ExtArgs>>): Prisma__profileClient<$Result.GetResult<Prisma.$profilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {profileFindFirstOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends profileFindFirstOrThrowArgs>(args?: SelectSubset<T, profileFindFirstOrThrowArgs<ExtArgs>>): Prisma__profileClient<$Result.GetResult<Prisma.$profilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {profileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Profiles
     * const profiles = await prisma.profile.findMany()
     * 
     * // Get first 10 Profiles
     * const profiles = await prisma.profile.findMany({ take: 10 })
     * 
     * // Only select the `UserID`
     * const profileWithUserIDOnly = await prisma.profile.findMany({ select: { UserID: true } })
     * 
     */
    findMany<T extends profileFindManyArgs>(args?: SelectSubset<T, profileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$profilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Profile.
     * @param {profileCreateArgs} args - Arguments to create a Profile.
     * @example
     * // Create one Profile
     * const Profile = await prisma.profile.create({
     *   data: {
     *     // ... data to create a Profile
     *   }
     * })
     * 
     */
    create<T extends profileCreateArgs>(args: SelectSubset<T, profileCreateArgs<ExtArgs>>): Prisma__profileClient<$Result.GetResult<Prisma.$profilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Profiles.
     * @param {profileCreateManyArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends profileCreateManyArgs>(args?: SelectSubset<T, profileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Profiles and returns the data saved in the database.
     * @param {profileCreateManyAndReturnArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Profiles and only return the `UserID`
     * const profileWithUserIDOnly = await prisma.profile.createManyAndReturn({
     *   select: { UserID: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends profileCreateManyAndReturnArgs>(args?: SelectSubset<T, profileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$profilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Profile.
     * @param {profileDeleteArgs} args - Arguments to delete one Profile.
     * @example
     * // Delete one Profile
     * const Profile = await prisma.profile.delete({
     *   where: {
     *     // ... filter to delete one Profile
     *   }
     * })
     * 
     */
    delete<T extends profileDeleteArgs>(args: SelectSubset<T, profileDeleteArgs<ExtArgs>>): Prisma__profileClient<$Result.GetResult<Prisma.$profilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Profile.
     * @param {profileUpdateArgs} args - Arguments to update one Profile.
     * @example
     * // Update one Profile
     * const profile = await prisma.profile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends profileUpdateArgs>(args: SelectSubset<T, profileUpdateArgs<ExtArgs>>): Prisma__profileClient<$Result.GetResult<Prisma.$profilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Profiles.
     * @param {profileDeleteManyArgs} args - Arguments to filter Profiles to delete.
     * @example
     * // Delete a few Profiles
     * const { count } = await prisma.profile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends profileDeleteManyArgs>(args?: SelectSubset<T, profileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {profileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends profileUpdateManyArgs>(args: SelectSubset<T, profileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles and returns the data updated in the database.
     * @param {profileUpdateManyAndReturnArgs} args - Arguments to update many Profiles.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Profiles and only return the `UserID`
     * const profileWithUserIDOnly = await prisma.profile.updateManyAndReturn({
     *   select: { UserID: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends profileUpdateManyAndReturnArgs>(args: SelectSubset<T, profileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$profilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Profile.
     * @param {profileUpsertArgs} args - Arguments to update or create a Profile.
     * @example
     * // Update or create a Profile
     * const profile = await prisma.profile.upsert({
     *   create: {
     *     // ... data to create a Profile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Profile we want to update
     *   }
     * })
     */
    upsert<T extends profileUpsertArgs>(args: SelectSubset<T, profileUpsertArgs<ExtArgs>>): Prisma__profileClient<$Result.GetResult<Prisma.$profilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {profileCountArgs} args - Arguments to filter Profiles to count.
     * @example
     * // Count the number of Profiles
     * const count = await prisma.profile.count({
     *   where: {
     *     // ... the filter for the Profiles we want to count
     *   }
     * })
    **/
    count<T extends profileCountArgs>(
      args?: Subset<T, profileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfileAggregateArgs>(args: Subset<T, ProfileAggregateArgs>): Prisma.PrismaPromise<GetProfileAggregateType<T>>

    /**
     * Group by Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {profileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends profileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: profileGroupByArgs['orderBy'] }
        : { orderBy?: profileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, profileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the profile model
   */
  readonly fields: profileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for profile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__profileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the profile model
   */
  interface profileFieldRefs {
    readonly UserID: FieldRef<"profile", 'Int'>
    readonly Username: FieldRef<"profile", 'String'>
    readonly User_profile_icon_type: FieldRef<"profile", 'IconType'>
    readonly User_profile_icon_path: FieldRef<"profile", 'String'>
  }
    

  // Custom InputTypes
  /**
   * profile findUnique
   */
  export type profileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profile
     */
    select?: profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profile
     */
    omit?: profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profileInclude<ExtArgs> | null
    /**
     * Filter, which profile to fetch.
     */
    where: profileWhereUniqueInput
  }

  /**
   * profile findUniqueOrThrow
   */
  export type profileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profile
     */
    select?: profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profile
     */
    omit?: profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profileInclude<ExtArgs> | null
    /**
     * Filter, which profile to fetch.
     */
    where: profileWhereUniqueInput
  }

  /**
   * profile findFirst
   */
  export type profileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profile
     */
    select?: profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profile
     */
    omit?: profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profileInclude<ExtArgs> | null
    /**
     * Filter, which profile to fetch.
     */
    where?: profileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of profiles to fetch.
     */
    orderBy?: profileOrderByWithRelationInput | profileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for profiles.
     */
    cursor?: profileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * profile findFirstOrThrow
   */
  export type profileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profile
     */
    select?: profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profile
     */
    omit?: profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profileInclude<ExtArgs> | null
    /**
     * Filter, which profile to fetch.
     */
    where?: profileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of profiles to fetch.
     */
    orderBy?: profileOrderByWithRelationInput | profileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for profiles.
     */
    cursor?: profileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * profile findMany
   */
  export type profileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profile
     */
    select?: profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profile
     */
    omit?: profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profileInclude<ExtArgs> | null
    /**
     * Filter, which profiles to fetch.
     */
    where?: profileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of profiles to fetch.
     */
    orderBy?: profileOrderByWithRelationInput | profileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing profiles.
     */
    cursor?: profileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` profiles.
     */
    skip?: number
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * profile create
   */
  export type profileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profile
     */
    select?: profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profile
     */
    omit?: profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profileInclude<ExtArgs> | null
    /**
     * The data needed to create a profile.
     */
    data: XOR<profileCreateInput, profileUncheckedCreateInput>
  }

  /**
   * profile createMany
   */
  export type profileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many profiles.
     */
    data: profileCreateManyInput | profileCreateManyInput[]
  }

  /**
   * profile createManyAndReturn
   */
  export type profileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profile
     */
    select?: profileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the profile
     */
    omit?: profileOmit<ExtArgs> | null
    /**
     * The data used to create many profiles.
     */
    data: profileCreateManyInput | profileCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * profile update
   */
  export type profileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profile
     */
    select?: profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profile
     */
    omit?: profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profileInclude<ExtArgs> | null
    /**
     * The data needed to update a profile.
     */
    data: XOR<profileUpdateInput, profileUncheckedUpdateInput>
    /**
     * Choose, which profile to update.
     */
    where: profileWhereUniqueInput
  }

  /**
   * profile updateMany
   */
  export type profileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update profiles.
     */
    data: XOR<profileUpdateManyMutationInput, profileUncheckedUpdateManyInput>
    /**
     * Filter which profiles to update
     */
    where?: profileWhereInput
    /**
     * Limit how many profiles to update.
     */
    limit?: number
  }

  /**
   * profile updateManyAndReturn
   */
  export type profileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profile
     */
    select?: profileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the profile
     */
    omit?: profileOmit<ExtArgs> | null
    /**
     * The data used to update profiles.
     */
    data: XOR<profileUpdateManyMutationInput, profileUncheckedUpdateManyInput>
    /**
     * Filter which profiles to update
     */
    where?: profileWhereInput
    /**
     * Limit how many profiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * profile upsert
   */
  export type profileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profile
     */
    select?: profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profile
     */
    omit?: profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profileInclude<ExtArgs> | null
    /**
     * The filter to search for the profile to update in case it exists.
     */
    where: profileWhereUniqueInput
    /**
     * In case the profile found by the `where` argument doesn't exist, create a new profile with this data.
     */
    create: XOR<profileCreateInput, profileUncheckedCreateInput>
    /**
     * In case the profile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<profileUpdateInput, profileUncheckedUpdateInput>
  }

  /**
   * profile delete
   */
  export type profileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profile
     */
    select?: profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profile
     */
    omit?: profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profileInclude<ExtArgs> | null
    /**
     * Filter which profile to delete.
     */
    where: profileWhereUniqueInput
  }

  /**
   * profile deleteMany
   */
  export type profileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which profiles to delete
     */
    where?: profileWhereInput
    /**
     * Limit how many profiles to delete.
     */
    limit?: number
  }

  /**
   * profile without action
   */
  export type profileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profile
     */
    select?: profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profile
     */
    omit?: profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profileInclude<ExtArgs> | null
  }


  /**
   * Model category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryAvgAggregateOutputType = {
    CategoryId: number | null
    userId: number | null
  }

  export type CategorySumAggregateOutputType = {
    CategoryId: number | null
    userId: number | null
  }

  export type CategoryMinAggregateOutputType = {
    CategoryId: number | null
    Category_Name: string | null
    Category_icon: string | null
    Category_Color: string | null
    Category_is_Primary: boolean | null
    userId: number | null
  }

  export type CategoryMaxAggregateOutputType = {
    CategoryId: number | null
    Category_Name: string | null
    Category_icon: string | null
    Category_Color: string | null
    Category_is_Primary: boolean | null
    userId: number | null
  }

  export type CategoryCountAggregateOutputType = {
    CategoryId: number
    Category_Name: number
    Category_icon: number
    Category_Color: number
    Category_is_Primary: number
    userId: number
    _all: number
  }


  export type CategoryAvgAggregateInputType = {
    CategoryId?: true
    userId?: true
  }

  export type CategorySumAggregateInputType = {
    CategoryId?: true
    userId?: true
  }

  export type CategoryMinAggregateInputType = {
    CategoryId?: true
    Category_Name?: true
    Category_icon?: true
    Category_Color?: true
    Category_is_Primary?: true
    userId?: true
  }

  export type CategoryMaxAggregateInputType = {
    CategoryId?: true
    Category_Name?: true
    Category_icon?: true
    Category_Color?: true
    Category_is_Primary?: true
    userId?: true
  }

  export type CategoryCountAggregateInputType = {
    CategoryId?: true
    Category_Name?: true
    Category_icon?: true
    Category_Color?: true
    Category_is_Primary?: true
    userId?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which category to aggregate.
     */
    where?: categoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoryOrderByWithRelationInput | categoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: categoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type categoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: categoryWhereInput
    orderBy?: categoryOrderByWithAggregationInput | categoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: categoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _avg?: CategoryAvgAggregateInputType
    _sum?: CategorySumAggregateInputType
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    CategoryId: number
    Category_Name: string
    Category_icon: string
    Category_Color: string
    Category_is_Primary: boolean
    userId: number
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends categoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type categorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    CategoryId?: boolean
    Category_Name?: boolean
    Category_icon?: boolean
    Category_Color?: boolean
    Category_is_Primary?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    task_category?: boolean | category$task_categoryArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type categorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    CategoryId?: boolean
    Category_Name?: boolean
    Category_icon?: boolean
    Category_Color?: boolean
    Category_is_Primary?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type categorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    CategoryId?: boolean
    Category_Name?: boolean
    Category_icon?: boolean
    Category_Color?: boolean
    Category_is_Primary?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type categorySelectScalar = {
    CategoryId?: boolean
    Category_Name?: boolean
    Category_icon?: boolean
    Category_Color?: boolean
    Category_is_Primary?: boolean
    userId?: boolean
  }

  export type categoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"CategoryId" | "Category_Name" | "Category_icon" | "Category_Color" | "Category_is_Primary" | "userId", ExtArgs["result"]["category"]>
  export type categoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    task_category?: boolean | category$task_categoryArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type categoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type categoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $categoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "category"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      task_category: Prisma.$task_categoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      CategoryId: number
      Category_Name: string
      Category_icon: string
      Category_Color: string
      Category_is_Primary: boolean
      userId: number
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type categoryGetPayload<S extends boolean | null | undefined | categoryDefaultArgs> = $Result.GetResult<Prisma.$categoryPayload, S>

  type categoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<categoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface categoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['category'], meta: { name: 'category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {categoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends categoryFindUniqueArgs>(args: SelectSubset<T, categoryFindUniqueArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {categoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends categoryFindUniqueOrThrowArgs>(args: SelectSubset<T, categoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends categoryFindFirstArgs>(args?: SelectSubset<T, categoryFindFirstArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends categoryFindFirstOrThrowArgs>(args?: SelectSubset<T, categoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `CategoryId`
     * const categoryWithCategoryIdOnly = await prisma.category.findMany({ select: { CategoryId: true } })
     * 
     */
    findMany<T extends categoryFindManyArgs>(args?: SelectSubset<T, categoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Category.
     * @param {categoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends categoryCreateArgs>(args: SelectSubset<T, categoryCreateArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {categoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends categoryCreateManyArgs>(args?: SelectSubset<T, categoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {categoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `CategoryId`
     * const categoryWithCategoryIdOnly = await prisma.category.createManyAndReturn({
     *   select: { CategoryId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends categoryCreateManyAndReturnArgs>(args?: SelectSubset<T, categoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Category.
     * @param {categoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends categoryDeleteArgs>(args: SelectSubset<T, categoryDeleteArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Category.
     * @param {categoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends categoryUpdateArgs>(args: SelectSubset<T, categoryUpdateArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {categoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends categoryDeleteManyArgs>(args?: SelectSubset<T, categoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends categoryUpdateManyArgs>(args: SelectSubset<T, categoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories and returns the data updated in the database.
     * @param {categoryUpdateManyAndReturnArgs} args - Arguments to update many Categories.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categories and only return the `CategoryId`
     * const categoryWithCategoryIdOnly = await prisma.category.updateManyAndReturn({
     *   select: { CategoryId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends categoryUpdateManyAndReturnArgs>(args: SelectSubset<T, categoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Category.
     * @param {categoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends categoryUpsertArgs>(args: SelectSubset<T, categoryUpsertArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends categoryCountArgs>(
      args?: Subset<T, categoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends categoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: categoryGroupByArgs['orderBy'] }
        : { orderBy?: categoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, categoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the category model
   */
  readonly fields: categoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__categoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    task_category<T extends category$task_categoryArgs<ExtArgs> = {}>(args?: Subset<T, category$task_categoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$task_categoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the category model
   */
  interface categoryFieldRefs {
    readonly CategoryId: FieldRef<"category", 'Int'>
    readonly Category_Name: FieldRef<"category", 'String'>
    readonly Category_icon: FieldRef<"category", 'String'>
    readonly Category_Color: FieldRef<"category", 'String'>
    readonly Category_is_Primary: FieldRef<"category", 'Boolean'>
    readonly userId: FieldRef<"category", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * category findUnique
   */
  export type categoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * Filter, which category to fetch.
     */
    where: categoryWhereUniqueInput
  }

  /**
   * category findUniqueOrThrow
   */
  export type categoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * Filter, which category to fetch.
     */
    where: categoryWhereUniqueInput
  }

  /**
   * category findFirst
   */
  export type categoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * Filter, which category to fetch.
     */
    where?: categoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoryOrderByWithRelationInput | categoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for categories.
     */
    cursor?: categoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * category findFirstOrThrow
   */
  export type categoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * Filter, which category to fetch.
     */
    where?: categoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoryOrderByWithRelationInput | categoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for categories.
     */
    cursor?: categoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * category findMany
   */
  export type categoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * Filter, which categories to fetch.
     */
    where?: categoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoryOrderByWithRelationInput | categoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing categories.
     */
    cursor?: categoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * category create
   */
  export type categoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * The data needed to create a category.
     */
    data: XOR<categoryCreateInput, categoryUncheckedCreateInput>
  }

  /**
   * category createMany
   */
  export type categoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many categories.
     */
    data: categoryCreateManyInput | categoryCreateManyInput[]
  }

  /**
   * category createManyAndReturn
   */
  export type categoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * The data used to create many categories.
     */
    data: categoryCreateManyInput | categoryCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * category update
   */
  export type categoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * The data needed to update a category.
     */
    data: XOR<categoryUpdateInput, categoryUncheckedUpdateInput>
    /**
     * Choose, which category to update.
     */
    where: categoryWhereUniqueInput
  }

  /**
   * category updateMany
   */
  export type categoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update categories.
     */
    data: XOR<categoryUpdateManyMutationInput, categoryUncheckedUpdateManyInput>
    /**
     * Filter which categories to update
     */
    where?: categoryWhereInput
    /**
     * Limit how many categories to update.
     */
    limit?: number
  }

  /**
   * category updateManyAndReturn
   */
  export type categoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * The data used to update categories.
     */
    data: XOR<categoryUpdateManyMutationInput, categoryUncheckedUpdateManyInput>
    /**
     * Filter which categories to update
     */
    where?: categoryWhereInput
    /**
     * Limit how many categories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * category upsert
   */
  export type categoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * The filter to search for the category to update in case it exists.
     */
    where: categoryWhereUniqueInput
    /**
     * In case the category found by the `where` argument doesn't exist, create a new category with this data.
     */
    create: XOR<categoryCreateInput, categoryUncheckedCreateInput>
    /**
     * In case the category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<categoryUpdateInput, categoryUncheckedUpdateInput>
  }

  /**
   * category delete
   */
  export type categoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * Filter which category to delete.
     */
    where: categoryWhereUniqueInput
  }

  /**
   * category deleteMany
   */
  export type categoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which categories to delete
     */
    where?: categoryWhereInput
    /**
     * Limit how many categories to delete.
     */
    limit?: number
  }

  /**
   * category.task_category
   */
  export type category$task_categoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the task_category
     */
    select?: task_categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the task_category
     */
    omit?: task_categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: task_categoryInclude<ExtArgs> | null
    where?: task_categoryWhereInput
    orderBy?: task_categoryOrderByWithRelationInput | task_categoryOrderByWithRelationInput[]
    cursor?: task_categoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Task_categoryScalarFieldEnum | Task_categoryScalarFieldEnum[]
  }

  /**
   * category without action
   */
  export type categoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
  }


  /**
   * Model task_category
   */

  export type AggregateTask_category = {
    _count: Task_categoryCountAggregateOutputType | null
    _avg: Task_categoryAvgAggregateOutputType | null
    _sum: Task_categorySumAggregateOutputType | null
    _min: Task_categoryMinAggregateOutputType | null
    _max: Task_categoryMaxAggregateOutputType | null
  }

  export type Task_categoryAvgAggregateOutputType = {
    TaskID: number | null
    CategoryId: number | null
  }

  export type Task_categorySumAggregateOutputType = {
    TaskID: number | null
    CategoryId: number | null
  }

  export type Task_categoryMinAggregateOutputType = {
    TaskID: number | null
    CategoryId: number | null
  }

  export type Task_categoryMaxAggregateOutputType = {
    TaskID: number | null
    CategoryId: number | null
  }

  export type Task_categoryCountAggregateOutputType = {
    TaskID: number
    CategoryId: number
    _all: number
  }


  export type Task_categoryAvgAggregateInputType = {
    TaskID?: true
    CategoryId?: true
  }

  export type Task_categorySumAggregateInputType = {
    TaskID?: true
    CategoryId?: true
  }

  export type Task_categoryMinAggregateInputType = {
    TaskID?: true
    CategoryId?: true
  }

  export type Task_categoryMaxAggregateInputType = {
    TaskID?: true
    CategoryId?: true
  }

  export type Task_categoryCountAggregateInputType = {
    TaskID?: true
    CategoryId?: true
    _all?: true
  }

  export type Task_categoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which task_category to aggregate.
     */
    where?: task_categoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of task_categories to fetch.
     */
    orderBy?: task_categoryOrderByWithRelationInput | task_categoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: task_categoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` task_categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` task_categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned task_categories
    **/
    _count?: true | Task_categoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Task_categoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Task_categorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Task_categoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Task_categoryMaxAggregateInputType
  }

  export type GetTask_categoryAggregateType<T extends Task_categoryAggregateArgs> = {
        [P in keyof T & keyof AggregateTask_category]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask_category[P]>
      : GetScalarType<T[P], AggregateTask_category[P]>
  }




  export type task_categoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: task_categoryWhereInput
    orderBy?: task_categoryOrderByWithAggregationInput | task_categoryOrderByWithAggregationInput[]
    by: Task_categoryScalarFieldEnum[] | Task_categoryScalarFieldEnum
    having?: task_categoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Task_categoryCountAggregateInputType | true
    _avg?: Task_categoryAvgAggregateInputType
    _sum?: Task_categorySumAggregateInputType
    _min?: Task_categoryMinAggregateInputType
    _max?: Task_categoryMaxAggregateInputType
  }

  export type Task_categoryGroupByOutputType = {
    TaskID: number
    CategoryId: number
    _count: Task_categoryCountAggregateOutputType | null
    _avg: Task_categoryAvgAggregateOutputType | null
    _sum: Task_categorySumAggregateOutputType | null
    _min: Task_categoryMinAggregateOutputType | null
    _max: Task_categoryMaxAggregateOutputType | null
  }

  type GetTask_categoryGroupByPayload<T extends task_categoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Task_categoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Task_categoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Task_categoryGroupByOutputType[P]>
            : GetScalarType<T[P], Task_categoryGroupByOutputType[P]>
        }
      >
    >


  export type task_categorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    TaskID?: boolean
    CategoryId?: boolean
    task?: boolean | taskDefaultArgs<ExtArgs>
    category?: boolean | categoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task_category"]>

  export type task_categorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    TaskID?: boolean
    CategoryId?: boolean
    task?: boolean | taskDefaultArgs<ExtArgs>
    category?: boolean | categoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task_category"]>

  export type task_categorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    TaskID?: boolean
    CategoryId?: boolean
    task?: boolean | taskDefaultArgs<ExtArgs>
    category?: boolean | categoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task_category"]>

  export type task_categorySelectScalar = {
    TaskID?: boolean
    CategoryId?: boolean
  }

  export type task_categoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"TaskID" | "CategoryId", ExtArgs["result"]["task_category"]>
  export type task_categoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | taskDefaultArgs<ExtArgs>
    category?: boolean | categoryDefaultArgs<ExtArgs>
  }
  export type task_categoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | taskDefaultArgs<ExtArgs>
    category?: boolean | categoryDefaultArgs<ExtArgs>
  }
  export type task_categoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | taskDefaultArgs<ExtArgs>
    category?: boolean | categoryDefaultArgs<ExtArgs>
  }

  export type $task_categoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "task_category"
    objects: {
      task: Prisma.$taskPayload<ExtArgs>
      category: Prisma.$categoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      TaskID: number
      CategoryId: number
    }, ExtArgs["result"]["task_category"]>
    composites: {}
  }

  type task_categoryGetPayload<S extends boolean | null | undefined | task_categoryDefaultArgs> = $Result.GetResult<Prisma.$task_categoryPayload, S>

  type task_categoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<task_categoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Task_categoryCountAggregateInputType | true
    }

  export interface task_categoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['task_category'], meta: { name: 'task_category' } }
    /**
     * Find zero or one Task_category that matches the filter.
     * @param {task_categoryFindUniqueArgs} args - Arguments to find a Task_category
     * @example
     * // Get one Task_category
     * const task_category = await prisma.task_category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends task_categoryFindUniqueArgs>(args: SelectSubset<T, task_categoryFindUniqueArgs<ExtArgs>>): Prisma__task_categoryClient<$Result.GetResult<Prisma.$task_categoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Task_category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {task_categoryFindUniqueOrThrowArgs} args - Arguments to find a Task_category
     * @example
     * // Get one Task_category
     * const task_category = await prisma.task_category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends task_categoryFindUniqueOrThrowArgs>(args: SelectSubset<T, task_categoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__task_categoryClient<$Result.GetResult<Prisma.$task_categoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task_category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {task_categoryFindFirstArgs} args - Arguments to find a Task_category
     * @example
     * // Get one Task_category
     * const task_category = await prisma.task_category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends task_categoryFindFirstArgs>(args?: SelectSubset<T, task_categoryFindFirstArgs<ExtArgs>>): Prisma__task_categoryClient<$Result.GetResult<Prisma.$task_categoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task_category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {task_categoryFindFirstOrThrowArgs} args - Arguments to find a Task_category
     * @example
     * // Get one Task_category
     * const task_category = await prisma.task_category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends task_categoryFindFirstOrThrowArgs>(args?: SelectSubset<T, task_categoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__task_categoryClient<$Result.GetResult<Prisma.$task_categoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Task_categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {task_categoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Task_categories
     * const task_categories = await prisma.task_category.findMany()
     * 
     * // Get first 10 Task_categories
     * const task_categories = await prisma.task_category.findMany({ take: 10 })
     * 
     * // Only select the `TaskID`
     * const task_categoryWithTaskIDOnly = await prisma.task_category.findMany({ select: { TaskID: true } })
     * 
     */
    findMany<T extends task_categoryFindManyArgs>(args?: SelectSubset<T, task_categoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$task_categoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Task_category.
     * @param {task_categoryCreateArgs} args - Arguments to create a Task_category.
     * @example
     * // Create one Task_category
     * const Task_category = await prisma.task_category.create({
     *   data: {
     *     // ... data to create a Task_category
     *   }
     * })
     * 
     */
    create<T extends task_categoryCreateArgs>(args: SelectSubset<T, task_categoryCreateArgs<ExtArgs>>): Prisma__task_categoryClient<$Result.GetResult<Prisma.$task_categoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Task_categories.
     * @param {task_categoryCreateManyArgs} args - Arguments to create many Task_categories.
     * @example
     * // Create many Task_categories
     * const task_category = await prisma.task_category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends task_categoryCreateManyArgs>(args?: SelectSubset<T, task_categoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Task_categories and returns the data saved in the database.
     * @param {task_categoryCreateManyAndReturnArgs} args - Arguments to create many Task_categories.
     * @example
     * // Create many Task_categories
     * const task_category = await prisma.task_category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Task_categories and only return the `TaskID`
     * const task_categoryWithTaskIDOnly = await prisma.task_category.createManyAndReturn({
     *   select: { TaskID: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends task_categoryCreateManyAndReturnArgs>(args?: SelectSubset<T, task_categoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$task_categoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Task_category.
     * @param {task_categoryDeleteArgs} args - Arguments to delete one Task_category.
     * @example
     * // Delete one Task_category
     * const Task_category = await prisma.task_category.delete({
     *   where: {
     *     // ... filter to delete one Task_category
     *   }
     * })
     * 
     */
    delete<T extends task_categoryDeleteArgs>(args: SelectSubset<T, task_categoryDeleteArgs<ExtArgs>>): Prisma__task_categoryClient<$Result.GetResult<Prisma.$task_categoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Task_category.
     * @param {task_categoryUpdateArgs} args - Arguments to update one Task_category.
     * @example
     * // Update one Task_category
     * const task_category = await prisma.task_category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends task_categoryUpdateArgs>(args: SelectSubset<T, task_categoryUpdateArgs<ExtArgs>>): Prisma__task_categoryClient<$Result.GetResult<Prisma.$task_categoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Task_categories.
     * @param {task_categoryDeleteManyArgs} args - Arguments to filter Task_categories to delete.
     * @example
     * // Delete a few Task_categories
     * const { count } = await prisma.task_category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends task_categoryDeleteManyArgs>(args?: SelectSubset<T, task_categoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Task_categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {task_categoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Task_categories
     * const task_category = await prisma.task_category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends task_categoryUpdateManyArgs>(args: SelectSubset<T, task_categoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Task_categories and returns the data updated in the database.
     * @param {task_categoryUpdateManyAndReturnArgs} args - Arguments to update many Task_categories.
     * @example
     * // Update many Task_categories
     * const task_category = await prisma.task_category.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Task_categories and only return the `TaskID`
     * const task_categoryWithTaskIDOnly = await prisma.task_category.updateManyAndReturn({
     *   select: { TaskID: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends task_categoryUpdateManyAndReturnArgs>(args: SelectSubset<T, task_categoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$task_categoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Task_category.
     * @param {task_categoryUpsertArgs} args - Arguments to update or create a Task_category.
     * @example
     * // Update or create a Task_category
     * const task_category = await prisma.task_category.upsert({
     *   create: {
     *     // ... data to create a Task_category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task_category we want to update
     *   }
     * })
     */
    upsert<T extends task_categoryUpsertArgs>(args: SelectSubset<T, task_categoryUpsertArgs<ExtArgs>>): Prisma__task_categoryClient<$Result.GetResult<Prisma.$task_categoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Task_categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {task_categoryCountArgs} args - Arguments to filter Task_categories to count.
     * @example
     * // Count the number of Task_categories
     * const count = await prisma.task_category.count({
     *   where: {
     *     // ... the filter for the Task_categories we want to count
     *   }
     * })
    **/
    count<T extends task_categoryCountArgs>(
      args?: Subset<T, task_categoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Task_categoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Task_category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Task_categoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Task_categoryAggregateArgs>(args: Subset<T, Task_categoryAggregateArgs>): Prisma.PrismaPromise<GetTask_categoryAggregateType<T>>

    /**
     * Group by Task_category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {task_categoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends task_categoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: task_categoryGroupByArgs['orderBy'] }
        : { orderBy?: task_categoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, task_categoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTask_categoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the task_category model
   */
  readonly fields: task_categoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for task_category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__task_categoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends taskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, taskDefaultArgs<ExtArgs>>): Prisma__taskClient<$Result.GetResult<Prisma.$taskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    category<T extends categoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, categoryDefaultArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the task_category model
   */
  interface task_categoryFieldRefs {
    readonly TaskID: FieldRef<"task_category", 'Int'>
    readonly CategoryId: FieldRef<"task_category", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * task_category findUnique
   */
  export type task_categoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the task_category
     */
    select?: task_categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the task_category
     */
    omit?: task_categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: task_categoryInclude<ExtArgs> | null
    /**
     * Filter, which task_category to fetch.
     */
    where: task_categoryWhereUniqueInput
  }

  /**
   * task_category findUniqueOrThrow
   */
  export type task_categoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the task_category
     */
    select?: task_categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the task_category
     */
    omit?: task_categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: task_categoryInclude<ExtArgs> | null
    /**
     * Filter, which task_category to fetch.
     */
    where: task_categoryWhereUniqueInput
  }

  /**
   * task_category findFirst
   */
  export type task_categoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the task_category
     */
    select?: task_categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the task_category
     */
    omit?: task_categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: task_categoryInclude<ExtArgs> | null
    /**
     * Filter, which task_category to fetch.
     */
    where?: task_categoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of task_categories to fetch.
     */
    orderBy?: task_categoryOrderByWithRelationInput | task_categoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for task_categories.
     */
    cursor?: task_categoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` task_categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` task_categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of task_categories.
     */
    distinct?: Task_categoryScalarFieldEnum | Task_categoryScalarFieldEnum[]
  }

  /**
   * task_category findFirstOrThrow
   */
  export type task_categoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the task_category
     */
    select?: task_categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the task_category
     */
    omit?: task_categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: task_categoryInclude<ExtArgs> | null
    /**
     * Filter, which task_category to fetch.
     */
    where?: task_categoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of task_categories to fetch.
     */
    orderBy?: task_categoryOrderByWithRelationInput | task_categoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for task_categories.
     */
    cursor?: task_categoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` task_categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` task_categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of task_categories.
     */
    distinct?: Task_categoryScalarFieldEnum | Task_categoryScalarFieldEnum[]
  }

  /**
   * task_category findMany
   */
  export type task_categoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the task_category
     */
    select?: task_categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the task_category
     */
    omit?: task_categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: task_categoryInclude<ExtArgs> | null
    /**
     * Filter, which task_categories to fetch.
     */
    where?: task_categoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of task_categories to fetch.
     */
    orderBy?: task_categoryOrderByWithRelationInput | task_categoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing task_categories.
     */
    cursor?: task_categoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` task_categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` task_categories.
     */
    skip?: number
    distinct?: Task_categoryScalarFieldEnum | Task_categoryScalarFieldEnum[]
  }

  /**
   * task_category create
   */
  export type task_categoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the task_category
     */
    select?: task_categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the task_category
     */
    omit?: task_categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: task_categoryInclude<ExtArgs> | null
    /**
     * The data needed to create a task_category.
     */
    data: XOR<task_categoryCreateInput, task_categoryUncheckedCreateInput>
  }

  /**
   * task_category createMany
   */
  export type task_categoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many task_categories.
     */
    data: task_categoryCreateManyInput | task_categoryCreateManyInput[]
  }

  /**
   * task_category createManyAndReturn
   */
  export type task_categoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the task_category
     */
    select?: task_categorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the task_category
     */
    omit?: task_categoryOmit<ExtArgs> | null
    /**
     * The data used to create many task_categories.
     */
    data: task_categoryCreateManyInput | task_categoryCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: task_categoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * task_category update
   */
  export type task_categoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the task_category
     */
    select?: task_categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the task_category
     */
    omit?: task_categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: task_categoryInclude<ExtArgs> | null
    /**
     * The data needed to update a task_category.
     */
    data: XOR<task_categoryUpdateInput, task_categoryUncheckedUpdateInput>
    /**
     * Choose, which task_category to update.
     */
    where: task_categoryWhereUniqueInput
  }

  /**
   * task_category updateMany
   */
  export type task_categoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update task_categories.
     */
    data: XOR<task_categoryUpdateManyMutationInput, task_categoryUncheckedUpdateManyInput>
    /**
     * Filter which task_categories to update
     */
    where?: task_categoryWhereInput
    /**
     * Limit how many task_categories to update.
     */
    limit?: number
  }

  /**
   * task_category updateManyAndReturn
   */
  export type task_categoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the task_category
     */
    select?: task_categorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the task_category
     */
    omit?: task_categoryOmit<ExtArgs> | null
    /**
     * The data used to update task_categories.
     */
    data: XOR<task_categoryUpdateManyMutationInput, task_categoryUncheckedUpdateManyInput>
    /**
     * Filter which task_categories to update
     */
    where?: task_categoryWhereInput
    /**
     * Limit how many task_categories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: task_categoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * task_category upsert
   */
  export type task_categoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the task_category
     */
    select?: task_categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the task_category
     */
    omit?: task_categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: task_categoryInclude<ExtArgs> | null
    /**
     * The filter to search for the task_category to update in case it exists.
     */
    where: task_categoryWhereUniqueInput
    /**
     * In case the task_category found by the `where` argument doesn't exist, create a new task_category with this data.
     */
    create: XOR<task_categoryCreateInput, task_categoryUncheckedCreateInput>
    /**
     * In case the task_category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<task_categoryUpdateInput, task_categoryUncheckedUpdateInput>
  }

  /**
   * task_category delete
   */
  export type task_categoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the task_category
     */
    select?: task_categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the task_category
     */
    omit?: task_categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: task_categoryInclude<ExtArgs> | null
    /**
     * Filter which task_category to delete.
     */
    where: task_categoryWhereUniqueInput
  }

  /**
   * task_category deleteMany
   */
  export type task_categoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which task_categories to delete
     */
    where?: task_categoryWhereInput
    /**
     * Limit how many task_categories to delete.
     */
    limit?: number
  }

  /**
   * task_category without action
   */
  export type task_categoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the task_category
     */
    select?: task_categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the task_category
     */
    omit?: task_categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: task_categoryInclude<ExtArgs> | null
  }


  /**
   * Model pomodoro_sessions
   */

  export type AggregatePomodoro_sessions = {
    _count: Pomodoro_sessionsCountAggregateOutputType | null
    _avg: Pomodoro_sessionsAvgAggregateOutputType | null
    _sum: Pomodoro_sessionsSumAggregateOutputType | null
    _min: Pomodoro_sessionsMinAggregateOutputType | null
    _max: Pomodoro_sessionsMaxAggregateOutputType | null
  }

  export type Pomodoro_sessionsAvgAggregateOutputType = {
    SessionId: number | null
    UserID: number | null
    PausedTime: number | null
    duration_seconds: number | null
    remaining_seconds: number | null
  }

  export type Pomodoro_sessionsSumAggregateOutputType = {
    SessionId: number | null
    UserID: number | null
    PausedTime: number | null
    duration_seconds: number | null
    remaining_seconds: number | null
  }

  export type Pomodoro_sessionsMinAggregateOutputType = {
    SessionId: number | null
    UserID: number | null
    Status: $Enums.PomoStatus | null
    StartTime: Date | null
    EndTime: Date | null
    PausedTime: number | null
    duration_seconds: number | null
    remaining_seconds: number | null
    timer_type: $Enums.TimerType | null
    last_updated: Date | null
  }

  export type Pomodoro_sessionsMaxAggregateOutputType = {
    SessionId: number | null
    UserID: number | null
    Status: $Enums.PomoStatus | null
    StartTime: Date | null
    EndTime: Date | null
    PausedTime: number | null
    duration_seconds: number | null
    remaining_seconds: number | null
    timer_type: $Enums.TimerType | null
    last_updated: Date | null
  }

  export type Pomodoro_sessionsCountAggregateOutputType = {
    SessionId: number
    UserID: number
    Status: number
    StartTime: number
    EndTime: number
    PausedTime: number
    duration_seconds: number
    remaining_seconds: number
    timer_type: number
    last_updated: number
    _all: number
  }


  export type Pomodoro_sessionsAvgAggregateInputType = {
    SessionId?: true
    UserID?: true
    PausedTime?: true
    duration_seconds?: true
    remaining_seconds?: true
  }

  export type Pomodoro_sessionsSumAggregateInputType = {
    SessionId?: true
    UserID?: true
    PausedTime?: true
    duration_seconds?: true
    remaining_seconds?: true
  }

  export type Pomodoro_sessionsMinAggregateInputType = {
    SessionId?: true
    UserID?: true
    Status?: true
    StartTime?: true
    EndTime?: true
    PausedTime?: true
    duration_seconds?: true
    remaining_seconds?: true
    timer_type?: true
    last_updated?: true
  }

  export type Pomodoro_sessionsMaxAggregateInputType = {
    SessionId?: true
    UserID?: true
    Status?: true
    StartTime?: true
    EndTime?: true
    PausedTime?: true
    duration_seconds?: true
    remaining_seconds?: true
    timer_type?: true
    last_updated?: true
  }

  export type Pomodoro_sessionsCountAggregateInputType = {
    SessionId?: true
    UserID?: true
    Status?: true
    StartTime?: true
    EndTime?: true
    PausedTime?: true
    duration_seconds?: true
    remaining_seconds?: true
    timer_type?: true
    last_updated?: true
    _all?: true
  }

  export type Pomodoro_sessionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which pomodoro_sessions to aggregate.
     */
    where?: pomodoro_sessionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pomodoro_sessions to fetch.
     */
    orderBy?: pomodoro_sessionsOrderByWithRelationInput | pomodoro_sessionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: pomodoro_sessionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pomodoro_sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pomodoro_sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned pomodoro_sessions
    **/
    _count?: true | Pomodoro_sessionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Pomodoro_sessionsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Pomodoro_sessionsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Pomodoro_sessionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Pomodoro_sessionsMaxAggregateInputType
  }

  export type GetPomodoro_sessionsAggregateType<T extends Pomodoro_sessionsAggregateArgs> = {
        [P in keyof T & keyof AggregatePomodoro_sessions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePomodoro_sessions[P]>
      : GetScalarType<T[P], AggregatePomodoro_sessions[P]>
  }




  export type pomodoro_sessionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: pomodoro_sessionsWhereInput
    orderBy?: pomodoro_sessionsOrderByWithAggregationInput | pomodoro_sessionsOrderByWithAggregationInput[]
    by: Pomodoro_sessionsScalarFieldEnum[] | Pomodoro_sessionsScalarFieldEnum
    having?: pomodoro_sessionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Pomodoro_sessionsCountAggregateInputType | true
    _avg?: Pomodoro_sessionsAvgAggregateInputType
    _sum?: Pomodoro_sessionsSumAggregateInputType
    _min?: Pomodoro_sessionsMinAggregateInputType
    _max?: Pomodoro_sessionsMaxAggregateInputType
  }

  export type Pomodoro_sessionsGroupByOutputType = {
    SessionId: number
    UserID: number
    Status: $Enums.PomoStatus
    StartTime: Date
    EndTime: Date | null
    PausedTime: number
    duration_seconds: number
    remaining_seconds: number
    timer_type: $Enums.TimerType
    last_updated: Date
    _count: Pomodoro_sessionsCountAggregateOutputType | null
    _avg: Pomodoro_sessionsAvgAggregateOutputType | null
    _sum: Pomodoro_sessionsSumAggregateOutputType | null
    _min: Pomodoro_sessionsMinAggregateOutputType | null
    _max: Pomodoro_sessionsMaxAggregateOutputType | null
  }

  type GetPomodoro_sessionsGroupByPayload<T extends pomodoro_sessionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Pomodoro_sessionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Pomodoro_sessionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Pomodoro_sessionsGroupByOutputType[P]>
            : GetScalarType<T[P], Pomodoro_sessionsGroupByOutputType[P]>
        }
      >
    >


  export type pomodoro_sessionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    SessionId?: boolean
    UserID?: boolean
    Status?: boolean
    StartTime?: boolean
    EndTime?: boolean
    PausedTime?: boolean
    duration_seconds?: boolean
    remaining_seconds?: boolean
    timer_type?: boolean
    last_updated?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    pomodoro_task?: boolean | pomodoro_sessions$pomodoro_taskArgs<ExtArgs>
    _count?: boolean | Pomodoro_sessionsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pomodoro_sessions"]>

  export type pomodoro_sessionsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    SessionId?: boolean
    UserID?: boolean
    Status?: boolean
    StartTime?: boolean
    EndTime?: boolean
    PausedTime?: boolean
    duration_seconds?: boolean
    remaining_seconds?: boolean
    timer_type?: boolean
    last_updated?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pomodoro_sessions"]>

  export type pomodoro_sessionsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    SessionId?: boolean
    UserID?: boolean
    Status?: boolean
    StartTime?: boolean
    EndTime?: boolean
    PausedTime?: boolean
    duration_seconds?: boolean
    remaining_seconds?: boolean
    timer_type?: boolean
    last_updated?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pomodoro_sessions"]>

  export type pomodoro_sessionsSelectScalar = {
    SessionId?: boolean
    UserID?: boolean
    Status?: boolean
    StartTime?: boolean
    EndTime?: boolean
    PausedTime?: boolean
    duration_seconds?: boolean
    remaining_seconds?: boolean
    timer_type?: boolean
    last_updated?: boolean
  }

  export type pomodoro_sessionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"SessionId" | "UserID" | "Status" | "StartTime" | "EndTime" | "PausedTime" | "duration_seconds" | "remaining_seconds" | "timer_type" | "last_updated", ExtArgs["result"]["pomodoro_sessions"]>
  export type pomodoro_sessionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    pomodoro_task?: boolean | pomodoro_sessions$pomodoro_taskArgs<ExtArgs>
    _count?: boolean | Pomodoro_sessionsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type pomodoro_sessionsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type pomodoro_sessionsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $pomodoro_sessionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "pomodoro_sessions"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      pomodoro_task: Prisma.$pomodoro_taskPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      SessionId: number
      UserID: number
      Status: $Enums.PomoStatus
      StartTime: Date
      EndTime: Date | null
      PausedTime: number
      duration_seconds: number
      remaining_seconds: number
      timer_type: $Enums.TimerType
      last_updated: Date
    }, ExtArgs["result"]["pomodoro_sessions"]>
    composites: {}
  }

  type pomodoro_sessionsGetPayload<S extends boolean | null | undefined | pomodoro_sessionsDefaultArgs> = $Result.GetResult<Prisma.$pomodoro_sessionsPayload, S>

  type pomodoro_sessionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<pomodoro_sessionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Pomodoro_sessionsCountAggregateInputType | true
    }

  export interface pomodoro_sessionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['pomodoro_sessions'], meta: { name: 'pomodoro_sessions' } }
    /**
     * Find zero or one Pomodoro_sessions that matches the filter.
     * @param {pomodoro_sessionsFindUniqueArgs} args - Arguments to find a Pomodoro_sessions
     * @example
     * // Get one Pomodoro_sessions
     * const pomodoro_sessions = await prisma.pomodoro_sessions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends pomodoro_sessionsFindUniqueArgs>(args: SelectSubset<T, pomodoro_sessionsFindUniqueArgs<ExtArgs>>): Prisma__pomodoro_sessionsClient<$Result.GetResult<Prisma.$pomodoro_sessionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pomodoro_sessions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {pomodoro_sessionsFindUniqueOrThrowArgs} args - Arguments to find a Pomodoro_sessions
     * @example
     * // Get one Pomodoro_sessions
     * const pomodoro_sessions = await prisma.pomodoro_sessions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends pomodoro_sessionsFindUniqueOrThrowArgs>(args: SelectSubset<T, pomodoro_sessionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__pomodoro_sessionsClient<$Result.GetResult<Prisma.$pomodoro_sessionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pomodoro_sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pomodoro_sessionsFindFirstArgs} args - Arguments to find a Pomodoro_sessions
     * @example
     * // Get one Pomodoro_sessions
     * const pomodoro_sessions = await prisma.pomodoro_sessions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends pomodoro_sessionsFindFirstArgs>(args?: SelectSubset<T, pomodoro_sessionsFindFirstArgs<ExtArgs>>): Prisma__pomodoro_sessionsClient<$Result.GetResult<Prisma.$pomodoro_sessionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pomodoro_sessions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pomodoro_sessionsFindFirstOrThrowArgs} args - Arguments to find a Pomodoro_sessions
     * @example
     * // Get one Pomodoro_sessions
     * const pomodoro_sessions = await prisma.pomodoro_sessions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends pomodoro_sessionsFindFirstOrThrowArgs>(args?: SelectSubset<T, pomodoro_sessionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__pomodoro_sessionsClient<$Result.GetResult<Prisma.$pomodoro_sessionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pomodoro_sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pomodoro_sessionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pomodoro_sessions
     * const pomodoro_sessions = await prisma.pomodoro_sessions.findMany()
     * 
     * // Get first 10 Pomodoro_sessions
     * const pomodoro_sessions = await prisma.pomodoro_sessions.findMany({ take: 10 })
     * 
     * // Only select the `SessionId`
     * const pomodoro_sessionsWithSessionIdOnly = await prisma.pomodoro_sessions.findMany({ select: { SessionId: true } })
     * 
     */
    findMany<T extends pomodoro_sessionsFindManyArgs>(args?: SelectSubset<T, pomodoro_sessionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pomodoro_sessionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pomodoro_sessions.
     * @param {pomodoro_sessionsCreateArgs} args - Arguments to create a Pomodoro_sessions.
     * @example
     * // Create one Pomodoro_sessions
     * const Pomodoro_sessions = await prisma.pomodoro_sessions.create({
     *   data: {
     *     // ... data to create a Pomodoro_sessions
     *   }
     * })
     * 
     */
    create<T extends pomodoro_sessionsCreateArgs>(args: SelectSubset<T, pomodoro_sessionsCreateArgs<ExtArgs>>): Prisma__pomodoro_sessionsClient<$Result.GetResult<Prisma.$pomodoro_sessionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pomodoro_sessions.
     * @param {pomodoro_sessionsCreateManyArgs} args - Arguments to create many Pomodoro_sessions.
     * @example
     * // Create many Pomodoro_sessions
     * const pomodoro_sessions = await prisma.pomodoro_sessions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends pomodoro_sessionsCreateManyArgs>(args?: SelectSubset<T, pomodoro_sessionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pomodoro_sessions and returns the data saved in the database.
     * @param {pomodoro_sessionsCreateManyAndReturnArgs} args - Arguments to create many Pomodoro_sessions.
     * @example
     * // Create many Pomodoro_sessions
     * const pomodoro_sessions = await prisma.pomodoro_sessions.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pomodoro_sessions and only return the `SessionId`
     * const pomodoro_sessionsWithSessionIdOnly = await prisma.pomodoro_sessions.createManyAndReturn({
     *   select: { SessionId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends pomodoro_sessionsCreateManyAndReturnArgs>(args?: SelectSubset<T, pomodoro_sessionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pomodoro_sessionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pomodoro_sessions.
     * @param {pomodoro_sessionsDeleteArgs} args - Arguments to delete one Pomodoro_sessions.
     * @example
     * // Delete one Pomodoro_sessions
     * const Pomodoro_sessions = await prisma.pomodoro_sessions.delete({
     *   where: {
     *     // ... filter to delete one Pomodoro_sessions
     *   }
     * })
     * 
     */
    delete<T extends pomodoro_sessionsDeleteArgs>(args: SelectSubset<T, pomodoro_sessionsDeleteArgs<ExtArgs>>): Prisma__pomodoro_sessionsClient<$Result.GetResult<Prisma.$pomodoro_sessionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pomodoro_sessions.
     * @param {pomodoro_sessionsUpdateArgs} args - Arguments to update one Pomodoro_sessions.
     * @example
     * // Update one Pomodoro_sessions
     * const pomodoro_sessions = await prisma.pomodoro_sessions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends pomodoro_sessionsUpdateArgs>(args: SelectSubset<T, pomodoro_sessionsUpdateArgs<ExtArgs>>): Prisma__pomodoro_sessionsClient<$Result.GetResult<Prisma.$pomodoro_sessionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pomodoro_sessions.
     * @param {pomodoro_sessionsDeleteManyArgs} args - Arguments to filter Pomodoro_sessions to delete.
     * @example
     * // Delete a few Pomodoro_sessions
     * const { count } = await prisma.pomodoro_sessions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends pomodoro_sessionsDeleteManyArgs>(args?: SelectSubset<T, pomodoro_sessionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pomodoro_sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pomodoro_sessionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pomodoro_sessions
     * const pomodoro_sessions = await prisma.pomodoro_sessions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends pomodoro_sessionsUpdateManyArgs>(args: SelectSubset<T, pomodoro_sessionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pomodoro_sessions and returns the data updated in the database.
     * @param {pomodoro_sessionsUpdateManyAndReturnArgs} args - Arguments to update many Pomodoro_sessions.
     * @example
     * // Update many Pomodoro_sessions
     * const pomodoro_sessions = await prisma.pomodoro_sessions.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pomodoro_sessions and only return the `SessionId`
     * const pomodoro_sessionsWithSessionIdOnly = await prisma.pomodoro_sessions.updateManyAndReturn({
     *   select: { SessionId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends pomodoro_sessionsUpdateManyAndReturnArgs>(args: SelectSubset<T, pomodoro_sessionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pomodoro_sessionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pomodoro_sessions.
     * @param {pomodoro_sessionsUpsertArgs} args - Arguments to update or create a Pomodoro_sessions.
     * @example
     * // Update or create a Pomodoro_sessions
     * const pomodoro_sessions = await prisma.pomodoro_sessions.upsert({
     *   create: {
     *     // ... data to create a Pomodoro_sessions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pomodoro_sessions we want to update
     *   }
     * })
     */
    upsert<T extends pomodoro_sessionsUpsertArgs>(args: SelectSubset<T, pomodoro_sessionsUpsertArgs<ExtArgs>>): Prisma__pomodoro_sessionsClient<$Result.GetResult<Prisma.$pomodoro_sessionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pomodoro_sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pomodoro_sessionsCountArgs} args - Arguments to filter Pomodoro_sessions to count.
     * @example
     * // Count the number of Pomodoro_sessions
     * const count = await prisma.pomodoro_sessions.count({
     *   where: {
     *     // ... the filter for the Pomodoro_sessions we want to count
     *   }
     * })
    **/
    count<T extends pomodoro_sessionsCountArgs>(
      args?: Subset<T, pomodoro_sessionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Pomodoro_sessionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pomodoro_sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Pomodoro_sessionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Pomodoro_sessionsAggregateArgs>(args: Subset<T, Pomodoro_sessionsAggregateArgs>): Prisma.PrismaPromise<GetPomodoro_sessionsAggregateType<T>>

    /**
     * Group by Pomodoro_sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pomodoro_sessionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends pomodoro_sessionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: pomodoro_sessionsGroupByArgs['orderBy'] }
        : { orderBy?: pomodoro_sessionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, pomodoro_sessionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPomodoro_sessionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the pomodoro_sessions model
   */
  readonly fields: pomodoro_sessionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for pomodoro_sessions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__pomodoro_sessionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    pomodoro_task<T extends pomodoro_sessions$pomodoro_taskArgs<ExtArgs> = {}>(args?: Subset<T, pomodoro_sessions$pomodoro_taskArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pomodoro_taskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the pomodoro_sessions model
   */
  interface pomodoro_sessionsFieldRefs {
    readonly SessionId: FieldRef<"pomodoro_sessions", 'Int'>
    readonly UserID: FieldRef<"pomodoro_sessions", 'Int'>
    readonly Status: FieldRef<"pomodoro_sessions", 'PomoStatus'>
    readonly StartTime: FieldRef<"pomodoro_sessions", 'DateTime'>
    readonly EndTime: FieldRef<"pomodoro_sessions", 'DateTime'>
    readonly PausedTime: FieldRef<"pomodoro_sessions", 'Int'>
    readonly duration_seconds: FieldRef<"pomodoro_sessions", 'Int'>
    readonly remaining_seconds: FieldRef<"pomodoro_sessions", 'Int'>
    readonly timer_type: FieldRef<"pomodoro_sessions", 'TimerType'>
    readonly last_updated: FieldRef<"pomodoro_sessions", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * pomodoro_sessions findUnique
   */
  export type pomodoro_sessionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pomodoro_sessions
     */
    select?: pomodoro_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pomodoro_sessions
     */
    omit?: pomodoro_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pomodoro_sessionsInclude<ExtArgs> | null
    /**
     * Filter, which pomodoro_sessions to fetch.
     */
    where: pomodoro_sessionsWhereUniqueInput
  }

  /**
   * pomodoro_sessions findUniqueOrThrow
   */
  export type pomodoro_sessionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pomodoro_sessions
     */
    select?: pomodoro_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pomodoro_sessions
     */
    omit?: pomodoro_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pomodoro_sessionsInclude<ExtArgs> | null
    /**
     * Filter, which pomodoro_sessions to fetch.
     */
    where: pomodoro_sessionsWhereUniqueInput
  }

  /**
   * pomodoro_sessions findFirst
   */
  export type pomodoro_sessionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pomodoro_sessions
     */
    select?: pomodoro_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pomodoro_sessions
     */
    omit?: pomodoro_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pomodoro_sessionsInclude<ExtArgs> | null
    /**
     * Filter, which pomodoro_sessions to fetch.
     */
    where?: pomodoro_sessionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pomodoro_sessions to fetch.
     */
    orderBy?: pomodoro_sessionsOrderByWithRelationInput | pomodoro_sessionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for pomodoro_sessions.
     */
    cursor?: pomodoro_sessionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pomodoro_sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pomodoro_sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of pomodoro_sessions.
     */
    distinct?: Pomodoro_sessionsScalarFieldEnum | Pomodoro_sessionsScalarFieldEnum[]
  }

  /**
   * pomodoro_sessions findFirstOrThrow
   */
  export type pomodoro_sessionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pomodoro_sessions
     */
    select?: pomodoro_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pomodoro_sessions
     */
    omit?: pomodoro_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pomodoro_sessionsInclude<ExtArgs> | null
    /**
     * Filter, which pomodoro_sessions to fetch.
     */
    where?: pomodoro_sessionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pomodoro_sessions to fetch.
     */
    orderBy?: pomodoro_sessionsOrderByWithRelationInput | pomodoro_sessionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for pomodoro_sessions.
     */
    cursor?: pomodoro_sessionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pomodoro_sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pomodoro_sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of pomodoro_sessions.
     */
    distinct?: Pomodoro_sessionsScalarFieldEnum | Pomodoro_sessionsScalarFieldEnum[]
  }

  /**
   * pomodoro_sessions findMany
   */
  export type pomodoro_sessionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pomodoro_sessions
     */
    select?: pomodoro_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pomodoro_sessions
     */
    omit?: pomodoro_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pomodoro_sessionsInclude<ExtArgs> | null
    /**
     * Filter, which pomodoro_sessions to fetch.
     */
    where?: pomodoro_sessionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pomodoro_sessions to fetch.
     */
    orderBy?: pomodoro_sessionsOrderByWithRelationInput | pomodoro_sessionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing pomodoro_sessions.
     */
    cursor?: pomodoro_sessionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pomodoro_sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pomodoro_sessions.
     */
    skip?: number
    distinct?: Pomodoro_sessionsScalarFieldEnum | Pomodoro_sessionsScalarFieldEnum[]
  }

  /**
   * pomodoro_sessions create
   */
  export type pomodoro_sessionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pomodoro_sessions
     */
    select?: pomodoro_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pomodoro_sessions
     */
    omit?: pomodoro_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pomodoro_sessionsInclude<ExtArgs> | null
    /**
     * The data needed to create a pomodoro_sessions.
     */
    data: XOR<pomodoro_sessionsCreateInput, pomodoro_sessionsUncheckedCreateInput>
  }

  /**
   * pomodoro_sessions createMany
   */
  export type pomodoro_sessionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many pomodoro_sessions.
     */
    data: pomodoro_sessionsCreateManyInput | pomodoro_sessionsCreateManyInput[]
  }

  /**
   * pomodoro_sessions createManyAndReturn
   */
  export type pomodoro_sessionsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pomodoro_sessions
     */
    select?: pomodoro_sessionsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the pomodoro_sessions
     */
    omit?: pomodoro_sessionsOmit<ExtArgs> | null
    /**
     * The data used to create many pomodoro_sessions.
     */
    data: pomodoro_sessionsCreateManyInput | pomodoro_sessionsCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pomodoro_sessionsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * pomodoro_sessions update
   */
  export type pomodoro_sessionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pomodoro_sessions
     */
    select?: pomodoro_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pomodoro_sessions
     */
    omit?: pomodoro_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pomodoro_sessionsInclude<ExtArgs> | null
    /**
     * The data needed to update a pomodoro_sessions.
     */
    data: XOR<pomodoro_sessionsUpdateInput, pomodoro_sessionsUncheckedUpdateInput>
    /**
     * Choose, which pomodoro_sessions to update.
     */
    where: pomodoro_sessionsWhereUniqueInput
  }

  /**
   * pomodoro_sessions updateMany
   */
  export type pomodoro_sessionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update pomodoro_sessions.
     */
    data: XOR<pomodoro_sessionsUpdateManyMutationInput, pomodoro_sessionsUncheckedUpdateManyInput>
    /**
     * Filter which pomodoro_sessions to update
     */
    where?: pomodoro_sessionsWhereInput
    /**
     * Limit how many pomodoro_sessions to update.
     */
    limit?: number
  }

  /**
   * pomodoro_sessions updateManyAndReturn
   */
  export type pomodoro_sessionsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pomodoro_sessions
     */
    select?: pomodoro_sessionsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the pomodoro_sessions
     */
    omit?: pomodoro_sessionsOmit<ExtArgs> | null
    /**
     * The data used to update pomodoro_sessions.
     */
    data: XOR<pomodoro_sessionsUpdateManyMutationInput, pomodoro_sessionsUncheckedUpdateManyInput>
    /**
     * Filter which pomodoro_sessions to update
     */
    where?: pomodoro_sessionsWhereInput
    /**
     * Limit how many pomodoro_sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pomodoro_sessionsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * pomodoro_sessions upsert
   */
  export type pomodoro_sessionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pomodoro_sessions
     */
    select?: pomodoro_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pomodoro_sessions
     */
    omit?: pomodoro_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pomodoro_sessionsInclude<ExtArgs> | null
    /**
     * The filter to search for the pomodoro_sessions to update in case it exists.
     */
    where: pomodoro_sessionsWhereUniqueInput
    /**
     * In case the pomodoro_sessions found by the `where` argument doesn't exist, create a new pomodoro_sessions with this data.
     */
    create: XOR<pomodoro_sessionsCreateInput, pomodoro_sessionsUncheckedCreateInput>
    /**
     * In case the pomodoro_sessions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<pomodoro_sessionsUpdateInput, pomodoro_sessionsUncheckedUpdateInput>
  }

  /**
   * pomodoro_sessions delete
   */
  export type pomodoro_sessionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pomodoro_sessions
     */
    select?: pomodoro_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pomodoro_sessions
     */
    omit?: pomodoro_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pomodoro_sessionsInclude<ExtArgs> | null
    /**
     * Filter which pomodoro_sessions to delete.
     */
    where: pomodoro_sessionsWhereUniqueInput
  }

  /**
   * pomodoro_sessions deleteMany
   */
  export type pomodoro_sessionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which pomodoro_sessions to delete
     */
    where?: pomodoro_sessionsWhereInput
    /**
     * Limit how many pomodoro_sessions to delete.
     */
    limit?: number
  }

  /**
   * pomodoro_sessions.pomodoro_task
   */
  export type pomodoro_sessions$pomodoro_taskArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pomodoro_task
     */
    select?: pomodoro_taskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pomodoro_task
     */
    omit?: pomodoro_taskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pomodoro_taskInclude<ExtArgs> | null
    where?: pomodoro_taskWhereInput
    orderBy?: pomodoro_taskOrderByWithRelationInput | pomodoro_taskOrderByWithRelationInput[]
    cursor?: pomodoro_taskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Pomodoro_taskScalarFieldEnum | Pomodoro_taskScalarFieldEnum[]
  }

  /**
   * pomodoro_sessions without action
   */
  export type pomodoro_sessionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pomodoro_sessions
     */
    select?: pomodoro_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pomodoro_sessions
     */
    omit?: pomodoro_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pomodoro_sessionsInclude<ExtArgs> | null
  }


  /**
   * Model pomodoro_task
   */

  export type AggregatePomodoro_task = {
    _count: Pomodoro_taskCountAggregateOutputType | null
    _avg: Pomodoro_taskAvgAggregateOutputType | null
    _sum: Pomodoro_taskSumAggregateOutputType | null
    _min: Pomodoro_taskMinAggregateOutputType | null
    _max: Pomodoro_taskMaxAggregateOutputType | null
  }

  export type Pomodoro_taskAvgAggregateOutputType = {
    Pomo_TaskId: number | null
    Pomo_Task_Short: number | null
    Pomo_Task_Long: number | null
    Pomo_Completed_Count: number | null
    Pomo_Target_Count: number | null
    SessionId: number | null
  }

  export type Pomodoro_taskSumAggregateOutputType = {
    Pomo_TaskId: number | null
    Pomo_Task_Short: number | null
    Pomo_Task_Long: number | null
    Pomo_Completed_Count: number | null
    Pomo_Target_Count: number | null
    SessionId: number | null
  }

  export type Pomodoro_taskMinAggregateOutputType = {
    Pomo_TaskId: number | null
    Pomo_Task_Title: string | null
    Pomo_Task_Short: number | null
    Pomo_Task_Long: number | null
    Pomo_Task_Status: boolean | null
    Pomo_Completed_Count: number | null
    Pomo_Target_Count: number | null
    SessionId: number | null
  }

  export type Pomodoro_taskMaxAggregateOutputType = {
    Pomo_TaskId: number | null
    Pomo_Task_Title: string | null
    Pomo_Task_Short: number | null
    Pomo_Task_Long: number | null
    Pomo_Task_Status: boolean | null
    Pomo_Completed_Count: number | null
    Pomo_Target_Count: number | null
    SessionId: number | null
  }

  export type Pomodoro_taskCountAggregateOutputType = {
    Pomo_TaskId: number
    Pomo_Task_Title: number
    Pomo_Task_Short: number
    Pomo_Task_Long: number
    Pomo_Task_Status: number
    Pomo_Completed_Count: number
    Pomo_Target_Count: number
    SessionId: number
    _all: number
  }


  export type Pomodoro_taskAvgAggregateInputType = {
    Pomo_TaskId?: true
    Pomo_Task_Short?: true
    Pomo_Task_Long?: true
    Pomo_Completed_Count?: true
    Pomo_Target_Count?: true
    SessionId?: true
  }

  export type Pomodoro_taskSumAggregateInputType = {
    Pomo_TaskId?: true
    Pomo_Task_Short?: true
    Pomo_Task_Long?: true
    Pomo_Completed_Count?: true
    Pomo_Target_Count?: true
    SessionId?: true
  }

  export type Pomodoro_taskMinAggregateInputType = {
    Pomo_TaskId?: true
    Pomo_Task_Title?: true
    Pomo_Task_Short?: true
    Pomo_Task_Long?: true
    Pomo_Task_Status?: true
    Pomo_Completed_Count?: true
    Pomo_Target_Count?: true
    SessionId?: true
  }

  export type Pomodoro_taskMaxAggregateInputType = {
    Pomo_TaskId?: true
    Pomo_Task_Title?: true
    Pomo_Task_Short?: true
    Pomo_Task_Long?: true
    Pomo_Task_Status?: true
    Pomo_Completed_Count?: true
    Pomo_Target_Count?: true
    SessionId?: true
  }

  export type Pomodoro_taskCountAggregateInputType = {
    Pomo_TaskId?: true
    Pomo_Task_Title?: true
    Pomo_Task_Short?: true
    Pomo_Task_Long?: true
    Pomo_Task_Status?: true
    Pomo_Completed_Count?: true
    Pomo_Target_Count?: true
    SessionId?: true
    _all?: true
  }

  export type Pomodoro_taskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which pomodoro_task to aggregate.
     */
    where?: pomodoro_taskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pomodoro_tasks to fetch.
     */
    orderBy?: pomodoro_taskOrderByWithRelationInput | pomodoro_taskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: pomodoro_taskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pomodoro_tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pomodoro_tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned pomodoro_tasks
    **/
    _count?: true | Pomodoro_taskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Pomodoro_taskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Pomodoro_taskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Pomodoro_taskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Pomodoro_taskMaxAggregateInputType
  }

  export type GetPomodoro_taskAggregateType<T extends Pomodoro_taskAggregateArgs> = {
        [P in keyof T & keyof AggregatePomodoro_task]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePomodoro_task[P]>
      : GetScalarType<T[P], AggregatePomodoro_task[P]>
  }




  export type pomodoro_taskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: pomodoro_taskWhereInput
    orderBy?: pomodoro_taskOrderByWithAggregationInput | pomodoro_taskOrderByWithAggregationInput[]
    by: Pomodoro_taskScalarFieldEnum[] | Pomodoro_taskScalarFieldEnum
    having?: pomodoro_taskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Pomodoro_taskCountAggregateInputType | true
    _avg?: Pomodoro_taskAvgAggregateInputType
    _sum?: Pomodoro_taskSumAggregateInputType
    _min?: Pomodoro_taskMinAggregateInputType
    _max?: Pomodoro_taskMaxAggregateInputType
  }

  export type Pomodoro_taskGroupByOutputType = {
    Pomo_TaskId: number
    Pomo_Task_Title: string
    Pomo_Task_Short: number
    Pomo_Task_Long: number
    Pomo_Task_Status: boolean
    Pomo_Completed_Count: number
    Pomo_Target_Count: number
    SessionId: number
    _count: Pomodoro_taskCountAggregateOutputType | null
    _avg: Pomodoro_taskAvgAggregateOutputType | null
    _sum: Pomodoro_taskSumAggregateOutputType | null
    _min: Pomodoro_taskMinAggregateOutputType | null
    _max: Pomodoro_taskMaxAggregateOutputType | null
  }

  type GetPomodoro_taskGroupByPayload<T extends pomodoro_taskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Pomodoro_taskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Pomodoro_taskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Pomodoro_taskGroupByOutputType[P]>
            : GetScalarType<T[P], Pomodoro_taskGroupByOutputType[P]>
        }
      >
    >


  export type pomodoro_taskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    Pomo_TaskId?: boolean
    Pomo_Task_Title?: boolean
    Pomo_Task_Short?: boolean
    Pomo_Task_Long?: boolean
    Pomo_Task_Status?: boolean
    Pomo_Completed_Count?: boolean
    Pomo_Target_Count?: boolean
    SessionId?: boolean
    session?: boolean | pomodoro_sessionsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pomodoro_task"]>

  export type pomodoro_taskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    Pomo_TaskId?: boolean
    Pomo_Task_Title?: boolean
    Pomo_Task_Short?: boolean
    Pomo_Task_Long?: boolean
    Pomo_Task_Status?: boolean
    Pomo_Completed_Count?: boolean
    Pomo_Target_Count?: boolean
    SessionId?: boolean
    session?: boolean | pomodoro_sessionsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pomodoro_task"]>

  export type pomodoro_taskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    Pomo_TaskId?: boolean
    Pomo_Task_Title?: boolean
    Pomo_Task_Short?: boolean
    Pomo_Task_Long?: boolean
    Pomo_Task_Status?: boolean
    Pomo_Completed_Count?: boolean
    Pomo_Target_Count?: boolean
    SessionId?: boolean
    session?: boolean | pomodoro_sessionsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pomodoro_task"]>

  export type pomodoro_taskSelectScalar = {
    Pomo_TaskId?: boolean
    Pomo_Task_Title?: boolean
    Pomo_Task_Short?: boolean
    Pomo_Task_Long?: boolean
    Pomo_Task_Status?: boolean
    Pomo_Completed_Count?: boolean
    Pomo_Target_Count?: boolean
    SessionId?: boolean
  }

  export type pomodoro_taskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"Pomo_TaskId" | "Pomo_Task_Title" | "Pomo_Task_Short" | "Pomo_Task_Long" | "Pomo_Task_Status" | "Pomo_Completed_Count" | "Pomo_Target_Count" | "SessionId", ExtArgs["result"]["pomodoro_task"]>
  export type pomodoro_taskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | pomodoro_sessionsDefaultArgs<ExtArgs>
  }
  export type pomodoro_taskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | pomodoro_sessionsDefaultArgs<ExtArgs>
  }
  export type pomodoro_taskIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | pomodoro_sessionsDefaultArgs<ExtArgs>
  }

  export type $pomodoro_taskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "pomodoro_task"
    objects: {
      session: Prisma.$pomodoro_sessionsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      Pomo_TaskId: number
      Pomo_Task_Title: string
      Pomo_Task_Short: number
      Pomo_Task_Long: number
      Pomo_Task_Status: boolean
      Pomo_Completed_Count: number
      Pomo_Target_Count: number
      SessionId: number
    }, ExtArgs["result"]["pomodoro_task"]>
    composites: {}
  }

  type pomodoro_taskGetPayload<S extends boolean | null | undefined | pomodoro_taskDefaultArgs> = $Result.GetResult<Prisma.$pomodoro_taskPayload, S>

  type pomodoro_taskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<pomodoro_taskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Pomodoro_taskCountAggregateInputType | true
    }

  export interface pomodoro_taskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['pomodoro_task'], meta: { name: 'pomodoro_task' } }
    /**
     * Find zero or one Pomodoro_task that matches the filter.
     * @param {pomodoro_taskFindUniqueArgs} args - Arguments to find a Pomodoro_task
     * @example
     * // Get one Pomodoro_task
     * const pomodoro_task = await prisma.pomodoro_task.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends pomodoro_taskFindUniqueArgs>(args: SelectSubset<T, pomodoro_taskFindUniqueArgs<ExtArgs>>): Prisma__pomodoro_taskClient<$Result.GetResult<Prisma.$pomodoro_taskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pomodoro_task that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {pomodoro_taskFindUniqueOrThrowArgs} args - Arguments to find a Pomodoro_task
     * @example
     * // Get one Pomodoro_task
     * const pomodoro_task = await prisma.pomodoro_task.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends pomodoro_taskFindUniqueOrThrowArgs>(args: SelectSubset<T, pomodoro_taskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__pomodoro_taskClient<$Result.GetResult<Prisma.$pomodoro_taskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pomodoro_task that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pomodoro_taskFindFirstArgs} args - Arguments to find a Pomodoro_task
     * @example
     * // Get one Pomodoro_task
     * const pomodoro_task = await prisma.pomodoro_task.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends pomodoro_taskFindFirstArgs>(args?: SelectSubset<T, pomodoro_taskFindFirstArgs<ExtArgs>>): Prisma__pomodoro_taskClient<$Result.GetResult<Prisma.$pomodoro_taskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pomodoro_task that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pomodoro_taskFindFirstOrThrowArgs} args - Arguments to find a Pomodoro_task
     * @example
     * // Get one Pomodoro_task
     * const pomodoro_task = await prisma.pomodoro_task.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends pomodoro_taskFindFirstOrThrowArgs>(args?: SelectSubset<T, pomodoro_taskFindFirstOrThrowArgs<ExtArgs>>): Prisma__pomodoro_taskClient<$Result.GetResult<Prisma.$pomodoro_taskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pomodoro_tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pomodoro_taskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pomodoro_tasks
     * const pomodoro_tasks = await prisma.pomodoro_task.findMany()
     * 
     * // Get first 10 Pomodoro_tasks
     * const pomodoro_tasks = await prisma.pomodoro_task.findMany({ take: 10 })
     * 
     * // Only select the `Pomo_TaskId`
     * const pomodoro_taskWithPomo_TaskIdOnly = await prisma.pomodoro_task.findMany({ select: { Pomo_TaskId: true } })
     * 
     */
    findMany<T extends pomodoro_taskFindManyArgs>(args?: SelectSubset<T, pomodoro_taskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pomodoro_taskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pomodoro_task.
     * @param {pomodoro_taskCreateArgs} args - Arguments to create a Pomodoro_task.
     * @example
     * // Create one Pomodoro_task
     * const Pomodoro_task = await prisma.pomodoro_task.create({
     *   data: {
     *     // ... data to create a Pomodoro_task
     *   }
     * })
     * 
     */
    create<T extends pomodoro_taskCreateArgs>(args: SelectSubset<T, pomodoro_taskCreateArgs<ExtArgs>>): Prisma__pomodoro_taskClient<$Result.GetResult<Prisma.$pomodoro_taskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pomodoro_tasks.
     * @param {pomodoro_taskCreateManyArgs} args - Arguments to create many Pomodoro_tasks.
     * @example
     * // Create many Pomodoro_tasks
     * const pomodoro_task = await prisma.pomodoro_task.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends pomodoro_taskCreateManyArgs>(args?: SelectSubset<T, pomodoro_taskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pomodoro_tasks and returns the data saved in the database.
     * @param {pomodoro_taskCreateManyAndReturnArgs} args - Arguments to create many Pomodoro_tasks.
     * @example
     * // Create many Pomodoro_tasks
     * const pomodoro_task = await prisma.pomodoro_task.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pomodoro_tasks and only return the `Pomo_TaskId`
     * const pomodoro_taskWithPomo_TaskIdOnly = await prisma.pomodoro_task.createManyAndReturn({
     *   select: { Pomo_TaskId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends pomodoro_taskCreateManyAndReturnArgs>(args?: SelectSubset<T, pomodoro_taskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pomodoro_taskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pomodoro_task.
     * @param {pomodoro_taskDeleteArgs} args - Arguments to delete one Pomodoro_task.
     * @example
     * // Delete one Pomodoro_task
     * const Pomodoro_task = await prisma.pomodoro_task.delete({
     *   where: {
     *     // ... filter to delete one Pomodoro_task
     *   }
     * })
     * 
     */
    delete<T extends pomodoro_taskDeleteArgs>(args: SelectSubset<T, pomodoro_taskDeleteArgs<ExtArgs>>): Prisma__pomodoro_taskClient<$Result.GetResult<Prisma.$pomodoro_taskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pomodoro_task.
     * @param {pomodoro_taskUpdateArgs} args - Arguments to update one Pomodoro_task.
     * @example
     * // Update one Pomodoro_task
     * const pomodoro_task = await prisma.pomodoro_task.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends pomodoro_taskUpdateArgs>(args: SelectSubset<T, pomodoro_taskUpdateArgs<ExtArgs>>): Prisma__pomodoro_taskClient<$Result.GetResult<Prisma.$pomodoro_taskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pomodoro_tasks.
     * @param {pomodoro_taskDeleteManyArgs} args - Arguments to filter Pomodoro_tasks to delete.
     * @example
     * // Delete a few Pomodoro_tasks
     * const { count } = await prisma.pomodoro_task.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends pomodoro_taskDeleteManyArgs>(args?: SelectSubset<T, pomodoro_taskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pomodoro_tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pomodoro_taskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pomodoro_tasks
     * const pomodoro_task = await prisma.pomodoro_task.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends pomodoro_taskUpdateManyArgs>(args: SelectSubset<T, pomodoro_taskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pomodoro_tasks and returns the data updated in the database.
     * @param {pomodoro_taskUpdateManyAndReturnArgs} args - Arguments to update many Pomodoro_tasks.
     * @example
     * // Update many Pomodoro_tasks
     * const pomodoro_task = await prisma.pomodoro_task.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pomodoro_tasks and only return the `Pomo_TaskId`
     * const pomodoro_taskWithPomo_TaskIdOnly = await prisma.pomodoro_task.updateManyAndReturn({
     *   select: { Pomo_TaskId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends pomodoro_taskUpdateManyAndReturnArgs>(args: SelectSubset<T, pomodoro_taskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pomodoro_taskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pomodoro_task.
     * @param {pomodoro_taskUpsertArgs} args - Arguments to update or create a Pomodoro_task.
     * @example
     * // Update or create a Pomodoro_task
     * const pomodoro_task = await prisma.pomodoro_task.upsert({
     *   create: {
     *     // ... data to create a Pomodoro_task
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pomodoro_task we want to update
     *   }
     * })
     */
    upsert<T extends pomodoro_taskUpsertArgs>(args: SelectSubset<T, pomodoro_taskUpsertArgs<ExtArgs>>): Prisma__pomodoro_taskClient<$Result.GetResult<Prisma.$pomodoro_taskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pomodoro_tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pomodoro_taskCountArgs} args - Arguments to filter Pomodoro_tasks to count.
     * @example
     * // Count the number of Pomodoro_tasks
     * const count = await prisma.pomodoro_task.count({
     *   where: {
     *     // ... the filter for the Pomodoro_tasks we want to count
     *   }
     * })
    **/
    count<T extends pomodoro_taskCountArgs>(
      args?: Subset<T, pomodoro_taskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Pomodoro_taskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pomodoro_task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Pomodoro_taskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Pomodoro_taskAggregateArgs>(args: Subset<T, Pomodoro_taskAggregateArgs>): Prisma.PrismaPromise<GetPomodoro_taskAggregateType<T>>

    /**
     * Group by Pomodoro_task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pomodoro_taskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends pomodoro_taskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: pomodoro_taskGroupByArgs['orderBy'] }
        : { orderBy?: pomodoro_taskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, pomodoro_taskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPomodoro_taskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the pomodoro_task model
   */
  readonly fields: pomodoro_taskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for pomodoro_task.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__pomodoro_taskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    session<T extends pomodoro_sessionsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, pomodoro_sessionsDefaultArgs<ExtArgs>>): Prisma__pomodoro_sessionsClient<$Result.GetResult<Prisma.$pomodoro_sessionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the pomodoro_task model
   */
  interface pomodoro_taskFieldRefs {
    readonly Pomo_TaskId: FieldRef<"pomodoro_task", 'Int'>
    readonly Pomo_Task_Title: FieldRef<"pomodoro_task", 'String'>
    readonly Pomo_Task_Short: FieldRef<"pomodoro_task", 'Int'>
    readonly Pomo_Task_Long: FieldRef<"pomodoro_task", 'Int'>
    readonly Pomo_Task_Status: FieldRef<"pomodoro_task", 'Boolean'>
    readonly Pomo_Completed_Count: FieldRef<"pomodoro_task", 'Int'>
    readonly Pomo_Target_Count: FieldRef<"pomodoro_task", 'Int'>
    readonly SessionId: FieldRef<"pomodoro_task", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * pomodoro_task findUnique
   */
  export type pomodoro_taskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pomodoro_task
     */
    select?: pomodoro_taskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pomodoro_task
     */
    omit?: pomodoro_taskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pomodoro_taskInclude<ExtArgs> | null
    /**
     * Filter, which pomodoro_task to fetch.
     */
    where: pomodoro_taskWhereUniqueInput
  }

  /**
   * pomodoro_task findUniqueOrThrow
   */
  export type pomodoro_taskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pomodoro_task
     */
    select?: pomodoro_taskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pomodoro_task
     */
    omit?: pomodoro_taskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pomodoro_taskInclude<ExtArgs> | null
    /**
     * Filter, which pomodoro_task to fetch.
     */
    where: pomodoro_taskWhereUniqueInput
  }

  /**
   * pomodoro_task findFirst
   */
  export type pomodoro_taskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pomodoro_task
     */
    select?: pomodoro_taskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pomodoro_task
     */
    omit?: pomodoro_taskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pomodoro_taskInclude<ExtArgs> | null
    /**
     * Filter, which pomodoro_task to fetch.
     */
    where?: pomodoro_taskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pomodoro_tasks to fetch.
     */
    orderBy?: pomodoro_taskOrderByWithRelationInput | pomodoro_taskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for pomodoro_tasks.
     */
    cursor?: pomodoro_taskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pomodoro_tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pomodoro_tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of pomodoro_tasks.
     */
    distinct?: Pomodoro_taskScalarFieldEnum | Pomodoro_taskScalarFieldEnum[]
  }

  /**
   * pomodoro_task findFirstOrThrow
   */
  export type pomodoro_taskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pomodoro_task
     */
    select?: pomodoro_taskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pomodoro_task
     */
    omit?: pomodoro_taskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pomodoro_taskInclude<ExtArgs> | null
    /**
     * Filter, which pomodoro_task to fetch.
     */
    where?: pomodoro_taskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pomodoro_tasks to fetch.
     */
    orderBy?: pomodoro_taskOrderByWithRelationInput | pomodoro_taskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for pomodoro_tasks.
     */
    cursor?: pomodoro_taskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pomodoro_tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pomodoro_tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of pomodoro_tasks.
     */
    distinct?: Pomodoro_taskScalarFieldEnum | Pomodoro_taskScalarFieldEnum[]
  }

  /**
   * pomodoro_task findMany
   */
  export type pomodoro_taskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pomodoro_task
     */
    select?: pomodoro_taskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pomodoro_task
     */
    omit?: pomodoro_taskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pomodoro_taskInclude<ExtArgs> | null
    /**
     * Filter, which pomodoro_tasks to fetch.
     */
    where?: pomodoro_taskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pomodoro_tasks to fetch.
     */
    orderBy?: pomodoro_taskOrderByWithRelationInput | pomodoro_taskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing pomodoro_tasks.
     */
    cursor?: pomodoro_taskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pomodoro_tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pomodoro_tasks.
     */
    skip?: number
    distinct?: Pomodoro_taskScalarFieldEnum | Pomodoro_taskScalarFieldEnum[]
  }

  /**
   * pomodoro_task create
   */
  export type pomodoro_taskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pomodoro_task
     */
    select?: pomodoro_taskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pomodoro_task
     */
    omit?: pomodoro_taskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pomodoro_taskInclude<ExtArgs> | null
    /**
     * The data needed to create a pomodoro_task.
     */
    data: XOR<pomodoro_taskCreateInput, pomodoro_taskUncheckedCreateInput>
  }

  /**
   * pomodoro_task createMany
   */
  export type pomodoro_taskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many pomodoro_tasks.
     */
    data: pomodoro_taskCreateManyInput | pomodoro_taskCreateManyInput[]
  }

  /**
   * pomodoro_task createManyAndReturn
   */
  export type pomodoro_taskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pomodoro_task
     */
    select?: pomodoro_taskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the pomodoro_task
     */
    omit?: pomodoro_taskOmit<ExtArgs> | null
    /**
     * The data used to create many pomodoro_tasks.
     */
    data: pomodoro_taskCreateManyInput | pomodoro_taskCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pomodoro_taskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * pomodoro_task update
   */
  export type pomodoro_taskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pomodoro_task
     */
    select?: pomodoro_taskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pomodoro_task
     */
    omit?: pomodoro_taskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pomodoro_taskInclude<ExtArgs> | null
    /**
     * The data needed to update a pomodoro_task.
     */
    data: XOR<pomodoro_taskUpdateInput, pomodoro_taskUncheckedUpdateInput>
    /**
     * Choose, which pomodoro_task to update.
     */
    where: pomodoro_taskWhereUniqueInput
  }

  /**
   * pomodoro_task updateMany
   */
  export type pomodoro_taskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update pomodoro_tasks.
     */
    data: XOR<pomodoro_taskUpdateManyMutationInput, pomodoro_taskUncheckedUpdateManyInput>
    /**
     * Filter which pomodoro_tasks to update
     */
    where?: pomodoro_taskWhereInput
    /**
     * Limit how many pomodoro_tasks to update.
     */
    limit?: number
  }

  /**
   * pomodoro_task updateManyAndReturn
   */
  export type pomodoro_taskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pomodoro_task
     */
    select?: pomodoro_taskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the pomodoro_task
     */
    omit?: pomodoro_taskOmit<ExtArgs> | null
    /**
     * The data used to update pomodoro_tasks.
     */
    data: XOR<pomodoro_taskUpdateManyMutationInput, pomodoro_taskUncheckedUpdateManyInput>
    /**
     * Filter which pomodoro_tasks to update
     */
    where?: pomodoro_taskWhereInput
    /**
     * Limit how many pomodoro_tasks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pomodoro_taskIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * pomodoro_task upsert
   */
  export type pomodoro_taskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pomodoro_task
     */
    select?: pomodoro_taskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pomodoro_task
     */
    omit?: pomodoro_taskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pomodoro_taskInclude<ExtArgs> | null
    /**
     * The filter to search for the pomodoro_task to update in case it exists.
     */
    where: pomodoro_taskWhereUniqueInput
    /**
     * In case the pomodoro_task found by the `where` argument doesn't exist, create a new pomodoro_task with this data.
     */
    create: XOR<pomodoro_taskCreateInput, pomodoro_taskUncheckedCreateInput>
    /**
     * In case the pomodoro_task was found with the provided `where` argument, update it with this data.
     */
    update: XOR<pomodoro_taskUpdateInput, pomodoro_taskUncheckedUpdateInput>
  }

  /**
   * pomodoro_task delete
   */
  export type pomodoro_taskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pomodoro_task
     */
    select?: pomodoro_taskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pomodoro_task
     */
    omit?: pomodoro_taskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pomodoro_taskInclude<ExtArgs> | null
    /**
     * Filter which pomodoro_task to delete.
     */
    where: pomodoro_taskWhereUniqueInput
  }

  /**
   * pomodoro_task deleteMany
   */
  export type pomodoro_taskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which pomodoro_tasks to delete
     */
    where?: pomodoro_taskWhereInput
    /**
     * Limit how many pomodoro_tasks to delete.
     */
    limit?: number
  }

  /**
   * pomodoro_task without action
   */
  export type pomodoro_taskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pomodoro_task
     */
    select?: pomodoro_taskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pomodoro_task
     */
    omit?: pomodoro_taskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: pomodoro_taskInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    UserID: 'UserID',
    User_Email: 'User_Email',
    User_Password: 'User_Password'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const TaskScalarFieldEnum: {
    TaskID: 'TaskID',
    Task_Title: 'Task_Title',
    Task_Description: 'Task_Description',
    Task_Start_Date: 'Task_Start_Date',
    Task_End_Date: 'Task_End_Date',
    Task_Start_Time: 'Task_Start_Time',
    Task_End_Time: 'Task_End_Time',
    Task_Icon: 'Task_Icon',
    Task_Status: 'Task_Status',
    Task_Color: 'Task_Color',
    UserID: 'UserID'
  };

  export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum]


  export const ProfileScalarFieldEnum: {
    UserID: 'UserID',
    Username: 'Username',
    User_profile_icon_type: 'User_profile_icon_type',
    User_profile_icon_path: 'User_profile_icon_path'
  };

  export type ProfileScalarFieldEnum = (typeof ProfileScalarFieldEnum)[keyof typeof ProfileScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    CategoryId: 'CategoryId',
    Category_Name: 'Category_Name',
    Category_icon: 'Category_icon',
    Category_Color: 'Category_Color',
    Category_is_Primary: 'Category_is_Primary',
    userId: 'userId'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const Task_categoryScalarFieldEnum: {
    TaskID: 'TaskID',
    CategoryId: 'CategoryId'
  };

  export type Task_categoryScalarFieldEnum = (typeof Task_categoryScalarFieldEnum)[keyof typeof Task_categoryScalarFieldEnum]


  export const Pomodoro_sessionsScalarFieldEnum: {
    SessionId: 'SessionId',
    UserID: 'UserID',
    Status: 'Status',
    StartTime: 'StartTime',
    EndTime: 'EndTime',
    PausedTime: 'PausedTime',
    duration_seconds: 'duration_seconds',
    remaining_seconds: 'remaining_seconds',
    timer_type: 'timer_type',
    last_updated: 'last_updated'
  };

  export type Pomodoro_sessionsScalarFieldEnum = (typeof Pomodoro_sessionsScalarFieldEnum)[keyof typeof Pomodoro_sessionsScalarFieldEnum]


  export const Pomodoro_taskScalarFieldEnum: {
    Pomo_TaskId: 'Pomo_TaskId',
    Pomo_Task_Title: 'Pomo_Task_Title',
    Pomo_Task_Short: 'Pomo_Task_Short',
    Pomo_Task_Long: 'Pomo_Task_Long',
    Pomo_Task_Status: 'Pomo_Task_Status',
    Pomo_Completed_Count: 'Pomo_Completed_Count',
    Pomo_Target_Count: 'Pomo_Target_Count',
    SessionId: 'SessionId'
  };

  export type Pomodoro_taskScalarFieldEnum = (typeof Pomodoro_taskScalarFieldEnum)[keyof typeof Pomodoro_taskScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'TaskStatus'
   */
  export type EnumTaskStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaskStatus'>
    


  /**
   * Reference to a field of type 'IconType'
   */
  export type EnumIconTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'IconType'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'PomoStatus'
   */
  export type EnumPomoStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PomoStatus'>
    


  /**
   * Reference to a field of type 'TimerType'
   */
  export type EnumTimerTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TimerType'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    UserID?: IntFilter<"User"> | number
    User_Email?: StringFilter<"User"> | string
    User_Password?: StringFilter<"User"> | string
    profile?: XOR<ProfileNullableScalarRelationFilter, profileWhereInput> | null
    tasks?: TaskListRelationFilter
    category?: CategoryListRelationFilter
    pomodoro_sessions?: Pomodoro_sessionsListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    UserID?: SortOrder
    User_Email?: SortOrder
    User_Password?: SortOrder
    profile?: profileOrderByWithRelationInput
    tasks?: taskOrderByRelationAggregateInput
    category?: categoryOrderByRelationAggregateInput
    pomodoro_sessions?: pomodoro_sessionsOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    UserID?: number
    User_Email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    User_Password?: StringFilter<"User"> | string
    profile?: XOR<ProfileNullableScalarRelationFilter, profileWhereInput> | null
    tasks?: TaskListRelationFilter
    category?: CategoryListRelationFilter
    pomodoro_sessions?: Pomodoro_sessionsListRelationFilter
  }, "UserID" | "User_Email">

  export type UserOrderByWithAggregationInput = {
    UserID?: SortOrder
    User_Email?: SortOrder
    User_Password?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    UserID?: IntWithAggregatesFilter<"User"> | number
    User_Email?: StringWithAggregatesFilter<"User"> | string
    User_Password?: StringWithAggregatesFilter<"User"> | string
  }

  export type taskWhereInput = {
    AND?: taskWhereInput | taskWhereInput[]
    OR?: taskWhereInput[]
    NOT?: taskWhereInput | taskWhereInput[]
    TaskID?: IntFilter<"task"> | number
    Task_Title?: StringFilter<"task"> | string
    Task_Description?: StringNullableFilter<"task"> | string | null
    Task_Start_Date?: DateTimeNullableFilter<"task"> | Date | string | null
    Task_End_Date?: DateTimeNullableFilter<"task"> | Date | string | null
    Task_Start_Time?: DateTimeNullableFilter<"task"> | Date | string | null
    Task_End_Time?: DateTimeNullableFilter<"task"> | Date | string | null
    Task_Icon?: StringNullableFilter<"task"> | string | null
    Task_Status?: EnumTaskStatusFilter<"task"> | $Enums.TaskStatus
    Task_Color?: StringFilter<"task"> | string
    UserID?: IntFilter<"task"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    task_category?: Task_categoryListRelationFilter
  }

  export type taskOrderByWithRelationInput = {
    TaskID?: SortOrder
    Task_Title?: SortOrder
    Task_Description?: SortOrderInput | SortOrder
    Task_Start_Date?: SortOrderInput | SortOrder
    Task_End_Date?: SortOrderInput | SortOrder
    Task_Start_Time?: SortOrderInput | SortOrder
    Task_End_Time?: SortOrderInput | SortOrder
    Task_Icon?: SortOrderInput | SortOrder
    Task_Status?: SortOrder
    Task_Color?: SortOrder
    UserID?: SortOrder
    user?: UserOrderByWithRelationInput
    task_category?: task_categoryOrderByRelationAggregateInput
  }

  export type taskWhereUniqueInput = Prisma.AtLeast<{
    TaskID?: number
    AND?: taskWhereInput | taskWhereInput[]
    OR?: taskWhereInput[]
    NOT?: taskWhereInput | taskWhereInput[]
    Task_Title?: StringFilter<"task"> | string
    Task_Description?: StringNullableFilter<"task"> | string | null
    Task_Start_Date?: DateTimeNullableFilter<"task"> | Date | string | null
    Task_End_Date?: DateTimeNullableFilter<"task"> | Date | string | null
    Task_Start_Time?: DateTimeNullableFilter<"task"> | Date | string | null
    Task_End_Time?: DateTimeNullableFilter<"task"> | Date | string | null
    Task_Icon?: StringNullableFilter<"task"> | string | null
    Task_Status?: EnumTaskStatusFilter<"task"> | $Enums.TaskStatus
    Task_Color?: StringFilter<"task"> | string
    UserID?: IntFilter<"task"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    task_category?: Task_categoryListRelationFilter
  }, "TaskID">

  export type taskOrderByWithAggregationInput = {
    TaskID?: SortOrder
    Task_Title?: SortOrder
    Task_Description?: SortOrderInput | SortOrder
    Task_Start_Date?: SortOrderInput | SortOrder
    Task_End_Date?: SortOrderInput | SortOrder
    Task_Start_Time?: SortOrderInput | SortOrder
    Task_End_Time?: SortOrderInput | SortOrder
    Task_Icon?: SortOrderInput | SortOrder
    Task_Status?: SortOrder
    Task_Color?: SortOrder
    UserID?: SortOrder
    _count?: taskCountOrderByAggregateInput
    _avg?: taskAvgOrderByAggregateInput
    _max?: taskMaxOrderByAggregateInput
    _min?: taskMinOrderByAggregateInput
    _sum?: taskSumOrderByAggregateInput
  }

  export type taskScalarWhereWithAggregatesInput = {
    AND?: taskScalarWhereWithAggregatesInput | taskScalarWhereWithAggregatesInput[]
    OR?: taskScalarWhereWithAggregatesInput[]
    NOT?: taskScalarWhereWithAggregatesInput | taskScalarWhereWithAggregatesInput[]
    TaskID?: IntWithAggregatesFilter<"task"> | number
    Task_Title?: StringWithAggregatesFilter<"task"> | string
    Task_Description?: StringNullableWithAggregatesFilter<"task"> | string | null
    Task_Start_Date?: DateTimeNullableWithAggregatesFilter<"task"> | Date | string | null
    Task_End_Date?: DateTimeNullableWithAggregatesFilter<"task"> | Date | string | null
    Task_Start_Time?: DateTimeNullableWithAggregatesFilter<"task"> | Date | string | null
    Task_End_Time?: DateTimeNullableWithAggregatesFilter<"task"> | Date | string | null
    Task_Icon?: StringNullableWithAggregatesFilter<"task"> | string | null
    Task_Status?: EnumTaskStatusWithAggregatesFilter<"task"> | $Enums.TaskStatus
    Task_Color?: StringWithAggregatesFilter<"task"> | string
    UserID?: IntWithAggregatesFilter<"task"> | number
  }

  export type profileWhereInput = {
    AND?: profileWhereInput | profileWhereInput[]
    OR?: profileWhereInput[]
    NOT?: profileWhereInput | profileWhereInput[]
    UserID?: IntFilter<"profile"> | number
    Username?: StringNullableFilter<"profile"> | string | null
    User_profile_icon_type?: EnumIconTypeFilter<"profile"> | $Enums.IconType
    User_profile_icon_path?: StringFilter<"profile"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type profileOrderByWithRelationInput = {
    UserID?: SortOrder
    Username?: SortOrderInput | SortOrder
    User_profile_icon_type?: SortOrder
    User_profile_icon_path?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type profileWhereUniqueInput = Prisma.AtLeast<{
    UserID?: number
    AND?: profileWhereInput | profileWhereInput[]
    OR?: profileWhereInput[]
    NOT?: profileWhereInput | profileWhereInput[]
    Username?: StringNullableFilter<"profile"> | string | null
    User_profile_icon_type?: EnumIconTypeFilter<"profile"> | $Enums.IconType
    User_profile_icon_path?: StringFilter<"profile"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "UserID">

  export type profileOrderByWithAggregationInput = {
    UserID?: SortOrder
    Username?: SortOrderInput | SortOrder
    User_profile_icon_type?: SortOrder
    User_profile_icon_path?: SortOrder
    _count?: profileCountOrderByAggregateInput
    _avg?: profileAvgOrderByAggregateInput
    _max?: profileMaxOrderByAggregateInput
    _min?: profileMinOrderByAggregateInput
    _sum?: profileSumOrderByAggregateInput
  }

  export type profileScalarWhereWithAggregatesInput = {
    AND?: profileScalarWhereWithAggregatesInput | profileScalarWhereWithAggregatesInput[]
    OR?: profileScalarWhereWithAggregatesInput[]
    NOT?: profileScalarWhereWithAggregatesInput | profileScalarWhereWithAggregatesInput[]
    UserID?: IntWithAggregatesFilter<"profile"> | number
    Username?: StringNullableWithAggregatesFilter<"profile"> | string | null
    User_profile_icon_type?: EnumIconTypeWithAggregatesFilter<"profile"> | $Enums.IconType
    User_profile_icon_path?: StringWithAggregatesFilter<"profile"> | string
  }

  export type categoryWhereInput = {
    AND?: categoryWhereInput | categoryWhereInput[]
    OR?: categoryWhereInput[]
    NOT?: categoryWhereInput | categoryWhereInput[]
    CategoryId?: IntFilter<"category"> | number
    Category_Name?: StringFilter<"category"> | string
    Category_icon?: StringFilter<"category"> | string
    Category_Color?: StringFilter<"category"> | string
    Category_is_Primary?: BoolFilter<"category"> | boolean
    userId?: IntFilter<"category"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    task_category?: Task_categoryListRelationFilter
  }

  export type categoryOrderByWithRelationInput = {
    CategoryId?: SortOrder
    Category_Name?: SortOrder
    Category_icon?: SortOrder
    Category_Color?: SortOrder
    Category_is_Primary?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
    task_category?: task_categoryOrderByRelationAggregateInput
  }

  export type categoryWhereUniqueInput = Prisma.AtLeast<{
    CategoryId?: number
    AND?: categoryWhereInput | categoryWhereInput[]
    OR?: categoryWhereInput[]
    NOT?: categoryWhereInput | categoryWhereInput[]
    Category_Name?: StringFilter<"category"> | string
    Category_icon?: StringFilter<"category"> | string
    Category_Color?: StringFilter<"category"> | string
    Category_is_Primary?: BoolFilter<"category"> | boolean
    userId?: IntFilter<"category"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    task_category?: Task_categoryListRelationFilter
  }, "CategoryId">

  export type categoryOrderByWithAggregationInput = {
    CategoryId?: SortOrder
    Category_Name?: SortOrder
    Category_icon?: SortOrder
    Category_Color?: SortOrder
    Category_is_Primary?: SortOrder
    userId?: SortOrder
    _count?: categoryCountOrderByAggregateInput
    _avg?: categoryAvgOrderByAggregateInput
    _max?: categoryMaxOrderByAggregateInput
    _min?: categoryMinOrderByAggregateInput
    _sum?: categorySumOrderByAggregateInput
  }

  export type categoryScalarWhereWithAggregatesInput = {
    AND?: categoryScalarWhereWithAggregatesInput | categoryScalarWhereWithAggregatesInput[]
    OR?: categoryScalarWhereWithAggregatesInput[]
    NOT?: categoryScalarWhereWithAggregatesInput | categoryScalarWhereWithAggregatesInput[]
    CategoryId?: IntWithAggregatesFilter<"category"> | number
    Category_Name?: StringWithAggregatesFilter<"category"> | string
    Category_icon?: StringWithAggregatesFilter<"category"> | string
    Category_Color?: StringWithAggregatesFilter<"category"> | string
    Category_is_Primary?: BoolWithAggregatesFilter<"category"> | boolean
    userId?: IntWithAggregatesFilter<"category"> | number
  }

  export type task_categoryWhereInput = {
    AND?: task_categoryWhereInput | task_categoryWhereInput[]
    OR?: task_categoryWhereInput[]
    NOT?: task_categoryWhereInput | task_categoryWhereInput[]
    TaskID?: IntFilter<"task_category"> | number
    CategoryId?: IntFilter<"task_category"> | number
    task?: XOR<TaskScalarRelationFilter, taskWhereInput>
    category?: XOR<CategoryScalarRelationFilter, categoryWhereInput>
  }

  export type task_categoryOrderByWithRelationInput = {
    TaskID?: SortOrder
    CategoryId?: SortOrder
    task?: taskOrderByWithRelationInput
    category?: categoryOrderByWithRelationInput
  }

  export type task_categoryWhereUniqueInput = Prisma.AtLeast<{
    TaskID_CategoryId?: task_categoryTaskIDCategoryIdCompoundUniqueInput
    AND?: task_categoryWhereInput | task_categoryWhereInput[]
    OR?: task_categoryWhereInput[]
    NOT?: task_categoryWhereInput | task_categoryWhereInput[]
    TaskID?: IntFilter<"task_category"> | number
    CategoryId?: IntFilter<"task_category"> | number
    task?: XOR<TaskScalarRelationFilter, taskWhereInput>
    category?: XOR<CategoryScalarRelationFilter, categoryWhereInput>
  }, "TaskID_CategoryId">

  export type task_categoryOrderByWithAggregationInput = {
    TaskID?: SortOrder
    CategoryId?: SortOrder
    _count?: task_categoryCountOrderByAggregateInput
    _avg?: task_categoryAvgOrderByAggregateInput
    _max?: task_categoryMaxOrderByAggregateInput
    _min?: task_categoryMinOrderByAggregateInput
    _sum?: task_categorySumOrderByAggregateInput
  }

  export type task_categoryScalarWhereWithAggregatesInput = {
    AND?: task_categoryScalarWhereWithAggregatesInput | task_categoryScalarWhereWithAggregatesInput[]
    OR?: task_categoryScalarWhereWithAggregatesInput[]
    NOT?: task_categoryScalarWhereWithAggregatesInput | task_categoryScalarWhereWithAggregatesInput[]
    TaskID?: IntWithAggregatesFilter<"task_category"> | number
    CategoryId?: IntWithAggregatesFilter<"task_category"> | number
  }

  export type pomodoro_sessionsWhereInput = {
    AND?: pomodoro_sessionsWhereInput | pomodoro_sessionsWhereInput[]
    OR?: pomodoro_sessionsWhereInput[]
    NOT?: pomodoro_sessionsWhereInput | pomodoro_sessionsWhereInput[]
    SessionId?: IntFilter<"pomodoro_sessions"> | number
    UserID?: IntFilter<"pomodoro_sessions"> | number
    Status?: EnumPomoStatusFilter<"pomodoro_sessions"> | $Enums.PomoStatus
    StartTime?: DateTimeFilter<"pomodoro_sessions"> | Date | string
    EndTime?: DateTimeNullableFilter<"pomodoro_sessions"> | Date | string | null
    PausedTime?: IntFilter<"pomodoro_sessions"> | number
    duration_seconds?: IntFilter<"pomodoro_sessions"> | number
    remaining_seconds?: IntFilter<"pomodoro_sessions"> | number
    timer_type?: EnumTimerTypeFilter<"pomodoro_sessions"> | $Enums.TimerType
    last_updated?: DateTimeFilter<"pomodoro_sessions"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    pomodoro_task?: Pomodoro_taskListRelationFilter
  }

  export type pomodoro_sessionsOrderByWithRelationInput = {
    SessionId?: SortOrder
    UserID?: SortOrder
    Status?: SortOrder
    StartTime?: SortOrder
    EndTime?: SortOrderInput | SortOrder
    PausedTime?: SortOrder
    duration_seconds?: SortOrder
    remaining_seconds?: SortOrder
    timer_type?: SortOrder
    last_updated?: SortOrder
    user?: UserOrderByWithRelationInput
    pomodoro_task?: pomodoro_taskOrderByRelationAggregateInput
  }

  export type pomodoro_sessionsWhereUniqueInput = Prisma.AtLeast<{
    SessionId?: number
    AND?: pomodoro_sessionsWhereInput | pomodoro_sessionsWhereInput[]
    OR?: pomodoro_sessionsWhereInput[]
    NOT?: pomodoro_sessionsWhereInput | pomodoro_sessionsWhereInput[]
    UserID?: IntFilter<"pomodoro_sessions"> | number
    Status?: EnumPomoStatusFilter<"pomodoro_sessions"> | $Enums.PomoStatus
    StartTime?: DateTimeFilter<"pomodoro_sessions"> | Date | string
    EndTime?: DateTimeNullableFilter<"pomodoro_sessions"> | Date | string | null
    PausedTime?: IntFilter<"pomodoro_sessions"> | number
    duration_seconds?: IntFilter<"pomodoro_sessions"> | number
    remaining_seconds?: IntFilter<"pomodoro_sessions"> | number
    timer_type?: EnumTimerTypeFilter<"pomodoro_sessions"> | $Enums.TimerType
    last_updated?: DateTimeFilter<"pomodoro_sessions"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    pomodoro_task?: Pomodoro_taskListRelationFilter
  }, "SessionId">

  export type pomodoro_sessionsOrderByWithAggregationInput = {
    SessionId?: SortOrder
    UserID?: SortOrder
    Status?: SortOrder
    StartTime?: SortOrder
    EndTime?: SortOrderInput | SortOrder
    PausedTime?: SortOrder
    duration_seconds?: SortOrder
    remaining_seconds?: SortOrder
    timer_type?: SortOrder
    last_updated?: SortOrder
    _count?: pomodoro_sessionsCountOrderByAggregateInput
    _avg?: pomodoro_sessionsAvgOrderByAggregateInput
    _max?: pomodoro_sessionsMaxOrderByAggregateInput
    _min?: pomodoro_sessionsMinOrderByAggregateInput
    _sum?: pomodoro_sessionsSumOrderByAggregateInput
  }

  export type pomodoro_sessionsScalarWhereWithAggregatesInput = {
    AND?: pomodoro_sessionsScalarWhereWithAggregatesInput | pomodoro_sessionsScalarWhereWithAggregatesInput[]
    OR?: pomodoro_sessionsScalarWhereWithAggregatesInput[]
    NOT?: pomodoro_sessionsScalarWhereWithAggregatesInput | pomodoro_sessionsScalarWhereWithAggregatesInput[]
    SessionId?: IntWithAggregatesFilter<"pomodoro_sessions"> | number
    UserID?: IntWithAggregatesFilter<"pomodoro_sessions"> | number
    Status?: EnumPomoStatusWithAggregatesFilter<"pomodoro_sessions"> | $Enums.PomoStatus
    StartTime?: DateTimeWithAggregatesFilter<"pomodoro_sessions"> | Date | string
    EndTime?: DateTimeNullableWithAggregatesFilter<"pomodoro_sessions"> | Date | string | null
    PausedTime?: IntWithAggregatesFilter<"pomodoro_sessions"> | number
    duration_seconds?: IntWithAggregatesFilter<"pomodoro_sessions"> | number
    remaining_seconds?: IntWithAggregatesFilter<"pomodoro_sessions"> | number
    timer_type?: EnumTimerTypeWithAggregatesFilter<"pomodoro_sessions"> | $Enums.TimerType
    last_updated?: DateTimeWithAggregatesFilter<"pomodoro_sessions"> | Date | string
  }

  export type pomodoro_taskWhereInput = {
    AND?: pomodoro_taskWhereInput | pomodoro_taskWhereInput[]
    OR?: pomodoro_taskWhereInput[]
    NOT?: pomodoro_taskWhereInput | pomodoro_taskWhereInput[]
    Pomo_TaskId?: IntFilter<"pomodoro_task"> | number
    Pomo_Task_Title?: StringFilter<"pomodoro_task"> | string
    Pomo_Task_Short?: IntFilter<"pomodoro_task"> | number
    Pomo_Task_Long?: IntFilter<"pomodoro_task"> | number
    Pomo_Task_Status?: BoolFilter<"pomodoro_task"> | boolean
    Pomo_Completed_Count?: IntFilter<"pomodoro_task"> | number
    Pomo_Target_Count?: IntFilter<"pomodoro_task"> | number
    SessionId?: IntFilter<"pomodoro_task"> | number
    session?: XOR<Pomodoro_sessionsScalarRelationFilter, pomodoro_sessionsWhereInput>
  }

  export type pomodoro_taskOrderByWithRelationInput = {
    Pomo_TaskId?: SortOrder
    Pomo_Task_Title?: SortOrder
    Pomo_Task_Short?: SortOrder
    Pomo_Task_Long?: SortOrder
    Pomo_Task_Status?: SortOrder
    Pomo_Completed_Count?: SortOrder
    Pomo_Target_Count?: SortOrder
    SessionId?: SortOrder
    session?: pomodoro_sessionsOrderByWithRelationInput
  }

  export type pomodoro_taskWhereUniqueInput = Prisma.AtLeast<{
    Pomo_TaskId?: number
    AND?: pomodoro_taskWhereInput | pomodoro_taskWhereInput[]
    OR?: pomodoro_taskWhereInput[]
    NOT?: pomodoro_taskWhereInput | pomodoro_taskWhereInput[]
    Pomo_Task_Title?: StringFilter<"pomodoro_task"> | string
    Pomo_Task_Short?: IntFilter<"pomodoro_task"> | number
    Pomo_Task_Long?: IntFilter<"pomodoro_task"> | number
    Pomo_Task_Status?: BoolFilter<"pomodoro_task"> | boolean
    Pomo_Completed_Count?: IntFilter<"pomodoro_task"> | number
    Pomo_Target_Count?: IntFilter<"pomodoro_task"> | number
    SessionId?: IntFilter<"pomodoro_task"> | number
    session?: XOR<Pomodoro_sessionsScalarRelationFilter, pomodoro_sessionsWhereInput>
  }, "Pomo_TaskId">

  export type pomodoro_taskOrderByWithAggregationInput = {
    Pomo_TaskId?: SortOrder
    Pomo_Task_Title?: SortOrder
    Pomo_Task_Short?: SortOrder
    Pomo_Task_Long?: SortOrder
    Pomo_Task_Status?: SortOrder
    Pomo_Completed_Count?: SortOrder
    Pomo_Target_Count?: SortOrder
    SessionId?: SortOrder
    _count?: pomodoro_taskCountOrderByAggregateInput
    _avg?: pomodoro_taskAvgOrderByAggregateInput
    _max?: pomodoro_taskMaxOrderByAggregateInput
    _min?: pomodoro_taskMinOrderByAggregateInput
    _sum?: pomodoro_taskSumOrderByAggregateInput
  }

  export type pomodoro_taskScalarWhereWithAggregatesInput = {
    AND?: pomodoro_taskScalarWhereWithAggregatesInput | pomodoro_taskScalarWhereWithAggregatesInput[]
    OR?: pomodoro_taskScalarWhereWithAggregatesInput[]
    NOT?: pomodoro_taskScalarWhereWithAggregatesInput | pomodoro_taskScalarWhereWithAggregatesInput[]
    Pomo_TaskId?: IntWithAggregatesFilter<"pomodoro_task"> | number
    Pomo_Task_Title?: StringWithAggregatesFilter<"pomodoro_task"> | string
    Pomo_Task_Short?: IntWithAggregatesFilter<"pomodoro_task"> | number
    Pomo_Task_Long?: IntWithAggregatesFilter<"pomodoro_task"> | number
    Pomo_Task_Status?: BoolWithAggregatesFilter<"pomodoro_task"> | boolean
    Pomo_Completed_Count?: IntWithAggregatesFilter<"pomodoro_task"> | number
    Pomo_Target_Count?: IntWithAggregatesFilter<"pomodoro_task"> | number
    SessionId?: IntWithAggregatesFilter<"pomodoro_task"> | number
  }

  export type UserCreateInput = {
    User_Email: string
    User_Password: string
    profile?: profileCreateNestedOneWithoutUserInput
    tasks?: taskCreateNestedManyWithoutUserInput
    category?: categoryCreateNestedManyWithoutUserInput
    pomodoro_sessions?: pomodoro_sessionsCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    UserID?: number
    User_Email: string
    User_Password: string
    profile?: profileUncheckedCreateNestedOneWithoutUserInput
    tasks?: taskUncheckedCreateNestedManyWithoutUserInput
    category?: categoryUncheckedCreateNestedManyWithoutUserInput
    pomodoro_sessions?: pomodoro_sessionsUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    User_Email?: StringFieldUpdateOperationsInput | string
    User_Password?: StringFieldUpdateOperationsInput | string
    profile?: profileUpdateOneWithoutUserNestedInput
    tasks?: taskUpdateManyWithoutUserNestedInput
    category?: categoryUpdateManyWithoutUserNestedInput
    pomodoro_sessions?: pomodoro_sessionsUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    UserID?: IntFieldUpdateOperationsInput | number
    User_Email?: StringFieldUpdateOperationsInput | string
    User_Password?: StringFieldUpdateOperationsInput | string
    profile?: profileUncheckedUpdateOneWithoutUserNestedInput
    tasks?: taskUncheckedUpdateManyWithoutUserNestedInput
    category?: categoryUncheckedUpdateManyWithoutUserNestedInput
    pomodoro_sessions?: pomodoro_sessionsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    UserID?: number
    User_Email: string
    User_Password: string
  }

  export type UserUpdateManyMutationInput = {
    User_Email?: StringFieldUpdateOperationsInput | string
    User_Password?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    UserID?: IntFieldUpdateOperationsInput | number
    User_Email?: StringFieldUpdateOperationsInput | string
    User_Password?: StringFieldUpdateOperationsInput | string
  }

  export type taskCreateInput = {
    Task_Title: string
    Task_Description?: string | null
    Task_Start_Date?: Date | string | null
    Task_End_Date?: Date | string | null
    Task_Start_Time?: Date | string | null
    Task_End_Time?: Date | string | null
    Task_Icon?: string | null
    Task_Status?: $Enums.TaskStatus
    Task_Color: string
    user: UserCreateNestedOneWithoutTasksInput
    task_category?: task_categoryCreateNestedManyWithoutTaskInput
  }

  export type taskUncheckedCreateInput = {
    TaskID?: number
    Task_Title: string
    Task_Description?: string | null
    Task_Start_Date?: Date | string | null
    Task_End_Date?: Date | string | null
    Task_Start_Time?: Date | string | null
    Task_End_Time?: Date | string | null
    Task_Icon?: string | null
    Task_Status?: $Enums.TaskStatus
    Task_Color: string
    UserID: number
    task_category?: task_categoryUncheckedCreateNestedManyWithoutTaskInput
  }

  export type taskUpdateInput = {
    Task_Title?: StringFieldUpdateOperationsInput | string
    Task_Description?: NullableStringFieldUpdateOperationsInput | string | null
    Task_Start_Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Task_End_Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Task_Start_Time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Task_End_Time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Task_Icon?: NullableStringFieldUpdateOperationsInput | string | null
    Task_Status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    Task_Color?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutTasksNestedInput
    task_category?: task_categoryUpdateManyWithoutTaskNestedInput
  }

  export type taskUncheckedUpdateInput = {
    TaskID?: IntFieldUpdateOperationsInput | number
    Task_Title?: StringFieldUpdateOperationsInput | string
    Task_Description?: NullableStringFieldUpdateOperationsInput | string | null
    Task_Start_Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Task_End_Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Task_Start_Time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Task_End_Time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Task_Icon?: NullableStringFieldUpdateOperationsInput | string | null
    Task_Status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    Task_Color?: StringFieldUpdateOperationsInput | string
    UserID?: IntFieldUpdateOperationsInput | number
    task_category?: task_categoryUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type taskCreateManyInput = {
    TaskID?: number
    Task_Title: string
    Task_Description?: string | null
    Task_Start_Date?: Date | string | null
    Task_End_Date?: Date | string | null
    Task_Start_Time?: Date | string | null
    Task_End_Time?: Date | string | null
    Task_Icon?: string | null
    Task_Status?: $Enums.TaskStatus
    Task_Color: string
    UserID: number
  }

  export type taskUpdateManyMutationInput = {
    Task_Title?: StringFieldUpdateOperationsInput | string
    Task_Description?: NullableStringFieldUpdateOperationsInput | string | null
    Task_Start_Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Task_End_Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Task_Start_Time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Task_End_Time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Task_Icon?: NullableStringFieldUpdateOperationsInput | string | null
    Task_Status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    Task_Color?: StringFieldUpdateOperationsInput | string
  }

  export type taskUncheckedUpdateManyInput = {
    TaskID?: IntFieldUpdateOperationsInput | number
    Task_Title?: StringFieldUpdateOperationsInput | string
    Task_Description?: NullableStringFieldUpdateOperationsInput | string | null
    Task_Start_Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Task_End_Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Task_Start_Time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Task_End_Time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Task_Icon?: NullableStringFieldUpdateOperationsInput | string | null
    Task_Status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    Task_Color?: StringFieldUpdateOperationsInput | string
    UserID?: IntFieldUpdateOperationsInput | number
  }

  export type profileCreateInput = {
    Username?: string | null
    User_profile_icon_type?: $Enums.IconType
    User_profile_icon_path: string
    user: UserCreateNestedOneWithoutProfileInput
  }

  export type profileUncheckedCreateInput = {
    UserID: number
    Username?: string | null
    User_profile_icon_type?: $Enums.IconType
    User_profile_icon_path: string
  }

  export type profileUpdateInput = {
    Username?: NullableStringFieldUpdateOperationsInput | string | null
    User_profile_icon_type?: EnumIconTypeFieldUpdateOperationsInput | $Enums.IconType
    User_profile_icon_path?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutProfileNestedInput
  }

  export type profileUncheckedUpdateInput = {
    UserID?: IntFieldUpdateOperationsInput | number
    Username?: NullableStringFieldUpdateOperationsInput | string | null
    User_profile_icon_type?: EnumIconTypeFieldUpdateOperationsInput | $Enums.IconType
    User_profile_icon_path?: StringFieldUpdateOperationsInput | string
  }

  export type profileCreateManyInput = {
    UserID: number
    Username?: string | null
    User_profile_icon_type?: $Enums.IconType
    User_profile_icon_path: string
  }

  export type profileUpdateManyMutationInput = {
    Username?: NullableStringFieldUpdateOperationsInput | string | null
    User_profile_icon_type?: EnumIconTypeFieldUpdateOperationsInput | $Enums.IconType
    User_profile_icon_path?: StringFieldUpdateOperationsInput | string
  }

  export type profileUncheckedUpdateManyInput = {
    UserID?: IntFieldUpdateOperationsInput | number
    Username?: NullableStringFieldUpdateOperationsInput | string | null
    User_profile_icon_type?: EnumIconTypeFieldUpdateOperationsInput | $Enums.IconType
    User_profile_icon_path?: StringFieldUpdateOperationsInput | string
  }

  export type categoryCreateInput = {
    Category_Name: string
    Category_icon: string
    Category_Color?: string
    Category_is_Primary?: boolean
    user: UserCreateNestedOneWithoutCategoryInput
    task_category?: task_categoryCreateNestedManyWithoutCategoryInput
  }

  export type categoryUncheckedCreateInput = {
    CategoryId?: number
    Category_Name: string
    Category_icon: string
    Category_Color?: string
    Category_is_Primary?: boolean
    userId: number
    task_category?: task_categoryUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type categoryUpdateInput = {
    Category_Name?: StringFieldUpdateOperationsInput | string
    Category_icon?: StringFieldUpdateOperationsInput | string
    Category_Color?: StringFieldUpdateOperationsInput | string
    Category_is_Primary?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutCategoryNestedInput
    task_category?: task_categoryUpdateManyWithoutCategoryNestedInput
  }

  export type categoryUncheckedUpdateInput = {
    CategoryId?: IntFieldUpdateOperationsInput | number
    Category_Name?: StringFieldUpdateOperationsInput | string
    Category_icon?: StringFieldUpdateOperationsInput | string
    Category_Color?: StringFieldUpdateOperationsInput | string
    Category_is_Primary?: BoolFieldUpdateOperationsInput | boolean
    userId?: IntFieldUpdateOperationsInput | number
    task_category?: task_categoryUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type categoryCreateManyInput = {
    CategoryId?: number
    Category_Name: string
    Category_icon: string
    Category_Color?: string
    Category_is_Primary?: boolean
    userId: number
  }

  export type categoryUpdateManyMutationInput = {
    Category_Name?: StringFieldUpdateOperationsInput | string
    Category_icon?: StringFieldUpdateOperationsInput | string
    Category_Color?: StringFieldUpdateOperationsInput | string
    Category_is_Primary?: BoolFieldUpdateOperationsInput | boolean
  }

  export type categoryUncheckedUpdateManyInput = {
    CategoryId?: IntFieldUpdateOperationsInput | number
    Category_Name?: StringFieldUpdateOperationsInput | string
    Category_icon?: StringFieldUpdateOperationsInput | string
    Category_Color?: StringFieldUpdateOperationsInput | string
    Category_is_Primary?: BoolFieldUpdateOperationsInput | boolean
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type task_categoryCreateInput = {
    task: taskCreateNestedOneWithoutTask_categoryInput
    category: categoryCreateNestedOneWithoutTask_categoryInput
  }

  export type task_categoryUncheckedCreateInput = {
    TaskID: number
    CategoryId: number
  }

  export type task_categoryUpdateInput = {
    task?: taskUpdateOneRequiredWithoutTask_categoryNestedInput
    category?: categoryUpdateOneRequiredWithoutTask_categoryNestedInput
  }

  export type task_categoryUncheckedUpdateInput = {
    TaskID?: IntFieldUpdateOperationsInput | number
    CategoryId?: IntFieldUpdateOperationsInput | number
  }

  export type task_categoryCreateManyInput = {
    TaskID: number
    CategoryId: number
  }

  export type task_categoryUpdateManyMutationInput = {

  }

  export type task_categoryUncheckedUpdateManyInput = {
    TaskID?: IntFieldUpdateOperationsInput | number
    CategoryId?: IntFieldUpdateOperationsInput | number
  }

  export type pomodoro_sessionsCreateInput = {
    Status: $Enums.PomoStatus
    StartTime: Date | string
    EndTime?: Date | string | null
    PausedTime: number
    duration_seconds?: number
    remaining_seconds?: number
    timer_type: $Enums.TimerType
    last_updated?: Date | string
    user: UserCreateNestedOneWithoutPomodoro_sessionsInput
    pomodoro_task?: pomodoro_taskCreateNestedManyWithoutSessionInput
  }

  export type pomodoro_sessionsUncheckedCreateInput = {
    SessionId?: number
    UserID: number
    Status: $Enums.PomoStatus
    StartTime: Date | string
    EndTime?: Date | string | null
    PausedTime: number
    duration_seconds?: number
    remaining_seconds?: number
    timer_type: $Enums.TimerType
    last_updated?: Date | string
    pomodoro_task?: pomodoro_taskUncheckedCreateNestedManyWithoutSessionInput
  }

  export type pomodoro_sessionsUpdateInput = {
    Status?: EnumPomoStatusFieldUpdateOperationsInput | $Enums.PomoStatus
    StartTime?: DateTimeFieldUpdateOperationsInput | Date | string
    EndTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    PausedTime?: IntFieldUpdateOperationsInput | number
    duration_seconds?: IntFieldUpdateOperationsInput | number
    remaining_seconds?: IntFieldUpdateOperationsInput | number
    timer_type?: EnumTimerTypeFieldUpdateOperationsInput | $Enums.TimerType
    last_updated?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPomodoro_sessionsNestedInput
    pomodoro_task?: pomodoro_taskUpdateManyWithoutSessionNestedInput
  }

  export type pomodoro_sessionsUncheckedUpdateInput = {
    SessionId?: IntFieldUpdateOperationsInput | number
    UserID?: IntFieldUpdateOperationsInput | number
    Status?: EnumPomoStatusFieldUpdateOperationsInput | $Enums.PomoStatus
    StartTime?: DateTimeFieldUpdateOperationsInput | Date | string
    EndTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    PausedTime?: IntFieldUpdateOperationsInput | number
    duration_seconds?: IntFieldUpdateOperationsInput | number
    remaining_seconds?: IntFieldUpdateOperationsInput | number
    timer_type?: EnumTimerTypeFieldUpdateOperationsInput | $Enums.TimerType
    last_updated?: DateTimeFieldUpdateOperationsInput | Date | string
    pomodoro_task?: pomodoro_taskUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type pomodoro_sessionsCreateManyInput = {
    SessionId?: number
    UserID: number
    Status: $Enums.PomoStatus
    StartTime: Date | string
    EndTime?: Date | string | null
    PausedTime: number
    duration_seconds?: number
    remaining_seconds?: number
    timer_type: $Enums.TimerType
    last_updated?: Date | string
  }

  export type pomodoro_sessionsUpdateManyMutationInput = {
    Status?: EnumPomoStatusFieldUpdateOperationsInput | $Enums.PomoStatus
    StartTime?: DateTimeFieldUpdateOperationsInput | Date | string
    EndTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    PausedTime?: IntFieldUpdateOperationsInput | number
    duration_seconds?: IntFieldUpdateOperationsInput | number
    remaining_seconds?: IntFieldUpdateOperationsInput | number
    timer_type?: EnumTimerTypeFieldUpdateOperationsInput | $Enums.TimerType
    last_updated?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type pomodoro_sessionsUncheckedUpdateManyInput = {
    SessionId?: IntFieldUpdateOperationsInput | number
    UserID?: IntFieldUpdateOperationsInput | number
    Status?: EnumPomoStatusFieldUpdateOperationsInput | $Enums.PomoStatus
    StartTime?: DateTimeFieldUpdateOperationsInput | Date | string
    EndTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    PausedTime?: IntFieldUpdateOperationsInput | number
    duration_seconds?: IntFieldUpdateOperationsInput | number
    remaining_seconds?: IntFieldUpdateOperationsInput | number
    timer_type?: EnumTimerTypeFieldUpdateOperationsInput | $Enums.TimerType
    last_updated?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type pomodoro_taskCreateInput = {
    Pomo_Task_Title: string
    Pomo_Task_Short?: number
    Pomo_Task_Long?: number
    Pomo_Task_Status?: boolean
    Pomo_Completed_Count?: number
    Pomo_Target_Count?: number
    SessionId?: number
    session: pomodoro_sessionsCreateNestedOneWithoutPomodoro_taskInput
  }

  export type pomodoro_taskUncheckedCreateInput = {
    Pomo_TaskId?: number
    Pomo_Task_Title: string
    Pomo_Task_Short?: number
    Pomo_Task_Long?: number
    Pomo_Task_Status?: boolean
    Pomo_Completed_Count?: number
    Pomo_Target_Count?: number
    SessionId: number
  }

  export type pomodoro_taskUpdateInput = {
    Pomo_Task_Title?: StringFieldUpdateOperationsInput | string
    Pomo_Task_Short?: IntFieldUpdateOperationsInput | number
    Pomo_Task_Long?: IntFieldUpdateOperationsInput | number
    Pomo_Task_Status?: BoolFieldUpdateOperationsInput | boolean
    Pomo_Completed_Count?: IntFieldUpdateOperationsInput | number
    Pomo_Target_Count?: IntFieldUpdateOperationsInput | number
    session?: pomodoro_sessionsUpdateOneRequiredWithoutPomodoro_taskNestedInput
  }

  export type pomodoro_taskUncheckedUpdateInput = {
    Pomo_TaskId?: IntFieldUpdateOperationsInput | number
    Pomo_Task_Title?: StringFieldUpdateOperationsInput | string
    Pomo_Task_Short?: IntFieldUpdateOperationsInput | number
    Pomo_Task_Long?: IntFieldUpdateOperationsInput | number
    Pomo_Task_Status?: BoolFieldUpdateOperationsInput | boolean
    Pomo_Completed_Count?: IntFieldUpdateOperationsInput | number
    Pomo_Target_Count?: IntFieldUpdateOperationsInput | number
    SessionId?: IntFieldUpdateOperationsInput | number
  }

  export type pomodoro_taskCreateManyInput = {
    Pomo_TaskId?: number
    Pomo_Task_Title: string
    Pomo_Task_Short?: number
    Pomo_Task_Long?: number
    Pomo_Task_Status?: boolean
    Pomo_Completed_Count?: number
    Pomo_Target_Count?: number
    SessionId: number
  }

  export type pomodoro_taskUpdateManyMutationInput = {
    Pomo_Task_Title?: StringFieldUpdateOperationsInput | string
    Pomo_Task_Short?: IntFieldUpdateOperationsInput | number
    Pomo_Task_Long?: IntFieldUpdateOperationsInput | number
    Pomo_Task_Status?: BoolFieldUpdateOperationsInput | boolean
    Pomo_Completed_Count?: IntFieldUpdateOperationsInput | number
    Pomo_Target_Count?: IntFieldUpdateOperationsInput | number
  }

  export type pomodoro_taskUncheckedUpdateManyInput = {
    Pomo_TaskId?: IntFieldUpdateOperationsInput | number
    Pomo_Task_Title?: StringFieldUpdateOperationsInput | string
    Pomo_Task_Short?: IntFieldUpdateOperationsInput | number
    Pomo_Task_Long?: IntFieldUpdateOperationsInput | number
    Pomo_Task_Status?: BoolFieldUpdateOperationsInput | boolean
    Pomo_Completed_Count?: IntFieldUpdateOperationsInput | number
    Pomo_Target_Count?: IntFieldUpdateOperationsInput | number
    SessionId?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type ProfileNullableScalarRelationFilter = {
    is?: profileWhereInput | null
    isNot?: profileWhereInput | null
  }

  export type TaskListRelationFilter = {
    every?: taskWhereInput
    some?: taskWhereInput
    none?: taskWhereInput
  }

  export type CategoryListRelationFilter = {
    every?: categoryWhereInput
    some?: categoryWhereInput
    none?: categoryWhereInput
  }

  export type Pomodoro_sessionsListRelationFilter = {
    every?: pomodoro_sessionsWhereInput
    some?: pomodoro_sessionsWhereInput
    none?: pomodoro_sessionsWhereInput
  }

  export type taskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type categoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type pomodoro_sessionsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    UserID?: SortOrder
    User_Email?: SortOrder
    User_Password?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    UserID?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    UserID?: SortOrder
    User_Email?: SortOrder
    User_Password?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    UserID?: SortOrder
    User_Email?: SortOrder
    User_Password?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    UserID?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumTaskStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | EnumTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskStatus[]
    notIn?: $Enums.TaskStatus[]
    not?: NestedEnumTaskStatusFilter<$PrismaModel> | $Enums.TaskStatus
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type Task_categoryListRelationFilter = {
    every?: task_categoryWhereInput
    some?: task_categoryWhereInput
    none?: task_categoryWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type task_categoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type taskCountOrderByAggregateInput = {
    TaskID?: SortOrder
    Task_Title?: SortOrder
    Task_Description?: SortOrder
    Task_Start_Date?: SortOrder
    Task_End_Date?: SortOrder
    Task_Start_Time?: SortOrder
    Task_End_Time?: SortOrder
    Task_Icon?: SortOrder
    Task_Status?: SortOrder
    Task_Color?: SortOrder
    UserID?: SortOrder
  }

  export type taskAvgOrderByAggregateInput = {
    TaskID?: SortOrder
    UserID?: SortOrder
  }

  export type taskMaxOrderByAggregateInput = {
    TaskID?: SortOrder
    Task_Title?: SortOrder
    Task_Description?: SortOrder
    Task_Start_Date?: SortOrder
    Task_End_Date?: SortOrder
    Task_Start_Time?: SortOrder
    Task_End_Time?: SortOrder
    Task_Icon?: SortOrder
    Task_Status?: SortOrder
    Task_Color?: SortOrder
    UserID?: SortOrder
  }

  export type taskMinOrderByAggregateInput = {
    TaskID?: SortOrder
    Task_Title?: SortOrder
    Task_Description?: SortOrder
    Task_Start_Date?: SortOrder
    Task_End_Date?: SortOrder
    Task_Start_Time?: SortOrder
    Task_End_Time?: SortOrder
    Task_Icon?: SortOrder
    Task_Status?: SortOrder
    Task_Color?: SortOrder
    UserID?: SortOrder
  }

  export type taskSumOrderByAggregateInput = {
    TaskID?: SortOrder
    UserID?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumTaskStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | EnumTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskStatus[]
    notIn?: $Enums.TaskStatus[]
    not?: NestedEnumTaskStatusWithAggregatesFilter<$PrismaModel> | $Enums.TaskStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskStatusFilter<$PrismaModel>
    _max?: NestedEnumTaskStatusFilter<$PrismaModel>
  }

  export type EnumIconTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.IconType | EnumIconTypeFieldRefInput<$PrismaModel>
    in?: $Enums.IconType[]
    notIn?: $Enums.IconType[]
    not?: NestedEnumIconTypeFilter<$PrismaModel> | $Enums.IconType
  }

  export type profileCountOrderByAggregateInput = {
    UserID?: SortOrder
    Username?: SortOrder
    User_profile_icon_type?: SortOrder
    User_profile_icon_path?: SortOrder
  }

  export type profileAvgOrderByAggregateInput = {
    UserID?: SortOrder
  }

  export type profileMaxOrderByAggregateInput = {
    UserID?: SortOrder
    Username?: SortOrder
    User_profile_icon_type?: SortOrder
    User_profile_icon_path?: SortOrder
  }

  export type profileMinOrderByAggregateInput = {
    UserID?: SortOrder
    Username?: SortOrder
    User_profile_icon_type?: SortOrder
    User_profile_icon_path?: SortOrder
  }

  export type profileSumOrderByAggregateInput = {
    UserID?: SortOrder
  }

  export type EnumIconTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.IconType | EnumIconTypeFieldRefInput<$PrismaModel>
    in?: $Enums.IconType[]
    notIn?: $Enums.IconType[]
    not?: NestedEnumIconTypeWithAggregatesFilter<$PrismaModel> | $Enums.IconType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumIconTypeFilter<$PrismaModel>
    _max?: NestedEnumIconTypeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type categoryCountOrderByAggregateInput = {
    CategoryId?: SortOrder
    Category_Name?: SortOrder
    Category_icon?: SortOrder
    Category_Color?: SortOrder
    Category_is_Primary?: SortOrder
    userId?: SortOrder
  }

  export type categoryAvgOrderByAggregateInput = {
    CategoryId?: SortOrder
    userId?: SortOrder
  }

  export type categoryMaxOrderByAggregateInput = {
    CategoryId?: SortOrder
    Category_Name?: SortOrder
    Category_icon?: SortOrder
    Category_Color?: SortOrder
    Category_is_Primary?: SortOrder
    userId?: SortOrder
  }

  export type categoryMinOrderByAggregateInput = {
    CategoryId?: SortOrder
    Category_Name?: SortOrder
    Category_icon?: SortOrder
    Category_Color?: SortOrder
    Category_is_Primary?: SortOrder
    userId?: SortOrder
  }

  export type categorySumOrderByAggregateInput = {
    CategoryId?: SortOrder
    userId?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type TaskScalarRelationFilter = {
    is?: taskWhereInput
    isNot?: taskWhereInput
  }

  export type CategoryScalarRelationFilter = {
    is?: categoryWhereInput
    isNot?: categoryWhereInput
  }

  export type task_categoryTaskIDCategoryIdCompoundUniqueInput = {
    TaskID: number
    CategoryId: number
  }

  export type task_categoryCountOrderByAggregateInput = {
    TaskID?: SortOrder
    CategoryId?: SortOrder
  }

  export type task_categoryAvgOrderByAggregateInput = {
    TaskID?: SortOrder
    CategoryId?: SortOrder
  }

  export type task_categoryMaxOrderByAggregateInput = {
    TaskID?: SortOrder
    CategoryId?: SortOrder
  }

  export type task_categoryMinOrderByAggregateInput = {
    TaskID?: SortOrder
    CategoryId?: SortOrder
  }

  export type task_categorySumOrderByAggregateInput = {
    TaskID?: SortOrder
    CategoryId?: SortOrder
  }

  export type EnumPomoStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PomoStatus | EnumPomoStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PomoStatus[]
    notIn?: $Enums.PomoStatus[]
    not?: NestedEnumPomoStatusFilter<$PrismaModel> | $Enums.PomoStatus
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type EnumTimerTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TimerType | EnumTimerTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TimerType[]
    notIn?: $Enums.TimerType[]
    not?: NestedEnumTimerTypeFilter<$PrismaModel> | $Enums.TimerType
  }

  export type Pomodoro_taskListRelationFilter = {
    every?: pomodoro_taskWhereInput
    some?: pomodoro_taskWhereInput
    none?: pomodoro_taskWhereInput
  }

  export type pomodoro_taskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type pomodoro_sessionsCountOrderByAggregateInput = {
    SessionId?: SortOrder
    UserID?: SortOrder
    Status?: SortOrder
    StartTime?: SortOrder
    EndTime?: SortOrder
    PausedTime?: SortOrder
    duration_seconds?: SortOrder
    remaining_seconds?: SortOrder
    timer_type?: SortOrder
    last_updated?: SortOrder
  }

  export type pomodoro_sessionsAvgOrderByAggregateInput = {
    SessionId?: SortOrder
    UserID?: SortOrder
    PausedTime?: SortOrder
    duration_seconds?: SortOrder
    remaining_seconds?: SortOrder
  }

  export type pomodoro_sessionsMaxOrderByAggregateInput = {
    SessionId?: SortOrder
    UserID?: SortOrder
    Status?: SortOrder
    StartTime?: SortOrder
    EndTime?: SortOrder
    PausedTime?: SortOrder
    duration_seconds?: SortOrder
    remaining_seconds?: SortOrder
    timer_type?: SortOrder
    last_updated?: SortOrder
  }

  export type pomodoro_sessionsMinOrderByAggregateInput = {
    SessionId?: SortOrder
    UserID?: SortOrder
    Status?: SortOrder
    StartTime?: SortOrder
    EndTime?: SortOrder
    PausedTime?: SortOrder
    duration_seconds?: SortOrder
    remaining_seconds?: SortOrder
    timer_type?: SortOrder
    last_updated?: SortOrder
  }

  export type pomodoro_sessionsSumOrderByAggregateInput = {
    SessionId?: SortOrder
    UserID?: SortOrder
    PausedTime?: SortOrder
    duration_seconds?: SortOrder
    remaining_seconds?: SortOrder
  }

  export type EnumPomoStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PomoStatus | EnumPomoStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PomoStatus[]
    notIn?: $Enums.PomoStatus[]
    not?: NestedEnumPomoStatusWithAggregatesFilter<$PrismaModel> | $Enums.PomoStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPomoStatusFilter<$PrismaModel>
    _max?: NestedEnumPomoStatusFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumTimerTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TimerType | EnumTimerTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TimerType[]
    notIn?: $Enums.TimerType[]
    not?: NestedEnumTimerTypeWithAggregatesFilter<$PrismaModel> | $Enums.TimerType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTimerTypeFilter<$PrismaModel>
    _max?: NestedEnumTimerTypeFilter<$PrismaModel>
  }

  export type Pomodoro_sessionsScalarRelationFilter = {
    is?: pomodoro_sessionsWhereInput
    isNot?: pomodoro_sessionsWhereInput
  }

  export type pomodoro_taskCountOrderByAggregateInput = {
    Pomo_TaskId?: SortOrder
    Pomo_Task_Title?: SortOrder
    Pomo_Task_Short?: SortOrder
    Pomo_Task_Long?: SortOrder
    Pomo_Task_Status?: SortOrder
    Pomo_Completed_Count?: SortOrder
    Pomo_Target_Count?: SortOrder
    SessionId?: SortOrder
  }

  export type pomodoro_taskAvgOrderByAggregateInput = {
    Pomo_TaskId?: SortOrder
    Pomo_Task_Short?: SortOrder
    Pomo_Task_Long?: SortOrder
    Pomo_Completed_Count?: SortOrder
    Pomo_Target_Count?: SortOrder
    SessionId?: SortOrder
  }

  export type pomodoro_taskMaxOrderByAggregateInput = {
    Pomo_TaskId?: SortOrder
    Pomo_Task_Title?: SortOrder
    Pomo_Task_Short?: SortOrder
    Pomo_Task_Long?: SortOrder
    Pomo_Task_Status?: SortOrder
    Pomo_Completed_Count?: SortOrder
    Pomo_Target_Count?: SortOrder
    SessionId?: SortOrder
  }

  export type pomodoro_taskMinOrderByAggregateInput = {
    Pomo_TaskId?: SortOrder
    Pomo_Task_Title?: SortOrder
    Pomo_Task_Short?: SortOrder
    Pomo_Task_Long?: SortOrder
    Pomo_Task_Status?: SortOrder
    Pomo_Completed_Count?: SortOrder
    Pomo_Target_Count?: SortOrder
    SessionId?: SortOrder
  }

  export type pomodoro_taskSumOrderByAggregateInput = {
    Pomo_TaskId?: SortOrder
    Pomo_Task_Short?: SortOrder
    Pomo_Task_Long?: SortOrder
    Pomo_Completed_Count?: SortOrder
    Pomo_Target_Count?: SortOrder
    SessionId?: SortOrder
  }

  export type profileCreateNestedOneWithoutUserInput = {
    create?: XOR<profileCreateWithoutUserInput, profileUncheckedCreateWithoutUserInput>
    connectOrCreate?: profileCreateOrConnectWithoutUserInput
    connect?: profileWhereUniqueInput
  }

  export type taskCreateNestedManyWithoutUserInput = {
    create?: XOR<taskCreateWithoutUserInput, taskUncheckedCreateWithoutUserInput> | taskCreateWithoutUserInput[] | taskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: taskCreateOrConnectWithoutUserInput | taskCreateOrConnectWithoutUserInput[]
    createMany?: taskCreateManyUserInputEnvelope
    connect?: taskWhereUniqueInput | taskWhereUniqueInput[]
  }

  export type categoryCreateNestedManyWithoutUserInput = {
    create?: XOR<categoryCreateWithoutUserInput, categoryUncheckedCreateWithoutUserInput> | categoryCreateWithoutUserInput[] | categoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: categoryCreateOrConnectWithoutUserInput | categoryCreateOrConnectWithoutUserInput[]
    createMany?: categoryCreateManyUserInputEnvelope
    connect?: categoryWhereUniqueInput | categoryWhereUniqueInput[]
  }

  export type pomodoro_sessionsCreateNestedManyWithoutUserInput = {
    create?: XOR<pomodoro_sessionsCreateWithoutUserInput, pomodoro_sessionsUncheckedCreateWithoutUserInput> | pomodoro_sessionsCreateWithoutUserInput[] | pomodoro_sessionsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: pomodoro_sessionsCreateOrConnectWithoutUserInput | pomodoro_sessionsCreateOrConnectWithoutUserInput[]
    createMany?: pomodoro_sessionsCreateManyUserInputEnvelope
    connect?: pomodoro_sessionsWhereUniqueInput | pomodoro_sessionsWhereUniqueInput[]
  }

  export type profileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<profileCreateWithoutUserInput, profileUncheckedCreateWithoutUserInput>
    connectOrCreate?: profileCreateOrConnectWithoutUserInput
    connect?: profileWhereUniqueInput
  }

  export type taskUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<taskCreateWithoutUserInput, taskUncheckedCreateWithoutUserInput> | taskCreateWithoutUserInput[] | taskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: taskCreateOrConnectWithoutUserInput | taskCreateOrConnectWithoutUserInput[]
    createMany?: taskCreateManyUserInputEnvelope
    connect?: taskWhereUniqueInput | taskWhereUniqueInput[]
  }

  export type categoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<categoryCreateWithoutUserInput, categoryUncheckedCreateWithoutUserInput> | categoryCreateWithoutUserInput[] | categoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: categoryCreateOrConnectWithoutUserInput | categoryCreateOrConnectWithoutUserInput[]
    createMany?: categoryCreateManyUserInputEnvelope
    connect?: categoryWhereUniqueInput | categoryWhereUniqueInput[]
  }

  export type pomodoro_sessionsUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<pomodoro_sessionsCreateWithoutUserInput, pomodoro_sessionsUncheckedCreateWithoutUserInput> | pomodoro_sessionsCreateWithoutUserInput[] | pomodoro_sessionsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: pomodoro_sessionsCreateOrConnectWithoutUserInput | pomodoro_sessionsCreateOrConnectWithoutUserInput[]
    createMany?: pomodoro_sessionsCreateManyUserInputEnvelope
    connect?: pomodoro_sessionsWhereUniqueInput | pomodoro_sessionsWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type profileUpdateOneWithoutUserNestedInput = {
    create?: XOR<profileCreateWithoutUserInput, profileUncheckedCreateWithoutUserInput>
    connectOrCreate?: profileCreateOrConnectWithoutUserInput
    upsert?: profileUpsertWithoutUserInput
    disconnect?: profileWhereInput | boolean
    delete?: profileWhereInput | boolean
    connect?: profileWhereUniqueInput
    update?: XOR<XOR<profileUpdateToOneWithWhereWithoutUserInput, profileUpdateWithoutUserInput>, profileUncheckedUpdateWithoutUserInput>
  }

  export type taskUpdateManyWithoutUserNestedInput = {
    create?: XOR<taskCreateWithoutUserInput, taskUncheckedCreateWithoutUserInput> | taskCreateWithoutUserInput[] | taskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: taskCreateOrConnectWithoutUserInput | taskCreateOrConnectWithoutUserInput[]
    upsert?: taskUpsertWithWhereUniqueWithoutUserInput | taskUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: taskCreateManyUserInputEnvelope
    set?: taskWhereUniqueInput | taskWhereUniqueInput[]
    disconnect?: taskWhereUniqueInput | taskWhereUniqueInput[]
    delete?: taskWhereUniqueInput | taskWhereUniqueInput[]
    connect?: taskWhereUniqueInput | taskWhereUniqueInput[]
    update?: taskUpdateWithWhereUniqueWithoutUserInput | taskUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: taskUpdateManyWithWhereWithoutUserInput | taskUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: taskScalarWhereInput | taskScalarWhereInput[]
  }

  export type categoryUpdateManyWithoutUserNestedInput = {
    create?: XOR<categoryCreateWithoutUserInput, categoryUncheckedCreateWithoutUserInput> | categoryCreateWithoutUserInput[] | categoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: categoryCreateOrConnectWithoutUserInput | categoryCreateOrConnectWithoutUserInput[]
    upsert?: categoryUpsertWithWhereUniqueWithoutUserInput | categoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: categoryCreateManyUserInputEnvelope
    set?: categoryWhereUniqueInput | categoryWhereUniqueInput[]
    disconnect?: categoryWhereUniqueInput | categoryWhereUniqueInput[]
    delete?: categoryWhereUniqueInput | categoryWhereUniqueInput[]
    connect?: categoryWhereUniqueInput | categoryWhereUniqueInput[]
    update?: categoryUpdateWithWhereUniqueWithoutUserInput | categoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: categoryUpdateManyWithWhereWithoutUserInput | categoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: categoryScalarWhereInput | categoryScalarWhereInput[]
  }

  export type pomodoro_sessionsUpdateManyWithoutUserNestedInput = {
    create?: XOR<pomodoro_sessionsCreateWithoutUserInput, pomodoro_sessionsUncheckedCreateWithoutUserInput> | pomodoro_sessionsCreateWithoutUserInput[] | pomodoro_sessionsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: pomodoro_sessionsCreateOrConnectWithoutUserInput | pomodoro_sessionsCreateOrConnectWithoutUserInput[]
    upsert?: pomodoro_sessionsUpsertWithWhereUniqueWithoutUserInput | pomodoro_sessionsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: pomodoro_sessionsCreateManyUserInputEnvelope
    set?: pomodoro_sessionsWhereUniqueInput | pomodoro_sessionsWhereUniqueInput[]
    disconnect?: pomodoro_sessionsWhereUniqueInput | pomodoro_sessionsWhereUniqueInput[]
    delete?: pomodoro_sessionsWhereUniqueInput | pomodoro_sessionsWhereUniqueInput[]
    connect?: pomodoro_sessionsWhereUniqueInput | pomodoro_sessionsWhereUniqueInput[]
    update?: pomodoro_sessionsUpdateWithWhereUniqueWithoutUserInput | pomodoro_sessionsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: pomodoro_sessionsUpdateManyWithWhereWithoutUserInput | pomodoro_sessionsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: pomodoro_sessionsScalarWhereInput | pomodoro_sessionsScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type profileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<profileCreateWithoutUserInput, profileUncheckedCreateWithoutUserInput>
    connectOrCreate?: profileCreateOrConnectWithoutUserInput
    upsert?: profileUpsertWithoutUserInput
    disconnect?: profileWhereInput | boolean
    delete?: profileWhereInput | boolean
    connect?: profileWhereUniqueInput
    update?: XOR<XOR<profileUpdateToOneWithWhereWithoutUserInput, profileUpdateWithoutUserInput>, profileUncheckedUpdateWithoutUserInput>
  }

  export type taskUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<taskCreateWithoutUserInput, taskUncheckedCreateWithoutUserInput> | taskCreateWithoutUserInput[] | taskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: taskCreateOrConnectWithoutUserInput | taskCreateOrConnectWithoutUserInput[]
    upsert?: taskUpsertWithWhereUniqueWithoutUserInput | taskUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: taskCreateManyUserInputEnvelope
    set?: taskWhereUniqueInput | taskWhereUniqueInput[]
    disconnect?: taskWhereUniqueInput | taskWhereUniqueInput[]
    delete?: taskWhereUniqueInput | taskWhereUniqueInput[]
    connect?: taskWhereUniqueInput | taskWhereUniqueInput[]
    update?: taskUpdateWithWhereUniqueWithoutUserInput | taskUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: taskUpdateManyWithWhereWithoutUserInput | taskUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: taskScalarWhereInput | taskScalarWhereInput[]
  }

  export type categoryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<categoryCreateWithoutUserInput, categoryUncheckedCreateWithoutUserInput> | categoryCreateWithoutUserInput[] | categoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: categoryCreateOrConnectWithoutUserInput | categoryCreateOrConnectWithoutUserInput[]
    upsert?: categoryUpsertWithWhereUniqueWithoutUserInput | categoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: categoryCreateManyUserInputEnvelope
    set?: categoryWhereUniqueInput | categoryWhereUniqueInput[]
    disconnect?: categoryWhereUniqueInput | categoryWhereUniqueInput[]
    delete?: categoryWhereUniqueInput | categoryWhereUniqueInput[]
    connect?: categoryWhereUniqueInput | categoryWhereUniqueInput[]
    update?: categoryUpdateWithWhereUniqueWithoutUserInput | categoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: categoryUpdateManyWithWhereWithoutUserInput | categoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: categoryScalarWhereInput | categoryScalarWhereInput[]
  }

  export type pomodoro_sessionsUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<pomodoro_sessionsCreateWithoutUserInput, pomodoro_sessionsUncheckedCreateWithoutUserInput> | pomodoro_sessionsCreateWithoutUserInput[] | pomodoro_sessionsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: pomodoro_sessionsCreateOrConnectWithoutUserInput | pomodoro_sessionsCreateOrConnectWithoutUserInput[]
    upsert?: pomodoro_sessionsUpsertWithWhereUniqueWithoutUserInput | pomodoro_sessionsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: pomodoro_sessionsCreateManyUserInputEnvelope
    set?: pomodoro_sessionsWhereUniqueInput | pomodoro_sessionsWhereUniqueInput[]
    disconnect?: pomodoro_sessionsWhereUniqueInput | pomodoro_sessionsWhereUniqueInput[]
    delete?: pomodoro_sessionsWhereUniqueInput | pomodoro_sessionsWhereUniqueInput[]
    connect?: pomodoro_sessionsWhereUniqueInput | pomodoro_sessionsWhereUniqueInput[]
    update?: pomodoro_sessionsUpdateWithWhereUniqueWithoutUserInput | pomodoro_sessionsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: pomodoro_sessionsUpdateManyWithWhereWithoutUserInput | pomodoro_sessionsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: pomodoro_sessionsScalarWhereInput | pomodoro_sessionsScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutTasksInput = {
    create?: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutTasksInput
    connect?: UserWhereUniqueInput
  }

  export type task_categoryCreateNestedManyWithoutTaskInput = {
    create?: XOR<task_categoryCreateWithoutTaskInput, task_categoryUncheckedCreateWithoutTaskInput> | task_categoryCreateWithoutTaskInput[] | task_categoryUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: task_categoryCreateOrConnectWithoutTaskInput | task_categoryCreateOrConnectWithoutTaskInput[]
    createMany?: task_categoryCreateManyTaskInputEnvelope
    connect?: task_categoryWhereUniqueInput | task_categoryWhereUniqueInput[]
  }

  export type task_categoryUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<task_categoryCreateWithoutTaskInput, task_categoryUncheckedCreateWithoutTaskInput> | task_categoryCreateWithoutTaskInput[] | task_categoryUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: task_categoryCreateOrConnectWithoutTaskInput | task_categoryCreateOrConnectWithoutTaskInput[]
    createMany?: task_categoryCreateManyTaskInputEnvelope
    connect?: task_categoryWhereUniqueInput | task_categoryWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumTaskStatusFieldUpdateOperationsInput = {
    set?: $Enums.TaskStatus
  }

  export type UserUpdateOneRequiredWithoutTasksNestedInput = {
    create?: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutTasksInput
    upsert?: UserUpsertWithoutTasksInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTasksInput, UserUpdateWithoutTasksInput>, UserUncheckedUpdateWithoutTasksInput>
  }

  export type task_categoryUpdateManyWithoutTaskNestedInput = {
    create?: XOR<task_categoryCreateWithoutTaskInput, task_categoryUncheckedCreateWithoutTaskInput> | task_categoryCreateWithoutTaskInput[] | task_categoryUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: task_categoryCreateOrConnectWithoutTaskInput | task_categoryCreateOrConnectWithoutTaskInput[]
    upsert?: task_categoryUpsertWithWhereUniqueWithoutTaskInput | task_categoryUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: task_categoryCreateManyTaskInputEnvelope
    set?: task_categoryWhereUniqueInput | task_categoryWhereUniqueInput[]
    disconnect?: task_categoryWhereUniqueInput | task_categoryWhereUniqueInput[]
    delete?: task_categoryWhereUniqueInput | task_categoryWhereUniqueInput[]
    connect?: task_categoryWhereUniqueInput | task_categoryWhereUniqueInput[]
    update?: task_categoryUpdateWithWhereUniqueWithoutTaskInput | task_categoryUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: task_categoryUpdateManyWithWhereWithoutTaskInput | task_categoryUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: task_categoryScalarWhereInput | task_categoryScalarWhereInput[]
  }

  export type task_categoryUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<task_categoryCreateWithoutTaskInput, task_categoryUncheckedCreateWithoutTaskInput> | task_categoryCreateWithoutTaskInput[] | task_categoryUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: task_categoryCreateOrConnectWithoutTaskInput | task_categoryCreateOrConnectWithoutTaskInput[]
    upsert?: task_categoryUpsertWithWhereUniqueWithoutTaskInput | task_categoryUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: task_categoryCreateManyTaskInputEnvelope
    set?: task_categoryWhereUniqueInput | task_categoryWhereUniqueInput[]
    disconnect?: task_categoryWhereUniqueInput | task_categoryWhereUniqueInput[]
    delete?: task_categoryWhereUniqueInput | task_categoryWhereUniqueInput[]
    connect?: task_categoryWhereUniqueInput | task_categoryWhereUniqueInput[]
    update?: task_categoryUpdateWithWhereUniqueWithoutTaskInput | task_categoryUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: task_categoryUpdateManyWithWhereWithoutTaskInput | task_categoryUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: task_categoryScalarWhereInput | task_categoryScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutProfileInput = {
    create?: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfileInput
    connect?: UserWhereUniqueInput
  }

  export type EnumIconTypeFieldUpdateOperationsInput = {
    set?: $Enums.IconType
  }

  export type UserUpdateOneRequiredWithoutProfileNestedInput = {
    create?: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfileInput
    upsert?: UserUpsertWithoutProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProfileInput, UserUpdateWithoutProfileInput>, UserUncheckedUpdateWithoutProfileInput>
  }

  export type UserCreateNestedOneWithoutCategoryInput = {
    create?: XOR<UserCreateWithoutCategoryInput, UserUncheckedCreateWithoutCategoryInput>
    connectOrCreate?: UserCreateOrConnectWithoutCategoryInput
    connect?: UserWhereUniqueInput
  }

  export type task_categoryCreateNestedManyWithoutCategoryInput = {
    create?: XOR<task_categoryCreateWithoutCategoryInput, task_categoryUncheckedCreateWithoutCategoryInput> | task_categoryCreateWithoutCategoryInput[] | task_categoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: task_categoryCreateOrConnectWithoutCategoryInput | task_categoryCreateOrConnectWithoutCategoryInput[]
    createMany?: task_categoryCreateManyCategoryInputEnvelope
    connect?: task_categoryWhereUniqueInput | task_categoryWhereUniqueInput[]
  }

  export type task_categoryUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<task_categoryCreateWithoutCategoryInput, task_categoryUncheckedCreateWithoutCategoryInput> | task_categoryCreateWithoutCategoryInput[] | task_categoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: task_categoryCreateOrConnectWithoutCategoryInput | task_categoryCreateOrConnectWithoutCategoryInput[]
    createMany?: task_categoryCreateManyCategoryInputEnvelope
    connect?: task_categoryWhereUniqueInput | task_categoryWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutCategoryNestedInput = {
    create?: XOR<UserCreateWithoutCategoryInput, UserUncheckedCreateWithoutCategoryInput>
    connectOrCreate?: UserCreateOrConnectWithoutCategoryInput
    upsert?: UserUpsertWithoutCategoryInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCategoryInput, UserUpdateWithoutCategoryInput>, UserUncheckedUpdateWithoutCategoryInput>
  }

  export type task_categoryUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<task_categoryCreateWithoutCategoryInput, task_categoryUncheckedCreateWithoutCategoryInput> | task_categoryCreateWithoutCategoryInput[] | task_categoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: task_categoryCreateOrConnectWithoutCategoryInput | task_categoryCreateOrConnectWithoutCategoryInput[]
    upsert?: task_categoryUpsertWithWhereUniqueWithoutCategoryInput | task_categoryUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: task_categoryCreateManyCategoryInputEnvelope
    set?: task_categoryWhereUniqueInput | task_categoryWhereUniqueInput[]
    disconnect?: task_categoryWhereUniqueInput | task_categoryWhereUniqueInput[]
    delete?: task_categoryWhereUniqueInput | task_categoryWhereUniqueInput[]
    connect?: task_categoryWhereUniqueInput | task_categoryWhereUniqueInput[]
    update?: task_categoryUpdateWithWhereUniqueWithoutCategoryInput | task_categoryUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: task_categoryUpdateManyWithWhereWithoutCategoryInput | task_categoryUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: task_categoryScalarWhereInput | task_categoryScalarWhereInput[]
  }

  export type task_categoryUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<task_categoryCreateWithoutCategoryInput, task_categoryUncheckedCreateWithoutCategoryInput> | task_categoryCreateWithoutCategoryInput[] | task_categoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: task_categoryCreateOrConnectWithoutCategoryInput | task_categoryCreateOrConnectWithoutCategoryInput[]
    upsert?: task_categoryUpsertWithWhereUniqueWithoutCategoryInput | task_categoryUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: task_categoryCreateManyCategoryInputEnvelope
    set?: task_categoryWhereUniqueInput | task_categoryWhereUniqueInput[]
    disconnect?: task_categoryWhereUniqueInput | task_categoryWhereUniqueInput[]
    delete?: task_categoryWhereUniqueInput | task_categoryWhereUniqueInput[]
    connect?: task_categoryWhereUniqueInput | task_categoryWhereUniqueInput[]
    update?: task_categoryUpdateWithWhereUniqueWithoutCategoryInput | task_categoryUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: task_categoryUpdateManyWithWhereWithoutCategoryInput | task_categoryUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: task_categoryScalarWhereInput | task_categoryScalarWhereInput[]
  }

  export type taskCreateNestedOneWithoutTask_categoryInput = {
    create?: XOR<taskCreateWithoutTask_categoryInput, taskUncheckedCreateWithoutTask_categoryInput>
    connectOrCreate?: taskCreateOrConnectWithoutTask_categoryInput
    connect?: taskWhereUniqueInput
  }

  export type categoryCreateNestedOneWithoutTask_categoryInput = {
    create?: XOR<categoryCreateWithoutTask_categoryInput, categoryUncheckedCreateWithoutTask_categoryInput>
    connectOrCreate?: categoryCreateOrConnectWithoutTask_categoryInput
    connect?: categoryWhereUniqueInput
  }

  export type taskUpdateOneRequiredWithoutTask_categoryNestedInput = {
    create?: XOR<taskCreateWithoutTask_categoryInput, taskUncheckedCreateWithoutTask_categoryInput>
    connectOrCreate?: taskCreateOrConnectWithoutTask_categoryInput
    upsert?: taskUpsertWithoutTask_categoryInput
    connect?: taskWhereUniqueInput
    update?: XOR<XOR<taskUpdateToOneWithWhereWithoutTask_categoryInput, taskUpdateWithoutTask_categoryInput>, taskUncheckedUpdateWithoutTask_categoryInput>
  }

  export type categoryUpdateOneRequiredWithoutTask_categoryNestedInput = {
    create?: XOR<categoryCreateWithoutTask_categoryInput, categoryUncheckedCreateWithoutTask_categoryInput>
    connectOrCreate?: categoryCreateOrConnectWithoutTask_categoryInput
    upsert?: categoryUpsertWithoutTask_categoryInput
    connect?: categoryWhereUniqueInput
    update?: XOR<XOR<categoryUpdateToOneWithWhereWithoutTask_categoryInput, categoryUpdateWithoutTask_categoryInput>, categoryUncheckedUpdateWithoutTask_categoryInput>
  }

  export type UserCreateNestedOneWithoutPomodoro_sessionsInput = {
    create?: XOR<UserCreateWithoutPomodoro_sessionsInput, UserUncheckedCreateWithoutPomodoro_sessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPomodoro_sessionsInput
    connect?: UserWhereUniqueInput
  }

  export type pomodoro_taskCreateNestedManyWithoutSessionInput = {
    create?: XOR<pomodoro_taskCreateWithoutSessionInput, pomodoro_taskUncheckedCreateWithoutSessionInput> | pomodoro_taskCreateWithoutSessionInput[] | pomodoro_taskUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: pomodoro_taskCreateOrConnectWithoutSessionInput | pomodoro_taskCreateOrConnectWithoutSessionInput[]
    createMany?: pomodoro_taskCreateManySessionInputEnvelope
    connect?: pomodoro_taskWhereUniqueInput | pomodoro_taskWhereUniqueInput[]
  }

  export type pomodoro_taskUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<pomodoro_taskCreateWithoutSessionInput, pomodoro_taskUncheckedCreateWithoutSessionInput> | pomodoro_taskCreateWithoutSessionInput[] | pomodoro_taskUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: pomodoro_taskCreateOrConnectWithoutSessionInput | pomodoro_taskCreateOrConnectWithoutSessionInput[]
    createMany?: pomodoro_taskCreateManySessionInputEnvelope
    connect?: pomodoro_taskWhereUniqueInput | pomodoro_taskWhereUniqueInput[]
  }

  export type EnumPomoStatusFieldUpdateOperationsInput = {
    set?: $Enums.PomoStatus
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EnumTimerTypeFieldUpdateOperationsInput = {
    set?: $Enums.TimerType
  }

  export type UserUpdateOneRequiredWithoutPomodoro_sessionsNestedInput = {
    create?: XOR<UserCreateWithoutPomodoro_sessionsInput, UserUncheckedCreateWithoutPomodoro_sessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPomodoro_sessionsInput
    upsert?: UserUpsertWithoutPomodoro_sessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPomodoro_sessionsInput, UserUpdateWithoutPomodoro_sessionsInput>, UserUncheckedUpdateWithoutPomodoro_sessionsInput>
  }

  export type pomodoro_taskUpdateManyWithoutSessionNestedInput = {
    create?: XOR<pomodoro_taskCreateWithoutSessionInput, pomodoro_taskUncheckedCreateWithoutSessionInput> | pomodoro_taskCreateWithoutSessionInput[] | pomodoro_taskUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: pomodoro_taskCreateOrConnectWithoutSessionInput | pomodoro_taskCreateOrConnectWithoutSessionInput[]
    upsert?: pomodoro_taskUpsertWithWhereUniqueWithoutSessionInput | pomodoro_taskUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: pomodoro_taskCreateManySessionInputEnvelope
    set?: pomodoro_taskWhereUniqueInput | pomodoro_taskWhereUniqueInput[]
    disconnect?: pomodoro_taskWhereUniqueInput | pomodoro_taskWhereUniqueInput[]
    delete?: pomodoro_taskWhereUniqueInput | pomodoro_taskWhereUniqueInput[]
    connect?: pomodoro_taskWhereUniqueInput | pomodoro_taskWhereUniqueInput[]
    update?: pomodoro_taskUpdateWithWhereUniqueWithoutSessionInput | pomodoro_taskUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: pomodoro_taskUpdateManyWithWhereWithoutSessionInput | pomodoro_taskUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: pomodoro_taskScalarWhereInput | pomodoro_taskScalarWhereInput[]
  }

  export type pomodoro_taskUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<pomodoro_taskCreateWithoutSessionInput, pomodoro_taskUncheckedCreateWithoutSessionInput> | pomodoro_taskCreateWithoutSessionInput[] | pomodoro_taskUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: pomodoro_taskCreateOrConnectWithoutSessionInput | pomodoro_taskCreateOrConnectWithoutSessionInput[]
    upsert?: pomodoro_taskUpsertWithWhereUniqueWithoutSessionInput | pomodoro_taskUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: pomodoro_taskCreateManySessionInputEnvelope
    set?: pomodoro_taskWhereUniqueInput | pomodoro_taskWhereUniqueInput[]
    disconnect?: pomodoro_taskWhereUniqueInput | pomodoro_taskWhereUniqueInput[]
    delete?: pomodoro_taskWhereUniqueInput | pomodoro_taskWhereUniqueInput[]
    connect?: pomodoro_taskWhereUniqueInput | pomodoro_taskWhereUniqueInput[]
    update?: pomodoro_taskUpdateWithWhereUniqueWithoutSessionInput | pomodoro_taskUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: pomodoro_taskUpdateManyWithWhereWithoutSessionInput | pomodoro_taskUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: pomodoro_taskScalarWhereInput | pomodoro_taskScalarWhereInput[]
  }

  export type pomodoro_sessionsCreateNestedOneWithoutPomodoro_taskInput = {
    create?: XOR<pomodoro_sessionsCreateWithoutPomodoro_taskInput, pomodoro_sessionsUncheckedCreateWithoutPomodoro_taskInput>
    connectOrCreate?: pomodoro_sessionsCreateOrConnectWithoutPomodoro_taskInput
    connect?: pomodoro_sessionsWhereUniqueInput
  }

  export type pomodoro_sessionsUpdateOneRequiredWithoutPomodoro_taskNestedInput = {
    create?: XOR<pomodoro_sessionsCreateWithoutPomodoro_taskInput, pomodoro_sessionsUncheckedCreateWithoutPomodoro_taskInput>
    connectOrCreate?: pomodoro_sessionsCreateOrConnectWithoutPomodoro_taskInput
    upsert?: pomodoro_sessionsUpsertWithoutPomodoro_taskInput
    connect?: pomodoro_sessionsWhereUniqueInput
    update?: XOR<XOR<pomodoro_sessionsUpdateToOneWithWhereWithoutPomodoro_taskInput, pomodoro_sessionsUpdateWithoutPomodoro_taskInput>, pomodoro_sessionsUncheckedUpdateWithoutPomodoro_taskInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumTaskStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | EnumTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskStatus[]
    notIn?: $Enums.TaskStatus[]
    not?: NestedEnumTaskStatusFilter<$PrismaModel> | $Enums.TaskStatus
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumTaskStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | EnumTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskStatus[]
    notIn?: $Enums.TaskStatus[]
    not?: NestedEnumTaskStatusWithAggregatesFilter<$PrismaModel> | $Enums.TaskStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskStatusFilter<$PrismaModel>
    _max?: NestedEnumTaskStatusFilter<$PrismaModel>
  }

  export type NestedEnumIconTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.IconType | EnumIconTypeFieldRefInput<$PrismaModel>
    in?: $Enums.IconType[]
    notIn?: $Enums.IconType[]
    not?: NestedEnumIconTypeFilter<$PrismaModel> | $Enums.IconType
  }

  export type NestedEnumIconTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.IconType | EnumIconTypeFieldRefInput<$PrismaModel>
    in?: $Enums.IconType[]
    notIn?: $Enums.IconType[]
    not?: NestedEnumIconTypeWithAggregatesFilter<$PrismaModel> | $Enums.IconType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumIconTypeFilter<$PrismaModel>
    _max?: NestedEnumIconTypeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumPomoStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PomoStatus | EnumPomoStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PomoStatus[]
    notIn?: $Enums.PomoStatus[]
    not?: NestedEnumPomoStatusFilter<$PrismaModel> | $Enums.PomoStatus
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedEnumTimerTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TimerType | EnumTimerTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TimerType[]
    notIn?: $Enums.TimerType[]
    not?: NestedEnumTimerTypeFilter<$PrismaModel> | $Enums.TimerType
  }

  export type NestedEnumPomoStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PomoStatus | EnumPomoStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PomoStatus[]
    notIn?: $Enums.PomoStatus[]
    not?: NestedEnumPomoStatusWithAggregatesFilter<$PrismaModel> | $Enums.PomoStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPomoStatusFilter<$PrismaModel>
    _max?: NestedEnumPomoStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumTimerTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TimerType | EnumTimerTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TimerType[]
    notIn?: $Enums.TimerType[]
    not?: NestedEnumTimerTypeWithAggregatesFilter<$PrismaModel> | $Enums.TimerType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTimerTypeFilter<$PrismaModel>
    _max?: NestedEnumTimerTypeFilter<$PrismaModel>
  }

  export type profileCreateWithoutUserInput = {
    Username?: string | null
    User_profile_icon_type?: $Enums.IconType
    User_profile_icon_path: string
  }

  export type profileUncheckedCreateWithoutUserInput = {
    Username?: string | null
    User_profile_icon_type?: $Enums.IconType
    User_profile_icon_path: string
  }

  export type profileCreateOrConnectWithoutUserInput = {
    where: profileWhereUniqueInput
    create: XOR<profileCreateWithoutUserInput, profileUncheckedCreateWithoutUserInput>
  }

  export type taskCreateWithoutUserInput = {
    Task_Title: string
    Task_Description?: string | null
    Task_Start_Date?: Date | string | null
    Task_End_Date?: Date | string | null
    Task_Start_Time?: Date | string | null
    Task_End_Time?: Date | string | null
    Task_Icon?: string | null
    Task_Status?: $Enums.TaskStatus
    Task_Color: string
    task_category?: task_categoryCreateNestedManyWithoutTaskInput
  }

  export type taskUncheckedCreateWithoutUserInput = {
    TaskID?: number
    Task_Title: string
    Task_Description?: string | null
    Task_Start_Date?: Date | string | null
    Task_End_Date?: Date | string | null
    Task_Start_Time?: Date | string | null
    Task_End_Time?: Date | string | null
    Task_Icon?: string | null
    Task_Status?: $Enums.TaskStatus
    Task_Color: string
    task_category?: task_categoryUncheckedCreateNestedManyWithoutTaskInput
  }

  export type taskCreateOrConnectWithoutUserInput = {
    where: taskWhereUniqueInput
    create: XOR<taskCreateWithoutUserInput, taskUncheckedCreateWithoutUserInput>
  }

  export type taskCreateManyUserInputEnvelope = {
    data: taskCreateManyUserInput | taskCreateManyUserInput[]
  }

  export type categoryCreateWithoutUserInput = {
    Category_Name: string
    Category_icon: string
    Category_Color?: string
    Category_is_Primary?: boolean
    task_category?: task_categoryCreateNestedManyWithoutCategoryInput
  }

  export type categoryUncheckedCreateWithoutUserInput = {
    CategoryId?: number
    Category_Name: string
    Category_icon: string
    Category_Color?: string
    Category_is_Primary?: boolean
    task_category?: task_categoryUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type categoryCreateOrConnectWithoutUserInput = {
    where: categoryWhereUniqueInput
    create: XOR<categoryCreateWithoutUserInput, categoryUncheckedCreateWithoutUserInput>
  }

  export type categoryCreateManyUserInputEnvelope = {
    data: categoryCreateManyUserInput | categoryCreateManyUserInput[]
  }

  export type pomodoro_sessionsCreateWithoutUserInput = {
    Status: $Enums.PomoStatus
    StartTime: Date | string
    EndTime?: Date | string | null
    PausedTime: number
    duration_seconds?: number
    remaining_seconds?: number
    timer_type: $Enums.TimerType
    last_updated?: Date | string
    pomodoro_task?: pomodoro_taskCreateNestedManyWithoutSessionInput
  }

  export type pomodoro_sessionsUncheckedCreateWithoutUserInput = {
    SessionId?: number
    Status: $Enums.PomoStatus
    StartTime: Date | string
    EndTime?: Date | string | null
    PausedTime: number
    duration_seconds?: number
    remaining_seconds?: number
    timer_type: $Enums.TimerType
    last_updated?: Date | string
    pomodoro_task?: pomodoro_taskUncheckedCreateNestedManyWithoutSessionInput
  }

  export type pomodoro_sessionsCreateOrConnectWithoutUserInput = {
    where: pomodoro_sessionsWhereUniqueInput
    create: XOR<pomodoro_sessionsCreateWithoutUserInput, pomodoro_sessionsUncheckedCreateWithoutUserInput>
  }

  export type pomodoro_sessionsCreateManyUserInputEnvelope = {
    data: pomodoro_sessionsCreateManyUserInput | pomodoro_sessionsCreateManyUserInput[]
  }

  export type profileUpsertWithoutUserInput = {
    update: XOR<profileUpdateWithoutUserInput, profileUncheckedUpdateWithoutUserInput>
    create: XOR<profileCreateWithoutUserInput, profileUncheckedCreateWithoutUserInput>
    where?: profileWhereInput
  }

  export type profileUpdateToOneWithWhereWithoutUserInput = {
    where?: profileWhereInput
    data: XOR<profileUpdateWithoutUserInput, profileUncheckedUpdateWithoutUserInput>
  }

  export type profileUpdateWithoutUserInput = {
    Username?: NullableStringFieldUpdateOperationsInput | string | null
    User_profile_icon_type?: EnumIconTypeFieldUpdateOperationsInput | $Enums.IconType
    User_profile_icon_path?: StringFieldUpdateOperationsInput | string
  }

  export type profileUncheckedUpdateWithoutUserInput = {
    Username?: NullableStringFieldUpdateOperationsInput | string | null
    User_profile_icon_type?: EnumIconTypeFieldUpdateOperationsInput | $Enums.IconType
    User_profile_icon_path?: StringFieldUpdateOperationsInput | string
  }

  export type taskUpsertWithWhereUniqueWithoutUserInput = {
    where: taskWhereUniqueInput
    update: XOR<taskUpdateWithoutUserInput, taskUncheckedUpdateWithoutUserInput>
    create: XOR<taskCreateWithoutUserInput, taskUncheckedCreateWithoutUserInput>
  }

  export type taskUpdateWithWhereUniqueWithoutUserInput = {
    where: taskWhereUniqueInput
    data: XOR<taskUpdateWithoutUserInput, taskUncheckedUpdateWithoutUserInput>
  }

  export type taskUpdateManyWithWhereWithoutUserInput = {
    where: taskScalarWhereInput
    data: XOR<taskUpdateManyMutationInput, taskUncheckedUpdateManyWithoutUserInput>
  }

  export type taskScalarWhereInput = {
    AND?: taskScalarWhereInput | taskScalarWhereInput[]
    OR?: taskScalarWhereInput[]
    NOT?: taskScalarWhereInput | taskScalarWhereInput[]
    TaskID?: IntFilter<"task"> | number
    Task_Title?: StringFilter<"task"> | string
    Task_Description?: StringNullableFilter<"task"> | string | null
    Task_Start_Date?: DateTimeNullableFilter<"task"> | Date | string | null
    Task_End_Date?: DateTimeNullableFilter<"task"> | Date | string | null
    Task_Start_Time?: DateTimeNullableFilter<"task"> | Date | string | null
    Task_End_Time?: DateTimeNullableFilter<"task"> | Date | string | null
    Task_Icon?: StringNullableFilter<"task"> | string | null
    Task_Status?: EnumTaskStatusFilter<"task"> | $Enums.TaskStatus
    Task_Color?: StringFilter<"task"> | string
    UserID?: IntFilter<"task"> | number
  }

  export type categoryUpsertWithWhereUniqueWithoutUserInput = {
    where: categoryWhereUniqueInput
    update: XOR<categoryUpdateWithoutUserInput, categoryUncheckedUpdateWithoutUserInput>
    create: XOR<categoryCreateWithoutUserInput, categoryUncheckedCreateWithoutUserInput>
  }

  export type categoryUpdateWithWhereUniqueWithoutUserInput = {
    where: categoryWhereUniqueInput
    data: XOR<categoryUpdateWithoutUserInput, categoryUncheckedUpdateWithoutUserInput>
  }

  export type categoryUpdateManyWithWhereWithoutUserInput = {
    where: categoryScalarWhereInput
    data: XOR<categoryUpdateManyMutationInput, categoryUncheckedUpdateManyWithoutUserInput>
  }

  export type categoryScalarWhereInput = {
    AND?: categoryScalarWhereInput | categoryScalarWhereInput[]
    OR?: categoryScalarWhereInput[]
    NOT?: categoryScalarWhereInput | categoryScalarWhereInput[]
    CategoryId?: IntFilter<"category"> | number
    Category_Name?: StringFilter<"category"> | string
    Category_icon?: StringFilter<"category"> | string
    Category_Color?: StringFilter<"category"> | string
    Category_is_Primary?: BoolFilter<"category"> | boolean
    userId?: IntFilter<"category"> | number
  }

  export type pomodoro_sessionsUpsertWithWhereUniqueWithoutUserInput = {
    where: pomodoro_sessionsWhereUniqueInput
    update: XOR<pomodoro_sessionsUpdateWithoutUserInput, pomodoro_sessionsUncheckedUpdateWithoutUserInput>
    create: XOR<pomodoro_sessionsCreateWithoutUserInput, pomodoro_sessionsUncheckedCreateWithoutUserInput>
  }

  export type pomodoro_sessionsUpdateWithWhereUniqueWithoutUserInput = {
    where: pomodoro_sessionsWhereUniqueInput
    data: XOR<pomodoro_sessionsUpdateWithoutUserInput, pomodoro_sessionsUncheckedUpdateWithoutUserInput>
  }

  export type pomodoro_sessionsUpdateManyWithWhereWithoutUserInput = {
    where: pomodoro_sessionsScalarWhereInput
    data: XOR<pomodoro_sessionsUpdateManyMutationInput, pomodoro_sessionsUncheckedUpdateManyWithoutUserInput>
  }

  export type pomodoro_sessionsScalarWhereInput = {
    AND?: pomodoro_sessionsScalarWhereInput | pomodoro_sessionsScalarWhereInput[]
    OR?: pomodoro_sessionsScalarWhereInput[]
    NOT?: pomodoro_sessionsScalarWhereInput | pomodoro_sessionsScalarWhereInput[]
    SessionId?: IntFilter<"pomodoro_sessions"> | number
    UserID?: IntFilter<"pomodoro_sessions"> | number
    Status?: EnumPomoStatusFilter<"pomodoro_sessions"> | $Enums.PomoStatus
    StartTime?: DateTimeFilter<"pomodoro_sessions"> | Date | string
    EndTime?: DateTimeNullableFilter<"pomodoro_sessions"> | Date | string | null
    PausedTime?: IntFilter<"pomodoro_sessions"> | number
    duration_seconds?: IntFilter<"pomodoro_sessions"> | number
    remaining_seconds?: IntFilter<"pomodoro_sessions"> | number
    timer_type?: EnumTimerTypeFilter<"pomodoro_sessions"> | $Enums.TimerType
    last_updated?: DateTimeFilter<"pomodoro_sessions"> | Date | string
  }

  export type UserCreateWithoutTasksInput = {
    User_Email: string
    User_Password: string
    profile?: profileCreateNestedOneWithoutUserInput
    category?: categoryCreateNestedManyWithoutUserInput
    pomodoro_sessions?: pomodoro_sessionsCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTasksInput = {
    UserID?: number
    User_Email: string
    User_Password: string
    profile?: profileUncheckedCreateNestedOneWithoutUserInput
    category?: categoryUncheckedCreateNestedManyWithoutUserInput
    pomodoro_sessions?: pomodoro_sessionsUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTasksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
  }

  export type task_categoryCreateWithoutTaskInput = {
    category: categoryCreateNestedOneWithoutTask_categoryInput
  }

  export type task_categoryUncheckedCreateWithoutTaskInput = {
    CategoryId: number
  }

  export type task_categoryCreateOrConnectWithoutTaskInput = {
    where: task_categoryWhereUniqueInput
    create: XOR<task_categoryCreateWithoutTaskInput, task_categoryUncheckedCreateWithoutTaskInput>
  }

  export type task_categoryCreateManyTaskInputEnvelope = {
    data: task_categoryCreateManyTaskInput | task_categoryCreateManyTaskInput[]
  }

  export type UserUpsertWithoutTasksInput = {
    update: XOR<UserUpdateWithoutTasksInput, UserUncheckedUpdateWithoutTasksInput>
    create: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTasksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTasksInput, UserUncheckedUpdateWithoutTasksInput>
  }

  export type UserUpdateWithoutTasksInput = {
    User_Email?: StringFieldUpdateOperationsInput | string
    User_Password?: StringFieldUpdateOperationsInput | string
    profile?: profileUpdateOneWithoutUserNestedInput
    category?: categoryUpdateManyWithoutUserNestedInput
    pomodoro_sessions?: pomodoro_sessionsUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTasksInput = {
    UserID?: IntFieldUpdateOperationsInput | number
    User_Email?: StringFieldUpdateOperationsInput | string
    User_Password?: StringFieldUpdateOperationsInput | string
    profile?: profileUncheckedUpdateOneWithoutUserNestedInput
    category?: categoryUncheckedUpdateManyWithoutUserNestedInput
    pomodoro_sessions?: pomodoro_sessionsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type task_categoryUpsertWithWhereUniqueWithoutTaskInput = {
    where: task_categoryWhereUniqueInput
    update: XOR<task_categoryUpdateWithoutTaskInput, task_categoryUncheckedUpdateWithoutTaskInput>
    create: XOR<task_categoryCreateWithoutTaskInput, task_categoryUncheckedCreateWithoutTaskInput>
  }

  export type task_categoryUpdateWithWhereUniqueWithoutTaskInput = {
    where: task_categoryWhereUniqueInput
    data: XOR<task_categoryUpdateWithoutTaskInput, task_categoryUncheckedUpdateWithoutTaskInput>
  }

  export type task_categoryUpdateManyWithWhereWithoutTaskInput = {
    where: task_categoryScalarWhereInput
    data: XOR<task_categoryUpdateManyMutationInput, task_categoryUncheckedUpdateManyWithoutTaskInput>
  }

  export type task_categoryScalarWhereInput = {
    AND?: task_categoryScalarWhereInput | task_categoryScalarWhereInput[]
    OR?: task_categoryScalarWhereInput[]
    NOT?: task_categoryScalarWhereInput | task_categoryScalarWhereInput[]
    TaskID?: IntFilter<"task_category"> | number
    CategoryId?: IntFilter<"task_category"> | number
  }

  export type UserCreateWithoutProfileInput = {
    User_Email: string
    User_Password: string
    tasks?: taskCreateNestedManyWithoutUserInput
    category?: categoryCreateNestedManyWithoutUserInput
    pomodoro_sessions?: pomodoro_sessionsCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProfileInput = {
    UserID?: number
    User_Email: string
    User_Password: string
    tasks?: taskUncheckedCreateNestedManyWithoutUserInput
    category?: categoryUncheckedCreateNestedManyWithoutUserInput
    pomodoro_sessions?: pomodoro_sessionsUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
  }

  export type UserUpsertWithoutProfileInput = {
    update: XOR<UserUpdateWithoutProfileInput, UserUncheckedUpdateWithoutProfileInput>
    create: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProfileInput, UserUncheckedUpdateWithoutProfileInput>
  }

  export type UserUpdateWithoutProfileInput = {
    User_Email?: StringFieldUpdateOperationsInput | string
    User_Password?: StringFieldUpdateOperationsInput | string
    tasks?: taskUpdateManyWithoutUserNestedInput
    category?: categoryUpdateManyWithoutUserNestedInput
    pomodoro_sessions?: pomodoro_sessionsUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProfileInput = {
    UserID?: IntFieldUpdateOperationsInput | number
    User_Email?: StringFieldUpdateOperationsInput | string
    User_Password?: StringFieldUpdateOperationsInput | string
    tasks?: taskUncheckedUpdateManyWithoutUserNestedInput
    category?: categoryUncheckedUpdateManyWithoutUserNestedInput
    pomodoro_sessions?: pomodoro_sessionsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutCategoryInput = {
    User_Email: string
    User_Password: string
    profile?: profileCreateNestedOneWithoutUserInput
    tasks?: taskCreateNestedManyWithoutUserInput
    pomodoro_sessions?: pomodoro_sessionsCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCategoryInput = {
    UserID?: number
    User_Email: string
    User_Password: string
    profile?: profileUncheckedCreateNestedOneWithoutUserInput
    tasks?: taskUncheckedCreateNestedManyWithoutUserInput
    pomodoro_sessions?: pomodoro_sessionsUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCategoryInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCategoryInput, UserUncheckedCreateWithoutCategoryInput>
  }

  export type task_categoryCreateWithoutCategoryInput = {
    task: taskCreateNestedOneWithoutTask_categoryInput
  }

  export type task_categoryUncheckedCreateWithoutCategoryInput = {
    TaskID: number
  }

  export type task_categoryCreateOrConnectWithoutCategoryInput = {
    where: task_categoryWhereUniqueInput
    create: XOR<task_categoryCreateWithoutCategoryInput, task_categoryUncheckedCreateWithoutCategoryInput>
  }

  export type task_categoryCreateManyCategoryInputEnvelope = {
    data: task_categoryCreateManyCategoryInput | task_categoryCreateManyCategoryInput[]
  }

  export type UserUpsertWithoutCategoryInput = {
    update: XOR<UserUpdateWithoutCategoryInput, UserUncheckedUpdateWithoutCategoryInput>
    create: XOR<UserCreateWithoutCategoryInput, UserUncheckedCreateWithoutCategoryInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCategoryInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCategoryInput, UserUncheckedUpdateWithoutCategoryInput>
  }

  export type UserUpdateWithoutCategoryInput = {
    User_Email?: StringFieldUpdateOperationsInput | string
    User_Password?: StringFieldUpdateOperationsInput | string
    profile?: profileUpdateOneWithoutUserNestedInput
    tasks?: taskUpdateManyWithoutUserNestedInput
    pomodoro_sessions?: pomodoro_sessionsUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCategoryInput = {
    UserID?: IntFieldUpdateOperationsInput | number
    User_Email?: StringFieldUpdateOperationsInput | string
    User_Password?: StringFieldUpdateOperationsInput | string
    profile?: profileUncheckedUpdateOneWithoutUserNestedInput
    tasks?: taskUncheckedUpdateManyWithoutUserNestedInput
    pomodoro_sessions?: pomodoro_sessionsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type task_categoryUpsertWithWhereUniqueWithoutCategoryInput = {
    where: task_categoryWhereUniqueInput
    update: XOR<task_categoryUpdateWithoutCategoryInput, task_categoryUncheckedUpdateWithoutCategoryInput>
    create: XOR<task_categoryCreateWithoutCategoryInput, task_categoryUncheckedCreateWithoutCategoryInput>
  }

  export type task_categoryUpdateWithWhereUniqueWithoutCategoryInput = {
    where: task_categoryWhereUniqueInput
    data: XOR<task_categoryUpdateWithoutCategoryInput, task_categoryUncheckedUpdateWithoutCategoryInput>
  }

  export type task_categoryUpdateManyWithWhereWithoutCategoryInput = {
    where: task_categoryScalarWhereInput
    data: XOR<task_categoryUpdateManyMutationInput, task_categoryUncheckedUpdateManyWithoutCategoryInput>
  }

  export type taskCreateWithoutTask_categoryInput = {
    Task_Title: string
    Task_Description?: string | null
    Task_Start_Date?: Date | string | null
    Task_End_Date?: Date | string | null
    Task_Start_Time?: Date | string | null
    Task_End_Time?: Date | string | null
    Task_Icon?: string | null
    Task_Status?: $Enums.TaskStatus
    Task_Color: string
    user: UserCreateNestedOneWithoutTasksInput
  }

  export type taskUncheckedCreateWithoutTask_categoryInput = {
    TaskID?: number
    Task_Title: string
    Task_Description?: string | null
    Task_Start_Date?: Date | string | null
    Task_End_Date?: Date | string | null
    Task_Start_Time?: Date | string | null
    Task_End_Time?: Date | string | null
    Task_Icon?: string | null
    Task_Status?: $Enums.TaskStatus
    Task_Color: string
    UserID: number
  }

  export type taskCreateOrConnectWithoutTask_categoryInput = {
    where: taskWhereUniqueInput
    create: XOR<taskCreateWithoutTask_categoryInput, taskUncheckedCreateWithoutTask_categoryInput>
  }

  export type categoryCreateWithoutTask_categoryInput = {
    Category_Name: string
    Category_icon: string
    Category_Color?: string
    Category_is_Primary?: boolean
    user: UserCreateNestedOneWithoutCategoryInput
  }

  export type categoryUncheckedCreateWithoutTask_categoryInput = {
    CategoryId?: number
    Category_Name: string
    Category_icon: string
    Category_Color?: string
    Category_is_Primary?: boolean
    userId: number
  }

  export type categoryCreateOrConnectWithoutTask_categoryInput = {
    where: categoryWhereUniqueInput
    create: XOR<categoryCreateWithoutTask_categoryInput, categoryUncheckedCreateWithoutTask_categoryInput>
  }

  export type taskUpsertWithoutTask_categoryInput = {
    update: XOR<taskUpdateWithoutTask_categoryInput, taskUncheckedUpdateWithoutTask_categoryInput>
    create: XOR<taskCreateWithoutTask_categoryInput, taskUncheckedCreateWithoutTask_categoryInput>
    where?: taskWhereInput
  }

  export type taskUpdateToOneWithWhereWithoutTask_categoryInput = {
    where?: taskWhereInput
    data: XOR<taskUpdateWithoutTask_categoryInput, taskUncheckedUpdateWithoutTask_categoryInput>
  }

  export type taskUpdateWithoutTask_categoryInput = {
    Task_Title?: StringFieldUpdateOperationsInput | string
    Task_Description?: NullableStringFieldUpdateOperationsInput | string | null
    Task_Start_Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Task_End_Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Task_Start_Time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Task_End_Time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Task_Icon?: NullableStringFieldUpdateOperationsInput | string | null
    Task_Status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    Task_Color?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutTasksNestedInput
  }

  export type taskUncheckedUpdateWithoutTask_categoryInput = {
    TaskID?: IntFieldUpdateOperationsInput | number
    Task_Title?: StringFieldUpdateOperationsInput | string
    Task_Description?: NullableStringFieldUpdateOperationsInput | string | null
    Task_Start_Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Task_End_Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Task_Start_Time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Task_End_Time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Task_Icon?: NullableStringFieldUpdateOperationsInput | string | null
    Task_Status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    Task_Color?: StringFieldUpdateOperationsInput | string
    UserID?: IntFieldUpdateOperationsInput | number
  }

  export type categoryUpsertWithoutTask_categoryInput = {
    update: XOR<categoryUpdateWithoutTask_categoryInput, categoryUncheckedUpdateWithoutTask_categoryInput>
    create: XOR<categoryCreateWithoutTask_categoryInput, categoryUncheckedCreateWithoutTask_categoryInput>
    where?: categoryWhereInput
  }

  export type categoryUpdateToOneWithWhereWithoutTask_categoryInput = {
    where?: categoryWhereInput
    data: XOR<categoryUpdateWithoutTask_categoryInput, categoryUncheckedUpdateWithoutTask_categoryInput>
  }

  export type categoryUpdateWithoutTask_categoryInput = {
    Category_Name?: StringFieldUpdateOperationsInput | string
    Category_icon?: StringFieldUpdateOperationsInput | string
    Category_Color?: StringFieldUpdateOperationsInput | string
    Category_is_Primary?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutCategoryNestedInput
  }

  export type categoryUncheckedUpdateWithoutTask_categoryInput = {
    CategoryId?: IntFieldUpdateOperationsInput | number
    Category_Name?: StringFieldUpdateOperationsInput | string
    Category_icon?: StringFieldUpdateOperationsInput | string
    Category_Color?: StringFieldUpdateOperationsInput | string
    Category_is_Primary?: BoolFieldUpdateOperationsInput | boolean
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type UserCreateWithoutPomodoro_sessionsInput = {
    User_Email: string
    User_Password: string
    profile?: profileCreateNestedOneWithoutUserInput
    tasks?: taskCreateNestedManyWithoutUserInput
    category?: categoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPomodoro_sessionsInput = {
    UserID?: number
    User_Email: string
    User_Password: string
    profile?: profileUncheckedCreateNestedOneWithoutUserInput
    tasks?: taskUncheckedCreateNestedManyWithoutUserInput
    category?: categoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPomodoro_sessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPomodoro_sessionsInput, UserUncheckedCreateWithoutPomodoro_sessionsInput>
  }

  export type pomodoro_taskCreateWithoutSessionInput = {
    Pomo_Task_Title: string
    Pomo_Task_Short?: number
    Pomo_Task_Long?: number
    Pomo_Task_Status?: boolean
    Pomo_Completed_Count?: number
    Pomo_Target_Count?: number
  }

  export type pomodoro_taskUncheckedCreateWithoutSessionInput = {
    Pomo_TaskId?: number
    Pomo_Task_Title: string
    Pomo_Task_Short?: number
    Pomo_Task_Long?: number
    Pomo_Task_Status?: boolean
    Pomo_Completed_Count?: number
    Pomo_Target_Count?: number
  }

  export type pomodoro_taskCreateOrConnectWithoutSessionInput = {
    where: pomodoro_taskWhereUniqueInput
    create: XOR<pomodoro_taskCreateWithoutSessionInput, pomodoro_taskUncheckedCreateWithoutSessionInput>
  }

  export type pomodoro_taskCreateManySessionInputEnvelope = {
    data: pomodoro_taskCreateManySessionInput | pomodoro_taskCreateManySessionInput[]
  }

  export type UserUpsertWithoutPomodoro_sessionsInput = {
    update: XOR<UserUpdateWithoutPomodoro_sessionsInput, UserUncheckedUpdateWithoutPomodoro_sessionsInput>
    create: XOR<UserCreateWithoutPomodoro_sessionsInput, UserUncheckedCreateWithoutPomodoro_sessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPomodoro_sessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPomodoro_sessionsInput, UserUncheckedUpdateWithoutPomodoro_sessionsInput>
  }

  export type UserUpdateWithoutPomodoro_sessionsInput = {
    User_Email?: StringFieldUpdateOperationsInput | string
    User_Password?: StringFieldUpdateOperationsInput | string
    profile?: profileUpdateOneWithoutUserNestedInput
    tasks?: taskUpdateManyWithoutUserNestedInput
    category?: categoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPomodoro_sessionsInput = {
    UserID?: IntFieldUpdateOperationsInput | number
    User_Email?: StringFieldUpdateOperationsInput | string
    User_Password?: StringFieldUpdateOperationsInput | string
    profile?: profileUncheckedUpdateOneWithoutUserNestedInput
    tasks?: taskUncheckedUpdateManyWithoutUserNestedInput
    category?: categoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type pomodoro_taskUpsertWithWhereUniqueWithoutSessionInput = {
    where: pomodoro_taskWhereUniqueInput
    update: XOR<pomodoro_taskUpdateWithoutSessionInput, pomodoro_taskUncheckedUpdateWithoutSessionInput>
    create: XOR<pomodoro_taskCreateWithoutSessionInput, pomodoro_taskUncheckedCreateWithoutSessionInput>
  }

  export type pomodoro_taskUpdateWithWhereUniqueWithoutSessionInput = {
    where: pomodoro_taskWhereUniqueInput
    data: XOR<pomodoro_taskUpdateWithoutSessionInput, pomodoro_taskUncheckedUpdateWithoutSessionInput>
  }

  export type pomodoro_taskUpdateManyWithWhereWithoutSessionInput = {
    where: pomodoro_taskScalarWhereInput
    data: XOR<pomodoro_taskUpdateManyMutationInput, pomodoro_taskUncheckedUpdateManyWithoutSessionInput>
  }

  export type pomodoro_taskScalarWhereInput = {
    AND?: pomodoro_taskScalarWhereInput | pomodoro_taskScalarWhereInput[]
    OR?: pomodoro_taskScalarWhereInput[]
    NOT?: pomodoro_taskScalarWhereInput | pomodoro_taskScalarWhereInput[]
    Pomo_TaskId?: IntFilter<"pomodoro_task"> | number
    Pomo_Task_Title?: StringFilter<"pomodoro_task"> | string
    Pomo_Task_Short?: IntFilter<"pomodoro_task"> | number
    Pomo_Task_Long?: IntFilter<"pomodoro_task"> | number
    Pomo_Task_Status?: BoolFilter<"pomodoro_task"> | boolean
    Pomo_Completed_Count?: IntFilter<"pomodoro_task"> | number
    Pomo_Target_Count?: IntFilter<"pomodoro_task"> | number
    SessionId?: IntFilter<"pomodoro_task"> | number
  }

  export type pomodoro_sessionsCreateWithoutPomodoro_taskInput = {
    Status: $Enums.PomoStatus
    StartTime: Date | string
    EndTime?: Date | string | null
    PausedTime: number
    duration_seconds?: number
    remaining_seconds?: number
    timer_type: $Enums.TimerType
    last_updated?: Date | string
    user: UserCreateNestedOneWithoutPomodoro_sessionsInput
  }

  export type pomodoro_sessionsUncheckedCreateWithoutPomodoro_taskInput = {
    SessionId?: number
    UserID: number
    Status: $Enums.PomoStatus
    StartTime: Date | string
    EndTime?: Date | string | null
    PausedTime: number
    duration_seconds?: number
    remaining_seconds?: number
    timer_type: $Enums.TimerType
    last_updated?: Date | string
  }

  export type pomodoro_sessionsCreateOrConnectWithoutPomodoro_taskInput = {
    where: pomodoro_sessionsWhereUniqueInput
    create: XOR<pomodoro_sessionsCreateWithoutPomodoro_taskInput, pomodoro_sessionsUncheckedCreateWithoutPomodoro_taskInput>
  }

  export type pomodoro_sessionsUpsertWithoutPomodoro_taskInput = {
    update: XOR<pomodoro_sessionsUpdateWithoutPomodoro_taskInput, pomodoro_sessionsUncheckedUpdateWithoutPomodoro_taskInput>
    create: XOR<pomodoro_sessionsCreateWithoutPomodoro_taskInput, pomodoro_sessionsUncheckedCreateWithoutPomodoro_taskInput>
    where?: pomodoro_sessionsWhereInput
  }

  export type pomodoro_sessionsUpdateToOneWithWhereWithoutPomodoro_taskInput = {
    where?: pomodoro_sessionsWhereInput
    data: XOR<pomodoro_sessionsUpdateWithoutPomodoro_taskInput, pomodoro_sessionsUncheckedUpdateWithoutPomodoro_taskInput>
  }

  export type pomodoro_sessionsUpdateWithoutPomodoro_taskInput = {
    Status?: EnumPomoStatusFieldUpdateOperationsInput | $Enums.PomoStatus
    StartTime?: DateTimeFieldUpdateOperationsInput | Date | string
    EndTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    PausedTime?: IntFieldUpdateOperationsInput | number
    duration_seconds?: IntFieldUpdateOperationsInput | number
    remaining_seconds?: IntFieldUpdateOperationsInput | number
    timer_type?: EnumTimerTypeFieldUpdateOperationsInput | $Enums.TimerType
    last_updated?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPomodoro_sessionsNestedInput
  }

  export type pomodoro_sessionsUncheckedUpdateWithoutPomodoro_taskInput = {
    SessionId?: IntFieldUpdateOperationsInput | number
    UserID?: IntFieldUpdateOperationsInput | number
    Status?: EnumPomoStatusFieldUpdateOperationsInput | $Enums.PomoStatus
    StartTime?: DateTimeFieldUpdateOperationsInput | Date | string
    EndTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    PausedTime?: IntFieldUpdateOperationsInput | number
    duration_seconds?: IntFieldUpdateOperationsInput | number
    remaining_seconds?: IntFieldUpdateOperationsInput | number
    timer_type?: EnumTimerTypeFieldUpdateOperationsInput | $Enums.TimerType
    last_updated?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type taskCreateManyUserInput = {
    TaskID?: number
    Task_Title: string
    Task_Description?: string | null
    Task_Start_Date?: Date | string | null
    Task_End_Date?: Date | string | null
    Task_Start_Time?: Date | string | null
    Task_End_Time?: Date | string | null
    Task_Icon?: string | null
    Task_Status?: $Enums.TaskStatus
    Task_Color: string
  }

  export type categoryCreateManyUserInput = {
    CategoryId?: number
    Category_Name: string
    Category_icon: string
    Category_Color?: string
    Category_is_Primary?: boolean
  }

  export type pomodoro_sessionsCreateManyUserInput = {
    SessionId?: number
    Status: $Enums.PomoStatus
    StartTime: Date | string
    EndTime?: Date | string | null
    PausedTime: number
    duration_seconds?: number
    remaining_seconds?: number
    timer_type: $Enums.TimerType
    last_updated?: Date | string
  }

  export type taskUpdateWithoutUserInput = {
    Task_Title?: StringFieldUpdateOperationsInput | string
    Task_Description?: NullableStringFieldUpdateOperationsInput | string | null
    Task_Start_Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Task_End_Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Task_Start_Time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Task_End_Time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Task_Icon?: NullableStringFieldUpdateOperationsInput | string | null
    Task_Status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    Task_Color?: StringFieldUpdateOperationsInput | string
    task_category?: task_categoryUpdateManyWithoutTaskNestedInput
  }

  export type taskUncheckedUpdateWithoutUserInput = {
    TaskID?: IntFieldUpdateOperationsInput | number
    Task_Title?: StringFieldUpdateOperationsInput | string
    Task_Description?: NullableStringFieldUpdateOperationsInput | string | null
    Task_Start_Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Task_End_Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Task_Start_Time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Task_End_Time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Task_Icon?: NullableStringFieldUpdateOperationsInput | string | null
    Task_Status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    Task_Color?: StringFieldUpdateOperationsInput | string
    task_category?: task_categoryUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type taskUncheckedUpdateManyWithoutUserInput = {
    TaskID?: IntFieldUpdateOperationsInput | number
    Task_Title?: StringFieldUpdateOperationsInput | string
    Task_Description?: NullableStringFieldUpdateOperationsInput | string | null
    Task_Start_Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Task_End_Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Task_Start_Time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Task_End_Time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Task_Icon?: NullableStringFieldUpdateOperationsInput | string | null
    Task_Status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    Task_Color?: StringFieldUpdateOperationsInput | string
  }

  export type categoryUpdateWithoutUserInput = {
    Category_Name?: StringFieldUpdateOperationsInput | string
    Category_icon?: StringFieldUpdateOperationsInput | string
    Category_Color?: StringFieldUpdateOperationsInput | string
    Category_is_Primary?: BoolFieldUpdateOperationsInput | boolean
    task_category?: task_categoryUpdateManyWithoutCategoryNestedInput
  }

  export type categoryUncheckedUpdateWithoutUserInput = {
    CategoryId?: IntFieldUpdateOperationsInput | number
    Category_Name?: StringFieldUpdateOperationsInput | string
    Category_icon?: StringFieldUpdateOperationsInput | string
    Category_Color?: StringFieldUpdateOperationsInput | string
    Category_is_Primary?: BoolFieldUpdateOperationsInput | boolean
    task_category?: task_categoryUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type categoryUncheckedUpdateManyWithoutUserInput = {
    CategoryId?: IntFieldUpdateOperationsInput | number
    Category_Name?: StringFieldUpdateOperationsInput | string
    Category_icon?: StringFieldUpdateOperationsInput | string
    Category_Color?: StringFieldUpdateOperationsInput | string
    Category_is_Primary?: BoolFieldUpdateOperationsInput | boolean
  }

  export type pomodoro_sessionsUpdateWithoutUserInput = {
    Status?: EnumPomoStatusFieldUpdateOperationsInput | $Enums.PomoStatus
    StartTime?: DateTimeFieldUpdateOperationsInput | Date | string
    EndTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    PausedTime?: IntFieldUpdateOperationsInput | number
    duration_seconds?: IntFieldUpdateOperationsInput | number
    remaining_seconds?: IntFieldUpdateOperationsInput | number
    timer_type?: EnumTimerTypeFieldUpdateOperationsInput | $Enums.TimerType
    last_updated?: DateTimeFieldUpdateOperationsInput | Date | string
    pomodoro_task?: pomodoro_taskUpdateManyWithoutSessionNestedInput
  }

  export type pomodoro_sessionsUncheckedUpdateWithoutUserInput = {
    SessionId?: IntFieldUpdateOperationsInput | number
    Status?: EnumPomoStatusFieldUpdateOperationsInput | $Enums.PomoStatus
    StartTime?: DateTimeFieldUpdateOperationsInput | Date | string
    EndTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    PausedTime?: IntFieldUpdateOperationsInput | number
    duration_seconds?: IntFieldUpdateOperationsInput | number
    remaining_seconds?: IntFieldUpdateOperationsInput | number
    timer_type?: EnumTimerTypeFieldUpdateOperationsInput | $Enums.TimerType
    last_updated?: DateTimeFieldUpdateOperationsInput | Date | string
    pomodoro_task?: pomodoro_taskUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type pomodoro_sessionsUncheckedUpdateManyWithoutUserInput = {
    SessionId?: IntFieldUpdateOperationsInput | number
    Status?: EnumPomoStatusFieldUpdateOperationsInput | $Enums.PomoStatus
    StartTime?: DateTimeFieldUpdateOperationsInput | Date | string
    EndTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    PausedTime?: IntFieldUpdateOperationsInput | number
    duration_seconds?: IntFieldUpdateOperationsInput | number
    remaining_seconds?: IntFieldUpdateOperationsInput | number
    timer_type?: EnumTimerTypeFieldUpdateOperationsInput | $Enums.TimerType
    last_updated?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type task_categoryCreateManyTaskInput = {
    CategoryId: number
  }

  export type task_categoryUpdateWithoutTaskInput = {
    category?: categoryUpdateOneRequiredWithoutTask_categoryNestedInput
  }

  export type task_categoryUncheckedUpdateWithoutTaskInput = {
    CategoryId?: IntFieldUpdateOperationsInput | number
  }

  export type task_categoryUncheckedUpdateManyWithoutTaskInput = {
    CategoryId?: IntFieldUpdateOperationsInput | number
  }

  export type task_categoryCreateManyCategoryInput = {
    TaskID: number
  }

  export type task_categoryUpdateWithoutCategoryInput = {
    task?: taskUpdateOneRequiredWithoutTask_categoryNestedInput
  }

  export type task_categoryUncheckedUpdateWithoutCategoryInput = {
    TaskID?: IntFieldUpdateOperationsInput | number
  }

  export type task_categoryUncheckedUpdateManyWithoutCategoryInput = {
    TaskID?: IntFieldUpdateOperationsInput | number
  }

  export type pomodoro_taskCreateManySessionInput = {
    Pomo_TaskId?: number
    Pomo_Task_Title: string
    Pomo_Task_Short?: number
    Pomo_Task_Long?: number
    Pomo_Task_Status?: boolean
    Pomo_Completed_Count?: number
    Pomo_Target_Count?: number
  }

  export type pomodoro_taskUpdateWithoutSessionInput = {
    Pomo_Task_Title?: StringFieldUpdateOperationsInput | string
    Pomo_Task_Short?: IntFieldUpdateOperationsInput | number
    Pomo_Task_Long?: IntFieldUpdateOperationsInput | number
    Pomo_Task_Status?: BoolFieldUpdateOperationsInput | boolean
    Pomo_Completed_Count?: IntFieldUpdateOperationsInput | number
    Pomo_Target_Count?: IntFieldUpdateOperationsInput | number
  }

  export type pomodoro_taskUncheckedUpdateWithoutSessionInput = {
    Pomo_TaskId?: IntFieldUpdateOperationsInput | number
    Pomo_Task_Title?: StringFieldUpdateOperationsInput | string
    Pomo_Task_Short?: IntFieldUpdateOperationsInput | number
    Pomo_Task_Long?: IntFieldUpdateOperationsInput | number
    Pomo_Task_Status?: BoolFieldUpdateOperationsInput | boolean
    Pomo_Completed_Count?: IntFieldUpdateOperationsInput | number
    Pomo_Target_Count?: IntFieldUpdateOperationsInput | number
  }

  export type pomodoro_taskUncheckedUpdateManyWithoutSessionInput = {
    Pomo_TaskId?: IntFieldUpdateOperationsInput | number
    Pomo_Task_Title?: StringFieldUpdateOperationsInput | string
    Pomo_Task_Short?: IntFieldUpdateOperationsInput | number
    Pomo_Task_Long?: IntFieldUpdateOperationsInput | number
    Pomo_Task_Status?: BoolFieldUpdateOperationsInput | boolean
    Pomo_Completed_Count?: IntFieldUpdateOperationsInput | number
    Pomo_Target_Count?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}