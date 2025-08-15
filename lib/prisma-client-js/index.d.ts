/**
 * Client
 **/

import * as runtime from "./runtime/library.js";
import $Types = runtime.Types; // general types
import $Public = runtime.Types.Public;
import $Utils = runtime.Types.Utils;
import $Extensions = runtime.Types.Extensions;
import $Result = runtime.Types.Result;

export type PrismaPromise<T> = $Public.PrismaPromise<T>;

/**
 * Model User
 *
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>;
/**
 * Model Nationality
 *
 */
export type Nationality = $Result.DefaultSelection<Prisma.$NationalityPayload>;
/**
 * Model Experience
 *
 */
export type Experience = $Result.DefaultSelection<Prisma.$ExperiencePayload>;
/**
 * Model Education
 *
 */
export type Education = $Result.DefaultSelection<Prisma.$EducationPayload>;
/**
 * Model Skill
 *
 */
export type Skill = $Result.DefaultSelection<Prisma.$SkillPayload>;
/**
 * Model Degree
 *
 */
export type Degree = $Result.DefaultSelection<Prisma.$DegreePayload>;
/**
 * Model Session
 *
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>;

/**
 * Enums
 */
export namespace $Enums {
  export const userRole: {
    USER: "USER";
    ADMIN: "ADMIN";
  };

  export type userRole = (typeof userRole)[keyof typeof userRole];
}

export type userRole = $Enums.userRole;

export const userRole: typeof $Enums.userRole;

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
  const U = "log" extends keyof ClientOptions
    ? ClientOptions["log"] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<ClientOptions["log"]>
      : never
    : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>["other"] };

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

  constructor(
    optionsArg?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>,
  );
  $on<V extends U>(
    eventType: V,
    callback: (
      event: V extends "query" ? Prisma.QueryEvent : Prisma.LogEvent,
    ) => void,
  ): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

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
  $executeRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

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
  $queryRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(
    arg: [...P],
    options?: { isolationLevel?: Prisma.TransactionIsolationLevel },
  ): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;

  $transaction<R>(
    fn: (
      prisma: Omit<PrismaClient, runtime.ITXClientDenyList>,
    ) => $Utils.JsPromise<R>,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    },
  ): $Utils.JsPromise<R>;

  $extends: $Extensions.ExtendsHook<
    "extends",
    Prisma.TypeMapCb<ClientOptions>,
    ExtArgs,
    $Utils.Call<
      Prisma.TypeMapCb<ClientOptions>,
      {
        extArgs: ExtArgs;
      }
    >
  >;

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
   * `prisma.nationality`: Exposes CRUD operations for the **Nationality** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Nationalities
   * const nationalities = await prisma.nationality.findMany()
   * ```
   */
  get nationality(): Prisma.NationalityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.experience`: Exposes CRUD operations for the **Experience** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Experiences
   * const experiences = await prisma.experience.findMany()
   * ```
   */
  get experience(): Prisma.ExperienceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.education`: Exposes CRUD operations for the **Education** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Educations
   * const educations = await prisma.education.findMany()
   * ```
   */
  get education(): Prisma.EducationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.skill`: Exposes CRUD operations for the **Skill** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Skills
   * const skills = await prisma.skill.findMany()
   * ```
   */
  get skill(): Prisma.SkillDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.degree`: Exposes CRUD operations for the **Degree** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Degrees
   * const degrees = await prisma.degree.findMany()
   * ```
   */
  get degree(): Prisma.DegreeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Sessions
   * const sessions = await prisma.session.findMany()
   * ```
   */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF;

  export type PrismaPromise<T> = $Public.PrismaPromise<T>;

  /**
   * Validator
   */
  export import validator = runtime.Public.validator;

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
  export import PrismaClientValidationError = runtime.PrismaClientValidationError;

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag;
  export import empty = runtime.empty;
  export import join = runtime.join;
  export import raw = runtime.raw;
  export import Sql = runtime.Sql;

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal;

  export type DecimalJsLike = runtime.DecimalJsLike;

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics;
  export type Metric<T> = runtime.Metric<T>;
  export type MetricHistogram = runtime.MetricHistogram;
  export type MetricHistogramBucket = runtime.MetricHistogramBucket;

  /**
   * Extensions
   */
  export import Extension = $Extensions.UserArgs;
  export import getExtensionContext = runtime.Extensions.getExtensionContext;
  export import Args = $Public.Args;
  export import Payload = $Public.Payload;
  export import Result = $Public.Result;
  export import Exact = $Public.Exact;

  /**
   * Prisma Client JS version: 6.14.0
   * Query Engine version: 717184b7b35ea05dfa71a3236b7af656013e1e49
   */
  export type PrismaVersion = {
    client: string;
  };

  export const prismaVersion: PrismaVersion;

  /**
   * Utility Types
   */

  export import JsonObject = runtime.JsonObject;
  export import JsonArray = runtime.JsonArray;
  export import JsonValue = runtime.JsonValue;
  export import InputJsonObject = runtime.InputJsonObject;
  export import InputJsonArray = runtime.InputJsonArray;
  export import InputJsonValue = runtime.InputJsonValue;

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
      private DbNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.JsonNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class JsonNull {
      private JsonNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.AnyNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class AnyNull {
      private AnyNull: never;
      private constructor();
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull;

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull;

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull;

  type SelectAndInclude = {
    select: any;
    include: any;
  };

  type SelectAndOmit = {
    select: any;
    omit: any;
  };

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> =
    T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<
    T extends (...args: any) => $Utils.JsPromise<any>,
  > = PromiseType<ReturnType<T>>;

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
  }[keyof T];

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K;
  };

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;

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
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & (T extends SelectAndInclude
    ? "Please either choose `select` or `include`."
    : T extends SelectAndOmit
      ? "Please either choose `select` or `omit`."
      : {});

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & K;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T extends object
    ? U extends object
      ? (Without<T, U> & U) | (Without<U, T> & T)
      : U
    : T;

  /**
   * Is T a Record?
   */
  type IsObject<T extends any> =
    T extends Array<any>
      ? False
      : T extends Date
        ? False
        : T extends Uint8Array
          ? False
          : T extends BigInt
            ? False
            : T extends object
              ? True
              : False;

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O>; // With K possibilities
    }[K];

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<
    __Either<O, K>
  >;

  type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
  }[strict];

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = O extends unknown ? _Either<O, K, strict> : never;

  export type Union = any;

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
  } & {};

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never;

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>;
      }
    >
  >;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O
    ? O[K]
    : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown
    ? AtStrict<O, K>
    : never;
  export type At<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function
    ? A
    : {
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
      ?
          | (K extends keyof O ? { [P in K]: O[P] } & O : O)
          | ({ [P in keyof O as P extends K ? P : never]-?: O[P] } & O)
      : never
  >;

  type _Strict<U, _U = U> = U extends unknown
    ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
    : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False;

  // /**
  // 1
  // */
  export type True = 1;

  /**
  0
  */
  export type False = 0;

  export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
  }[B];

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
      ? 1
      : 0;

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >;

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0;
      1: 1;
    };
    1: {
      0: 1;
      1: 1;
    };
  }[B1][B2];

  export type Keys<U extends Union> = U extends unknown ? keyof U : never;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object
    ? {
        [P in keyof T]: P extends keyof O ? O[P] : never;
      }
    : never;

  type FieldPaths<
    T,
    U = Omit<T, "_avg" | "_sum" | "_count" | "_min" | "_max">,
  > = IsObject<T> extends True ? U : T;

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<"OR", K>, Extends<"AND", K>>,
      Extends<"NOT", K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<
            UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never
          >
        : never
      : {} extends FieldPaths<T[K]>
        ? never
        : K;
  }[keyof T];

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<
    T,
    K extends Enumerable<keyof T> | keyof T,
  > = Prisma__Pick<T, MaybeTupleToUnion<K>>;

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}`
    ? never
    : T;

  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;

  type FieldRefInputType<Model, FieldType> = Model extends never
    ? never
    : FieldRef<Model, FieldType>;

  export const ModelName: {
    User: "User";
    Nationality: "Nationality";
    Experience: "Experience";
    Education: "Education";
    Skill: "Skill";
    Degree: "Degree";
    Session: "Session";
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName];

  export type Datasources = {
    db?: Datasource;
  };

  interface TypeMapCb<ClientOptions = {}>
    extends $Utils.Fn<
      { extArgs: $Extensions.InternalArgs },
      $Utils.Record<string, any>
    > {
    returns: Prisma.TypeMap<
      this["params"]["extArgs"],
      ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}
    >;
  }

  export type TypeMap<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > = {
    globalOmitOptions: {
      omit: GlobalOmitOptions;
    };
    meta: {
      modelProps:
        | "user"
        | "nationality"
        | "experience"
        | "education"
        | "skill"
        | "degree"
        | "session";
      txIsolationLevel: Prisma.TransactionIsolationLevel;
    };
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>;
        fields: Prisma.UserFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateUser>;
          };
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>;
            result: $Utils.Optional<UserGroupByOutputType>[];
          };
          count: {
            args: Prisma.UserCountArgs<ExtArgs>;
            result: $Utils.Optional<UserCountAggregateOutputType> | number;
          };
        };
      };
      Nationality: {
        payload: Prisma.$NationalityPayload<ExtArgs>;
        fields: Prisma.NationalityFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.NationalityFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$NationalityPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.NationalityFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$NationalityPayload>;
          };
          findFirst: {
            args: Prisma.NationalityFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$NationalityPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.NationalityFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$NationalityPayload>;
          };
          findMany: {
            args: Prisma.NationalityFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$NationalityPayload>[];
          };
          create: {
            args: Prisma.NationalityCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$NationalityPayload>;
          };
          createMany: {
            args: Prisma.NationalityCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.NationalityCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$NationalityPayload>[];
          };
          delete: {
            args: Prisma.NationalityDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$NationalityPayload>;
          };
          update: {
            args: Prisma.NationalityUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$NationalityPayload>;
          };
          deleteMany: {
            args: Prisma.NationalityDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.NationalityUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.NationalityUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$NationalityPayload>[];
          };
          upsert: {
            args: Prisma.NationalityUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$NationalityPayload>;
          };
          aggregate: {
            args: Prisma.NationalityAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateNationality>;
          };
          groupBy: {
            args: Prisma.NationalityGroupByArgs<ExtArgs>;
            result: $Utils.Optional<NationalityGroupByOutputType>[];
          };
          count: {
            args: Prisma.NationalityCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<NationalityCountAggregateOutputType>
              | number;
          };
        };
      };
      Experience: {
        payload: Prisma.$ExperiencePayload<ExtArgs>;
        fields: Prisma.ExperienceFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ExperienceFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ExperienceFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>;
          };
          findFirst: {
            args: Prisma.ExperienceFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ExperienceFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>;
          };
          findMany: {
            args: Prisma.ExperienceFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>[];
          };
          create: {
            args: Prisma.ExperienceCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>;
          };
          createMany: {
            args: Prisma.ExperienceCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ExperienceCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>[];
          };
          delete: {
            args: Prisma.ExperienceDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>;
          };
          update: {
            args: Prisma.ExperienceUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>;
          };
          deleteMany: {
            args: Prisma.ExperienceDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ExperienceUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.ExperienceUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>[];
          };
          upsert: {
            args: Prisma.ExperienceUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExperiencePayload>;
          };
          aggregate: {
            args: Prisma.ExperienceAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateExperience>;
          };
          groupBy: {
            args: Prisma.ExperienceGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ExperienceGroupByOutputType>[];
          };
          count: {
            args: Prisma.ExperienceCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<ExperienceCountAggregateOutputType>
              | number;
          };
        };
      };
      Education: {
        payload: Prisma.$EducationPayload<ExtArgs>;
        fields: Prisma.EducationFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.EducationFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EducationPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.EducationFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>;
          };
          findFirst: {
            args: Prisma.EducationFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EducationPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.EducationFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>;
          };
          findMany: {
            args: Prisma.EducationFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>[];
          };
          create: {
            args: Prisma.EducationCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>;
          };
          createMany: {
            args: Prisma.EducationCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.EducationCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>[];
          };
          delete: {
            args: Prisma.EducationDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>;
          };
          update: {
            args: Prisma.EducationUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>;
          };
          deleteMany: {
            args: Prisma.EducationDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.EducationUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.EducationUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>[];
          };
          upsert: {
            args: Prisma.EducationUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EducationPayload>;
          };
          aggregate: {
            args: Prisma.EducationAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateEducation>;
          };
          groupBy: {
            args: Prisma.EducationGroupByArgs<ExtArgs>;
            result: $Utils.Optional<EducationGroupByOutputType>[];
          };
          count: {
            args: Prisma.EducationCountArgs<ExtArgs>;
            result: $Utils.Optional<EducationCountAggregateOutputType> | number;
          };
        };
      };
      Skill: {
        payload: Prisma.$SkillPayload<ExtArgs>;
        fields: Prisma.SkillFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.SkillFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SkillPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.SkillFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>;
          };
          findFirst: {
            args: Prisma.SkillFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SkillPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.SkillFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>;
          };
          findMany: {
            args: Prisma.SkillFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>[];
          };
          create: {
            args: Prisma.SkillCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>;
          };
          createMany: {
            args: Prisma.SkillCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.SkillCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>[];
          };
          delete: {
            args: Prisma.SkillDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>;
          };
          update: {
            args: Prisma.SkillUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>;
          };
          deleteMany: {
            args: Prisma.SkillDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.SkillUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.SkillUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>[];
          };
          upsert: {
            args: Prisma.SkillUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>;
          };
          aggregate: {
            args: Prisma.SkillAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateSkill>;
          };
          groupBy: {
            args: Prisma.SkillGroupByArgs<ExtArgs>;
            result: $Utils.Optional<SkillGroupByOutputType>[];
          };
          count: {
            args: Prisma.SkillCountArgs<ExtArgs>;
            result: $Utils.Optional<SkillCountAggregateOutputType> | number;
          };
        };
      };
      Degree: {
        payload: Prisma.$DegreePayload<ExtArgs>;
        fields: Prisma.DegreeFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.DegreeFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DegreePayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.DegreeFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DegreePayload>;
          };
          findFirst: {
            args: Prisma.DegreeFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DegreePayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.DegreeFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DegreePayload>;
          };
          findMany: {
            args: Prisma.DegreeFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DegreePayload>[];
          };
          create: {
            args: Prisma.DegreeCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DegreePayload>;
          };
          createMany: {
            args: Prisma.DegreeCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.DegreeCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DegreePayload>[];
          };
          delete: {
            args: Prisma.DegreeDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DegreePayload>;
          };
          update: {
            args: Prisma.DegreeUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DegreePayload>;
          };
          deleteMany: {
            args: Prisma.DegreeDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.DegreeUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.DegreeUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DegreePayload>[];
          };
          upsert: {
            args: Prisma.DegreeUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DegreePayload>;
          };
          aggregate: {
            args: Prisma.DegreeAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateDegree>;
          };
          groupBy: {
            args: Prisma.DegreeGroupByArgs<ExtArgs>;
            result: $Utils.Optional<DegreeGroupByOutputType>[];
          };
          count: {
            args: Prisma.DegreeCountArgs<ExtArgs>;
            result: $Utils.Optional<DegreeCountAggregateOutputType> | number;
          };
        };
      };
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>;
        fields: Prisma.SessionFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[];
          };
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[];
          };
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[];
          };
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateSession>;
          };
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>;
            result: $Utils.Optional<SessionGroupByOutputType>[];
          };
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>;
            result: $Utils.Optional<SessionCountAggregateOutputType> | number;
          };
        };
      };
    };
  } & {
    other: {
      payload: any;
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
      };
    };
  };
  export const defineExtension: $Extensions.ExtendsHook<
    "define",
    Prisma.TypeMapCb,
    $Extensions.DefaultArgs
  >;
  export type DefaultPrismaClient = PrismaClient;
  export type ErrorFormat = "pretty" | "colorless" | "minimal";
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources;
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string;
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     *
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     *
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    };
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
    omit?: Prisma.GlobalOmitConfig;
  }
  export type GlobalOmitConfig = {
    user?: UserOmit;
    nationality?: NationalityOmit;
    experience?: ExperienceOmit;
    education?: EducationOmit;
    skill?: SkillOmit;
    degree?: DegreeOmit;
    session?: SessionOmit;
  };

  /* Types for Logging */
  export type LogLevel = "info" | "query" | "warn" | "error";
  export type LogDefinition = {
    level: LogLevel;
    emit: "stdout" | "event";
  };

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T["level"] : T
  >;

  export type GetEvents<T extends any[]> =
    T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;

  export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  };

  export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
  };
  /* End Types for Logging */

  export type PrismaAction =
    | "findUnique"
    | "findUniqueOrThrow"
    | "findMany"
    | "findFirst"
    | "findFirstOrThrow"
    | "create"
    | "createMany"
    | "createManyAndReturn"
    | "update"
    | "updateMany"
    | "updateManyAndReturn"
    | "upsert"
    | "delete"
    | "deleteMany"
    | "executeRaw"
    | "queryRaw"
    | "aggregate"
    | "count"
    | "runCommandRaw"
    | "findRaw"
    | "groupBy";

  // tested in getLogLevel.test.ts
  export function getLogLevel(
    log: Array<LogLevel | LogDefinition>,
  ): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<
    Prisma.DefaultPrismaClient,
    runtime.ITXClientDenyList
  >;

  export type Datasource = {
    url?: string;
  };

  /**
   * Count Types
   */

  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    experiences: number;
    educations: number;
    skills: number;
    degrees: number;
    session: number;
  };

  export type UserCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    experiences?: boolean | UserCountOutputTypeCountExperiencesArgs;
    educations?: boolean | UserCountOutputTypeCountEducationsArgs;
    skills?: boolean | UserCountOutputTypeCountSkillsArgs;
    degrees?: boolean | UserCountOutputTypeCountDegreesArgs;
    session?: boolean | UserCountOutputTypeCountSessionArgs;
  };

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountExperiencesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ExperienceWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountEducationsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: EducationWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSkillsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: SkillWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDegreesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: DegreeWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: SessionWhereInput;
  };

  /**
   * Count Type NationalityCountOutputType
   */

  export type NationalityCountOutputType = {
    User: number;
  };

  export type NationalityCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    User?: boolean | NationalityCountOutputTypeCountUserArgs;
  };

  // Custom InputTypes
  /**
   * NationalityCountOutputType without action
   */
  export type NationalityCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the NationalityCountOutputType
     */
    select?: NationalityCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * NationalityCountOutputType without action
   */
  export type NationalityCountOutputTypeCountUserArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: UserWhereInput;
  };

  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  export type UserMinAggregateOutputType = {
    id: string | null;
    firstName: string | null;
    lastName: string | null;
    username: string | null;
    email: string | null;
    password: string | null;
    avatarPicture: string | null;
    description: string | null;
    dateBirth: Date | null;
    title: string | null;
    titleProfession: string | null;
    linkWebsite: string | null;
    isVerify: boolean | null;
    emailVerificationToken: string | null;
    emailVerificationTokenExpiresAt: Date | null;
    resetPasswordToken: string | null;
    resetPasswordTokenExpiresAt: Date | null;
    onboarding: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    role: $Enums.userRole | null;
    nationalityId: string | null;
  };

  export type UserMaxAggregateOutputType = {
    id: string | null;
    firstName: string | null;
    lastName: string | null;
    username: string | null;
    email: string | null;
    password: string | null;
    avatarPicture: string | null;
    description: string | null;
    dateBirth: Date | null;
    title: string | null;
    titleProfession: string | null;
    linkWebsite: string | null;
    isVerify: boolean | null;
    emailVerificationToken: string | null;
    emailVerificationTokenExpiresAt: Date | null;
    resetPasswordToken: string | null;
    resetPasswordTokenExpiresAt: Date | null;
    onboarding: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    role: $Enums.userRole | null;
    nationalityId: string | null;
  };

  export type UserCountAggregateOutputType = {
    id: number;
    firstName: number;
    lastName: number;
    username: number;
    email: number;
    password: number;
    avatarPicture: number;
    description: number;
    dateBirth: number;
    title: number;
    titleProfession: number;
    linkWebsite: number;
    isVerify: number;
    emailVerificationToken: number;
    emailVerificationTokenExpiresAt: number;
    resetPasswordToken: number;
    resetPasswordTokenExpiresAt: number;
    onboarding: number;
    createdAt: number;
    updatedAt: number;
    role: number;
    nationalityId: number;
    _all: number;
  };

  export type UserMinAggregateInputType = {
    id?: true;
    firstName?: true;
    lastName?: true;
    username?: true;
    email?: true;
    password?: true;
    avatarPicture?: true;
    description?: true;
    dateBirth?: true;
    title?: true;
    titleProfession?: true;
    linkWebsite?: true;
    isVerify?: true;
    emailVerificationToken?: true;
    emailVerificationTokenExpiresAt?: true;
    resetPasswordToken?: true;
    resetPasswordTokenExpiresAt?: true;
    onboarding?: true;
    createdAt?: true;
    updatedAt?: true;
    role?: true;
    nationalityId?: true;
  };

  export type UserMaxAggregateInputType = {
    id?: true;
    firstName?: true;
    lastName?: true;
    username?: true;
    email?: true;
    password?: true;
    avatarPicture?: true;
    description?: true;
    dateBirth?: true;
    title?: true;
    titleProfession?: true;
    linkWebsite?: true;
    isVerify?: true;
    emailVerificationToken?: true;
    emailVerificationTokenExpiresAt?: true;
    resetPasswordToken?: true;
    resetPasswordTokenExpiresAt?: true;
    onboarding?: true;
    createdAt?: true;
    updatedAt?: true;
    role?: true;
    nationalityId?: true;
  };

  export type UserCountAggregateInputType = {
    id?: true;
    firstName?: true;
    lastName?: true;
    username?: true;
    email?: true;
    password?: true;
    avatarPicture?: true;
    description?: true;
    dateBirth?: true;
    title?: true;
    titleProfession?: true;
    linkWebsite?: true;
    isVerify?: true;
    emailVerificationToken?: true;
    emailVerificationTokenExpiresAt?: true;
    resetPasswordToken?: true;
    resetPasswordTokenExpiresAt?: true;
    onboarding?: true;
    createdAt?: true;
    updatedAt?: true;
    role?: true;
    nationalityId?: true;
    _all?: true;
  };

  export type UserAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
     **/
    _count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: UserMaxAggregateInputType;
  };

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>;
  };

  export type UserGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: UserWhereInput;
    orderBy?:
      | UserOrderByWithAggregationInput
      | UserOrderByWithAggregationInput[];
    by: UserScalarFieldEnum[] | UserScalarFieldEnum;
    having?: UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
  };

  export type UserGroupByOutputType = {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    avatarPicture: string | null;
    description: string | null;
    dateBirth: Date;
    title: string | null;
    titleProfession: string | null;
    linkWebsite: string | null;
    isVerify: boolean;
    emailVerificationToken: string | null;
    emailVerificationTokenExpiresAt: Date | null;
    resetPasswordToken: string | null;
    resetPasswordTokenExpiresAt: Date | null;
    onboarding: boolean;
    createdAt: Date;
    updatedAt: Date;
    role: $Enums.userRole;
    nationalityId: string | null;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T["by"]> & {
        [P in keyof T & keyof UserGroupByOutputType]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], UserGroupByOutputType[P]>
          : GetScalarType<T[P], UserGroupByOutputType[P]>;
      }
    >
  >;

  export type UserSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      firstName?: boolean;
      lastName?: boolean;
      username?: boolean;
      email?: boolean;
      password?: boolean;
      avatarPicture?: boolean;
      description?: boolean;
      dateBirth?: boolean;
      title?: boolean;
      titleProfession?: boolean;
      linkWebsite?: boolean;
      isVerify?: boolean;
      emailVerificationToken?: boolean;
      emailVerificationTokenExpiresAt?: boolean;
      resetPasswordToken?: boolean;
      resetPasswordTokenExpiresAt?: boolean;
      onboarding?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      role?: boolean;
      nationalityId?: boolean;
      nationality?: boolean | User$nationalityArgs<ExtArgs>;
      experiences?: boolean | User$experiencesArgs<ExtArgs>;
      educations?: boolean | User$educationsArgs<ExtArgs>;
      skills?: boolean | User$skillsArgs<ExtArgs>;
      degrees?: boolean | User$degreesArgs<ExtArgs>;
      session?: boolean | User$sessionArgs<ExtArgs>;
      _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["user"]
  >;

  export type UserSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      firstName?: boolean;
      lastName?: boolean;
      username?: boolean;
      email?: boolean;
      password?: boolean;
      avatarPicture?: boolean;
      description?: boolean;
      dateBirth?: boolean;
      title?: boolean;
      titleProfession?: boolean;
      linkWebsite?: boolean;
      isVerify?: boolean;
      emailVerificationToken?: boolean;
      emailVerificationTokenExpiresAt?: boolean;
      resetPasswordToken?: boolean;
      resetPasswordTokenExpiresAt?: boolean;
      onboarding?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      role?: boolean;
      nationalityId?: boolean;
      nationality?: boolean | User$nationalityArgs<ExtArgs>;
    },
    ExtArgs["result"]["user"]
  >;

  export type UserSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      firstName?: boolean;
      lastName?: boolean;
      username?: boolean;
      email?: boolean;
      password?: boolean;
      avatarPicture?: boolean;
      description?: boolean;
      dateBirth?: boolean;
      title?: boolean;
      titleProfession?: boolean;
      linkWebsite?: boolean;
      isVerify?: boolean;
      emailVerificationToken?: boolean;
      emailVerificationTokenExpiresAt?: boolean;
      resetPasswordToken?: boolean;
      resetPasswordTokenExpiresAt?: boolean;
      onboarding?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      role?: boolean;
      nationalityId?: boolean;
      nationality?: boolean | User$nationalityArgs<ExtArgs>;
    },
    ExtArgs["result"]["user"]
  >;

  export type UserSelectScalar = {
    id?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    username?: boolean;
    email?: boolean;
    password?: boolean;
    avatarPicture?: boolean;
    description?: boolean;
    dateBirth?: boolean;
    title?: boolean;
    titleProfession?: boolean;
    linkWebsite?: boolean;
    isVerify?: boolean;
    emailVerificationToken?: boolean;
    emailVerificationTokenExpiresAt?: boolean;
    resetPasswordToken?: boolean;
    resetPasswordTokenExpiresAt?: boolean;
    onboarding?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    role?: boolean;
    nationalityId?: boolean;
  };

  export type UserOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | "id"
    | "firstName"
    | "lastName"
    | "username"
    | "email"
    | "password"
    | "avatarPicture"
    | "description"
    | "dateBirth"
    | "title"
    | "titleProfession"
    | "linkWebsite"
    | "isVerify"
    | "emailVerificationToken"
    | "emailVerificationTokenExpiresAt"
    | "resetPasswordToken"
    | "resetPasswordTokenExpiresAt"
    | "onboarding"
    | "createdAt"
    | "updatedAt"
    | "role"
    | "nationalityId",
    ExtArgs["result"]["user"]
  >;
  export type UserInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    nationality?: boolean | User$nationalityArgs<ExtArgs>;
    experiences?: boolean | User$experiencesArgs<ExtArgs>;
    educations?: boolean | User$educationsArgs<ExtArgs>;
    skills?: boolean | User$skillsArgs<ExtArgs>;
    degrees?: boolean | User$degreesArgs<ExtArgs>;
    session?: boolean | User$sessionArgs<ExtArgs>;
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type UserIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    nationality?: boolean | User$nationalityArgs<ExtArgs>;
  };
  export type UserIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    nationality?: boolean | User$nationalityArgs<ExtArgs>;
  };

  export type $UserPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "User";
    objects: {
      nationality: Prisma.$NationalityPayload<ExtArgs> | null;
      experiences: Prisma.$ExperiencePayload<ExtArgs>[];
      educations: Prisma.$EducationPayload<ExtArgs>[];
      skills: Prisma.$SkillPayload<ExtArgs>[];
      degrees: Prisma.$DegreePayload<ExtArgs>[];
      session: Prisma.$SessionPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        firstName: string;
        lastName: string;
        username: string;
        email: string;
        password: string;
        avatarPicture: string | null;
        description: string | null;
        dateBirth: Date;
        title: string | null;
        titleProfession: string | null;
        linkWebsite: string | null;
        isVerify: boolean;
        emailVerificationToken: string | null;
        emailVerificationTokenExpiresAt: Date | null;
        resetPasswordToken: string | null;
        resetPasswordTokenExpiresAt: Date | null;
        onboarding: boolean;
        createdAt: Date;
        updatedAt: Date;
        role: $Enums.userRole;
        nationalityId: string | null;
      },
      ExtArgs["result"]["user"]
    >;
    composites: {};
  };

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> =
    $Result.GetResult<Prisma.$UserPayload, S>;

  type UserCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<UserFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
    select?: UserCountAggregateInputType | true;
  };

  export interface UserDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["User"];
      meta: { name: "User" };
    };
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
    findUnique<T extends UserFindUniqueArgs>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

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
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

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
    findFirst<T extends UserFindFirstArgs>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

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
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

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
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

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
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

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
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

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
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(
      args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

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
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

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
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

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
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

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
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

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
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(
      args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

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
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

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
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], UserCountAggregateOutputType>
        : number
    >;

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
    aggregate<T extends UserAggregateArgs>(
      args: Subset<T, UserAggregateArgs>,
    ): Prisma.PrismaPromise<GetUserAggregateType<T>>;

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
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs["orderBy"] }
        : { orderBy?: UserGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
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
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetUserGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
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
  export interface Prisma__UserClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    nationality<T extends User$nationalityArgs<ExtArgs> = {}>(
      args?: Subset<T, User$nationalityArgs<ExtArgs>>,
    ): Prisma__NationalityClient<
      $Result.GetResult<
        Prisma.$NationalityPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;
    experiences<T extends User$experiencesArgs<ExtArgs> = {}>(
      args?: Subset<T, User$experiencesArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$ExperiencePayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    educations<T extends User$educationsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$educationsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$EducationPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    skills<T extends User$skillsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$skillsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$SkillPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    degrees<T extends User$degreesArgs<ExtArgs> = {}>(
      args?: Subset<T, User$degreesArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$DegreePayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    session<T extends User$sessionArgs<ExtArgs> = {}>(
      args?: Subset<T, User$sessionArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$SessionPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", "String">;
    readonly firstName: FieldRef<"User", "String">;
    readonly lastName: FieldRef<"User", "String">;
    readonly username: FieldRef<"User", "String">;
    readonly email: FieldRef<"User", "String">;
    readonly password: FieldRef<"User", "String">;
    readonly avatarPicture: FieldRef<"User", "String">;
    readonly description: FieldRef<"User", "String">;
    readonly dateBirth: FieldRef<"User", "DateTime">;
    readonly title: FieldRef<"User", "String">;
    readonly titleProfession: FieldRef<"User", "String">;
    readonly linkWebsite: FieldRef<"User", "String">;
    readonly isVerify: FieldRef<"User", "Boolean">;
    readonly emailVerificationToken: FieldRef<"User", "String">;
    readonly emailVerificationTokenExpiresAt: FieldRef<"User", "DateTime">;
    readonly resetPasswordToken: FieldRef<"User", "String">;
    readonly resetPasswordTokenExpiresAt: FieldRef<"User", "DateTime">;
    readonly onboarding: FieldRef<"User", "Boolean">;
    readonly createdAt: FieldRef<"User", "DateTime">;
    readonly updatedAt: FieldRef<"User", "DateTime">;
    readonly role: FieldRef<"User", "userRole">;
    readonly nationalityId: FieldRef<"User", "String">;
  }

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findMany
   */
  export type UserFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User create
   */
  export type UserCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>;
  };

  /**
   * User createMany
   */
  export type UserCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * User update
   */
  export type UserUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
  };

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * User upsert
   */
  export type UserUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
  };

  /**
   * User delete
   */
  export type UserDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to delete.
     */
    limit?: number;
  };

  /**
   * User.nationality
   */
  export type User$nationalityArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Nationality
     */
    select?: NationalitySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Nationality
     */
    omit?: NationalityOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NationalityInclude<ExtArgs> | null;
    where?: NationalityWhereInput;
  };

  /**
   * User.experiences
   */
  export type User$experiencesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null;
    where?: ExperienceWhereInput;
    orderBy?:
      | ExperienceOrderByWithRelationInput
      | ExperienceOrderByWithRelationInput[];
    cursor?: ExperienceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ExperienceScalarFieldEnum | ExperienceScalarFieldEnum[];
  };

  /**
   * User.educations
   */
  export type User$educationsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EducationInclude<ExtArgs> | null;
    where?: EducationWhereInput;
    orderBy?:
      | EducationOrderByWithRelationInput
      | EducationOrderByWithRelationInput[];
    cursor?: EducationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: EducationScalarFieldEnum | EducationScalarFieldEnum[];
  };

  /**
   * User.skills
   */
  export type User$skillsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null;
    where?: SkillWhereInput;
    orderBy?: SkillOrderByWithRelationInput | SkillOrderByWithRelationInput[];
    cursor?: SkillWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: SkillScalarFieldEnum | SkillScalarFieldEnum[];
  };

  /**
   * User.degrees
   */
  export type User$degreesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Degree
     */
    select?: DegreeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Degree
     */
    omit?: DegreeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DegreeInclude<ExtArgs> | null;
    where?: DegreeWhereInput;
    orderBy?: DegreeOrderByWithRelationInput | DegreeOrderByWithRelationInput[];
    cursor?: DegreeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: DegreeScalarFieldEnum | DegreeScalarFieldEnum[];
  };

  /**
   * User.session
   */
  export type User$sessionArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    where?: SessionWhereInput;
    orderBy?:
      | SessionOrderByWithRelationInput
      | SessionOrderByWithRelationInput[];
    cursor?: SessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
  };

  /**
   * User without action
   */
  export type UserDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
  };

  /**
   * Model Nationality
   */

  export type AggregateNationality = {
    _count: NationalityCountAggregateOutputType | null;
    _min: NationalityMinAggregateOutputType | null;
    _max: NationalityMaxAggregateOutputType | null;
  };

  export type NationalityMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    flag: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type NationalityMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    flag: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type NationalityCountAggregateOutputType = {
    id: number;
    name: number;
    flag: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type NationalityMinAggregateInputType = {
    id?: true;
    name?: true;
    flag?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type NationalityMaxAggregateInputType = {
    id?: true;
    name?: true;
    flag?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type NationalityCountAggregateInputType = {
    id?: true;
    name?: true;
    flag?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type NationalityAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Nationality to aggregate.
     */
    where?: NationalityWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Nationalities to fetch.
     */
    orderBy?:
      | NationalityOrderByWithRelationInput
      | NationalityOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: NationalityWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Nationalities from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Nationalities.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Nationalities
     **/
    _count?: true | NationalityCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: NationalityMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: NationalityMaxAggregateInputType;
  };

  export type GetNationalityAggregateType<T extends NationalityAggregateArgs> =
    {
      [P in keyof T & keyof AggregateNationality]: P extends "_count" | "count"
        ? T[P] extends true
          ? number
          : GetScalarType<T[P], AggregateNationality[P]>
        : GetScalarType<T[P], AggregateNationality[P]>;
    };

  export type NationalityGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: NationalityWhereInput;
    orderBy?:
      | NationalityOrderByWithAggregationInput
      | NationalityOrderByWithAggregationInput[];
    by: NationalityScalarFieldEnum[] | NationalityScalarFieldEnum;
    having?: NationalityScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: NationalityCountAggregateInputType | true;
    _min?: NationalityMinAggregateInputType;
    _max?: NationalityMaxAggregateInputType;
  };

  export type NationalityGroupByOutputType = {
    id: string;
    name: string;
    flag: string;
    createdAt: Date;
    updatedAt: Date;
    _count: NationalityCountAggregateOutputType | null;
    _min: NationalityMinAggregateOutputType | null;
    _max: NationalityMaxAggregateOutputType | null;
  };

  type GetNationalityGroupByPayload<T extends NationalityGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<NationalityGroupByOutputType, T["by"]> & {
          [P in keyof T &
            keyof NationalityGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NationalityGroupByOutputType[P]>
            : GetScalarType<T[P], NationalityGroupByOutputType[P]>;
        }
      >
    >;

  export type NationalitySelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      flag?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      User?: boolean | Nationality$UserArgs<ExtArgs>;
      _count?: boolean | NationalityCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["nationality"]
  >;

  export type NationalitySelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      flag?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs["result"]["nationality"]
  >;

  export type NationalitySelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      flag?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs["result"]["nationality"]
  >;

  export type NationalitySelectScalar = {
    id?: boolean;
    name?: boolean;
    flag?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type NationalityOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    "id" | "name" | "flag" | "createdAt" | "updatedAt",
    ExtArgs["result"]["nationality"]
  >;
  export type NationalityInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    User?: boolean | Nationality$UserArgs<ExtArgs>;
    _count?: boolean | NationalityCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type NationalityIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};
  export type NationalityIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $NationalityPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Nationality";
    objects: {
      User: Prisma.$UserPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        name: string;
        flag: string;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs["result"]["nationality"]
    >;
    composites: {};
  };

  type NationalityGetPayload<
    S extends boolean | null | undefined | NationalityDefaultArgs,
  > = $Result.GetResult<Prisma.$NationalityPayload, S>;

  type NationalityCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    NationalityFindManyArgs,
    "select" | "include" | "distinct" | "omit"
  > & {
    select?: NationalityCountAggregateInputType | true;
  };

  export interface NationalityDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Nationality"];
      meta: { name: "Nationality" };
    };
    /**
     * Find zero or one Nationality that matches the filter.
     * @param {NationalityFindUniqueArgs} args - Arguments to find a Nationality
     * @example
     * // Get one Nationality
     * const nationality = await prisma.nationality.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NationalityFindUniqueArgs>(
      args: SelectSubset<T, NationalityFindUniqueArgs<ExtArgs>>,
    ): Prisma__NationalityClient<
      $Result.GetResult<
        Prisma.$NationalityPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Nationality that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NationalityFindUniqueOrThrowArgs} args - Arguments to find a Nationality
     * @example
     * // Get one Nationality
     * const nationality = await prisma.nationality.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NationalityFindUniqueOrThrowArgs>(
      args: SelectSubset<T, NationalityFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__NationalityClient<
      $Result.GetResult<
        Prisma.$NationalityPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Nationality that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NationalityFindFirstArgs} args - Arguments to find a Nationality
     * @example
     * // Get one Nationality
     * const nationality = await prisma.nationality.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NationalityFindFirstArgs>(
      args?: SelectSubset<T, NationalityFindFirstArgs<ExtArgs>>,
    ): Prisma__NationalityClient<
      $Result.GetResult<
        Prisma.$NationalityPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Nationality that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NationalityFindFirstOrThrowArgs} args - Arguments to find a Nationality
     * @example
     * // Get one Nationality
     * const nationality = await prisma.nationality.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NationalityFindFirstOrThrowArgs>(
      args?: SelectSubset<T, NationalityFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__NationalityClient<
      $Result.GetResult<
        Prisma.$NationalityPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Nationalities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NationalityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Nationalities
     * const nationalities = await prisma.nationality.findMany()
     *
     * // Get first 10 Nationalities
     * const nationalities = await prisma.nationality.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const nationalityWithIdOnly = await prisma.nationality.findMany({ select: { id: true } })
     *
     */
    findMany<T extends NationalityFindManyArgs>(
      args?: SelectSubset<T, NationalityFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$NationalityPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Nationality.
     * @param {NationalityCreateArgs} args - Arguments to create a Nationality.
     * @example
     * // Create one Nationality
     * const Nationality = await prisma.nationality.create({
     *   data: {
     *     // ... data to create a Nationality
     *   }
     * })
     *
     */
    create<T extends NationalityCreateArgs>(
      args: SelectSubset<T, NationalityCreateArgs<ExtArgs>>,
    ): Prisma__NationalityClient<
      $Result.GetResult<
        Prisma.$NationalityPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Nationalities.
     * @param {NationalityCreateManyArgs} args - Arguments to create many Nationalities.
     * @example
     * // Create many Nationalities
     * const nationality = await prisma.nationality.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends NationalityCreateManyArgs>(
      args?: SelectSubset<T, NationalityCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Nationalities and returns the data saved in the database.
     * @param {NationalityCreateManyAndReturnArgs} args - Arguments to create many Nationalities.
     * @example
     * // Create many Nationalities
     * const nationality = await prisma.nationality.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Nationalities and only return the `id`
     * const nationalityWithIdOnly = await prisma.nationality.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends NationalityCreateManyAndReturnArgs>(
      args?: SelectSubset<T, NationalityCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$NationalityPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Nationality.
     * @param {NationalityDeleteArgs} args - Arguments to delete one Nationality.
     * @example
     * // Delete one Nationality
     * const Nationality = await prisma.nationality.delete({
     *   where: {
     *     // ... filter to delete one Nationality
     *   }
     * })
     *
     */
    delete<T extends NationalityDeleteArgs>(
      args: SelectSubset<T, NationalityDeleteArgs<ExtArgs>>,
    ): Prisma__NationalityClient<
      $Result.GetResult<
        Prisma.$NationalityPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Nationality.
     * @param {NationalityUpdateArgs} args - Arguments to update one Nationality.
     * @example
     * // Update one Nationality
     * const nationality = await prisma.nationality.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends NationalityUpdateArgs>(
      args: SelectSubset<T, NationalityUpdateArgs<ExtArgs>>,
    ): Prisma__NationalityClient<
      $Result.GetResult<
        Prisma.$NationalityPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Nationalities.
     * @param {NationalityDeleteManyArgs} args - Arguments to filter Nationalities to delete.
     * @example
     * // Delete a few Nationalities
     * const { count } = await prisma.nationality.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends NationalityDeleteManyArgs>(
      args?: SelectSubset<T, NationalityDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Nationalities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NationalityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Nationalities
     * const nationality = await prisma.nationality.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends NationalityUpdateManyArgs>(
      args: SelectSubset<T, NationalityUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Nationalities and returns the data updated in the database.
     * @param {NationalityUpdateManyAndReturnArgs} args - Arguments to update many Nationalities.
     * @example
     * // Update many Nationalities
     * const nationality = await prisma.nationality.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Nationalities and only return the `id`
     * const nationalityWithIdOnly = await prisma.nationality.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends NationalityUpdateManyAndReturnArgs>(
      args: SelectSubset<T, NationalityUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$NationalityPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Nationality.
     * @param {NationalityUpsertArgs} args - Arguments to update or create a Nationality.
     * @example
     * // Update or create a Nationality
     * const nationality = await prisma.nationality.upsert({
     *   create: {
     *     // ... data to create a Nationality
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Nationality we want to update
     *   }
     * })
     */
    upsert<T extends NationalityUpsertArgs>(
      args: SelectSubset<T, NationalityUpsertArgs<ExtArgs>>,
    ): Prisma__NationalityClient<
      $Result.GetResult<
        Prisma.$NationalityPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Nationalities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NationalityCountArgs} args - Arguments to filter Nationalities to count.
     * @example
     * // Count the number of Nationalities
     * const count = await prisma.nationality.count({
     *   where: {
     *     // ... the filter for the Nationalities we want to count
     *   }
     * })
     **/
    count<T extends NationalityCountArgs>(
      args?: Subset<T, NationalityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], NationalityCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Nationality.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NationalityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NationalityAggregateArgs>(
      args: Subset<T, NationalityAggregateArgs>,
    ): Prisma.PrismaPromise<GetNationalityAggregateType<T>>;

    /**
     * Group by Nationality.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NationalityGroupByArgs} args - Group by arguments.
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
      T extends NationalityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NationalityGroupByArgs["orderBy"] }
        : { orderBy?: NationalityGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
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
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, NationalityGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetNationalityGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Nationality model
     */
    readonly fields: NationalityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Nationality.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NationalityClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    User<T extends Nationality$UserArgs<ExtArgs> = {}>(
      args?: Subset<T, Nationality$UserArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Nationality model
   */
  interface NationalityFieldRefs {
    readonly id: FieldRef<"Nationality", "String">;
    readonly name: FieldRef<"Nationality", "String">;
    readonly flag: FieldRef<"Nationality", "String">;
    readonly createdAt: FieldRef<"Nationality", "DateTime">;
    readonly updatedAt: FieldRef<"Nationality", "DateTime">;
  }

  // Custom InputTypes
  /**
   * Nationality findUnique
   */
  export type NationalityFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Nationality
     */
    select?: NationalitySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Nationality
     */
    omit?: NationalityOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NationalityInclude<ExtArgs> | null;
    /**
     * Filter, which Nationality to fetch.
     */
    where: NationalityWhereUniqueInput;
  };

  /**
   * Nationality findUniqueOrThrow
   */
  export type NationalityFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Nationality
     */
    select?: NationalitySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Nationality
     */
    omit?: NationalityOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NationalityInclude<ExtArgs> | null;
    /**
     * Filter, which Nationality to fetch.
     */
    where: NationalityWhereUniqueInput;
  };

  /**
   * Nationality findFirst
   */
  export type NationalityFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Nationality
     */
    select?: NationalitySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Nationality
     */
    omit?: NationalityOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NationalityInclude<ExtArgs> | null;
    /**
     * Filter, which Nationality to fetch.
     */
    where?: NationalityWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Nationalities to fetch.
     */
    orderBy?:
      | NationalityOrderByWithRelationInput
      | NationalityOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Nationalities.
     */
    cursor?: NationalityWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Nationalities from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Nationalities.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Nationalities.
     */
    distinct?: NationalityScalarFieldEnum | NationalityScalarFieldEnum[];
  };

  /**
   * Nationality findFirstOrThrow
   */
  export type NationalityFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Nationality
     */
    select?: NationalitySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Nationality
     */
    omit?: NationalityOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NationalityInclude<ExtArgs> | null;
    /**
     * Filter, which Nationality to fetch.
     */
    where?: NationalityWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Nationalities to fetch.
     */
    orderBy?:
      | NationalityOrderByWithRelationInput
      | NationalityOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Nationalities.
     */
    cursor?: NationalityWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Nationalities from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Nationalities.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Nationalities.
     */
    distinct?: NationalityScalarFieldEnum | NationalityScalarFieldEnum[];
  };

  /**
   * Nationality findMany
   */
  export type NationalityFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Nationality
     */
    select?: NationalitySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Nationality
     */
    omit?: NationalityOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NationalityInclude<ExtArgs> | null;
    /**
     * Filter, which Nationalities to fetch.
     */
    where?: NationalityWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Nationalities to fetch.
     */
    orderBy?:
      | NationalityOrderByWithRelationInput
      | NationalityOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Nationalities.
     */
    cursor?: NationalityWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Nationalities from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Nationalities.
     */
    skip?: number;
    distinct?: NationalityScalarFieldEnum | NationalityScalarFieldEnum[];
  };

  /**
   * Nationality create
   */
  export type NationalityCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Nationality
     */
    select?: NationalitySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Nationality
     */
    omit?: NationalityOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NationalityInclude<ExtArgs> | null;
    /**
     * The data needed to create a Nationality.
     */
    data: XOR<NationalityCreateInput, NationalityUncheckedCreateInput>;
  };

  /**
   * Nationality createMany
   */
  export type NationalityCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Nationalities.
     */
    data: NationalityCreateManyInput | NationalityCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Nationality createManyAndReturn
   */
  export type NationalityCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Nationality
     */
    select?: NationalitySelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Nationality
     */
    omit?: NationalityOmit<ExtArgs> | null;
    /**
     * The data used to create many Nationalities.
     */
    data: NationalityCreateManyInput | NationalityCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Nationality update
   */
  export type NationalityUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Nationality
     */
    select?: NationalitySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Nationality
     */
    omit?: NationalityOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NationalityInclude<ExtArgs> | null;
    /**
     * The data needed to update a Nationality.
     */
    data: XOR<NationalityUpdateInput, NationalityUncheckedUpdateInput>;
    /**
     * Choose, which Nationality to update.
     */
    where: NationalityWhereUniqueInput;
  };

  /**
   * Nationality updateMany
   */
  export type NationalityUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Nationalities.
     */
    data: XOR<
      NationalityUpdateManyMutationInput,
      NationalityUncheckedUpdateManyInput
    >;
    /**
     * Filter which Nationalities to update
     */
    where?: NationalityWhereInput;
    /**
     * Limit how many Nationalities to update.
     */
    limit?: number;
  };

  /**
   * Nationality updateManyAndReturn
   */
  export type NationalityUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Nationality
     */
    select?: NationalitySelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Nationality
     */
    omit?: NationalityOmit<ExtArgs> | null;
    /**
     * The data used to update Nationalities.
     */
    data: XOR<
      NationalityUpdateManyMutationInput,
      NationalityUncheckedUpdateManyInput
    >;
    /**
     * Filter which Nationalities to update
     */
    where?: NationalityWhereInput;
    /**
     * Limit how many Nationalities to update.
     */
    limit?: number;
  };

  /**
   * Nationality upsert
   */
  export type NationalityUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Nationality
     */
    select?: NationalitySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Nationality
     */
    omit?: NationalityOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NationalityInclude<ExtArgs> | null;
    /**
     * The filter to search for the Nationality to update in case it exists.
     */
    where: NationalityWhereUniqueInput;
    /**
     * In case the Nationality found by the `where` argument doesn't exist, create a new Nationality with this data.
     */
    create: XOR<NationalityCreateInput, NationalityUncheckedCreateInput>;
    /**
     * In case the Nationality was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NationalityUpdateInput, NationalityUncheckedUpdateInput>;
  };

  /**
   * Nationality delete
   */
  export type NationalityDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Nationality
     */
    select?: NationalitySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Nationality
     */
    omit?: NationalityOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NationalityInclude<ExtArgs> | null;
    /**
     * Filter which Nationality to delete.
     */
    where: NationalityWhereUniqueInput;
  };

  /**
   * Nationality deleteMany
   */
  export type NationalityDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Nationalities to delete
     */
    where?: NationalityWhereInput;
    /**
     * Limit how many Nationalities to delete.
     */
    limit?: number;
  };

  /**
   * Nationality.User
   */
  export type Nationality$UserArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    where?: UserWhereInput;
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    cursor?: UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * Nationality without action
   */
  export type NationalityDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Nationality
     */
    select?: NationalitySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Nationality
     */
    omit?: NationalityOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NationalityInclude<ExtArgs> | null;
  };

  /**
   * Model Experience
   */

  export type AggregateExperience = {
    _count: ExperienceCountAggregateOutputType | null;
    _min: ExperienceMinAggregateOutputType | null;
    _max: ExperienceMaxAggregateOutputType | null;
  };

  export type ExperienceMinAggregateOutputType = {
    id: string | null;
    title: string | null;
    company: string | null;
    startDate: Date | null;
    endDate: Date | null;
    current: boolean | null;
    userId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ExperienceMaxAggregateOutputType = {
    id: string | null;
    title: string | null;
    company: string | null;
    startDate: Date | null;
    endDate: Date | null;
    current: boolean | null;
    userId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ExperienceCountAggregateOutputType = {
    id: number;
    title: number;
    company: number;
    startDate: number;
    endDate: number;
    current: number;
    userId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type ExperienceMinAggregateInputType = {
    id?: true;
    title?: true;
    company?: true;
    startDate?: true;
    endDate?: true;
    current?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ExperienceMaxAggregateInputType = {
    id?: true;
    title?: true;
    company?: true;
    startDate?: true;
    endDate?: true;
    current?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ExperienceCountAggregateInputType = {
    id?: true;
    title?: true;
    company?: true;
    startDate?: true;
    endDate?: true;
    current?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type ExperienceAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Experience to aggregate.
     */
    where?: ExperienceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Experiences to fetch.
     */
    orderBy?:
      | ExperienceOrderByWithRelationInput
      | ExperienceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ExperienceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Experiences from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Experiences.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Experiences
     **/
    _count?: true | ExperienceCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ExperienceMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ExperienceMaxAggregateInputType;
  };

  export type GetExperienceAggregateType<T extends ExperienceAggregateArgs> = {
    [P in keyof T & keyof AggregateExperience]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExperience[P]>
      : GetScalarType<T[P], AggregateExperience[P]>;
  };

  export type ExperienceGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ExperienceWhereInput;
    orderBy?:
      | ExperienceOrderByWithAggregationInput
      | ExperienceOrderByWithAggregationInput[];
    by: ExperienceScalarFieldEnum[] | ExperienceScalarFieldEnum;
    having?: ExperienceScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ExperienceCountAggregateInputType | true;
    _min?: ExperienceMinAggregateInputType;
    _max?: ExperienceMaxAggregateInputType;
  };

  export type ExperienceGroupByOutputType = {
    id: string;
    title: string;
    company: string;
    startDate: Date;
    endDate: Date;
    current: boolean;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    _count: ExperienceCountAggregateOutputType | null;
    _min: ExperienceMinAggregateOutputType | null;
    _max: ExperienceMaxAggregateOutputType | null;
  };

  type GetExperienceGroupByPayload<T extends ExperienceGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<ExperienceGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof ExperienceGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExperienceGroupByOutputType[P]>
            : GetScalarType<T[P], ExperienceGroupByOutputType[P]>;
        }
      >
    >;

  export type ExperienceSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      title?: boolean;
      company?: boolean;
      startDate?: boolean;
      endDate?: boolean;
      current?: boolean;
      userId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["experience"]
  >;

  export type ExperienceSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      title?: boolean;
      company?: boolean;
      startDate?: boolean;
      endDate?: boolean;
      current?: boolean;
      userId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["experience"]
  >;

  export type ExperienceSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      title?: boolean;
      company?: boolean;
      startDate?: boolean;
      endDate?: boolean;
      current?: boolean;
      userId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["experience"]
  >;

  export type ExperienceSelectScalar = {
    id?: boolean;
    title?: boolean;
    company?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    current?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type ExperienceOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | "id"
    | "title"
    | "company"
    | "startDate"
    | "endDate"
    | "current"
    | "userId"
    | "createdAt"
    | "updatedAt",
    ExtArgs["result"]["experience"]
  >;
  export type ExperienceInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type ExperienceIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type ExperienceIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $ExperiencePayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Experience";
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        title: string;
        company: string;
        startDate: Date;
        endDate: Date;
        current: boolean;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs["result"]["experience"]
    >;
    composites: {};
  };

  type ExperienceGetPayload<
    S extends boolean | null | undefined | ExperienceDefaultArgs,
  > = $Result.GetResult<Prisma.$ExperiencePayload, S>;

  type ExperienceCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    ExperienceFindManyArgs,
    "select" | "include" | "distinct" | "omit"
  > & {
    select?: ExperienceCountAggregateInputType | true;
  };

  export interface ExperienceDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Experience"];
      meta: { name: "Experience" };
    };
    /**
     * Find zero or one Experience that matches the filter.
     * @param {ExperienceFindUniqueArgs} args - Arguments to find a Experience
     * @example
     * // Get one Experience
     * const experience = await prisma.experience.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExperienceFindUniqueArgs>(
      args: SelectSubset<T, ExperienceFindUniqueArgs<ExtArgs>>,
    ): Prisma__ExperienceClient<
      $Result.GetResult<
        Prisma.$ExperiencePayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Experience that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExperienceFindUniqueOrThrowArgs} args - Arguments to find a Experience
     * @example
     * // Get one Experience
     * const experience = await prisma.experience.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExperienceFindUniqueOrThrowArgs>(
      args: SelectSubset<T, ExperienceFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__ExperienceClient<
      $Result.GetResult<
        Prisma.$ExperiencePayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Experience that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceFindFirstArgs} args - Arguments to find a Experience
     * @example
     * // Get one Experience
     * const experience = await prisma.experience.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExperienceFindFirstArgs>(
      args?: SelectSubset<T, ExperienceFindFirstArgs<ExtArgs>>,
    ): Prisma__ExperienceClient<
      $Result.GetResult<
        Prisma.$ExperiencePayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Experience that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceFindFirstOrThrowArgs} args - Arguments to find a Experience
     * @example
     * // Get one Experience
     * const experience = await prisma.experience.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExperienceFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ExperienceFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__ExperienceClient<
      $Result.GetResult<
        Prisma.$ExperiencePayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Experiences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Experiences
     * const experiences = await prisma.experience.findMany()
     *
     * // Get first 10 Experiences
     * const experiences = await prisma.experience.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const experienceWithIdOnly = await prisma.experience.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ExperienceFindManyArgs>(
      args?: SelectSubset<T, ExperienceFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ExperiencePayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Experience.
     * @param {ExperienceCreateArgs} args - Arguments to create a Experience.
     * @example
     * // Create one Experience
     * const Experience = await prisma.experience.create({
     *   data: {
     *     // ... data to create a Experience
     *   }
     * })
     *
     */
    create<T extends ExperienceCreateArgs>(
      args: SelectSubset<T, ExperienceCreateArgs<ExtArgs>>,
    ): Prisma__ExperienceClient<
      $Result.GetResult<
        Prisma.$ExperiencePayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Experiences.
     * @param {ExperienceCreateManyArgs} args - Arguments to create many Experiences.
     * @example
     * // Create many Experiences
     * const experience = await prisma.experience.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ExperienceCreateManyArgs>(
      args?: SelectSubset<T, ExperienceCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Experiences and returns the data saved in the database.
     * @param {ExperienceCreateManyAndReturnArgs} args - Arguments to create many Experiences.
     * @example
     * // Create many Experiences
     * const experience = await prisma.experience.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Experiences and only return the `id`
     * const experienceWithIdOnly = await prisma.experience.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ExperienceCreateManyAndReturnArgs>(
      args?: SelectSubset<T, ExperienceCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ExperiencePayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Experience.
     * @param {ExperienceDeleteArgs} args - Arguments to delete one Experience.
     * @example
     * // Delete one Experience
     * const Experience = await prisma.experience.delete({
     *   where: {
     *     // ... filter to delete one Experience
     *   }
     * })
     *
     */
    delete<T extends ExperienceDeleteArgs>(
      args: SelectSubset<T, ExperienceDeleteArgs<ExtArgs>>,
    ): Prisma__ExperienceClient<
      $Result.GetResult<
        Prisma.$ExperiencePayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Experience.
     * @param {ExperienceUpdateArgs} args - Arguments to update one Experience.
     * @example
     * // Update one Experience
     * const experience = await prisma.experience.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ExperienceUpdateArgs>(
      args: SelectSubset<T, ExperienceUpdateArgs<ExtArgs>>,
    ): Prisma__ExperienceClient<
      $Result.GetResult<
        Prisma.$ExperiencePayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Experiences.
     * @param {ExperienceDeleteManyArgs} args - Arguments to filter Experiences to delete.
     * @example
     * // Delete a few Experiences
     * const { count } = await prisma.experience.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ExperienceDeleteManyArgs>(
      args?: SelectSubset<T, ExperienceDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Experiences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Experiences
     * const experience = await prisma.experience.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ExperienceUpdateManyArgs>(
      args: SelectSubset<T, ExperienceUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Experiences and returns the data updated in the database.
     * @param {ExperienceUpdateManyAndReturnArgs} args - Arguments to update many Experiences.
     * @example
     * // Update many Experiences
     * const experience = await prisma.experience.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Experiences and only return the `id`
     * const experienceWithIdOnly = await prisma.experience.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends ExperienceUpdateManyAndReturnArgs>(
      args: SelectSubset<T, ExperienceUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ExperiencePayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Experience.
     * @param {ExperienceUpsertArgs} args - Arguments to update or create a Experience.
     * @example
     * // Update or create a Experience
     * const experience = await prisma.experience.upsert({
     *   create: {
     *     // ... data to create a Experience
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Experience we want to update
     *   }
     * })
     */
    upsert<T extends ExperienceUpsertArgs>(
      args: SelectSubset<T, ExperienceUpsertArgs<ExtArgs>>,
    ): Prisma__ExperienceClient<
      $Result.GetResult<
        Prisma.$ExperiencePayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Experiences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceCountArgs} args - Arguments to filter Experiences to count.
     * @example
     * // Count the number of Experiences
     * const count = await prisma.experience.count({
     *   where: {
     *     // ... the filter for the Experiences we want to count
     *   }
     * })
     **/
    count<T extends ExperienceCountArgs>(
      args?: Subset<T, ExperienceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], ExperienceCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Experience.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ExperienceAggregateArgs>(
      args: Subset<T, ExperienceAggregateArgs>,
    ): Prisma.PrismaPromise<GetExperienceAggregateType<T>>;

    /**
     * Group by Experience.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExperienceGroupByArgs} args - Group by arguments.
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
      T extends ExperienceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExperienceGroupByArgs["orderBy"] }
        : { orderBy?: ExperienceGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
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
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, ExperienceGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetExperienceGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Experience model
     */
    readonly fields: ExperienceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Experience.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExperienceClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Experience model
   */
  interface ExperienceFieldRefs {
    readonly id: FieldRef<"Experience", "String">;
    readonly title: FieldRef<"Experience", "String">;
    readonly company: FieldRef<"Experience", "String">;
    readonly startDate: FieldRef<"Experience", "DateTime">;
    readonly endDate: FieldRef<"Experience", "DateTime">;
    readonly current: FieldRef<"Experience", "Boolean">;
    readonly userId: FieldRef<"Experience", "String">;
    readonly createdAt: FieldRef<"Experience", "DateTime">;
    readonly updatedAt: FieldRef<"Experience", "DateTime">;
  }

  // Custom InputTypes
  /**
   * Experience findUnique
   */
  export type ExperienceFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null;
    /**
     * Filter, which Experience to fetch.
     */
    where: ExperienceWhereUniqueInput;
  };

  /**
   * Experience findUniqueOrThrow
   */
  export type ExperienceFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null;
    /**
     * Filter, which Experience to fetch.
     */
    where: ExperienceWhereUniqueInput;
  };

  /**
   * Experience findFirst
   */
  export type ExperienceFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null;
    /**
     * Filter, which Experience to fetch.
     */
    where?: ExperienceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Experiences to fetch.
     */
    orderBy?:
      | ExperienceOrderByWithRelationInput
      | ExperienceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Experiences.
     */
    cursor?: ExperienceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Experiences from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Experiences.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Experiences.
     */
    distinct?: ExperienceScalarFieldEnum | ExperienceScalarFieldEnum[];
  };

  /**
   * Experience findFirstOrThrow
   */
  export type ExperienceFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null;
    /**
     * Filter, which Experience to fetch.
     */
    where?: ExperienceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Experiences to fetch.
     */
    orderBy?:
      | ExperienceOrderByWithRelationInput
      | ExperienceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Experiences.
     */
    cursor?: ExperienceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Experiences from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Experiences.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Experiences.
     */
    distinct?: ExperienceScalarFieldEnum | ExperienceScalarFieldEnum[];
  };

  /**
   * Experience findMany
   */
  export type ExperienceFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null;
    /**
     * Filter, which Experiences to fetch.
     */
    where?: ExperienceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Experiences to fetch.
     */
    orderBy?:
      | ExperienceOrderByWithRelationInput
      | ExperienceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Experiences.
     */
    cursor?: ExperienceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Experiences from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Experiences.
     */
    skip?: number;
    distinct?: ExperienceScalarFieldEnum | ExperienceScalarFieldEnum[];
  };

  /**
   * Experience create
   */
  export type ExperienceCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null;
    /**
     * The data needed to create a Experience.
     */
    data: XOR<ExperienceCreateInput, ExperienceUncheckedCreateInput>;
  };

  /**
   * Experience createMany
   */
  export type ExperienceCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Experiences.
     */
    data: ExperienceCreateManyInput | ExperienceCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Experience createManyAndReturn
   */
  export type ExperienceCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null;
    /**
     * The data used to create many Experiences.
     */
    data: ExperienceCreateManyInput | ExperienceCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Experience update
   */
  export type ExperienceUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null;
    /**
     * The data needed to update a Experience.
     */
    data: XOR<ExperienceUpdateInput, ExperienceUncheckedUpdateInput>;
    /**
     * Choose, which Experience to update.
     */
    where: ExperienceWhereUniqueInput;
  };

  /**
   * Experience updateMany
   */
  export type ExperienceUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Experiences.
     */
    data: XOR<
      ExperienceUpdateManyMutationInput,
      ExperienceUncheckedUpdateManyInput
    >;
    /**
     * Filter which Experiences to update
     */
    where?: ExperienceWhereInput;
    /**
     * Limit how many Experiences to update.
     */
    limit?: number;
  };

  /**
   * Experience updateManyAndReturn
   */
  export type ExperienceUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null;
    /**
     * The data used to update Experiences.
     */
    data: XOR<
      ExperienceUpdateManyMutationInput,
      ExperienceUncheckedUpdateManyInput
    >;
    /**
     * Filter which Experiences to update
     */
    where?: ExperienceWhereInput;
    /**
     * Limit how many Experiences to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Experience upsert
   */
  export type ExperienceUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null;
    /**
     * The filter to search for the Experience to update in case it exists.
     */
    where: ExperienceWhereUniqueInput;
    /**
     * In case the Experience found by the `where` argument doesn't exist, create a new Experience with this data.
     */
    create: XOR<ExperienceCreateInput, ExperienceUncheckedCreateInput>;
    /**
     * In case the Experience was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExperienceUpdateInput, ExperienceUncheckedUpdateInput>;
  };

  /**
   * Experience delete
   */
  export type ExperienceDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null;
    /**
     * Filter which Experience to delete.
     */
    where: ExperienceWhereUniqueInput;
  };

  /**
   * Experience deleteMany
   */
  export type ExperienceDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Experiences to delete
     */
    where?: ExperienceWhereInput;
    /**
     * Limit how many Experiences to delete.
     */
    limit?: number;
  };

  /**
   * Experience without action
   */
  export type ExperienceDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Experience
     */
    select?: ExperienceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Experience
     */
    omit?: ExperienceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExperienceInclude<ExtArgs> | null;
  };

  /**
   * Model Education
   */

  export type AggregateEducation = {
    _count: EducationCountAggregateOutputType | null;
    _min: EducationMinAggregateOutputType | null;
    _max: EducationMaxAggregateOutputType | null;
  };

  export type EducationMinAggregateOutputType = {
    id: string | null;
    title: string | null;
    school: string | null;
    startDate: Date | null;
    endDate: Date | null;
    current: boolean | null;
    userId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type EducationMaxAggregateOutputType = {
    id: string | null;
    title: string | null;
    school: string | null;
    startDate: Date | null;
    endDate: Date | null;
    current: boolean | null;
    userId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type EducationCountAggregateOutputType = {
    id: number;
    title: number;
    school: number;
    startDate: number;
    endDate: number;
    current: number;
    userId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type EducationMinAggregateInputType = {
    id?: true;
    title?: true;
    school?: true;
    startDate?: true;
    endDate?: true;
    current?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type EducationMaxAggregateInputType = {
    id?: true;
    title?: true;
    school?: true;
    startDate?: true;
    endDate?: true;
    current?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type EducationCountAggregateInputType = {
    id?: true;
    title?: true;
    school?: true;
    startDate?: true;
    endDate?: true;
    current?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type EducationAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Education to aggregate.
     */
    where?: EducationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Educations to fetch.
     */
    orderBy?:
      | EducationOrderByWithRelationInput
      | EducationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: EducationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Educations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Educations.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Educations
     **/
    _count?: true | EducationCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: EducationMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: EducationMaxAggregateInputType;
  };

  export type GetEducationAggregateType<T extends EducationAggregateArgs> = {
    [P in keyof T & keyof AggregateEducation]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEducation[P]>
      : GetScalarType<T[P], AggregateEducation[P]>;
  };

  export type EducationGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: EducationWhereInput;
    orderBy?:
      | EducationOrderByWithAggregationInput
      | EducationOrderByWithAggregationInput[];
    by: EducationScalarFieldEnum[] | EducationScalarFieldEnum;
    having?: EducationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: EducationCountAggregateInputType | true;
    _min?: EducationMinAggregateInputType;
    _max?: EducationMaxAggregateInputType;
  };

  export type EducationGroupByOutputType = {
    id: string;
    title: string;
    school: string;
    startDate: Date;
    endDate: Date;
    current: boolean;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    _count: EducationCountAggregateOutputType | null;
    _min: EducationMinAggregateOutputType | null;
    _max: EducationMaxAggregateOutputType | null;
  };

  type GetEducationGroupByPayload<T extends EducationGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<EducationGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof EducationGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EducationGroupByOutputType[P]>
            : GetScalarType<T[P], EducationGroupByOutputType[P]>;
        }
      >
    >;

  export type EducationSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      title?: boolean;
      school?: boolean;
      startDate?: boolean;
      endDate?: boolean;
      current?: boolean;
      userId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["education"]
  >;

  export type EducationSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      title?: boolean;
      school?: boolean;
      startDate?: boolean;
      endDate?: boolean;
      current?: boolean;
      userId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["education"]
  >;

  export type EducationSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      title?: boolean;
      school?: boolean;
      startDate?: boolean;
      endDate?: boolean;
      current?: boolean;
      userId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["education"]
  >;

  export type EducationSelectScalar = {
    id?: boolean;
    title?: boolean;
    school?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    current?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type EducationOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | "id"
    | "title"
    | "school"
    | "startDate"
    | "endDate"
    | "current"
    | "userId"
    | "createdAt"
    | "updatedAt",
    ExtArgs["result"]["education"]
  >;
  export type EducationInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type EducationIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type EducationIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $EducationPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Education";
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        title: string;
        school: string;
        startDate: Date;
        endDate: Date;
        current: boolean;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs["result"]["education"]
    >;
    composites: {};
  };

  type EducationGetPayload<
    S extends boolean | null | undefined | EducationDefaultArgs,
  > = $Result.GetResult<Prisma.$EducationPayload, S>;

  type EducationCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    EducationFindManyArgs,
    "select" | "include" | "distinct" | "omit"
  > & {
    select?: EducationCountAggregateInputType | true;
  };

  export interface EducationDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Education"];
      meta: { name: "Education" };
    };
    /**
     * Find zero or one Education that matches the filter.
     * @param {EducationFindUniqueArgs} args - Arguments to find a Education
     * @example
     * // Get one Education
     * const education = await prisma.education.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EducationFindUniqueArgs>(
      args: SelectSubset<T, EducationFindUniqueArgs<ExtArgs>>,
    ): Prisma__EducationClient<
      $Result.GetResult<
        Prisma.$EducationPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Education that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EducationFindUniqueOrThrowArgs} args - Arguments to find a Education
     * @example
     * // Get one Education
     * const education = await prisma.education.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EducationFindUniqueOrThrowArgs>(
      args: SelectSubset<T, EducationFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__EducationClient<
      $Result.GetResult<
        Prisma.$EducationPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Education that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationFindFirstArgs} args - Arguments to find a Education
     * @example
     * // Get one Education
     * const education = await prisma.education.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EducationFindFirstArgs>(
      args?: SelectSubset<T, EducationFindFirstArgs<ExtArgs>>,
    ): Prisma__EducationClient<
      $Result.GetResult<
        Prisma.$EducationPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Education that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationFindFirstOrThrowArgs} args - Arguments to find a Education
     * @example
     * // Get one Education
     * const education = await prisma.education.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EducationFindFirstOrThrowArgs>(
      args?: SelectSubset<T, EducationFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__EducationClient<
      $Result.GetResult<
        Prisma.$EducationPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Educations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Educations
     * const educations = await prisma.education.findMany()
     *
     * // Get first 10 Educations
     * const educations = await prisma.education.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const educationWithIdOnly = await prisma.education.findMany({ select: { id: true } })
     *
     */
    findMany<T extends EducationFindManyArgs>(
      args?: SelectSubset<T, EducationFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$EducationPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Education.
     * @param {EducationCreateArgs} args - Arguments to create a Education.
     * @example
     * // Create one Education
     * const Education = await prisma.education.create({
     *   data: {
     *     // ... data to create a Education
     *   }
     * })
     *
     */
    create<T extends EducationCreateArgs>(
      args: SelectSubset<T, EducationCreateArgs<ExtArgs>>,
    ): Prisma__EducationClient<
      $Result.GetResult<
        Prisma.$EducationPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Educations.
     * @param {EducationCreateManyArgs} args - Arguments to create many Educations.
     * @example
     * // Create many Educations
     * const education = await prisma.education.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends EducationCreateManyArgs>(
      args?: SelectSubset<T, EducationCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Educations and returns the data saved in the database.
     * @param {EducationCreateManyAndReturnArgs} args - Arguments to create many Educations.
     * @example
     * // Create many Educations
     * const education = await prisma.education.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Educations and only return the `id`
     * const educationWithIdOnly = await prisma.education.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends EducationCreateManyAndReturnArgs>(
      args?: SelectSubset<T, EducationCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$EducationPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Education.
     * @param {EducationDeleteArgs} args - Arguments to delete one Education.
     * @example
     * // Delete one Education
     * const Education = await prisma.education.delete({
     *   where: {
     *     // ... filter to delete one Education
     *   }
     * })
     *
     */
    delete<T extends EducationDeleteArgs>(
      args: SelectSubset<T, EducationDeleteArgs<ExtArgs>>,
    ): Prisma__EducationClient<
      $Result.GetResult<
        Prisma.$EducationPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Education.
     * @param {EducationUpdateArgs} args - Arguments to update one Education.
     * @example
     * // Update one Education
     * const education = await prisma.education.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends EducationUpdateArgs>(
      args: SelectSubset<T, EducationUpdateArgs<ExtArgs>>,
    ): Prisma__EducationClient<
      $Result.GetResult<
        Prisma.$EducationPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Educations.
     * @param {EducationDeleteManyArgs} args - Arguments to filter Educations to delete.
     * @example
     * // Delete a few Educations
     * const { count } = await prisma.education.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends EducationDeleteManyArgs>(
      args?: SelectSubset<T, EducationDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Educations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Educations
     * const education = await prisma.education.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends EducationUpdateManyArgs>(
      args: SelectSubset<T, EducationUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Educations and returns the data updated in the database.
     * @param {EducationUpdateManyAndReturnArgs} args - Arguments to update many Educations.
     * @example
     * // Update many Educations
     * const education = await prisma.education.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Educations and only return the `id`
     * const educationWithIdOnly = await prisma.education.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends EducationUpdateManyAndReturnArgs>(
      args: SelectSubset<T, EducationUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$EducationPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Education.
     * @param {EducationUpsertArgs} args - Arguments to update or create a Education.
     * @example
     * // Update or create a Education
     * const education = await prisma.education.upsert({
     *   create: {
     *     // ... data to create a Education
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Education we want to update
     *   }
     * })
     */
    upsert<T extends EducationUpsertArgs>(
      args: SelectSubset<T, EducationUpsertArgs<ExtArgs>>,
    ): Prisma__EducationClient<
      $Result.GetResult<
        Prisma.$EducationPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Educations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationCountArgs} args - Arguments to filter Educations to count.
     * @example
     * // Count the number of Educations
     * const count = await prisma.education.count({
     *   where: {
     *     // ... the filter for the Educations we want to count
     *   }
     * })
     **/
    count<T extends EducationCountArgs>(
      args?: Subset<T, EducationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], EducationCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Education.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EducationAggregateArgs>(
      args: Subset<T, EducationAggregateArgs>,
    ): Prisma.PrismaPromise<GetEducationAggregateType<T>>;

    /**
     * Group by Education.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationGroupByArgs} args - Group by arguments.
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
      T extends EducationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EducationGroupByArgs["orderBy"] }
        : { orderBy?: EducationGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
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
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, EducationGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetEducationGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Education model
     */
    readonly fields: EducationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Education.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EducationClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Education model
   */
  interface EducationFieldRefs {
    readonly id: FieldRef<"Education", "String">;
    readonly title: FieldRef<"Education", "String">;
    readonly school: FieldRef<"Education", "String">;
    readonly startDate: FieldRef<"Education", "DateTime">;
    readonly endDate: FieldRef<"Education", "DateTime">;
    readonly current: FieldRef<"Education", "Boolean">;
    readonly userId: FieldRef<"Education", "String">;
    readonly createdAt: FieldRef<"Education", "DateTime">;
    readonly updatedAt: FieldRef<"Education", "DateTime">;
  }

  // Custom InputTypes
  /**
   * Education findUnique
   */
  export type EducationFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EducationInclude<ExtArgs> | null;
    /**
     * Filter, which Education to fetch.
     */
    where: EducationWhereUniqueInput;
  };

  /**
   * Education findUniqueOrThrow
   */
  export type EducationFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EducationInclude<ExtArgs> | null;
    /**
     * Filter, which Education to fetch.
     */
    where: EducationWhereUniqueInput;
  };

  /**
   * Education findFirst
   */
  export type EducationFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EducationInclude<ExtArgs> | null;
    /**
     * Filter, which Education to fetch.
     */
    where?: EducationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Educations to fetch.
     */
    orderBy?:
      | EducationOrderByWithRelationInput
      | EducationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Educations.
     */
    cursor?: EducationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Educations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Educations.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Educations.
     */
    distinct?: EducationScalarFieldEnum | EducationScalarFieldEnum[];
  };

  /**
   * Education findFirstOrThrow
   */
  export type EducationFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EducationInclude<ExtArgs> | null;
    /**
     * Filter, which Education to fetch.
     */
    where?: EducationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Educations to fetch.
     */
    orderBy?:
      | EducationOrderByWithRelationInput
      | EducationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Educations.
     */
    cursor?: EducationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Educations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Educations.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Educations.
     */
    distinct?: EducationScalarFieldEnum | EducationScalarFieldEnum[];
  };

  /**
   * Education findMany
   */
  export type EducationFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EducationInclude<ExtArgs> | null;
    /**
     * Filter, which Educations to fetch.
     */
    where?: EducationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Educations to fetch.
     */
    orderBy?:
      | EducationOrderByWithRelationInput
      | EducationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Educations.
     */
    cursor?: EducationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Educations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Educations.
     */
    skip?: number;
    distinct?: EducationScalarFieldEnum | EducationScalarFieldEnum[];
  };

  /**
   * Education create
   */
  export type EducationCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EducationInclude<ExtArgs> | null;
    /**
     * The data needed to create a Education.
     */
    data: XOR<EducationCreateInput, EducationUncheckedCreateInput>;
  };

  /**
   * Education createMany
   */
  export type EducationCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Educations.
     */
    data: EducationCreateManyInput | EducationCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Education createManyAndReturn
   */
  export type EducationCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null;
    /**
     * The data used to create many Educations.
     */
    data: EducationCreateManyInput | EducationCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EducationIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Education update
   */
  export type EducationUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EducationInclude<ExtArgs> | null;
    /**
     * The data needed to update a Education.
     */
    data: XOR<EducationUpdateInput, EducationUncheckedUpdateInput>;
    /**
     * Choose, which Education to update.
     */
    where: EducationWhereUniqueInput;
  };

  /**
   * Education updateMany
   */
  export type EducationUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Educations.
     */
    data: XOR<
      EducationUpdateManyMutationInput,
      EducationUncheckedUpdateManyInput
    >;
    /**
     * Filter which Educations to update
     */
    where?: EducationWhereInput;
    /**
     * Limit how many Educations to update.
     */
    limit?: number;
  };

  /**
   * Education updateManyAndReturn
   */
  export type EducationUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null;
    /**
     * The data used to update Educations.
     */
    data: XOR<
      EducationUpdateManyMutationInput,
      EducationUncheckedUpdateManyInput
    >;
    /**
     * Filter which Educations to update
     */
    where?: EducationWhereInput;
    /**
     * Limit how many Educations to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EducationIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Education upsert
   */
  export type EducationUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EducationInclude<ExtArgs> | null;
    /**
     * The filter to search for the Education to update in case it exists.
     */
    where: EducationWhereUniqueInput;
    /**
     * In case the Education found by the `where` argument doesn't exist, create a new Education with this data.
     */
    create: XOR<EducationCreateInput, EducationUncheckedCreateInput>;
    /**
     * In case the Education was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EducationUpdateInput, EducationUncheckedUpdateInput>;
  };

  /**
   * Education delete
   */
  export type EducationDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EducationInclude<ExtArgs> | null;
    /**
     * Filter which Education to delete.
     */
    where: EducationWhereUniqueInput;
  };

  /**
   * Education deleteMany
   */
  export type EducationDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Educations to delete
     */
    where?: EducationWhereInput;
    /**
     * Limit how many Educations to delete.
     */
    limit?: number;
  };

  /**
   * Education without action
   */
  export type EducationDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Education
     */
    select?: EducationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Education
     */
    omit?: EducationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EducationInclude<ExtArgs> | null;
  };

  /**
   * Model Skill
   */

  export type AggregateSkill = {
    _count: SkillCountAggregateOutputType | null;
    _min: SkillMinAggregateOutputType | null;
    _max: SkillMaxAggregateOutputType | null;
  };

  export type SkillMinAggregateOutputType = {
    id: string | null;
    title: string | null;
    userId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type SkillMaxAggregateOutputType = {
    id: string | null;
    title: string | null;
    userId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type SkillCountAggregateOutputType = {
    id: number;
    title: number;
    userId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type SkillMinAggregateInputType = {
    id?: true;
    title?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type SkillMaxAggregateInputType = {
    id?: true;
    title?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type SkillCountAggregateInputType = {
    id?: true;
    title?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type SkillAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Skill to aggregate.
     */
    where?: SkillWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Skills to fetch.
     */
    orderBy?: SkillOrderByWithRelationInput | SkillOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: SkillWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Skills from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Skills.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Skills
     **/
    _count?: true | SkillCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: SkillMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: SkillMaxAggregateInputType;
  };

  export type GetSkillAggregateType<T extends SkillAggregateArgs> = {
    [P in keyof T & keyof AggregateSkill]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSkill[P]>
      : GetScalarType<T[P], AggregateSkill[P]>;
  };

  export type SkillGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: SkillWhereInput;
    orderBy?:
      | SkillOrderByWithAggregationInput
      | SkillOrderByWithAggregationInput[];
    by: SkillScalarFieldEnum[] | SkillScalarFieldEnum;
    having?: SkillScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SkillCountAggregateInputType | true;
    _min?: SkillMinAggregateInputType;
    _max?: SkillMaxAggregateInputType;
  };

  export type SkillGroupByOutputType = {
    id: string;
    title: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    _count: SkillCountAggregateOutputType | null;
    _min: SkillMinAggregateOutputType | null;
    _max: SkillMaxAggregateOutputType | null;
  };

  type GetSkillGroupByPayload<T extends SkillGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<SkillGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof SkillGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SkillGroupByOutputType[P]>
            : GetScalarType<T[P], SkillGroupByOutputType[P]>;
        }
      >
    >;

  export type SkillSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      title?: boolean;
      userId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["skill"]
  >;

  export type SkillSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      title?: boolean;
      userId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["skill"]
  >;

  export type SkillSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      title?: boolean;
      userId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["skill"]
  >;

  export type SkillSelectScalar = {
    id?: boolean;
    title?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type SkillOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    "id" | "title" | "userId" | "createdAt" | "updatedAt",
    ExtArgs["result"]["skill"]
  >;
  export type SkillInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type SkillIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type SkillIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $SkillPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Skill";
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        title: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs["result"]["skill"]
    >;
    composites: {};
  };

  type SkillGetPayload<
    S extends boolean | null | undefined | SkillDefaultArgs,
  > = $Result.GetResult<Prisma.$SkillPayload, S>;

  type SkillCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<SkillFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
    select?: SkillCountAggregateInputType | true;
  };

  export interface SkillDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Skill"];
      meta: { name: "Skill" };
    };
    /**
     * Find zero or one Skill that matches the filter.
     * @param {SkillFindUniqueArgs} args - Arguments to find a Skill
     * @example
     * // Get one Skill
     * const skill = await prisma.skill.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SkillFindUniqueArgs>(
      args: SelectSubset<T, SkillFindUniqueArgs<ExtArgs>>,
    ): Prisma__SkillClient<
      $Result.GetResult<
        Prisma.$SkillPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Skill that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SkillFindUniqueOrThrowArgs} args - Arguments to find a Skill
     * @example
     * // Get one Skill
     * const skill = await prisma.skill.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SkillFindUniqueOrThrowArgs>(
      args: SelectSubset<T, SkillFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__SkillClient<
      $Result.GetResult<
        Prisma.$SkillPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Skill that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillFindFirstArgs} args - Arguments to find a Skill
     * @example
     * // Get one Skill
     * const skill = await prisma.skill.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SkillFindFirstArgs>(
      args?: SelectSubset<T, SkillFindFirstArgs<ExtArgs>>,
    ): Prisma__SkillClient<
      $Result.GetResult<
        Prisma.$SkillPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Skill that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillFindFirstOrThrowArgs} args - Arguments to find a Skill
     * @example
     * // Get one Skill
     * const skill = await prisma.skill.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SkillFindFirstOrThrowArgs>(
      args?: SelectSubset<T, SkillFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__SkillClient<
      $Result.GetResult<
        Prisma.$SkillPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Skills that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Skills
     * const skills = await prisma.skill.findMany()
     *
     * // Get first 10 Skills
     * const skills = await prisma.skill.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const skillWithIdOnly = await prisma.skill.findMany({ select: { id: true } })
     *
     */
    findMany<T extends SkillFindManyArgs>(
      args?: SelectSubset<T, SkillFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$SkillPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Skill.
     * @param {SkillCreateArgs} args - Arguments to create a Skill.
     * @example
     * // Create one Skill
     * const Skill = await prisma.skill.create({
     *   data: {
     *     // ... data to create a Skill
     *   }
     * })
     *
     */
    create<T extends SkillCreateArgs>(
      args: SelectSubset<T, SkillCreateArgs<ExtArgs>>,
    ): Prisma__SkillClient<
      $Result.GetResult<
        Prisma.$SkillPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Skills.
     * @param {SkillCreateManyArgs} args - Arguments to create many Skills.
     * @example
     * // Create many Skills
     * const skill = await prisma.skill.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends SkillCreateManyArgs>(
      args?: SelectSubset<T, SkillCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Skills and returns the data saved in the database.
     * @param {SkillCreateManyAndReturnArgs} args - Arguments to create many Skills.
     * @example
     * // Create many Skills
     * const skill = await prisma.skill.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Skills and only return the `id`
     * const skillWithIdOnly = await prisma.skill.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends SkillCreateManyAndReturnArgs>(
      args?: SelectSubset<T, SkillCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$SkillPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Skill.
     * @param {SkillDeleteArgs} args - Arguments to delete one Skill.
     * @example
     * // Delete one Skill
     * const Skill = await prisma.skill.delete({
     *   where: {
     *     // ... filter to delete one Skill
     *   }
     * })
     *
     */
    delete<T extends SkillDeleteArgs>(
      args: SelectSubset<T, SkillDeleteArgs<ExtArgs>>,
    ): Prisma__SkillClient<
      $Result.GetResult<
        Prisma.$SkillPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Skill.
     * @param {SkillUpdateArgs} args - Arguments to update one Skill.
     * @example
     * // Update one Skill
     * const skill = await prisma.skill.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends SkillUpdateArgs>(
      args: SelectSubset<T, SkillUpdateArgs<ExtArgs>>,
    ): Prisma__SkillClient<
      $Result.GetResult<
        Prisma.$SkillPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Skills.
     * @param {SkillDeleteManyArgs} args - Arguments to filter Skills to delete.
     * @example
     * // Delete a few Skills
     * const { count } = await prisma.skill.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends SkillDeleteManyArgs>(
      args?: SelectSubset<T, SkillDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Skills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Skills
     * const skill = await prisma.skill.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends SkillUpdateManyArgs>(
      args: SelectSubset<T, SkillUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Skills and returns the data updated in the database.
     * @param {SkillUpdateManyAndReturnArgs} args - Arguments to update many Skills.
     * @example
     * // Update many Skills
     * const skill = await prisma.skill.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Skills and only return the `id`
     * const skillWithIdOnly = await prisma.skill.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends SkillUpdateManyAndReturnArgs>(
      args: SelectSubset<T, SkillUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$SkillPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Skill.
     * @param {SkillUpsertArgs} args - Arguments to update or create a Skill.
     * @example
     * // Update or create a Skill
     * const skill = await prisma.skill.upsert({
     *   create: {
     *     // ... data to create a Skill
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Skill we want to update
     *   }
     * })
     */
    upsert<T extends SkillUpsertArgs>(
      args: SelectSubset<T, SkillUpsertArgs<ExtArgs>>,
    ): Prisma__SkillClient<
      $Result.GetResult<
        Prisma.$SkillPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Skills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillCountArgs} args - Arguments to filter Skills to count.
     * @example
     * // Count the number of Skills
     * const count = await prisma.skill.count({
     *   where: {
     *     // ... the filter for the Skills we want to count
     *   }
     * })
     **/
    count<T extends SkillCountArgs>(
      args?: Subset<T, SkillCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], SkillCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Skill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SkillAggregateArgs>(
      args: Subset<T, SkillAggregateArgs>,
    ): Prisma.PrismaPromise<GetSkillAggregateType<T>>;

    /**
     * Group by Skill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillGroupByArgs} args - Group by arguments.
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
      T extends SkillGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SkillGroupByArgs["orderBy"] }
        : { orderBy?: SkillGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
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
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, SkillGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetSkillGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Skill model
     */
    readonly fields: SkillFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Skill.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SkillClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Skill model
   */
  interface SkillFieldRefs {
    readonly id: FieldRef<"Skill", "String">;
    readonly title: FieldRef<"Skill", "String">;
    readonly userId: FieldRef<"Skill", "String">;
    readonly createdAt: FieldRef<"Skill", "DateTime">;
    readonly updatedAt: FieldRef<"Skill", "DateTime">;
  }

  // Custom InputTypes
  /**
   * Skill findUnique
   */
  export type SkillFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null;
    /**
     * Filter, which Skill to fetch.
     */
    where: SkillWhereUniqueInput;
  };

  /**
   * Skill findUniqueOrThrow
   */
  export type SkillFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null;
    /**
     * Filter, which Skill to fetch.
     */
    where: SkillWhereUniqueInput;
  };

  /**
   * Skill findFirst
   */
  export type SkillFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null;
    /**
     * Filter, which Skill to fetch.
     */
    where?: SkillWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Skills to fetch.
     */
    orderBy?: SkillOrderByWithRelationInput | SkillOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Skills.
     */
    cursor?: SkillWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Skills from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Skills.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Skills.
     */
    distinct?: SkillScalarFieldEnum | SkillScalarFieldEnum[];
  };

  /**
   * Skill findFirstOrThrow
   */
  export type SkillFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null;
    /**
     * Filter, which Skill to fetch.
     */
    where?: SkillWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Skills to fetch.
     */
    orderBy?: SkillOrderByWithRelationInput | SkillOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Skills.
     */
    cursor?: SkillWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Skills from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Skills.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Skills.
     */
    distinct?: SkillScalarFieldEnum | SkillScalarFieldEnum[];
  };

  /**
   * Skill findMany
   */
  export type SkillFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null;
    /**
     * Filter, which Skills to fetch.
     */
    where?: SkillWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Skills to fetch.
     */
    orderBy?: SkillOrderByWithRelationInput | SkillOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Skills.
     */
    cursor?: SkillWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Skills from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Skills.
     */
    skip?: number;
    distinct?: SkillScalarFieldEnum | SkillScalarFieldEnum[];
  };

  /**
   * Skill create
   */
  export type SkillCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null;
    /**
     * The data needed to create a Skill.
     */
    data: XOR<SkillCreateInput, SkillUncheckedCreateInput>;
  };

  /**
   * Skill createMany
   */
  export type SkillCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Skills.
     */
    data: SkillCreateManyInput | SkillCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Skill createManyAndReturn
   */
  export type SkillCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null;
    /**
     * The data used to create many Skills.
     */
    data: SkillCreateManyInput | SkillCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Skill update
   */
  export type SkillUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null;
    /**
     * The data needed to update a Skill.
     */
    data: XOR<SkillUpdateInput, SkillUncheckedUpdateInput>;
    /**
     * Choose, which Skill to update.
     */
    where: SkillWhereUniqueInput;
  };

  /**
   * Skill updateMany
   */
  export type SkillUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Skills.
     */
    data: XOR<SkillUpdateManyMutationInput, SkillUncheckedUpdateManyInput>;
    /**
     * Filter which Skills to update
     */
    where?: SkillWhereInput;
    /**
     * Limit how many Skills to update.
     */
    limit?: number;
  };

  /**
   * Skill updateManyAndReturn
   */
  export type SkillUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null;
    /**
     * The data used to update Skills.
     */
    data: XOR<SkillUpdateManyMutationInput, SkillUncheckedUpdateManyInput>;
    /**
     * Filter which Skills to update
     */
    where?: SkillWhereInput;
    /**
     * Limit how many Skills to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Skill upsert
   */
  export type SkillUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null;
    /**
     * The filter to search for the Skill to update in case it exists.
     */
    where: SkillWhereUniqueInput;
    /**
     * In case the Skill found by the `where` argument doesn't exist, create a new Skill with this data.
     */
    create: XOR<SkillCreateInput, SkillUncheckedCreateInput>;
    /**
     * In case the Skill was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SkillUpdateInput, SkillUncheckedUpdateInput>;
  };

  /**
   * Skill delete
   */
  export type SkillDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null;
    /**
     * Filter which Skill to delete.
     */
    where: SkillWhereUniqueInput;
  };

  /**
   * Skill deleteMany
   */
  export type SkillDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Skills to delete
     */
    where?: SkillWhereInput;
    /**
     * Limit how many Skills to delete.
     */
    limit?: number;
  };

  /**
   * Skill without action
   */
  export type SkillDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null;
  };

  /**
   * Model Degree
   */

  export type AggregateDegree = {
    _count: DegreeCountAggregateOutputType | null;
    _min: DegreeMinAggregateOutputType | null;
    _max: DegreeMaxAggregateOutputType | null;
  };

  export type DegreeMinAggregateOutputType = {
    id: string | null;
    title: string | null;
    identify: string | null;
    dateDelivrance: Date | null;
    userId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type DegreeMaxAggregateOutputType = {
    id: string | null;
    title: string | null;
    identify: string | null;
    dateDelivrance: Date | null;
    userId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type DegreeCountAggregateOutputType = {
    id: number;
    title: number;
    identify: number;
    dateDelivrance: number;
    userId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type DegreeMinAggregateInputType = {
    id?: true;
    title?: true;
    identify?: true;
    dateDelivrance?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type DegreeMaxAggregateInputType = {
    id?: true;
    title?: true;
    identify?: true;
    dateDelivrance?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type DegreeCountAggregateInputType = {
    id?: true;
    title?: true;
    identify?: true;
    dateDelivrance?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type DegreeAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Degree to aggregate.
     */
    where?: DegreeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Degrees to fetch.
     */
    orderBy?: DegreeOrderByWithRelationInput | DegreeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: DegreeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Degrees from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Degrees.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Degrees
     **/
    _count?: true | DegreeCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: DegreeMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: DegreeMaxAggregateInputType;
  };

  export type GetDegreeAggregateType<T extends DegreeAggregateArgs> = {
    [P in keyof T & keyof AggregateDegree]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDegree[P]>
      : GetScalarType<T[P], AggregateDegree[P]>;
  };

  export type DegreeGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: DegreeWhereInput;
    orderBy?:
      | DegreeOrderByWithAggregationInput
      | DegreeOrderByWithAggregationInput[];
    by: DegreeScalarFieldEnum[] | DegreeScalarFieldEnum;
    having?: DegreeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DegreeCountAggregateInputType | true;
    _min?: DegreeMinAggregateInputType;
    _max?: DegreeMaxAggregateInputType;
  };

  export type DegreeGroupByOutputType = {
    id: string;
    title: string;
    identify: string;
    dateDelivrance: Date;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    _count: DegreeCountAggregateOutputType | null;
    _min: DegreeMinAggregateOutputType | null;
    _max: DegreeMaxAggregateOutputType | null;
  };

  type GetDegreeGroupByPayload<T extends DegreeGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<DegreeGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof DegreeGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DegreeGroupByOutputType[P]>
            : GetScalarType<T[P], DegreeGroupByOutputType[P]>;
        }
      >
    >;

  export type DegreeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      title?: boolean;
      identify?: boolean;
      dateDelivrance?: boolean;
      userId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["degree"]
  >;

  export type DegreeSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      title?: boolean;
      identify?: boolean;
      dateDelivrance?: boolean;
      userId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["degree"]
  >;

  export type DegreeSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      title?: boolean;
      identify?: boolean;
      dateDelivrance?: boolean;
      userId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["degree"]
  >;

  export type DegreeSelectScalar = {
    id?: boolean;
    title?: boolean;
    identify?: boolean;
    dateDelivrance?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type DegreeOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | "id"
    | "title"
    | "identify"
    | "dateDelivrance"
    | "userId"
    | "createdAt"
    | "updatedAt",
    ExtArgs["result"]["degree"]
  >;
  export type DegreeInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type DegreeIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type DegreeIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $DegreePayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Degree";
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        title: string;
        identify: string;
        dateDelivrance: Date;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs["result"]["degree"]
    >;
    composites: {};
  };

  type DegreeGetPayload<
    S extends boolean | null | undefined | DegreeDefaultArgs,
  > = $Result.GetResult<Prisma.$DegreePayload, S>;

  type DegreeCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<DegreeFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
    select?: DegreeCountAggregateInputType | true;
  };

  export interface DegreeDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Degree"];
      meta: { name: "Degree" };
    };
    /**
     * Find zero or one Degree that matches the filter.
     * @param {DegreeFindUniqueArgs} args - Arguments to find a Degree
     * @example
     * // Get one Degree
     * const degree = await prisma.degree.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DegreeFindUniqueArgs>(
      args: SelectSubset<T, DegreeFindUniqueArgs<ExtArgs>>,
    ): Prisma__DegreeClient<
      $Result.GetResult<
        Prisma.$DegreePayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Degree that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DegreeFindUniqueOrThrowArgs} args - Arguments to find a Degree
     * @example
     * // Get one Degree
     * const degree = await prisma.degree.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DegreeFindUniqueOrThrowArgs>(
      args: SelectSubset<T, DegreeFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__DegreeClient<
      $Result.GetResult<
        Prisma.$DegreePayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Degree that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DegreeFindFirstArgs} args - Arguments to find a Degree
     * @example
     * // Get one Degree
     * const degree = await prisma.degree.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DegreeFindFirstArgs>(
      args?: SelectSubset<T, DegreeFindFirstArgs<ExtArgs>>,
    ): Prisma__DegreeClient<
      $Result.GetResult<
        Prisma.$DegreePayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Degree that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DegreeFindFirstOrThrowArgs} args - Arguments to find a Degree
     * @example
     * // Get one Degree
     * const degree = await prisma.degree.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DegreeFindFirstOrThrowArgs>(
      args?: SelectSubset<T, DegreeFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__DegreeClient<
      $Result.GetResult<
        Prisma.$DegreePayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Degrees that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DegreeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Degrees
     * const degrees = await prisma.degree.findMany()
     *
     * // Get first 10 Degrees
     * const degrees = await prisma.degree.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const degreeWithIdOnly = await prisma.degree.findMany({ select: { id: true } })
     *
     */
    findMany<T extends DegreeFindManyArgs>(
      args?: SelectSubset<T, DegreeFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$DegreePayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Degree.
     * @param {DegreeCreateArgs} args - Arguments to create a Degree.
     * @example
     * // Create one Degree
     * const Degree = await prisma.degree.create({
     *   data: {
     *     // ... data to create a Degree
     *   }
     * })
     *
     */
    create<T extends DegreeCreateArgs>(
      args: SelectSubset<T, DegreeCreateArgs<ExtArgs>>,
    ): Prisma__DegreeClient<
      $Result.GetResult<
        Prisma.$DegreePayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Degrees.
     * @param {DegreeCreateManyArgs} args - Arguments to create many Degrees.
     * @example
     * // Create many Degrees
     * const degree = await prisma.degree.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends DegreeCreateManyArgs>(
      args?: SelectSubset<T, DegreeCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Degrees and returns the data saved in the database.
     * @param {DegreeCreateManyAndReturnArgs} args - Arguments to create many Degrees.
     * @example
     * // Create many Degrees
     * const degree = await prisma.degree.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Degrees and only return the `id`
     * const degreeWithIdOnly = await prisma.degree.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends DegreeCreateManyAndReturnArgs>(
      args?: SelectSubset<T, DegreeCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$DegreePayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Degree.
     * @param {DegreeDeleteArgs} args - Arguments to delete one Degree.
     * @example
     * // Delete one Degree
     * const Degree = await prisma.degree.delete({
     *   where: {
     *     // ... filter to delete one Degree
     *   }
     * })
     *
     */
    delete<T extends DegreeDeleteArgs>(
      args: SelectSubset<T, DegreeDeleteArgs<ExtArgs>>,
    ): Prisma__DegreeClient<
      $Result.GetResult<
        Prisma.$DegreePayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Degree.
     * @param {DegreeUpdateArgs} args - Arguments to update one Degree.
     * @example
     * // Update one Degree
     * const degree = await prisma.degree.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends DegreeUpdateArgs>(
      args: SelectSubset<T, DegreeUpdateArgs<ExtArgs>>,
    ): Prisma__DegreeClient<
      $Result.GetResult<
        Prisma.$DegreePayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Degrees.
     * @param {DegreeDeleteManyArgs} args - Arguments to filter Degrees to delete.
     * @example
     * // Delete a few Degrees
     * const { count } = await prisma.degree.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends DegreeDeleteManyArgs>(
      args?: SelectSubset<T, DegreeDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Degrees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DegreeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Degrees
     * const degree = await prisma.degree.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends DegreeUpdateManyArgs>(
      args: SelectSubset<T, DegreeUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Degrees and returns the data updated in the database.
     * @param {DegreeUpdateManyAndReturnArgs} args - Arguments to update many Degrees.
     * @example
     * // Update many Degrees
     * const degree = await prisma.degree.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Degrees and only return the `id`
     * const degreeWithIdOnly = await prisma.degree.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends DegreeUpdateManyAndReturnArgs>(
      args: SelectSubset<T, DegreeUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$DegreePayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Degree.
     * @param {DegreeUpsertArgs} args - Arguments to update or create a Degree.
     * @example
     * // Update or create a Degree
     * const degree = await prisma.degree.upsert({
     *   create: {
     *     // ... data to create a Degree
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Degree we want to update
     *   }
     * })
     */
    upsert<T extends DegreeUpsertArgs>(
      args: SelectSubset<T, DegreeUpsertArgs<ExtArgs>>,
    ): Prisma__DegreeClient<
      $Result.GetResult<
        Prisma.$DegreePayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Degrees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DegreeCountArgs} args - Arguments to filter Degrees to count.
     * @example
     * // Count the number of Degrees
     * const count = await prisma.degree.count({
     *   where: {
     *     // ... the filter for the Degrees we want to count
     *   }
     * })
     **/
    count<T extends DegreeCountArgs>(
      args?: Subset<T, DegreeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], DegreeCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Degree.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DegreeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DegreeAggregateArgs>(
      args: Subset<T, DegreeAggregateArgs>,
    ): Prisma.PrismaPromise<GetDegreeAggregateType<T>>;

    /**
     * Group by Degree.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DegreeGroupByArgs} args - Group by arguments.
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
      T extends DegreeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DegreeGroupByArgs["orderBy"] }
        : { orderBy?: DegreeGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
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
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, DegreeGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetDegreeGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Degree model
     */
    readonly fields: DegreeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Degree.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DegreeClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Degree model
   */
  interface DegreeFieldRefs {
    readonly id: FieldRef<"Degree", "String">;
    readonly title: FieldRef<"Degree", "String">;
    readonly identify: FieldRef<"Degree", "String">;
    readonly dateDelivrance: FieldRef<"Degree", "DateTime">;
    readonly userId: FieldRef<"Degree", "String">;
    readonly createdAt: FieldRef<"Degree", "DateTime">;
    readonly updatedAt: FieldRef<"Degree", "DateTime">;
  }

  // Custom InputTypes
  /**
   * Degree findUnique
   */
  export type DegreeFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Degree
     */
    select?: DegreeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Degree
     */
    omit?: DegreeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DegreeInclude<ExtArgs> | null;
    /**
     * Filter, which Degree to fetch.
     */
    where: DegreeWhereUniqueInput;
  };

  /**
   * Degree findUniqueOrThrow
   */
  export type DegreeFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Degree
     */
    select?: DegreeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Degree
     */
    omit?: DegreeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DegreeInclude<ExtArgs> | null;
    /**
     * Filter, which Degree to fetch.
     */
    where: DegreeWhereUniqueInput;
  };

  /**
   * Degree findFirst
   */
  export type DegreeFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Degree
     */
    select?: DegreeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Degree
     */
    omit?: DegreeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DegreeInclude<ExtArgs> | null;
    /**
     * Filter, which Degree to fetch.
     */
    where?: DegreeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Degrees to fetch.
     */
    orderBy?: DegreeOrderByWithRelationInput | DegreeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Degrees.
     */
    cursor?: DegreeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Degrees from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Degrees.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Degrees.
     */
    distinct?: DegreeScalarFieldEnum | DegreeScalarFieldEnum[];
  };

  /**
   * Degree findFirstOrThrow
   */
  export type DegreeFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Degree
     */
    select?: DegreeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Degree
     */
    omit?: DegreeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DegreeInclude<ExtArgs> | null;
    /**
     * Filter, which Degree to fetch.
     */
    where?: DegreeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Degrees to fetch.
     */
    orderBy?: DegreeOrderByWithRelationInput | DegreeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Degrees.
     */
    cursor?: DegreeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Degrees from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Degrees.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Degrees.
     */
    distinct?: DegreeScalarFieldEnum | DegreeScalarFieldEnum[];
  };

  /**
   * Degree findMany
   */
  export type DegreeFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Degree
     */
    select?: DegreeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Degree
     */
    omit?: DegreeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DegreeInclude<ExtArgs> | null;
    /**
     * Filter, which Degrees to fetch.
     */
    where?: DegreeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Degrees to fetch.
     */
    orderBy?: DegreeOrderByWithRelationInput | DegreeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Degrees.
     */
    cursor?: DegreeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Degrees from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Degrees.
     */
    skip?: number;
    distinct?: DegreeScalarFieldEnum | DegreeScalarFieldEnum[];
  };

  /**
   * Degree create
   */
  export type DegreeCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Degree
     */
    select?: DegreeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Degree
     */
    omit?: DegreeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DegreeInclude<ExtArgs> | null;
    /**
     * The data needed to create a Degree.
     */
    data: XOR<DegreeCreateInput, DegreeUncheckedCreateInput>;
  };

  /**
   * Degree createMany
   */
  export type DegreeCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Degrees.
     */
    data: DegreeCreateManyInput | DegreeCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Degree createManyAndReturn
   */
  export type DegreeCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Degree
     */
    select?: DegreeSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Degree
     */
    omit?: DegreeOmit<ExtArgs> | null;
    /**
     * The data used to create many Degrees.
     */
    data: DegreeCreateManyInput | DegreeCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DegreeIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Degree update
   */
  export type DegreeUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Degree
     */
    select?: DegreeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Degree
     */
    omit?: DegreeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DegreeInclude<ExtArgs> | null;
    /**
     * The data needed to update a Degree.
     */
    data: XOR<DegreeUpdateInput, DegreeUncheckedUpdateInput>;
    /**
     * Choose, which Degree to update.
     */
    where: DegreeWhereUniqueInput;
  };

  /**
   * Degree updateMany
   */
  export type DegreeUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Degrees.
     */
    data: XOR<DegreeUpdateManyMutationInput, DegreeUncheckedUpdateManyInput>;
    /**
     * Filter which Degrees to update
     */
    where?: DegreeWhereInput;
    /**
     * Limit how many Degrees to update.
     */
    limit?: number;
  };

  /**
   * Degree updateManyAndReturn
   */
  export type DegreeUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Degree
     */
    select?: DegreeSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Degree
     */
    omit?: DegreeOmit<ExtArgs> | null;
    /**
     * The data used to update Degrees.
     */
    data: XOR<DegreeUpdateManyMutationInput, DegreeUncheckedUpdateManyInput>;
    /**
     * Filter which Degrees to update
     */
    where?: DegreeWhereInput;
    /**
     * Limit how many Degrees to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DegreeIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Degree upsert
   */
  export type DegreeUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Degree
     */
    select?: DegreeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Degree
     */
    omit?: DegreeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DegreeInclude<ExtArgs> | null;
    /**
     * The filter to search for the Degree to update in case it exists.
     */
    where: DegreeWhereUniqueInput;
    /**
     * In case the Degree found by the `where` argument doesn't exist, create a new Degree with this data.
     */
    create: XOR<DegreeCreateInput, DegreeUncheckedCreateInput>;
    /**
     * In case the Degree was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DegreeUpdateInput, DegreeUncheckedUpdateInput>;
  };

  /**
   * Degree delete
   */
  export type DegreeDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Degree
     */
    select?: DegreeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Degree
     */
    omit?: DegreeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DegreeInclude<ExtArgs> | null;
    /**
     * Filter which Degree to delete.
     */
    where: DegreeWhereUniqueInput;
  };

  /**
   * Degree deleteMany
   */
  export type DegreeDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Degrees to delete
     */
    where?: DegreeWhereInput;
    /**
     * Limit how many Degrees to delete.
     */
    limit?: number;
  };

  /**
   * Degree without action
   */
  export type DegreeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Degree
     */
    select?: DegreeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Degree
     */
    omit?: DegreeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DegreeInclude<ExtArgs> | null;
  };

  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null;
    _min: SessionMinAggregateOutputType | null;
    _max: SessionMaxAggregateOutputType | null;
  };

  export type SessionMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    ipAddress: string | null;
    useAgent: string | null;
    token: string | null;
    lastActivityAt: Date | null;
    isOnline: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    expiresAt: Date | null;
  };

  export type SessionMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    ipAddress: string | null;
    useAgent: string | null;
    token: string | null;
    lastActivityAt: Date | null;
    isOnline: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    expiresAt: Date | null;
  };

  export type SessionCountAggregateOutputType = {
    id: number;
    userId: number;
    ipAddress: number;
    useAgent: number;
    token: number;
    lastActivityAt: number;
    isOnline: number;
    createdAt: number;
    updatedAt: number;
    expiresAt: number;
    _all: number;
  };

  export type SessionMinAggregateInputType = {
    id?: true;
    userId?: true;
    ipAddress?: true;
    useAgent?: true;
    token?: true;
    lastActivityAt?: true;
    isOnline?: true;
    createdAt?: true;
    updatedAt?: true;
    expiresAt?: true;
  };

  export type SessionMaxAggregateInputType = {
    id?: true;
    userId?: true;
    ipAddress?: true;
    useAgent?: true;
    token?: true;
    lastActivityAt?: true;
    isOnline?: true;
    createdAt?: true;
    updatedAt?: true;
    expiresAt?: true;
  };

  export type SessionCountAggregateInputType = {
    id?: true;
    userId?: true;
    ipAddress?: true;
    useAgent?: true;
    token?: true;
    lastActivityAt?: true;
    isOnline?: true;
    createdAt?: true;
    updatedAt?: true;
    expiresAt?: true;
    _all?: true;
  };

  export type SessionAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Sessions to fetch.
     */
    orderBy?:
      | SessionOrderByWithRelationInput
      | SessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Sessions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Sessions
     **/
    _count?: true | SessionCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: SessionMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: SessionMaxAggregateInputType;
  };

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
    [P in keyof T & keyof AggregateSession]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>;
  };

  export type SessionGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: SessionWhereInput;
    orderBy?:
      | SessionOrderByWithAggregationInput
      | SessionOrderByWithAggregationInput[];
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum;
    having?: SessionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SessionCountAggregateInputType | true;
    _min?: SessionMinAggregateInputType;
    _max?: SessionMaxAggregateInputType;
  };

  export type SessionGroupByOutputType = {
    id: string;
    userId: string;
    ipAddress: string;
    useAgent: string;
    token: string;
    lastActivityAt: Date;
    isOnline: boolean;
    createdAt: Date;
    updatedAt: Date;
    expiresAt: Date;
    _count: SessionCountAggregateOutputType | null;
    _min: SessionMinAggregateOutputType | null;
    _max: SessionMaxAggregateOutputType | null;
  };

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<SessionGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof SessionGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>;
        }
      >
    >;

  export type SessionSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      ipAddress?: boolean;
      useAgent?: boolean;
      token?: boolean;
      lastActivityAt?: boolean;
      isOnline?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      expiresAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["session"]
  >;

  export type SessionSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      ipAddress?: boolean;
      useAgent?: boolean;
      token?: boolean;
      lastActivityAt?: boolean;
      isOnline?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      expiresAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["session"]
  >;

  export type SessionSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      ipAddress?: boolean;
      useAgent?: boolean;
      token?: boolean;
      lastActivityAt?: boolean;
      isOnline?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      expiresAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["session"]
  >;

  export type SessionSelectScalar = {
    id?: boolean;
    userId?: boolean;
    ipAddress?: boolean;
    useAgent?: boolean;
    token?: boolean;
    lastActivityAt?: boolean;
    isOnline?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    expiresAt?: boolean;
  };

  export type SessionOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | "id"
    | "userId"
    | "ipAddress"
    | "useAgent"
    | "token"
    | "lastActivityAt"
    | "isOnline"
    | "createdAt"
    | "updatedAt"
    | "expiresAt",
    ExtArgs["result"]["session"]
  >;
  export type SessionInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type SessionIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type SessionIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $SessionPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Session";
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        userId: string;
        ipAddress: string;
        useAgent: string;
        token: string;
        lastActivityAt: Date;
        isOnline: boolean;
        createdAt: Date;
        updatedAt: Date;
        expiresAt: Date;
      },
      ExtArgs["result"]["session"]
    >;
    composites: {};
  };

  type SessionGetPayload<
    S extends boolean | null | undefined | SessionDefaultArgs,
  > = $Result.GetResult<Prisma.$SessionPayload, S>;

  type SessionCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<SessionFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
    select?: SessionCountAggregateInputType | true;
  };

  export interface SessionDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Session"];
      meta: { name: "Session" };
    };
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(
      args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(
      args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(
      args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(
      args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     *
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     *
     */
    findMany<T extends SessionFindManyArgs>(
      args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     *
     */
    create<T extends SessionCreateArgs>(
      args: SelectSubset<T, SessionCreateArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends SessionCreateManyArgs>(
      args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(
      args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     *
     */
    delete<T extends SessionDeleteArgs>(
      args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends SessionUpdateArgs>(
      args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends SessionDeleteManyArgs>(
      args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends SessionUpdateManyArgs>(
      args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(
      args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(
      args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
     **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], SessionCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SessionAggregateArgs>(
      args: Subset<T, SessionAggregateArgs>,
    ): Prisma.PrismaPromise<GetSessionAggregateType<T>>;

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
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
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs["orderBy"] }
        : { orderBy?: SessionGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
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
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetSessionGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Session model
     */
    readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", "String">;
    readonly userId: FieldRef<"Session", "String">;
    readonly ipAddress: FieldRef<"Session", "String">;
    readonly useAgent: FieldRef<"Session", "String">;
    readonly token: FieldRef<"Session", "String">;
    readonly lastActivityAt: FieldRef<"Session", "DateTime">;
    readonly isOnline: FieldRef<"Session", "Boolean">;
    readonly createdAt: FieldRef<"Session", "DateTime">;
    readonly updatedAt: FieldRef<"Session", "DateTime">;
    readonly expiresAt: FieldRef<"Session", "DateTime">;
  }

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput;
  };

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput;
  };

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Sessions to fetch.
     */
    orderBy?:
      | SessionOrderByWithRelationInput
      | SessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Sessions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
  };

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Sessions to fetch.
     */
    orderBy?:
      | SessionOrderByWithRelationInput
      | SessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Sessions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
  };

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Sessions to fetch.
     */
    orderBy?:
      | SessionOrderByWithRelationInput
      | SessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Sessions.
     */
    skip?: number;
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
  };

  /**
   * Session create
   */
  export type SessionCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>;
  };

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Session update
   */
  export type SessionUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>;
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput;
  };

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>;
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput;
    /**
     * Limit how many Sessions to update.
     */
    limit?: number;
  };

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>;
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput;
    /**
     * Limit how many Sessions to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput;
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>;
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>;
  };

  /**
   * Session delete
   */
  export type SessionDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput;
  };

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput;
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number;
  };

  /**
   * Session without action
   */
  export type SessionDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
  };

  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: "ReadUncommitted";
    ReadCommitted: "ReadCommitted";
    RepeatableRead: "RepeatableRead";
    Serializable: "Serializable";
  };

  export type TransactionIsolationLevel =
    (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];

  export const UserScalarFieldEnum: {
    id: "id";
    firstName: "firstName";
    lastName: "lastName";
    username: "username";
    email: "email";
    password: "password";
    avatarPicture: "avatarPicture";
    description: "description";
    dateBirth: "dateBirth";
    title: "title";
    titleProfession: "titleProfession";
    linkWebsite: "linkWebsite";
    isVerify: "isVerify";
    emailVerificationToken: "emailVerificationToken";
    emailVerificationTokenExpiresAt: "emailVerificationTokenExpiresAt";
    resetPasswordToken: "resetPasswordToken";
    resetPasswordTokenExpiresAt: "resetPasswordTokenExpiresAt";
    onboarding: "onboarding";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
    role: "role";
    nationalityId: "nationalityId";
  };

  export type UserScalarFieldEnum =
    (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];

  export const NationalityScalarFieldEnum: {
    id: "id";
    name: "name";
    flag: "flag";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
  };

  export type NationalityScalarFieldEnum =
    (typeof NationalityScalarFieldEnum)[keyof typeof NationalityScalarFieldEnum];

  export const ExperienceScalarFieldEnum: {
    id: "id";
    title: "title";
    company: "company";
    startDate: "startDate";
    endDate: "endDate";
    current: "current";
    userId: "userId";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
  };

  export type ExperienceScalarFieldEnum =
    (typeof ExperienceScalarFieldEnum)[keyof typeof ExperienceScalarFieldEnum];

  export const EducationScalarFieldEnum: {
    id: "id";
    title: "title";
    school: "school";
    startDate: "startDate";
    endDate: "endDate";
    current: "current";
    userId: "userId";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
  };

  export type EducationScalarFieldEnum =
    (typeof EducationScalarFieldEnum)[keyof typeof EducationScalarFieldEnum];

  export const SkillScalarFieldEnum: {
    id: "id";
    title: "title";
    userId: "userId";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
  };

  export type SkillScalarFieldEnum =
    (typeof SkillScalarFieldEnum)[keyof typeof SkillScalarFieldEnum];

  export const DegreeScalarFieldEnum: {
    id: "id";
    title: "title";
    identify: "identify";
    dateDelivrance: "dateDelivrance";
    userId: "userId";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
  };

  export type DegreeScalarFieldEnum =
    (typeof DegreeScalarFieldEnum)[keyof typeof DegreeScalarFieldEnum];

  export const SessionScalarFieldEnum: {
    id: "id";
    userId: "userId";
    ipAddress: "ipAddress";
    useAgent: "useAgent";
    token: "token";
    lastActivityAt: "lastActivityAt";
    isOnline: "isOnline";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
    expiresAt: "expiresAt";
  };

  export type SessionScalarFieldEnum =
    (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum];

  export const SortOrder: {
    asc: "asc";
    desc: "desc";
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

  export const QueryMode: {
    default: "default";
    insensitive: "insensitive";
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];

  export const NullsOrder: {
    first: "first";
    last: "last";
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];

  /**
   * Field references
   */

  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "String"
  >;

  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "String[]"
  >;

  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "DateTime"
  >;

  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "DateTime[]"
  >;

  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Boolean"
  >;

  /**
   * Reference to a field of type 'userRole'
   */
  export type EnumuserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "userRole"
  >;

  /**
   * Reference to a field of type 'userRole[]'
   */
  export type ListEnumuserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "userRole[]"
  >;

  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Int"
  >;

  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Int[]"
  >;

  /**
   * Deep Input Types
   */

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[];
    OR?: UserWhereInput[];
    NOT?: UserWhereInput | UserWhereInput[];
    id?: StringFilter<"User"> | string;
    firstName?: StringFilter<"User"> | string;
    lastName?: StringFilter<"User"> | string;
    username?: StringFilter<"User"> | string;
    email?: StringFilter<"User"> | string;
    password?: StringFilter<"User"> | string;
    avatarPicture?: StringNullableFilter<"User"> | string | null;
    description?: StringNullableFilter<"User"> | string | null;
    dateBirth?: DateTimeFilter<"User"> | Date | string;
    title?: StringNullableFilter<"User"> | string | null;
    titleProfession?: StringNullableFilter<"User"> | string | null;
    linkWebsite?: StringNullableFilter<"User"> | string | null;
    isVerify?: BoolFilter<"User"> | boolean;
    emailVerificationToken?: StringNullableFilter<"User"> | string | null;
    emailVerificationTokenExpiresAt?:
      | DateTimeNullableFilter<"User">
      | Date
      | string
      | null;
    resetPasswordToken?: StringNullableFilter<"User"> | string | null;
    resetPasswordTokenExpiresAt?:
      | DateTimeNullableFilter<"User">
      | Date
      | string
      | null;
    onboarding?: BoolFilter<"User"> | boolean;
    createdAt?: DateTimeFilter<"User"> | Date | string;
    updatedAt?: DateTimeFilter<"User"> | Date | string;
    role?: EnumuserRoleFilter<"User"> | $Enums.userRole;
    nationalityId?: StringNullableFilter<"User"> | string | null;
    nationality?: XOR<
      NationalityNullableScalarRelationFilter,
      NationalityWhereInput
    > | null;
    experiences?: ExperienceListRelationFilter;
    educations?: EducationListRelationFilter;
    skills?: SkillListRelationFilter;
    degrees?: DegreeListRelationFilter;
    session?: SessionListRelationFilter;
  };

  export type UserOrderByWithRelationInput = {
    id?: SortOrder;
    firstName?: SortOrder;
    lastName?: SortOrder;
    username?: SortOrder;
    email?: SortOrder;
    password?: SortOrder;
    avatarPicture?: SortOrderInput | SortOrder;
    description?: SortOrderInput | SortOrder;
    dateBirth?: SortOrder;
    title?: SortOrderInput | SortOrder;
    titleProfession?: SortOrderInput | SortOrder;
    linkWebsite?: SortOrderInput | SortOrder;
    isVerify?: SortOrder;
    emailVerificationToken?: SortOrderInput | SortOrder;
    emailVerificationTokenExpiresAt?: SortOrderInput | SortOrder;
    resetPasswordToken?: SortOrderInput | SortOrder;
    resetPasswordTokenExpiresAt?: SortOrderInput | SortOrder;
    onboarding?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    role?: SortOrder;
    nationalityId?: SortOrderInput | SortOrder;
    nationality?: NationalityOrderByWithRelationInput;
    experiences?: ExperienceOrderByRelationAggregateInput;
    educations?: EducationOrderByRelationAggregateInput;
    skills?: SkillOrderByRelationAggregateInput;
    degrees?: DegreeOrderByRelationAggregateInput;
    session?: SessionOrderByRelationAggregateInput;
  };

  export type UserWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      username?: string;
      email?: string;
      AND?: UserWhereInput | UserWhereInput[];
      OR?: UserWhereInput[];
      NOT?: UserWhereInput | UserWhereInput[];
      firstName?: StringFilter<"User"> | string;
      lastName?: StringFilter<"User"> | string;
      password?: StringFilter<"User"> | string;
      avatarPicture?: StringNullableFilter<"User"> | string | null;
      description?: StringNullableFilter<"User"> | string | null;
      dateBirth?: DateTimeFilter<"User"> | Date | string;
      title?: StringNullableFilter<"User"> | string | null;
      titleProfession?: StringNullableFilter<"User"> | string | null;
      linkWebsite?: StringNullableFilter<"User"> | string | null;
      isVerify?: BoolFilter<"User"> | boolean;
      emailVerificationToken?: StringNullableFilter<"User"> | string | null;
      emailVerificationTokenExpiresAt?:
        | DateTimeNullableFilter<"User">
        | Date
        | string
        | null;
      resetPasswordToken?: StringNullableFilter<"User"> | string | null;
      resetPasswordTokenExpiresAt?:
        | DateTimeNullableFilter<"User">
        | Date
        | string
        | null;
      onboarding?: BoolFilter<"User"> | boolean;
      createdAt?: DateTimeFilter<"User"> | Date | string;
      updatedAt?: DateTimeFilter<"User"> | Date | string;
      role?: EnumuserRoleFilter<"User"> | $Enums.userRole;
      nationalityId?: StringNullableFilter<"User"> | string | null;
      nationality?: XOR<
        NationalityNullableScalarRelationFilter,
        NationalityWhereInput
      > | null;
      experiences?: ExperienceListRelationFilter;
      educations?: EducationListRelationFilter;
      skills?: SkillListRelationFilter;
      degrees?: DegreeListRelationFilter;
      session?: SessionListRelationFilter;
    },
    "id" | "username" | "email"
  >;

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder;
    firstName?: SortOrder;
    lastName?: SortOrder;
    username?: SortOrder;
    email?: SortOrder;
    password?: SortOrder;
    avatarPicture?: SortOrderInput | SortOrder;
    description?: SortOrderInput | SortOrder;
    dateBirth?: SortOrder;
    title?: SortOrderInput | SortOrder;
    titleProfession?: SortOrderInput | SortOrder;
    linkWebsite?: SortOrderInput | SortOrder;
    isVerify?: SortOrder;
    emailVerificationToken?: SortOrderInput | SortOrder;
    emailVerificationTokenExpiresAt?: SortOrderInput | SortOrder;
    resetPasswordToken?: SortOrderInput | SortOrder;
    resetPasswordTokenExpiresAt?: SortOrderInput | SortOrder;
    onboarding?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    role?: SortOrder;
    nationalityId?: SortOrderInput | SortOrder;
    _count?: UserCountOrderByAggregateInput;
    _max?: UserMaxOrderByAggregateInput;
    _min?: UserMinOrderByAggregateInput;
  };

  export type UserScalarWhereWithAggregatesInput = {
    AND?:
      | UserScalarWhereWithAggregatesInput
      | UserScalarWhereWithAggregatesInput[];
    OR?: UserScalarWhereWithAggregatesInput[];
    NOT?:
      | UserScalarWhereWithAggregatesInput
      | UserScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"User"> | string;
    firstName?: StringWithAggregatesFilter<"User"> | string;
    lastName?: StringWithAggregatesFilter<"User"> | string;
    username?: StringWithAggregatesFilter<"User"> | string;
    email?: StringWithAggregatesFilter<"User"> | string;
    password?: StringWithAggregatesFilter<"User"> | string;
    avatarPicture?: StringNullableWithAggregatesFilter<"User"> | string | null;
    description?: StringNullableWithAggregatesFilter<"User"> | string | null;
    dateBirth?: DateTimeWithAggregatesFilter<"User"> | Date | string;
    title?: StringNullableWithAggregatesFilter<"User"> | string | null;
    titleProfession?:
      | StringNullableWithAggregatesFilter<"User">
      | string
      | null;
    linkWebsite?: StringNullableWithAggregatesFilter<"User"> | string | null;
    isVerify?: BoolWithAggregatesFilter<"User"> | boolean;
    emailVerificationToken?:
      | StringNullableWithAggregatesFilter<"User">
      | string
      | null;
    emailVerificationTokenExpiresAt?:
      | DateTimeNullableWithAggregatesFilter<"User">
      | Date
      | string
      | null;
    resetPasswordToken?:
      | StringNullableWithAggregatesFilter<"User">
      | string
      | null;
    resetPasswordTokenExpiresAt?:
      | DateTimeNullableWithAggregatesFilter<"User">
      | Date
      | string
      | null;
    onboarding?: BoolWithAggregatesFilter<"User"> | boolean;
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string;
    role?: EnumuserRoleWithAggregatesFilter<"User"> | $Enums.userRole;
    nationalityId?: StringNullableWithAggregatesFilter<"User"> | string | null;
  };

  export type NationalityWhereInput = {
    AND?: NationalityWhereInput | NationalityWhereInput[];
    OR?: NationalityWhereInput[];
    NOT?: NationalityWhereInput | NationalityWhereInput[];
    id?: StringFilter<"Nationality"> | string;
    name?: StringFilter<"Nationality"> | string;
    flag?: StringFilter<"Nationality"> | string;
    createdAt?: DateTimeFilter<"Nationality"> | Date | string;
    updatedAt?: DateTimeFilter<"Nationality"> | Date | string;
    User?: UserListRelationFilter;
  };

  export type NationalityOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrder;
    flag?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    User?: UserOrderByRelationAggregateInput;
  };

  export type NationalityWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: NationalityWhereInput | NationalityWhereInput[];
      OR?: NationalityWhereInput[];
      NOT?: NationalityWhereInput | NationalityWhereInput[];
      name?: StringFilter<"Nationality"> | string;
      flag?: StringFilter<"Nationality"> | string;
      createdAt?: DateTimeFilter<"Nationality"> | Date | string;
      updatedAt?: DateTimeFilter<"Nationality"> | Date | string;
      User?: UserListRelationFilter;
    },
    "id"
  >;

  export type NationalityOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrder;
    flag?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: NationalityCountOrderByAggregateInput;
    _max?: NationalityMaxOrderByAggregateInput;
    _min?: NationalityMinOrderByAggregateInput;
  };

  export type NationalityScalarWhereWithAggregatesInput = {
    AND?:
      | NationalityScalarWhereWithAggregatesInput
      | NationalityScalarWhereWithAggregatesInput[];
    OR?: NationalityScalarWhereWithAggregatesInput[];
    NOT?:
      | NationalityScalarWhereWithAggregatesInput
      | NationalityScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Nationality"> | string;
    name?: StringWithAggregatesFilter<"Nationality"> | string;
    flag?: StringWithAggregatesFilter<"Nationality"> | string;
    createdAt?: DateTimeWithAggregatesFilter<"Nationality"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"Nationality"> | Date | string;
  };

  export type ExperienceWhereInput = {
    AND?: ExperienceWhereInput | ExperienceWhereInput[];
    OR?: ExperienceWhereInput[];
    NOT?: ExperienceWhereInput | ExperienceWhereInput[];
    id?: StringFilter<"Experience"> | string;
    title?: StringFilter<"Experience"> | string;
    company?: StringFilter<"Experience"> | string;
    startDate?: DateTimeFilter<"Experience"> | Date | string;
    endDate?: DateTimeFilter<"Experience"> | Date | string;
    current?: BoolFilter<"Experience"> | boolean;
    userId?: StringFilter<"Experience"> | string;
    createdAt?: DateTimeFilter<"Experience"> | Date | string;
    updatedAt?: DateTimeFilter<"Experience"> | Date | string;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
  };

  export type ExperienceOrderByWithRelationInput = {
    id?: SortOrder;
    title?: SortOrder;
    company?: SortOrder;
    startDate?: SortOrder;
    endDate?: SortOrder;
    current?: SortOrder;
    userId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    user?: UserOrderByWithRelationInput;
  };

  export type ExperienceWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: ExperienceWhereInput | ExperienceWhereInput[];
      OR?: ExperienceWhereInput[];
      NOT?: ExperienceWhereInput | ExperienceWhereInput[];
      title?: StringFilter<"Experience"> | string;
      company?: StringFilter<"Experience"> | string;
      startDate?: DateTimeFilter<"Experience"> | Date | string;
      endDate?: DateTimeFilter<"Experience"> | Date | string;
      current?: BoolFilter<"Experience"> | boolean;
      userId?: StringFilter<"Experience"> | string;
      createdAt?: DateTimeFilter<"Experience"> | Date | string;
      updatedAt?: DateTimeFilter<"Experience"> | Date | string;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    },
    "id"
  >;

  export type ExperienceOrderByWithAggregationInput = {
    id?: SortOrder;
    title?: SortOrder;
    company?: SortOrder;
    startDate?: SortOrder;
    endDate?: SortOrder;
    current?: SortOrder;
    userId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: ExperienceCountOrderByAggregateInput;
    _max?: ExperienceMaxOrderByAggregateInput;
    _min?: ExperienceMinOrderByAggregateInput;
  };

  export type ExperienceScalarWhereWithAggregatesInput = {
    AND?:
      | ExperienceScalarWhereWithAggregatesInput
      | ExperienceScalarWhereWithAggregatesInput[];
    OR?: ExperienceScalarWhereWithAggregatesInput[];
    NOT?:
      | ExperienceScalarWhereWithAggregatesInput
      | ExperienceScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Experience"> | string;
    title?: StringWithAggregatesFilter<"Experience"> | string;
    company?: StringWithAggregatesFilter<"Experience"> | string;
    startDate?: DateTimeWithAggregatesFilter<"Experience"> | Date | string;
    endDate?: DateTimeWithAggregatesFilter<"Experience"> | Date | string;
    current?: BoolWithAggregatesFilter<"Experience"> | boolean;
    userId?: StringWithAggregatesFilter<"Experience"> | string;
    createdAt?: DateTimeWithAggregatesFilter<"Experience"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"Experience"> | Date | string;
  };

  export type EducationWhereInput = {
    AND?: EducationWhereInput | EducationWhereInput[];
    OR?: EducationWhereInput[];
    NOT?: EducationWhereInput | EducationWhereInput[];
    id?: StringFilter<"Education"> | string;
    title?: StringFilter<"Education"> | string;
    school?: StringFilter<"Education"> | string;
    startDate?: DateTimeFilter<"Education"> | Date | string;
    endDate?: DateTimeFilter<"Education"> | Date | string;
    current?: BoolFilter<"Education"> | boolean;
    userId?: StringFilter<"Education"> | string;
    createdAt?: DateTimeFilter<"Education"> | Date | string;
    updatedAt?: DateTimeFilter<"Education"> | Date | string;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
  };

  export type EducationOrderByWithRelationInput = {
    id?: SortOrder;
    title?: SortOrder;
    school?: SortOrder;
    startDate?: SortOrder;
    endDate?: SortOrder;
    current?: SortOrder;
    userId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    user?: UserOrderByWithRelationInput;
  };

  export type EducationWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: EducationWhereInput | EducationWhereInput[];
      OR?: EducationWhereInput[];
      NOT?: EducationWhereInput | EducationWhereInput[];
      title?: StringFilter<"Education"> | string;
      school?: StringFilter<"Education"> | string;
      startDate?: DateTimeFilter<"Education"> | Date | string;
      endDate?: DateTimeFilter<"Education"> | Date | string;
      current?: BoolFilter<"Education"> | boolean;
      userId?: StringFilter<"Education"> | string;
      createdAt?: DateTimeFilter<"Education"> | Date | string;
      updatedAt?: DateTimeFilter<"Education"> | Date | string;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    },
    "id"
  >;

  export type EducationOrderByWithAggregationInput = {
    id?: SortOrder;
    title?: SortOrder;
    school?: SortOrder;
    startDate?: SortOrder;
    endDate?: SortOrder;
    current?: SortOrder;
    userId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: EducationCountOrderByAggregateInput;
    _max?: EducationMaxOrderByAggregateInput;
    _min?: EducationMinOrderByAggregateInput;
  };

  export type EducationScalarWhereWithAggregatesInput = {
    AND?:
      | EducationScalarWhereWithAggregatesInput
      | EducationScalarWhereWithAggregatesInput[];
    OR?: EducationScalarWhereWithAggregatesInput[];
    NOT?:
      | EducationScalarWhereWithAggregatesInput
      | EducationScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Education"> | string;
    title?: StringWithAggregatesFilter<"Education"> | string;
    school?: StringWithAggregatesFilter<"Education"> | string;
    startDate?: DateTimeWithAggregatesFilter<"Education"> | Date | string;
    endDate?: DateTimeWithAggregatesFilter<"Education"> | Date | string;
    current?: BoolWithAggregatesFilter<"Education"> | boolean;
    userId?: StringWithAggregatesFilter<"Education"> | string;
    createdAt?: DateTimeWithAggregatesFilter<"Education"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"Education"> | Date | string;
  };

  export type SkillWhereInput = {
    AND?: SkillWhereInput | SkillWhereInput[];
    OR?: SkillWhereInput[];
    NOT?: SkillWhereInput | SkillWhereInput[];
    id?: StringFilter<"Skill"> | string;
    title?: StringFilter<"Skill"> | string;
    userId?: StringFilter<"Skill"> | string;
    createdAt?: DateTimeFilter<"Skill"> | Date | string;
    updatedAt?: DateTimeFilter<"Skill"> | Date | string;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
  };

  export type SkillOrderByWithRelationInput = {
    id?: SortOrder;
    title?: SortOrder;
    userId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    user?: UserOrderByWithRelationInput;
  };

  export type SkillWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: SkillWhereInput | SkillWhereInput[];
      OR?: SkillWhereInput[];
      NOT?: SkillWhereInput | SkillWhereInput[];
      title?: StringFilter<"Skill"> | string;
      userId?: StringFilter<"Skill"> | string;
      createdAt?: DateTimeFilter<"Skill"> | Date | string;
      updatedAt?: DateTimeFilter<"Skill"> | Date | string;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    },
    "id"
  >;

  export type SkillOrderByWithAggregationInput = {
    id?: SortOrder;
    title?: SortOrder;
    userId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: SkillCountOrderByAggregateInput;
    _max?: SkillMaxOrderByAggregateInput;
    _min?: SkillMinOrderByAggregateInput;
  };

  export type SkillScalarWhereWithAggregatesInput = {
    AND?:
      | SkillScalarWhereWithAggregatesInput
      | SkillScalarWhereWithAggregatesInput[];
    OR?: SkillScalarWhereWithAggregatesInput[];
    NOT?:
      | SkillScalarWhereWithAggregatesInput
      | SkillScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Skill"> | string;
    title?: StringWithAggregatesFilter<"Skill"> | string;
    userId?: StringWithAggregatesFilter<"Skill"> | string;
    createdAt?: DateTimeWithAggregatesFilter<"Skill"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"Skill"> | Date | string;
  };

  export type DegreeWhereInput = {
    AND?: DegreeWhereInput | DegreeWhereInput[];
    OR?: DegreeWhereInput[];
    NOT?: DegreeWhereInput | DegreeWhereInput[];
    id?: StringFilter<"Degree"> | string;
    title?: StringFilter<"Degree"> | string;
    identify?: StringFilter<"Degree"> | string;
    dateDelivrance?: DateTimeFilter<"Degree"> | Date | string;
    userId?: StringFilter<"Degree"> | string;
    createdAt?: DateTimeFilter<"Degree"> | Date | string;
    updatedAt?: DateTimeFilter<"Degree"> | Date | string;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
  };

  export type DegreeOrderByWithRelationInput = {
    id?: SortOrder;
    title?: SortOrder;
    identify?: SortOrder;
    dateDelivrance?: SortOrder;
    userId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    user?: UserOrderByWithRelationInput;
  };

  export type DegreeWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: DegreeWhereInput | DegreeWhereInput[];
      OR?: DegreeWhereInput[];
      NOT?: DegreeWhereInput | DegreeWhereInput[];
      title?: StringFilter<"Degree"> | string;
      identify?: StringFilter<"Degree"> | string;
      dateDelivrance?: DateTimeFilter<"Degree"> | Date | string;
      userId?: StringFilter<"Degree"> | string;
      createdAt?: DateTimeFilter<"Degree"> | Date | string;
      updatedAt?: DateTimeFilter<"Degree"> | Date | string;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    },
    "id"
  >;

  export type DegreeOrderByWithAggregationInput = {
    id?: SortOrder;
    title?: SortOrder;
    identify?: SortOrder;
    dateDelivrance?: SortOrder;
    userId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: DegreeCountOrderByAggregateInput;
    _max?: DegreeMaxOrderByAggregateInput;
    _min?: DegreeMinOrderByAggregateInput;
  };

  export type DegreeScalarWhereWithAggregatesInput = {
    AND?:
      | DegreeScalarWhereWithAggregatesInput
      | DegreeScalarWhereWithAggregatesInput[];
    OR?: DegreeScalarWhereWithAggregatesInput[];
    NOT?:
      | DegreeScalarWhereWithAggregatesInput
      | DegreeScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Degree"> | string;
    title?: StringWithAggregatesFilter<"Degree"> | string;
    identify?: StringWithAggregatesFilter<"Degree"> | string;
    dateDelivrance?: DateTimeWithAggregatesFilter<"Degree"> | Date | string;
    userId?: StringWithAggregatesFilter<"Degree"> | string;
    createdAt?: DateTimeWithAggregatesFilter<"Degree"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"Degree"> | Date | string;
  };

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[];
    OR?: SessionWhereInput[];
    NOT?: SessionWhereInput | SessionWhereInput[];
    id?: StringFilter<"Session"> | string;
    userId?: StringFilter<"Session"> | string;
    ipAddress?: StringFilter<"Session"> | string;
    useAgent?: StringFilter<"Session"> | string;
    token?: StringFilter<"Session"> | string;
    lastActivityAt?: DateTimeFilter<"Session"> | Date | string;
    isOnline?: BoolFilter<"Session"> | boolean;
    createdAt?: DateTimeFilter<"Session"> | Date | string;
    updatedAt?: DateTimeFilter<"Session"> | Date | string;
    expiresAt?: DateTimeFilter<"Session"> | Date | string;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
  };

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    ipAddress?: SortOrder;
    useAgent?: SortOrder;
    token?: SortOrder;
    lastActivityAt?: SortOrder;
    isOnline?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    expiresAt?: SortOrder;
    user?: UserOrderByWithRelationInput;
  };

  export type SessionWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: SessionWhereInput | SessionWhereInput[];
      OR?: SessionWhereInput[];
      NOT?: SessionWhereInput | SessionWhereInput[];
      userId?: StringFilter<"Session"> | string;
      ipAddress?: StringFilter<"Session"> | string;
      useAgent?: StringFilter<"Session"> | string;
      token?: StringFilter<"Session"> | string;
      lastActivityAt?: DateTimeFilter<"Session"> | Date | string;
      isOnline?: BoolFilter<"Session"> | boolean;
      createdAt?: DateTimeFilter<"Session"> | Date | string;
      updatedAt?: DateTimeFilter<"Session"> | Date | string;
      expiresAt?: DateTimeFilter<"Session"> | Date | string;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    },
    "id"
  >;

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    ipAddress?: SortOrder;
    useAgent?: SortOrder;
    token?: SortOrder;
    lastActivityAt?: SortOrder;
    isOnline?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    expiresAt?: SortOrder;
    _count?: SessionCountOrderByAggregateInput;
    _max?: SessionMaxOrderByAggregateInput;
    _min?: SessionMinOrderByAggregateInput;
  };

  export type SessionScalarWhereWithAggregatesInput = {
    AND?:
      | SessionScalarWhereWithAggregatesInput
      | SessionScalarWhereWithAggregatesInput[];
    OR?: SessionScalarWhereWithAggregatesInput[];
    NOT?:
      | SessionScalarWhereWithAggregatesInput
      | SessionScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Session"> | string;
    userId?: StringWithAggregatesFilter<"Session"> | string;
    ipAddress?: StringWithAggregatesFilter<"Session"> | string;
    useAgent?: StringWithAggregatesFilter<"Session"> | string;
    token?: StringWithAggregatesFilter<"Session"> | string;
    lastActivityAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string;
    isOnline?: BoolWithAggregatesFilter<"Session"> | boolean;
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string;
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string;
  };

  export type UserCreateInput = {
    id?: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    avatarPicture?: string | null;
    description?: string | null;
    dateBirth: Date | string;
    title?: string | null;
    titleProfession?: string | null;
    linkWebsite?: string | null;
    isVerify?: boolean;
    emailVerificationToken?: string | null;
    emailVerificationTokenExpiresAt?: Date | string | null;
    resetPasswordToken?: string | null;
    resetPasswordTokenExpiresAt?: Date | string | null;
    onboarding?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.userRole;
    nationality?: NationalityCreateNestedOneWithoutUserInput;
    experiences?: ExperienceCreateNestedManyWithoutUserInput;
    educations?: EducationCreateNestedManyWithoutUserInput;
    skills?: SkillCreateNestedManyWithoutUserInput;
    degrees?: DegreeCreateNestedManyWithoutUserInput;
    session?: SessionCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateInput = {
    id?: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    avatarPicture?: string | null;
    description?: string | null;
    dateBirth: Date | string;
    title?: string | null;
    titleProfession?: string | null;
    linkWebsite?: string | null;
    isVerify?: boolean;
    emailVerificationToken?: string | null;
    emailVerificationTokenExpiresAt?: Date | string | null;
    resetPasswordToken?: string | null;
    resetPasswordTokenExpiresAt?: Date | string | null;
    onboarding?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.userRole;
    nationalityId?: string | null;
    experiences?: ExperienceUncheckedCreateNestedManyWithoutUserInput;
    educations?: EducationUncheckedCreateNestedManyWithoutUserInput;
    skills?: SkillUncheckedCreateNestedManyWithoutUserInput;
    degrees?: DegreeUncheckedCreateNestedManyWithoutUserInput;
    session?: SessionUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    username?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    avatarPicture?: NullableStringFieldUpdateOperationsInput | string | null;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    dateBirth?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: NullableStringFieldUpdateOperationsInput | string | null;
    titleProfession?: NullableStringFieldUpdateOperationsInput | string | null;
    linkWebsite?: NullableStringFieldUpdateOperationsInput | string | null;
    isVerify?: BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    emailVerificationTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    resetPasswordToken?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    resetPasswordTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    onboarding?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    role?: EnumuserRoleFieldUpdateOperationsInput | $Enums.userRole;
    nationality?: NationalityUpdateOneWithoutUserNestedInput;
    experiences?: ExperienceUpdateManyWithoutUserNestedInput;
    educations?: EducationUpdateManyWithoutUserNestedInput;
    skills?: SkillUpdateManyWithoutUserNestedInput;
    degrees?: DegreeUpdateManyWithoutUserNestedInput;
    session?: SessionUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    username?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    avatarPicture?: NullableStringFieldUpdateOperationsInput | string | null;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    dateBirth?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: NullableStringFieldUpdateOperationsInput | string | null;
    titleProfession?: NullableStringFieldUpdateOperationsInput | string | null;
    linkWebsite?: NullableStringFieldUpdateOperationsInput | string | null;
    isVerify?: BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    emailVerificationTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    resetPasswordToken?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    resetPasswordTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    onboarding?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    role?: EnumuserRoleFieldUpdateOperationsInput | $Enums.userRole;
    nationalityId?: NullableStringFieldUpdateOperationsInput | string | null;
    experiences?: ExperienceUncheckedUpdateManyWithoutUserNestedInput;
    educations?: EducationUncheckedUpdateManyWithoutUserNestedInput;
    skills?: SkillUncheckedUpdateManyWithoutUserNestedInput;
    degrees?: DegreeUncheckedUpdateManyWithoutUserNestedInput;
    session?: SessionUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type UserCreateManyInput = {
    id?: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    avatarPicture?: string | null;
    description?: string | null;
    dateBirth: Date | string;
    title?: string | null;
    titleProfession?: string | null;
    linkWebsite?: string | null;
    isVerify?: boolean;
    emailVerificationToken?: string | null;
    emailVerificationTokenExpiresAt?: Date | string | null;
    resetPasswordToken?: string | null;
    resetPasswordTokenExpiresAt?: Date | string | null;
    onboarding?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.userRole;
    nationalityId?: string | null;
  };

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    username?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    avatarPicture?: NullableStringFieldUpdateOperationsInput | string | null;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    dateBirth?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: NullableStringFieldUpdateOperationsInput | string | null;
    titleProfession?: NullableStringFieldUpdateOperationsInput | string | null;
    linkWebsite?: NullableStringFieldUpdateOperationsInput | string | null;
    isVerify?: BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    emailVerificationTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    resetPasswordToken?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    resetPasswordTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    onboarding?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    role?: EnumuserRoleFieldUpdateOperationsInput | $Enums.userRole;
  };

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    username?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    avatarPicture?: NullableStringFieldUpdateOperationsInput | string | null;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    dateBirth?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: NullableStringFieldUpdateOperationsInput | string | null;
    titleProfession?: NullableStringFieldUpdateOperationsInput | string | null;
    linkWebsite?: NullableStringFieldUpdateOperationsInput | string | null;
    isVerify?: BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    emailVerificationTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    resetPasswordToken?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    resetPasswordTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    onboarding?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    role?: EnumuserRoleFieldUpdateOperationsInput | $Enums.userRole;
    nationalityId?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type NationalityCreateInput = {
    id?: string;
    name: string;
    flag: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    User?: UserCreateNestedManyWithoutNationalityInput;
  };

  export type NationalityUncheckedCreateInput = {
    id?: string;
    name: string;
    flag: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    User?: UserUncheckedCreateNestedManyWithoutNationalityInput;
  };

  export type NationalityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    flag?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    User?: UserUpdateManyWithoutNationalityNestedInput;
  };

  export type NationalityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    flag?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    User?: UserUncheckedUpdateManyWithoutNationalityNestedInput;
  };

  export type NationalityCreateManyInput = {
    id?: string;
    name: string;
    flag: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type NationalityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    flag?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type NationalityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    flag?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ExperienceCreateInput = {
    id?: string;
    title: string;
    company: string;
    startDate: Date | string;
    endDate: Date | string;
    current: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutExperiencesInput;
  };

  export type ExperienceUncheckedCreateInput = {
    id?: string;
    title: string;
    company: string;
    startDate: Date | string;
    endDate: Date | string;
    current: boolean;
    userId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ExperienceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    company?: StringFieldUpdateOperationsInput | string;
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    current?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutExperiencesNestedInput;
  };

  export type ExperienceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    company?: StringFieldUpdateOperationsInput | string;
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    current?: BoolFieldUpdateOperationsInput | boolean;
    userId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ExperienceCreateManyInput = {
    id?: string;
    title: string;
    company: string;
    startDate: Date | string;
    endDate: Date | string;
    current: boolean;
    userId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ExperienceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    company?: StringFieldUpdateOperationsInput | string;
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    current?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ExperienceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    company?: StringFieldUpdateOperationsInput | string;
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    current?: BoolFieldUpdateOperationsInput | boolean;
    userId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type EducationCreateInput = {
    id?: string;
    title: string;
    school: string;
    startDate: Date | string;
    endDate: Date | string;
    current: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutEducationsInput;
  };

  export type EducationUncheckedCreateInput = {
    id?: string;
    title: string;
    school: string;
    startDate: Date | string;
    endDate: Date | string;
    current: boolean;
    userId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type EducationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    school?: StringFieldUpdateOperationsInput | string;
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    current?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutEducationsNestedInput;
  };

  export type EducationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    school?: StringFieldUpdateOperationsInput | string;
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    current?: BoolFieldUpdateOperationsInput | boolean;
    userId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type EducationCreateManyInput = {
    id?: string;
    title: string;
    school: string;
    startDate: Date | string;
    endDate: Date | string;
    current: boolean;
    userId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type EducationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    school?: StringFieldUpdateOperationsInput | string;
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    current?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type EducationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    school?: StringFieldUpdateOperationsInput | string;
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    current?: BoolFieldUpdateOperationsInput | boolean;
    userId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SkillCreateInput = {
    id?: string;
    title: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutSkillsInput;
  };

  export type SkillUncheckedCreateInput = {
    id?: string;
    title: string;
    userId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type SkillUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutSkillsNestedInput;
  };

  export type SkillUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SkillCreateManyInput = {
    id?: string;
    title: string;
    userId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type SkillUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SkillUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type DegreeCreateInput = {
    id?: string;
    title: string;
    identify: string;
    dateDelivrance: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutDegreesInput;
  };

  export type DegreeUncheckedCreateInput = {
    id?: string;
    title: string;
    identify: string;
    dateDelivrance: Date | string;
    userId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type DegreeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    identify?: StringFieldUpdateOperationsInput | string;
    dateDelivrance?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutDegreesNestedInput;
  };

  export type DegreeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    identify?: StringFieldUpdateOperationsInput | string;
    dateDelivrance?: DateTimeFieldUpdateOperationsInput | Date | string;
    userId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type DegreeCreateManyInput = {
    id?: string;
    title: string;
    identify: string;
    dateDelivrance: Date | string;
    userId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type DegreeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    identify?: StringFieldUpdateOperationsInput | string;
    dateDelivrance?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type DegreeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    identify?: StringFieldUpdateOperationsInput | string;
    dateDelivrance?: DateTimeFieldUpdateOperationsInput | Date | string;
    userId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionCreateInput = {
    id?: string;
    ipAddress: string;
    useAgent: string;
    token: string;
    lastActivityAt: Date | string;
    isOnline?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    expiresAt: Date | string;
    user: UserCreateNestedOneWithoutSessionInput;
  };

  export type SessionUncheckedCreateInput = {
    id?: string;
    userId: string;
    ipAddress: string;
    useAgent: string;
    token: string;
    lastActivityAt: Date | string;
    isOnline?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    expiresAt: Date | string;
  };

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    ipAddress?: StringFieldUpdateOperationsInput | string;
    useAgent?: StringFieldUpdateOperationsInput | string;
    token?: StringFieldUpdateOperationsInput | string;
    lastActivityAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    isOnline?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutSessionNestedInput;
  };

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    ipAddress?: StringFieldUpdateOperationsInput | string;
    useAgent?: StringFieldUpdateOperationsInput | string;
    token?: StringFieldUpdateOperationsInput | string;
    lastActivityAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    isOnline?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionCreateManyInput = {
    id?: string;
    userId: string;
    ipAddress: string;
    useAgent: string;
    token: string;
    lastActivityAt: Date | string;
    isOnline?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    expiresAt: Date | string;
  };

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    ipAddress?: StringFieldUpdateOperationsInput | string;
    useAgent?: StringFieldUpdateOperationsInput | string;
    token?: StringFieldUpdateOperationsInput | string;
    lastActivityAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    isOnline?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    ipAddress?: StringFieldUpdateOperationsInput | string;
    useAgent?: StringFieldUpdateOperationsInput | string;
    token?: StringFieldUpdateOperationsInput | string;
    lastActivityAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    isOnline?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  };

  export type EnumuserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.userRole | EnumuserRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.userRole[] | ListEnumuserRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.userRole[] | ListEnumuserRoleFieldRefInput<$PrismaModel>;
    not?: NestedEnumuserRoleFilter<$PrismaModel> | $Enums.userRole;
  };

  export type NationalityNullableScalarRelationFilter = {
    is?: NationalityWhereInput | null;
    isNot?: NationalityWhereInput | null;
  };

  export type ExperienceListRelationFilter = {
    every?: ExperienceWhereInput;
    some?: ExperienceWhereInput;
    none?: ExperienceWhereInput;
  };

  export type EducationListRelationFilter = {
    every?: EducationWhereInput;
    some?: EducationWhereInput;
    none?: EducationWhereInput;
  };

  export type SkillListRelationFilter = {
    every?: SkillWhereInput;
    some?: SkillWhereInput;
    none?: SkillWhereInput;
  };

  export type DegreeListRelationFilter = {
    every?: DegreeWhereInput;
    some?: DegreeWhereInput;
    none?: DegreeWhereInput;
  };

  export type SessionListRelationFilter = {
    every?: SessionWhereInput;
    some?: SessionWhereInput;
    none?: SessionWhereInput;
  };

  export type SortOrderInput = {
    sort: SortOrder;
    nulls?: NullsOrder;
  };

  export type ExperienceOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type EducationOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type SkillOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type DegreeOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder;
    firstName?: SortOrder;
    lastName?: SortOrder;
    username?: SortOrder;
    email?: SortOrder;
    password?: SortOrder;
    avatarPicture?: SortOrder;
    description?: SortOrder;
    dateBirth?: SortOrder;
    title?: SortOrder;
    titleProfession?: SortOrder;
    linkWebsite?: SortOrder;
    isVerify?: SortOrder;
    emailVerificationToken?: SortOrder;
    emailVerificationTokenExpiresAt?: SortOrder;
    resetPasswordToken?: SortOrder;
    resetPasswordTokenExpiresAt?: SortOrder;
    onboarding?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    role?: SortOrder;
    nationalityId?: SortOrder;
  };

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder;
    firstName?: SortOrder;
    lastName?: SortOrder;
    username?: SortOrder;
    email?: SortOrder;
    password?: SortOrder;
    avatarPicture?: SortOrder;
    description?: SortOrder;
    dateBirth?: SortOrder;
    title?: SortOrder;
    titleProfession?: SortOrder;
    linkWebsite?: SortOrder;
    isVerify?: SortOrder;
    emailVerificationToken?: SortOrder;
    emailVerificationTokenExpiresAt?: SortOrder;
    resetPasswordToken?: SortOrder;
    resetPasswordTokenExpiresAt?: SortOrder;
    onboarding?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    role?: SortOrder;
    nationalityId?: SortOrder;
  };

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder;
    firstName?: SortOrder;
    lastName?: SortOrder;
    username?: SortOrder;
    email?: SortOrder;
    password?: SortOrder;
    avatarPicture?: SortOrder;
    description?: SortOrder;
    dateBirth?: SortOrder;
    title?: SortOrder;
    titleProfession?: SortOrder;
    linkWebsite?: SortOrder;
    isVerify?: SortOrder;
    emailVerificationToken?: SortOrder;
    emailVerificationTokenExpiresAt?: SortOrder;
    resetPasswordToken?: SortOrder;
    resetPasswordTokenExpiresAt?: SortOrder;
    onboarding?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    role?: SortOrder;
    nationalityId?: SortOrder;
  };

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?:
      | NestedStringNullableWithAggregatesFilter<$PrismaModel>
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?:
      | NestedDateTimeNullableWithAggregatesFilter<$PrismaModel>
      | Date
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: NestedDateTimeNullableFilter<$PrismaModel>;
  };

  export type EnumuserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.userRole | EnumuserRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.userRole[] | ListEnumuserRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.userRole[] | ListEnumuserRoleFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumuserRoleWithAggregatesFilter<$PrismaModel>
      | $Enums.userRole;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumuserRoleFilter<$PrismaModel>;
    _max?: NestedEnumuserRoleFilter<$PrismaModel>;
  };

  export type UserListRelationFilter = {
    every?: UserWhereInput;
    some?: UserWhereInput;
    none?: UserWhereInput;
  };

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type NationalityCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    flag?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type NationalityMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    flag?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type NationalityMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    flag?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserScalarRelationFilter = {
    is?: UserWhereInput;
    isNot?: UserWhereInput;
  };

  export type ExperienceCountOrderByAggregateInput = {
    id?: SortOrder;
    title?: SortOrder;
    company?: SortOrder;
    startDate?: SortOrder;
    endDate?: SortOrder;
    current?: SortOrder;
    userId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ExperienceMaxOrderByAggregateInput = {
    id?: SortOrder;
    title?: SortOrder;
    company?: SortOrder;
    startDate?: SortOrder;
    endDate?: SortOrder;
    current?: SortOrder;
    userId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ExperienceMinOrderByAggregateInput = {
    id?: SortOrder;
    title?: SortOrder;
    company?: SortOrder;
    startDate?: SortOrder;
    endDate?: SortOrder;
    current?: SortOrder;
    userId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type EducationCountOrderByAggregateInput = {
    id?: SortOrder;
    title?: SortOrder;
    school?: SortOrder;
    startDate?: SortOrder;
    endDate?: SortOrder;
    current?: SortOrder;
    userId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type EducationMaxOrderByAggregateInput = {
    id?: SortOrder;
    title?: SortOrder;
    school?: SortOrder;
    startDate?: SortOrder;
    endDate?: SortOrder;
    current?: SortOrder;
    userId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type EducationMinOrderByAggregateInput = {
    id?: SortOrder;
    title?: SortOrder;
    school?: SortOrder;
    startDate?: SortOrder;
    endDate?: SortOrder;
    current?: SortOrder;
    userId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type SkillCountOrderByAggregateInput = {
    id?: SortOrder;
    title?: SortOrder;
    userId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type SkillMaxOrderByAggregateInput = {
    id?: SortOrder;
    title?: SortOrder;
    userId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type SkillMinOrderByAggregateInput = {
    id?: SortOrder;
    title?: SortOrder;
    userId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type DegreeCountOrderByAggregateInput = {
    id?: SortOrder;
    title?: SortOrder;
    identify?: SortOrder;
    dateDelivrance?: SortOrder;
    userId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type DegreeMaxOrderByAggregateInput = {
    id?: SortOrder;
    title?: SortOrder;
    identify?: SortOrder;
    dateDelivrance?: SortOrder;
    userId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type DegreeMinOrderByAggregateInput = {
    id?: SortOrder;
    title?: SortOrder;
    identify?: SortOrder;
    dateDelivrance?: SortOrder;
    userId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    ipAddress?: SortOrder;
    useAgent?: SortOrder;
    token?: SortOrder;
    lastActivityAt?: SortOrder;
    isOnline?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    expiresAt?: SortOrder;
  };

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    ipAddress?: SortOrder;
    useAgent?: SortOrder;
    token?: SortOrder;
    lastActivityAt?: SortOrder;
    isOnline?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    expiresAt?: SortOrder;
  };

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    ipAddress?: SortOrder;
    useAgent?: SortOrder;
    token?: SortOrder;
    lastActivityAt?: SortOrder;
    isOnline?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    expiresAt?: SortOrder;
  };

  export type NationalityCreateNestedOneWithoutUserInput = {
    create?: XOR<
      NationalityCreateWithoutUserInput,
      NationalityUncheckedCreateWithoutUserInput
    >;
    connectOrCreate?: NationalityCreateOrConnectWithoutUserInput;
    connect?: NationalityWhereUniqueInput;
  };

  export type ExperienceCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          ExperienceCreateWithoutUserInput,
          ExperienceUncheckedCreateWithoutUserInput
        >
      | ExperienceCreateWithoutUserInput[]
      | ExperienceUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | ExperienceCreateOrConnectWithoutUserInput
      | ExperienceCreateOrConnectWithoutUserInput[];
    createMany?: ExperienceCreateManyUserInputEnvelope;
    connect?: ExperienceWhereUniqueInput | ExperienceWhereUniqueInput[];
  };

  export type EducationCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          EducationCreateWithoutUserInput,
          EducationUncheckedCreateWithoutUserInput
        >
      | EducationCreateWithoutUserInput[]
      | EducationUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | EducationCreateOrConnectWithoutUserInput
      | EducationCreateOrConnectWithoutUserInput[];
    createMany?: EducationCreateManyUserInputEnvelope;
    connect?: EducationWhereUniqueInput | EducationWhereUniqueInput[];
  };

  export type SkillCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<SkillCreateWithoutUserInput, SkillUncheckedCreateWithoutUserInput>
      | SkillCreateWithoutUserInput[]
      | SkillUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | SkillCreateOrConnectWithoutUserInput
      | SkillCreateOrConnectWithoutUserInput[];
    createMany?: SkillCreateManyUserInputEnvelope;
    connect?: SkillWhereUniqueInput | SkillWhereUniqueInput[];
  };

  export type DegreeCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<DegreeCreateWithoutUserInput, DegreeUncheckedCreateWithoutUserInput>
      | DegreeCreateWithoutUserInput[]
      | DegreeUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | DegreeCreateOrConnectWithoutUserInput
      | DegreeCreateOrConnectWithoutUserInput[];
    createMany?: DegreeCreateManyUserInputEnvelope;
    connect?: DegreeWhereUniqueInput | DegreeWhereUniqueInput[];
  };

  export type SessionCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          SessionCreateWithoutUserInput,
          SessionUncheckedCreateWithoutUserInput
        >
      | SessionCreateWithoutUserInput[]
      | SessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | SessionCreateOrConnectWithoutUserInput
      | SessionCreateOrConnectWithoutUserInput[];
    createMany?: SessionCreateManyUserInputEnvelope;
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
  };

  export type ExperienceUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          ExperienceCreateWithoutUserInput,
          ExperienceUncheckedCreateWithoutUserInput
        >
      | ExperienceCreateWithoutUserInput[]
      | ExperienceUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | ExperienceCreateOrConnectWithoutUserInput
      | ExperienceCreateOrConnectWithoutUserInput[];
    createMany?: ExperienceCreateManyUserInputEnvelope;
    connect?: ExperienceWhereUniqueInput | ExperienceWhereUniqueInput[];
  };

  export type EducationUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          EducationCreateWithoutUserInput,
          EducationUncheckedCreateWithoutUserInput
        >
      | EducationCreateWithoutUserInput[]
      | EducationUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | EducationCreateOrConnectWithoutUserInput
      | EducationCreateOrConnectWithoutUserInput[];
    createMany?: EducationCreateManyUserInputEnvelope;
    connect?: EducationWhereUniqueInput | EducationWhereUniqueInput[];
  };

  export type SkillUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<SkillCreateWithoutUserInput, SkillUncheckedCreateWithoutUserInput>
      | SkillCreateWithoutUserInput[]
      | SkillUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | SkillCreateOrConnectWithoutUserInput
      | SkillCreateOrConnectWithoutUserInput[];
    createMany?: SkillCreateManyUserInputEnvelope;
    connect?: SkillWhereUniqueInput | SkillWhereUniqueInput[];
  };

  export type DegreeUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<DegreeCreateWithoutUserInput, DegreeUncheckedCreateWithoutUserInput>
      | DegreeCreateWithoutUserInput[]
      | DegreeUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | DegreeCreateOrConnectWithoutUserInput
      | DegreeCreateOrConnectWithoutUserInput[];
    createMany?: DegreeCreateManyUserInputEnvelope;
    connect?: DegreeWhereUniqueInput | DegreeWhereUniqueInput[];
  };

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          SessionCreateWithoutUserInput,
          SessionUncheckedCreateWithoutUserInput
        >
      | SessionCreateWithoutUserInput[]
      | SessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | SessionCreateOrConnectWithoutUserInput
      | SessionCreateOrConnectWithoutUserInput[];
    createMany?: SessionCreateManyUserInputEnvelope;
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
  };

  export type StringFieldUpdateOperationsInput = {
    set?: string;
  };

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
  };

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
  };

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
  };

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
  };

  export type EnumuserRoleFieldUpdateOperationsInput = {
    set?: $Enums.userRole;
  };

  export type NationalityUpdateOneWithoutUserNestedInput = {
    create?: XOR<
      NationalityCreateWithoutUserInput,
      NationalityUncheckedCreateWithoutUserInput
    >;
    connectOrCreate?: NationalityCreateOrConnectWithoutUserInput;
    upsert?: NationalityUpsertWithoutUserInput;
    disconnect?: NationalityWhereInput | boolean;
    delete?: NationalityWhereInput | boolean;
    connect?: NationalityWhereUniqueInput;
    update?: XOR<
      XOR<
        NationalityUpdateToOneWithWhereWithoutUserInput,
        NationalityUpdateWithoutUserInput
      >,
      NationalityUncheckedUpdateWithoutUserInput
    >;
  };

  export type ExperienceUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          ExperienceCreateWithoutUserInput,
          ExperienceUncheckedCreateWithoutUserInput
        >
      | ExperienceCreateWithoutUserInput[]
      | ExperienceUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | ExperienceCreateOrConnectWithoutUserInput
      | ExperienceCreateOrConnectWithoutUserInput[];
    upsert?:
      | ExperienceUpsertWithWhereUniqueWithoutUserInput
      | ExperienceUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: ExperienceCreateManyUserInputEnvelope;
    set?: ExperienceWhereUniqueInput | ExperienceWhereUniqueInput[];
    disconnect?: ExperienceWhereUniqueInput | ExperienceWhereUniqueInput[];
    delete?: ExperienceWhereUniqueInput | ExperienceWhereUniqueInput[];
    connect?: ExperienceWhereUniqueInput | ExperienceWhereUniqueInput[];
    update?:
      | ExperienceUpdateWithWhereUniqueWithoutUserInput
      | ExperienceUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | ExperienceUpdateManyWithWhereWithoutUserInput
      | ExperienceUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: ExperienceScalarWhereInput | ExperienceScalarWhereInput[];
  };

  export type EducationUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          EducationCreateWithoutUserInput,
          EducationUncheckedCreateWithoutUserInput
        >
      | EducationCreateWithoutUserInput[]
      | EducationUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | EducationCreateOrConnectWithoutUserInput
      | EducationCreateOrConnectWithoutUserInput[];
    upsert?:
      | EducationUpsertWithWhereUniqueWithoutUserInput
      | EducationUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: EducationCreateManyUserInputEnvelope;
    set?: EducationWhereUniqueInput | EducationWhereUniqueInput[];
    disconnect?: EducationWhereUniqueInput | EducationWhereUniqueInput[];
    delete?: EducationWhereUniqueInput | EducationWhereUniqueInput[];
    connect?: EducationWhereUniqueInput | EducationWhereUniqueInput[];
    update?:
      | EducationUpdateWithWhereUniqueWithoutUserInput
      | EducationUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | EducationUpdateManyWithWhereWithoutUserInput
      | EducationUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: EducationScalarWhereInput | EducationScalarWhereInput[];
  };

  export type SkillUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<SkillCreateWithoutUserInput, SkillUncheckedCreateWithoutUserInput>
      | SkillCreateWithoutUserInput[]
      | SkillUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | SkillCreateOrConnectWithoutUserInput
      | SkillCreateOrConnectWithoutUserInput[];
    upsert?:
      | SkillUpsertWithWhereUniqueWithoutUserInput
      | SkillUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: SkillCreateManyUserInputEnvelope;
    set?: SkillWhereUniqueInput | SkillWhereUniqueInput[];
    disconnect?: SkillWhereUniqueInput | SkillWhereUniqueInput[];
    delete?: SkillWhereUniqueInput | SkillWhereUniqueInput[];
    connect?: SkillWhereUniqueInput | SkillWhereUniqueInput[];
    update?:
      | SkillUpdateWithWhereUniqueWithoutUserInput
      | SkillUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | SkillUpdateManyWithWhereWithoutUserInput
      | SkillUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: SkillScalarWhereInput | SkillScalarWhereInput[];
  };

  export type DegreeUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<DegreeCreateWithoutUserInput, DegreeUncheckedCreateWithoutUserInput>
      | DegreeCreateWithoutUserInput[]
      | DegreeUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | DegreeCreateOrConnectWithoutUserInput
      | DegreeCreateOrConnectWithoutUserInput[];
    upsert?:
      | DegreeUpsertWithWhereUniqueWithoutUserInput
      | DegreeUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: DegreeCreateManyUserInputEnvelope;
    set?: DegreeWhereUniqueInput | DegreeWhereUniqueInput[];
    disconnect?: DegreeWhereUniqueInput | DegreeWhereUniqueInput[];
    delete?: DegreeWhereUniqueInput | DegreeWhereUniqueInput[];
    connect?: DegreeWhereUniqueInput | DegreeWhereUniqueInput[];
    update?:
      | DegreeUpdateWithWhereUniqueWithoutUserInput
      | DegreeUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | DegreeUpdateManyWithWhereWithoutUserInput
      | DegreeUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: DegreeScalarWhereInput | DegreeScalarWhereInput[];
  };

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          SessionCreateWithoutUserInput,
          SessionUncheckedCreateWithoutUserInput
        >
      | SessionCreateWithoutUserInput[]
      | SessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | SessionCreateOrConnectWithoutUserInput
      | SessionCreateOrConnectWithoutUserInput[];
    upsert?:
      | SessionUpsertWithWhereUniqueWithoutUserInput
      | SessionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: SessionCreateManyUserInputEnvelope;
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    update?:
      | SessionUpdateWithWhereUniqueWithoutUserInput
      | SessionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | SessionUpdateManyWithWhereWithoutUserInput
      | SessionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[];
  };

  export type ExperienceUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          ExperienceCreateWithoutUserInput,
          ExperienceUncheckedCreateWithoutUserInput
        >
      | ExperienceCreateWithoutUserInput[]
      | ExperienceUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | ExperienceCreateOrConnectWithoutUserInput
      | ExperienceCreateOrConnectWithoutUserInput[];
    upsert?:
      | ExperienceUpsertWithWhereUniqueWithoutUserInput
      | ExperienceUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: ExperienceCreateManyUserInputEnvelope;
    set?: ExperienceWhereUniqueInput | ExperienceWhereUniqueInput[];
    disconnect?: ExperienceWhereUniqueInput | ExperienceWhereUniqueInput[];
    delete?: ExperienceWhereUniqueInput | ExperienceWhereUniqueInput[];
    connect?: ExperienceWhereUniqueInput | ExperienceWhereUniqueInput[];
    update?:
      | ExperienceUpdateWithWhereUniqueWithoutUserInput
      | ExperienceUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | ExperienceUpdateManyWithWhereWithoutUserInput
      | ExperienceUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: ExperienceScalarWhereInput | ExperienceScalarWhereInput[];
  };

  export type EducationUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          EducationCreateWithoutUserInput,
          EducationUncheckedCreateWithoutUserInput
        >
      | EducationCreateWithoutUserInput[]
      | EducationUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | EducationCreateOrConnectWithoutUserInput
      | EducationCreateOrConnectWithoutUserInput[];
    upsert?:
      | EducationUpsertWithWhereUniqueWithoutUserInput
      | EducationUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: EducationCreateManyUserInputEnvelope;
    set?: EducationWhereUniqueInput | EducationWhereUniqueInput[];
    disconnect?: EducationWhereUniqueInput | EducationWhereUniqueInput[];
    delete?: EducationWhereUniqueInput | EducationWhereUniqueInput[];
    connect?: EducationWhereUniqueInput | EducationWhereUniqueInput[];
    update?:
      | EducationUpdateWithWhereUniqueWithoutUserInput
      | EducationUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | EducationUpdateManyWithWhereWithoutUserInput
      | EducationUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: EducationScalarWhereInput | EducationScalarWhereInput[];
  };

  export type SkillUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<SkillCreateWithoutUserInput, SkillUncheckedCreateWithoutUserInput>
      | SkillCreateWithoutUserInput[]
      | SkillUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | SkillCreateOrConnectWithoutUserInput
      | SkillCreateOrConnectWithoutUserInput[];
    upsert?:
      | SkillUpsertWithWhereUniqueWithoutUserInput
      | SkillUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: SkillCreateManyUserInputEnvelope;
    set?: SkillWhereUniqueInput | SkillWhereUniqueInput[];
    disconnect?: SkillWhereUniqueInput | SkillWhereUniqueInput[];
    delete?: SkillWhereUniqueInput | SkillWhereUniqueInput[];
    connect?: SkillWhereUniqueInput | SkillWhereUniqueInput[];
    update?:
      | SkillUpdateWithWhereUniqueWithoutUserInput
      | SkillUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | SkillUpdateManyWithWhereWithoutUserInput
      | SkillUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: SkillScalarWhereInput | SkillScalarWhereInput[];
  };

  export type DegreeUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<DegreeCreateWithoutUserInput, DegreeUncheckedCreateWithoutUserInput>
      | DegreeCreateWithoutUserInput[]
      | DegreeUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | DegreeCreateOrConnectWithoutUserInput
      | DegreeCreateOrConnectWithoutUserInput[];
    upsert?:
      | DegreeUpsertWithWhereUniqueWithoutUserInput
      | DegreeUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: DegreeCreateManyUserInputEnvelope;
    set?: DegreeWhereUniqueInput | DegreeWhereUniqueInput[];
    disconnect?: DegreeWhereUniqueInput | DegreeWhereUniqueInput[];
    delete?: DegreeWhereUniqueInput | DegreeWhereUniqueInput[];
    connect?: DegreeWhereUniqueInput | DegreeWhereUniqueInput[];
    update?:
      | DegreeUpdateWithWhereUniqueWithoutUserInput
      | DegreeUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | DegreeUpdateManyWithWhereWithoutUserInput
      | DegreeUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: DegreeScalarWhereInput | DegreeScalarWhereInput[];
  };

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          SessionCreateWithoutUserInput,
          SessionUncheckedCreateWithoutUserInput
        >
      | SessionCreateWithoutUserInput[]
      | SessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | SessionCreateOrConnectWithoutUserInput
      | SessionCreateOrConnectWithoutUserInput[];
    upsert?:
      | SessionUpsertWithWhereUniqueWithoutUserInput
      | SessionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: SessionCreateManyUserInputEnvelope;
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    update?:
      | SessionUpdateWithWhereUniqueWithoutUserInput
      | SessionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | SessionUpdateManyWithWhereWithoutUserInput
      | SessionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[];
  };

  export type UserCreateNestedManyWithoutNationalityInput = {
    create?:
      | XOR<
          UserCreateWithoutNationalityInput,
          UserUncheckedCreateWithoutNationalityInput
        >
      | UserCreateWithoutNationalityInput[]
      | UserUncheckedCreateWithoutNationalityInput[];
    connectOrCreate?:
      | UserCreateOrConnectWithoutNationalityInput
      | UserCreateOrConnectWithoutNationalityInput[];
    createMany?: UserCreateManyNationalityInputEnvelope;
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[];
  };

  export type UserUncheckedCreateNestedManyWithoutNationalityInput = {
    create?:
      | XOR<
          UserCreateWithoutNationalityInput,
          UserUncheckedCreateWithoutNationalityInput
        >
      | UserCreateWithoutNationalityInput[]
      | UserUncheckedCreateWithoutNationalityInput[];
    connectOrCreate?:
      | UserCreateOrConnectWithoutNationalityInput
      | UserCreateOrConnectWithoutNationalityInput[];
    createMany?: UserCreateManyNationalityInputEnvelope;
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[];
  };

  export type UserUpdateManyWithoutNationalityNestedInput = {
    create?:
      | XOR<
          UserCreateWithoutNationalityInput,
          UserUncheckedCreateWithoutNationalityInput
        >
      | UserCreateWithoutNationalityInput[]
      | UserUncheckedCreateWithoutNationalityInput[];
    connectOrCreate?:
      | UserCreateOrConnectWithoutNationalityInput
      | UserCreateOrConnectWithoutNationalityInput[];
    upsert?:
      | UserUpsertWithWhereUniqueWithoutNationalityInput
      | UserUpsertWithWhereUniqueWithoutNationalityInput[];
    createMany?: UserCreateManyNationalityInputEnvelope;
    set?: UserWhereUniqueInput | UserWhereUniqueInput[];
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[];
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[];
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[];
    update?:
      | UserUpdateWithWhereUniqueWithoutNationalityInput
      | UserUpdateWithWhereUniqueWithoutNationalityInput[];
    updateMany?:
      | UserUpdateManyWithWhereWithoutNationalityInput
      | UserUpdateManyWithWhereWithoutNationalityInput[];
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[];
  };

  export type UserUncheckedUpdateManyWithoutNationalityNestedInput = {
    create?:
      | XOR<
          UserCreateWithoutNationalityInput,
          UserUncheckedCreateWithoutNationalityInput
        >
      | UserCreateWithoutNationalityInput[]
      | UserUncheckedCreateWithoutNationalityInput[];
    connectOrCreate?:
      | UserCreateOrConnectWithoutNationalityInput
      | UserCreateOrConnectWithoutNationalityInput[];
    upsert?:
      | UserUpsertWithWhereUniqueWithoutNationalityInput
      | UserUpsertWithWhereUniqueWithoutNationalityInput[];
    createMany?: UserCreateManyNationalityInputEnvelope;
    set?: UserWhereUniqueInput | UserWhereUniqueInput[];
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[];
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[];
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[];
    update?:
      | UserUpdateWithWhereUniqueWithoutNationalityInput
      | UserUpdateWithWhereUniqueWithoutNationalityInput[];
    updateMany?:
      | UserUpdateManyWithWhereWithoutNationalityInput
      | UserUpdateManyWithWhereWithoutNationalityInput[];
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[];
  };

  export type UserCreateNestedOneWithoutExperiencesInput = {
    create?: XOR<
      UserCreateWithoutExperiencesInput,
      UserUncheckedCreateWithoutExperiencesInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutExperiencesInput;
    connect?: UserWhereUniqueInput;
  };

  export type UserUpdateOneRequiredWithoutExperiencesNestedInput = {
    create?: XOR<
      UserCreateWithoutExperiencesInput,
      UserUncheckedCreateWithoutExperiencesInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutExperiencesInput;
    upsert?: UserUpsertWithoutExperiencesInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutExperiencesInput,
        UserUpdateWithoutExperiencesInput
      >,
      UserUncheckedUpdateWithoutExperiencesInput
    >;
  };

  export type UserCreateNestedOneWithoutEducationsInput = {
    create?: XOR<
      UserCreateWithoutEducationsInput,
      UserUncheckedCreateWithoutEducationsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutEducationsInput;
    connect?: UserWhereUniqueInput;
  };

  export type UserUpdateOneRequiredWithoutEducationsNestedInput = {
    create?: XOR<
      UserCreateWithoutEducationsInput,
      UserUncheckedCreateWithoutEducationsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutEducationsInput;
    upsert?: UserUpsertWithoutEducationsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutEducationsInput,
        UserUpdateWithoutEducationsInput
      >,
      UserUncheckedUpdateWithoutEducationsInput
    >;
  };

  export type UserCreateNestedOneWithoutSkillsInput = {
    create?: XOR<
      UserCreateWithoutSkillsInput,
      UserUncheckedCreateWithoutSkillsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutSkillsInput;
    connect?: UserWhereUniqueInput;
  };

  export type UserUpdateOneRequiredWithoutSkillsNestedInput = {
    create?: XOR<
      UserCreateWithoutSkillsInput,
      UserUncheckedCreateWithoutSkillsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutSkillsInput;
    upsert?: UserUpsertWithoutSkillsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutSkillsInput,
        UserUpdateWithoutSkillsInput
      >,
      UserUncheckedUpdateWithoutSkillsInput
    >;
  };

  export type UserCreateNestedOneWithoutDegreesInput = {
    create?: XOR<
      UserCreateWithoutDegreesInput,
      UserUncheckedCreateWithoutDegreesInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutDegreesInput;
    connect?: UserWhereUniqueInput;
  };

  export type UserUpdateOneRequiredWithoutDegreesNestedInput = {
    create?: XOR<
      UserCreateWithoutDegreesInput,
      UserUncheckedCreateWithoutDegreesInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutDegreesInput;
    upsert?: UserUpsertWithoutDegreesInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutDegreesInput,
        UserUpdateWithoutDegreesInput
      >,
      UserUncheckedUpdateWithoutDegreesInput
    >;
  };

  export type UserCreateNestedOneWithoutSessionInput = {
    create?: XOR<
      UserCreateWithoutSessionInput,
      UserUncheckedCreateWithoutSessionInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutSessionInput;
    connect?: UserWhereUniqueInput;
  };

  export type UserUpdateOneRequiredWithoutSessionNestedInput = {
    create?: XOR<
      UserCreateWithoutSessionInput,
      UserUncheckedCreateWithoutSessionInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutSessionInput;
    upsert?: UserUpsertWithoutSessionInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutSessionInput,
        UserUpdateWithoutSessionInput
      >,
      UserUncheckedUpdateWithoutSessionInput
    >;
  };

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  };

  export type NestedEnumuserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.userRole | EnumuserRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.userRole[] | ListEnumuserRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.userRole[] | ListEnumuserRoleFieldRefInput<$PrismaModel>;
    not?: NestedEnumuserRoleFilter<$PrismaModel> | $Enums.userRole;
  };

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?:
      | NestedStringNullableWithAggregatesFilter<$PrismaModel>
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
      in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
      notIn?:
        | Date[]
        | string[]
        | ListDateTimeFieldRefInput<$PrismaModel>
        | null;
      lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      not?:
        | NestedDateTimeNullableWithAggregatesFilter<$PrismaModel>
        | Date
        | string
        | null;
      _count?: NestedIntNullableFilter<$PrismaModel>;
      _min?: NestedDateTimeNullableFilter<$PrismaModel>;
      _max?: NestedDateTimeNullableFilter<$PrismaModel>;
    };

  export type NestedEnumuserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.userRole | EnumuserRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.userRole[] | ListEnumuserRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.userRole[] | ListEnumuserRoleFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumuserRoleWithAggregatesFilter<$PrismaModel>
      | $Enums.userRole;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumuserRoleFilter<$PrismaModel>;
    _max?: NestedEnumuserRoleFilter<$PrismaModel>;
  };

  export type NationalityCreateWithoutUserInput = {
    id?: string;
    name: string;
    flag: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type NationalityUncheckedCreateWithoutUserInput = {
    id?: string;
    name: string;
    flag: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type NationalityCreateOrConnectWithoutUserInput = {
    where: NationalityWhereUniqueInput;
    create: XOR<
      NationalityCreateWithoutUserInput,
      NationalityUncheckedCreateWithoutUserInput
    >;
  };

  export type ExperienceCreateWithoutUserInput = {
    id?: string;
    title: string;
    company: string;
    startDate: Date | string;
    endDate: Date | string;
    current: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ExperienceUncheckedCreateWithoutUserInput = {
    id?: string;
    title: string;
    company: string;
    startDate: Date | string;
    endDate: Date | string;
    current: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ExperienceCreateOrConnectWithoutUserInput = {
    where: ExperienceWhereUniqueInput;
    create: XOR<
      ExperienceCreateWithoutUserInput,
      ExperienceUncheckedCreateWithoutUserInput
    >;
  };

  export type ExperienceCreateManyUserInputEnvelope = {
    data: ExperienceCreateManyUserInput | ExperienceCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type EducationCreateWithoutUserInput = {
    id?: string;
    title: string;
    school: string;
    startDate: Date | string;
    endDate: Date | string;
    current: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type EducationUncheckedCreateWithoutUserInput = {
    id?: string;
    title: string;
    school: string;
    startDate: Date | string;
    endDate: Date | string;
    current: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type EducationCreateOrConnectWithoutUserInput = {
    where: EducationWhereUniqueInput;
    create: XOR<
      EducationCreateWithoutUserInput,
      EducationUncheckedCreateWithoutUserInput
    >;
  };

  export type EducationCreateManyUserInputEnvelope = {
    data: EducationCreateManyUserInput | EducationCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type SkillCreateWithoutUserInput = {
    id?: string;
    title: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type SkillUncheckedCreateWithoutUserInput = {
    id?: string;
    title: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type SkillCreateOrConnectWithoutUserInput = {
    where: SkillWhereUniqueInput;
    create: XOR<
      SkillCreateWithoutUserInput,
      SkillUncheckedCreateWithoutUserInput
    >;
  };

  export type SkillCreateManyUserInputEnvelope = {
    data: SkillCreateManyUserInput | SkillCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type DegreeCreateWithoutUserInput = {
    id?: string;
    title: string;
    identify: string;
    dateDelivrance: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type DegreeUncheckedCreateWithoutUserInput = {
    id?: string;
    title: string;
    identify: string;
    dateDelivrance: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type DegreeCreateOrConnectWithoutUserInput = {
    where: DegreeWhereUniqueInput;
    create: XOR<
      DegreeCreateWithoutUserInput,
      DegreeUncheckedCreateWithoutUserInput
    >;
  };

  export type DegreeCreateManyUserInputEnvelope = {
    data: DegreeCreateManyUserInput | DegreeCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type SessionCreateWithoutUserInput = {
    id?: string;
    ipAddress: string;
    useAgent: string;
    token: string;
    lastActivityAt: Date | string;
    isOnline?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    expiresAt: Date | string;
  };

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string;
    ipAddress: string;
    useAgent: string;
    token: string;
    lastActivityAt: Date | string;
    isOnline?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    expiresAt: Date | string;
  };

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput;
    create: XOR<
      SessionCreateWithoutUserInput,
      SessionUncheckedCreateWithoutUserInput
    >;
  };

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type NationalityUpsertWithoutUserInput = {
    update: XOR<
      NationalityUpdateWithoutUserInput,
      NationalityUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      NationalityCreateWithoutUserInput,
      NationalityUncheckedCreateWithoutUserInput
    >;
    where?: NationalityWhereInput;
  };

  export type NationalityUpdateToOneWithWhereWithoutUserInput = {
    where?: NationalityWhereInput;
    data: XOR<
      NationalityUpdateWithoutUserInput,
      NationalityUncheckedUpdateWithoutUserInput
    >;
  };

  export type NationalityUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    flag?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type NationalityUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    flag?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ExperienceUpsertWithWhereUniqueWithoutUserInput = {
    where: ExperienceWhereUniqueInput;
    update: XOR<
      ExperienceUpdateWithoutUserInput,
      ExperienceUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      ExperienceCreateWithoutUserInput,
      ExperienceUncheckedCreateWithoutUserInput
    >;
  };

  export type ExperienceUpdateWithWhereUniqueWithoutUserInput = {
    where: ExperienceWhereUniqueInput;
    data: XOR<
      ExperienceUpdateWithoutUserInput,
      ExperienceUncheckedUpdateWithoutUserInput
    >;
  };

  export type ExperienceUpdateManyWithWhereWithoutUserInput = {
    where: ExperienceScalarWhereInput;
    data: XOR<
      ExperienceUpdateManyMutationInput,
      ExperienceUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type ExperienceScalarWhereInput = {
    AND?: ExperienceScalarWhereInput | ExperienceScalarWhereInput[];
    OR?: ExperienceScalarWhereInput[];
    NOT?: ExperienceScalarWhereInput | ExperienceScalarWhereInput[];
    id?: StringFilter<"Experience"> | string;
    title?: StringFilter<"Experience"> | string;
    company?: StringFilter<"Experience"> | string;
    startDate?: DateTimeFilter<"Experience"> | Date | string;
    endDate?: DateTimeFilter<"Experience"> | Date | string;
    current?: BoolFilter<"Experience"> | boolean;
    userId?: StringFilter<"Experience"> | string;
    createdAt?: DateTimeFilter<"Experience"> | Date | string;
    updatedAt?: DateTimeFilter<"Experience"> | Date | string;
  };

  export type EducationUpsertWithWhereUniqueWithoutUserInput = {
    where: EducationWhereUniqueInput;
    update: XOR<
      EducationUpdateWithoutUserInput,
      EducationUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      EducationCreateWithoutUserInput,
      EducationUncheckedCreateWithoutUserInput
    >;
  };

  export type EducationUpdateWithWhereUniqueWithoutUserInput = {
    where: EducationWhereUniqueInput;
    data: XOR<
      EducationUpdateWithoutUserInput,
      EducationUncheckedUpdateWithoutUserInput
    >;
  };

  export type EducationUpdateManyWithWhereWithoutUserInput = {
    where: EducationScalarWhereInput;
    data: XOR<
      EducationUpdateManyMutationInput,
      EducationUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type EducationScalarWhereInput = {
    AND?: EducationScalarWhereInput | EducationScalarWhereInput[];
    OR?: EducationScalarWhereInput[];
    NOT?: EducationScalarWhereInput | EducationScalarWhereInput[];
    id?: StringFilter<"Education"> | string;
    title?: StringFilter<"Education"> | string;
    school?: StringFilter<"Education"> | string;
    startDate?: DateTimeFilter<"Education"> | Date | string;
    endDate?: DateTimeFilter<"Education"> | Date | string;
    current?: BoolFilter<"Education"> | boolean;
    userId?: StringFilter<"Education"> | string;
    createdAt?: DateTimeFilter<"Education"> | Date | string;
    updatedAt?: DateTimeFilter<"Education"> | Date | string;
  };

  export type SkillUpsertWithWhereUniqueWithoutUserInput = {
    where: SkillWhereUniqueInput;
    update: XOR<
      SkillUpdateWithoutUserInput,
      SkillUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      SkillCreateWithoutUserInput,
      SkillUncheckedCreateWithoutUserInput
    >;
  };

  export type SkillUpdateWithWhereUniqueWithoutUserInput = {
    where: SkillWhereUniqueInput;
    data: XOR<
      SkillUpdateWithoutUserInput,
      SkillUncheckedUpdateWithoutUserInput
    >;
  };

  export type SkillUpdateManyWithWhereWithoutUserInput = {
    where: SkillScalarWhereInput;
    data: XOR<
      SkillUpdateManyMutationInput,
      SkillUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type SkillScalarWhereInput = {
    AND?: SkillScalarWhereInput | SkillScalarWhereInput[];
    OR?: SkillScalarWhereInput[];
    NOT?: SkillScalarWhereInput | SkillScalarWhereInput[];
    id?: StringFilter<"Skill"> | string;
    title?: StringFilter<"Skill"> | string;
    userId?: StringFilter<"Skill"> | string;
    createdAt?: DateTimeFilter<"Skill"> | Date | string;
    updatedAt?: DateTimeFilter<"Skill"> | Date | string;
  };

  export type DegreeUpsertWithWhereUniqueWithoutUserInput = {
    where: DegreeWhereUniqueInput;
    update: XOR<
      DegreeUpdateWithoutUserInput,
      DegreeUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      DegreeCreateWithoutUserInput,
      DegreeUncheckedCreateWithoutUserInput
    >;
  };

  export type DegreeUpdateWithWhereUniqueWithoutUserInput = {
    where: DegreeWhereUniqueInput;
    data: XOR<
      DegreeUpdateWithoutUserInput,
      DegreeUncheckedUpdateWithoutUserInput
    >;
  };

  export type DegreeUpdateManyWithWhereWithoutUserInput = {
    where: DegreeScalarWhereInput;
    data: XOR<
      DegreeUpdateManyMutationInput,
      DegreeUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type DegreeScalarWhereInput = {
    AND?: DegreeScalarWhereInput | DegreeScalarWhereInput[];
    OR?: DegreeScalarWhereInput[];
    NOT?: DegreeScalarWhereInput | DegreeScalarWhereInput[];
    id?: StringFilter<"Degree"> | string;
    title?: StringFilter<"Degree"> | string;
    identify?: StringFilter<"Degree"> | string;
    dateDelivrance?: DateTimeFilter<"Degree"> | Date | string;
    userId?: StringFilter<"Degree"> | string;
    createdAt?: DateTimeFilter<"Degree"> | Date | string;
    updatedAt?: DateTimeFilter<"Degree"> | Date | string;
  };

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput;
    update: XOR<
      SessionUpdateWithoutUserInput,
      SessionUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      SessionCreateWithoutUserInput,
      SessionUncheckedCreateWithoutUserInput
    >;
  };

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput;
    data: XOR<
      SessionUpdateWithoutUserInput,
      SessionUncheckedUpdateWithoutUserInput
    >;
  };

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput;
    data: XOR<
      SessionUpdateManyMutationInput,
      SessionUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[];
    OR?: SessionScalarWhereInput[];
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[];
    id?: StringFilter<"Session"> | string;
    userId?: StringFilter<"Session"> | string;
    ipAddress?: StringFilter<"Session"> | string;
    useAgent?: StringFilter<"Session"> | string;
    token?: StringFilter<"Session"> | string;
    lastActivityAt?: DateTimeFilter<"Session"> | Date | string;
    isOnline?: BoolFilter<"Session"> | boolean;
    createdAt?: DateTimeFilter<"Session"> | Date | string;
    updatedAt?: DateTimeFilter<"Session"> | Date | string;
    expiresAt?: DateTimeFilter<"Session"> | Date | string;
  };

  export type UserCreateWithoutNationalityInput = {
    id?: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    avatarPicture?: string | null;
    description?: string | null;
    dateBirth: Date | string;
    title?: string | null;
    titleProfession?: string | null;
    linkWebsite?: string | null;
    isVerify?: boolean;
    emailVerificationToken?: string | null;
    emailVerificationTokenExpiresAt?: Date | string | null;
    resetPasswordToken?: string | null;
    resetPasswordTokenExpiresAt?: Date | string | null;
    onboarding?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.userRole;
    experiences?: ExperienceCreateNestedManyWithoutUserInput;
    educations?: EducationCreateNestedManyWithoutUserInput;
    skills?: SkillCreateNestedManyWithoutUserInput;
    degrees?: DegreeCreateNestedManyWithoutUserInput;
    session?: SessionCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutNationalityInput = {
    id?: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    avatarPicture?: string | null;
    description?: string | null;
    dateBirth: Date | string;
    title?: string | null;
    titleProfession?: string | null;
    linkWebsite?: string | null;
    isVerify?: boolean;
    emailVerificationToken?: string | null;
    emailVerificationTokenExpiresAt?: Date | string | null;
    resetPasswordToken?: string | null;
    resetPasswordTokenExpiresAt?: Date | string | null;
    onboarding?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.userRole;
    experiences?: ExperienceUncheckedCreateNestedManyWithoutUserInput;
    educations?: EducationUncheckedCreateNestedManyWithoutUserInput;
    skills?: SkillUncheckedCreateNestedManyWithoutUserInput;
    degrees?: DegreeUncheckedCreateNestedManyWithoutUserInput;
    session?: SessionUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutNationalityInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutNationalityInput,
      UserUncheckedCreateWithoutNationalityInput
    >;
  };

  export type UserCreateManyNationalityInputEnvelope = {
    data: UserCreateManyNationalityInput | UserCreateManyNationalityInput[];
    skipDuplicates?: boolean;
  };

  export type UserUpsertWithWhereUniqueWithoutNationalityInput = {
    where: UserWhereUniqueInput;
    update: XOR<
      UserUpdateWithoutNationalityInput,
      UserUncheckedUpdateWithoutNationalityInput
    >;
    create: XOR<
      UserCreateWithoutNationalityInput,
      UserUncheckedCreateWithoutNationalityInput
    >;
  };

  export type UserUpdateWithWhereUniqueWithoutNationalityInput = {
    where: UserWhereUniqueInput;
    data: XOR<
      UserUpdateWithoutNationalityInput,
      UserUncheckedUpdateWithoutNationalityInput
    >;
  };

  export type UserUpdateManyWithWhereWithoutNationalityInput = {
    where: UserScalarWhereInput;
    data: XOR<
      UserUpdateManyMutationInput,
      UserUncheckedUpdateManyWithoutNationalityInput
    >;
  };

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[];
    OR?: UserScalarWhereInput[];
    NOT?: UserScalarWhereInput | UserScalarWhereInput[];
    id?: StringFilter<"User"> | string;
    firstName?: StringFilter<"User"> | string;
    lastName?: StringFilter<"User"> | string;
    username?: StringFilter<"User"> | string;
    email?: StringFilter<"User"> | string;
    password?: StringFilter<"User"> | string;
    avatarPicture?: StringNullableFilter<"User"> | string | null;
    description?: StringNullableFilter<"User"> | string | null;
    dateBirth?: DateTimeFilter<"User"> | Date | string;
    title?: StringNullableFilter<"User"> | string | null;
    titleProfession?: StringNullableFilter<"User"> | string | null;
    linkWebsite?: StringNullableFilter<"User"> | string | null;
    isVerify?: BoolFilter<"User"> | boolean;
    emailVerificationToken?: StringNullableFilter<"User"> | string | null;
    emailVerificationTokenExpiresAt?:
      | DateTimeNullableFilter<"User">
      | Date
      | string
      | null;
    resetPasswordToken?: StringNullableFilter<"User"> | string | null;
    resetPasswordTokenExpiresAt?:
      | DateTimeNullableFilter<"User">
      | Date
      | string
      | null;
    onboarding?: BoolFilter<"User"> | boolean;
    createdAt?: DateTimeFilter<"User"> | Date | string;
    updatedAt?: DateTimeFilter<"User"> | Date | string;
    role?: EnumuserRoleFilter<"User"> | $Enums.userRole;
    nationalityId?: StringNullableFilter<"User"> | string | null;
  };

  export type UserCreateWithoutExperiencesInput = {
    id?: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    avatarPicture?: string | null;
    description?: string | null;
    dateBirth: Date | string;
    title?: string | null;
    titleProfession?: string | null;
    linkWebsite?: string | null;
    isVerify?: boolean;
    emailVerificationToken?: string | null;
    emailVerificationTokenExpiresAt?: Date | string | null;
    resetPasswordToken?: string | null;
    resetPasswordTokenExpiresAt?: Date | string | null;
    onboarding?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.userRole;
    nationality?: NationalityCreateNestedOneWithoutUserInput;
    educations?: EducationCreateNestedManyWithoutUserInput;
    skills?: SkillCreateNestedManyWithoutUserInput;
    degrees?: DegreeCreateNestedManyWithoutUserInput;
    session?: SessionCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutExperiencesInput = {
    id?: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    avatarPicture?: string | null;
    description?: string | null;
    dateBirth: Date | string;
    title?: string | null;
    titleProfession?: string | null;
    linkWebsite?: string | null;
    isVerify?: boolean;
    emailVerificationToken?: string | null;
    emailVerificationTokenExpiresAt?: Date | string | null;
    resetPasswordToken?: string | null;
    resetPasswordTokenExpiresAt?: Date | string | null;
    onboarding?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.userRole;
    nationalityId?: string | null;
    educations?: EducationUncheckedCreateNestedManyWithoutUserInput;
    skills?: SkillUncheckedCreateNestedManyWithoutUserInput;
    degrees?: DegreeUncheckedCreateNestedManyWithoutUserInput;
    session?: SessionUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutExperiencesInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutExperiencesInput,
      UserUncheckedCreateWithoutExperiencesInput
    >;
  };

  export type UserUpsertWithoutExperiencesInput = {
    update: XOR<
      UserUpdateWithoutExperiencesInput,
      UserUncheckedUpdateWithoutExperiencesInput
    >;
    create: XOR<
      UserCreateWithoutExperiencesInput,
      UserUncheckedCreateWithoutExperiencesInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutExperiencesInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutExperiencesInput,
      UserUncheckedUpdateWithoutExperiencesInput
    >;
  };

  export type UserUpdateWithoutExperiencesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    username?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    avatarPicture?: NullableStringFieldUpdateOperationsInput | string | null;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    dateBirth?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: NullableStringFieldUpdateOperationsInput | string | null;
    titleProfession?: NullableStringFieldUpdateOperationsInput | string | null;
    linkWebsite?: NullableStringFieldUpdateOperationsInput | string | null;
    isVerify?: BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    emailVerificationTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    resetPasswordToken?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    resetPasswordTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    onboarding?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    role?: EnumuserRoleFieldUpdateOperationsInput | $Enums.userRole;
    nationality?: NationalityUpdateOneWithoutUserNestedInput;
    educations?: EducationUpdateManyWithoutUserNestedInput;
    skills?: SkillUpdateManyWithoutUserNestedInput;
    degrees?: DegreeUpdateManyWithoutUserNestedInput;
    session?: SessionUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutExperiencesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    username?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    avatarPicture?: NullableStringFieldUpdateOperationsInput | string | null;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    dateBirth?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: NullableStringFieldUpdateOperationsInput | string | null;
    titleProfession?: NullableStringFieldUpdateOperationsInput | string | null;
    linkWebsite?: NullableStringFieldUpdateOperationsInput | string | null;
    isVerify?: BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    emailVerificationTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    resetPasswordToken?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    resetPasswordTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    onboarding?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    role?: EnumuserRoleFieldUpdateOperationsInput | $Enums.userRole;
    nationalityId?: NullableStringFieldUpdateOperationsInput | string | null;
    educations?: EducationUncheckedUpdateManyWithoutUserNestedInput;
    skills?: SkillUncheckedUpdateManyWithoutUserNestedInput;
    degrees?: DegreeUncheckedUpdateManyWithoutUserNestedInput;
    session?: SessionUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type UserCreateWithoutEducationsInput = {
    id?: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    avatarPicture?: string | null;
    description?: string | null;
    dateBirth: Date | string;
    title?: string | null;
    titleProfession?: string | null;
    linkWebsite?: string | null;
    isVerify?: boolean;
    emailVerificationToken?: string | null;
    emailVerificationTokenExpiresAt?: Date | string | null;
    resetPasswordToken?: string | null;
    resetPasswordTokenExpiresAt?: Date | string | null;
    onboarding?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.userRole;
    nationality?: NationalityCreateNestedOneWithoutUserInput;
    experiences?: ExperienceCreateNestedManyWithoutUserInput;
    skills?: SkillCreateNestedManyWithoutUserInput;
    degrees?: DegreeCreateNestedManyWithoutUserInput;
    session?: SessionCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutEducationsInput = {
    id?: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    avatarPicture?: string | null;
    description?: string | null;
    dateBirth: Date | string;
    title?: string | null;
    titleProfession?: string | null;
    linkWebsite?: string | null;
    isVerify?: boolean;
    emailVerificationToken?: string | null;
    emailVerificationTokenExpiresAt?: Date | string | null;
    resetPasswordToken?: string | null;
    resetPasswordTokenExpiresAt?: Date | string | null;
    onboarding?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.userRole;
    nationalityId?: string | null;
    experiences?: ExperienceUncheckedCreateNestedManyWithoutUserInput;
    skills?: SkillUncheckedCreateNestedManyWithoutUserInput;
    degrees?: DegreeUncheckedCreateNestedManyWithoutUserInput;
    session?: SessionUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutEducationsInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutEducationsInput,
      UserUncheckedCreateWithoutEducationsInput
    >;
  };

  export type UserUpsertWithoutEducationsInput = {
    update: XOR<
      UserUpdateWithoutEducationsInput,
      UserUncheckedUpdateWithoutEducationsInput
    >;
    create: XOR<
      UserCreateWithoutEducationsInput,
      UserUncheckedCreateWithoutEducationsInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutEducationsInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutEducationsInput,
      UserUncheckedUpdateWithoutEducationsInput
    >;
  };

  export type UserUpdateWithoutEducationsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    username?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    avatarPicture?: NullableStringFieldUpdateOperationsInput | string | null;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    dateBirth?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: NullableStringFieldUpdateOperationsInput | string | null;
    titleProfession?: NullableStringFieldUpdateOperationsInput | string | null;
    linkWebsite?: NullableStringFieldUpdateOperationsInput | string | null;
    isVerify?: BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    emailVerificationTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    resetPasswordToken?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    resetPasswordTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    onboarding?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    role?: EnumuserRoleFieldUpdateOperationsInput | $Enums.userRole;
    nationality?: NationalityUpdateOneWithoutUserNestedInput;
    experiences?: ExperienceUpdateManyWithoutUserNestedInput;
    skills?: SkillUpdateManyWithoutUserNestedInput;
    degrees?: DegreeUpdateManyWithoutUserNestedInput;
    session?: SessionUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutEducationsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    username?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    avatarPicture?: NullableStringFieldUpdateOperationsInput | string | null;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    dateBirth?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: NullableStringFieldUpdateOperationsInput | string | null;
    titleProfession?: NullableStringFieldUpdateOperationsInput | string | null;
    linkWebsite?: NullableStringFieldUpdateOperationsInput | string | null;
    isVerify?: BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    emailVerificationTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    resetPasswordToken?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    resetPasswordTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    onboarding?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    role?: EnumuserRoleFieldUpdateOperationsInput | $Enums.userRole;
    nationalityId?: NullableStringFieldUpdateOperationsInput | string | null;
    experiences?: ExperienceUncheckedUpdateManyWithoutUserNestedInput;
    skills?: SkillUncheckedUpdateManyWithoutUserNestedInput;
    degrees?: DegreeUncheckedUpdateManyWithoutUserNestedInput;
    session?: SessionUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type UserCreateWithoutSkillsInput = {
    id?: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    avatarPicture?: string | null;
    description?: string | null;
    dateBirth: Date | string;
    title?: string | null;
    titleProfession?: string | null;
    linkWebsite?: string | null;
    isVerify?: boolean;
    emailVerificationToken?: string | null;
    emailVerificationTokenExpiresAt?: Date | string | null;
    resetPasswordToken?: string | null;
    resetPasswordTokenExpiresAt?: Date | string | null;
    onboarding?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.userRole;
    nationality?: NationalityCreateNestedOneWithoutUserInput;
    experiences?: ExperienceCreateNestedManyWithoutUserInput;
    educations?: EducationCreateNestedManyWithoutUserInput;
    degrees?: DegreeCreateNestedManyWithoutUserInput;
    session?: SessionCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutSkillsInput = {
    id?: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    avatarPicture?: string | null;
    description?: string | null;
    dateBirth: Date | string;
    title?: string | null;
    titleProfession?: string | null;
    linkWebsite?: string | null;
    isVerify?: boolean;
    emailVerificationToken?: string | null;
    emailVerificationTokenExpiresAt?: Date | string | null;
    resetPasswordToken?: string | null;
    resetPasswordTokenExpiresAt?: Date | string | null;
    onboarding?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.userRole;
    nationalityId?: string | null;
    experiences?: ExperienceUncheckedCreateNestedManyWithoutUserInput;
    educations?: EducationUncheckedCreateNestedManyWithoutUserInput;
    degrees?: DegreeUncheckedCreateNestedManyWithoutUserInput;
    session?: SessionUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutSkillsInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutSkillsInput,
      UserUncheckedCreateWithoutSkillsInput
    >;
  };

  export type UserUpsertWithoutSkillsInput = {
    update: XOR<
      UserUpdateWithoutSkillsInput,
      UserUncheckedUpdateWithoutSkillsInput
    >;
    create: XOR<
      UserCreateWithoutSkillsInput,
      UserUncheckedCreateWithoutSkillsInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutSkillsInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutSkillsInput,
      UserUncheckedUpdateWithoutSkillsInput
    >;
  };

  export type UserUpdateWithoutSkillsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    username?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    avatarPicture?: NullableStringFieldUpdateOperationsInput | string | null;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    dateBirth?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: NullableStringFieldUpdateOperationsInput | string | null;
    titleProfession?: NullableStringFieldUpdateOperationsInput | string | null;
    linkWebsite?: NullableStringFieldUpdateOperationsInput | string | null;
    isVerify?: BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    emailVerificationTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    resetPasswordToken?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    resetPasswordTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    onboarding?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    role?: EnumuserRoleFieldUpdateOperationsInput | $Enums.userRole;
    nationality?: NationalityUpdateOneWithoutUserNestedInput;
    experiences?: ExperienceUpdateManyWithoutUserNestedInput;
    educations?: EducationUpdateManyWithoutUserNestedInput;
    degrees?: DegreeUpdateManyWithoutUserNestedInput;
    session?: SessionUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutSkillsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    username?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    avatarPicture?: NullableStringFieldUpdateOperationsInput | string | null;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    dateBirth?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: NullableStringFieldUpdateOperationsInput | string | null;
    titleProfession?: NullableStringFieldUpdateOperationsInput | string | null;
    linkWebsite?: NullableStringFieldUpdateOperationsInput | string | null;
    isVerify?: BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    emailVerificationTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    resetPasswordToken?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    resetPasswordTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    onboarding?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    role?: EnumuserRoleFieldUpdateOperationsInput | $Enums.userRole;
    nationalityId?: NullableStringFieldUpdateOperationsInput | string | null;
    experiences?: ExperienceUncheckedUpdateManyWithoutUserNestedInput;
    educations?: EducationUncheckedUpdateManyWithoutUserNestedInput;
    degrees?: DegreeUncheckedUpdateManyWithoutUserNestedInput;
    session?: SessionUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type UserCreateWithoutDegreesInput = {
    id?: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    avatarPicture?: string | null;
    description?: string | null;
    dateBirth: Date | string;
    title?: string | null;
    titleProfession?: string | null;
    linkWebsite?: string | null;
    isVerify?: boolean;
    emailVerificationToken?: string | null;
    emailVerificationTokenExpiresAt?: Date | string | null;
    resetPasswordToken?: string | null;
    resetPasswordTokenExpiresAt?: Date | string | null;
    onboarding?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.userRole;
    nationality?: NationalityCreateNestedOneWithoutUserInput;
    experiences?: ExperienceCreateNestedManyWithoutUserInput;
    educations?: EducationCreateNestedManyWithoutUserInput;
    skills?: SkillCreateNestedManyWithoutUserInput;
    session?: SessionCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutDegreesInput = {
    id?: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    avatarPicture?: string | null;
    description?: string | null;
    dateBirth: Date | string;
    title?: string | null;
    titleProfession?: string | null;
    linkWebsite?: string | null;
    isVerify?: boolean;
    emailVerificationToken?: string | null;
    emailVerificationTokenExpiresAt?: Date | string | null;
    resetPasswordToken?: string | null;
    resetPasswordTokenExpiresAt?: Date | string | null;
    onboarding?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.userRole;
    nationalityId?: string | null;
    experiences?: ExperienceUncheckedCreateNestedManyWithoutUserInput;
    educations?: EducationUncheckedCreateNestedManyWithoutUserInput;
    skills?: SkillUncheckedCreateNestedManyWithoutUserInput;
    session?: SessionUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutDegreesInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutDegreesInput,
      UserUncheckedCreateWithoutDegreesInput
    >;
  };

  export type UserUpsertWithoutDegreesInput = {
    update: XOR<
      UserUpdateWithoutDegreesInput,
      UserUncheckedUpdateWithoutDegreesInput
    >;
    create: XOR<
      UserCreateWithoutDegreesInput,
      UserUncheckedCreateWithoutDegreesInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutDegreesInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutDegreesInput,
      UserUncheckedUpdateWithoutDegreesInput
    >;
  };

  export type UserUpdateWithoutDegreesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    username?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    avatarPicture?: NullableStringFieldUpdateOperationsInput | string | null;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    dateBirth?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: NullableStringFieldUpdateOperationsInput | string | null;
    titleProfession?: NullableStringFieldUpdateOperationsInput | string | null;
    linkWebsite?: NullableStringFieldUpdateOperationsInput | string | null;
    isVerify?: BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    emailVerificationTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    resetPasswordToken?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    resetPasswordTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    onboarding?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    role?: EnumuserRoleFieldUpdateOperationsInput | $Enums.userRole;
    nationality?: NationalityUpdateOneWithoutUserNestedInput;
    experiences?: ExperienceUpdateManyWithoutUserNestedInput;
    educations?: EducationUpdateManyWithoutUserNestedInput;
    skills?: SkillUpdateManyWithoutUserNestedInput;
    session?: SessionUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutDegreesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    username?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    avatarPicture?: NullableStringFieldUpdateOperationsInput | string | null;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    dateBirth?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: NullableStringFieldUpdateOperationsInput | string | null;
    titleProfession?: NullableStringFieldUpdateOperationsInput | string | null;
    linkWebsite?: NullableStringFieldUpdateOperationsInput | string | null;
    isVerify?: BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    emailVerificationTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    resetPasswordToken?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    resetPasswordTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    onboarding?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    role?: EnumuserRoleFieldUpdateOperationsInput | $Enums.userRole;
    nationalityId?: NullableStringFieldUpdateOperationsInput | string | null;
    experiences?: ExperienceUncheckedUpdateManyWithoutUserNestedInput;
    educations?: EducationUncheckedUpdateManyWithoutUserNestedInput;
    skills?: SkillUncheckedUpdateManyWithoutUserNestedInput;
    session?: SessionUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type UserCreateWithoutSessionInput = {
    id?: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    avatarPicture?: string | null;
    description?: string | null;
    dateBirth: Date | string;
    title?: string | null;
    titleProfession?: string | null;
    linkWebsite?: string | null;
    isVerify?: boolean;
    emailVerificationToken?: string | null;
    emailVerificationTokenExpiresAt?: Date | string | null;
    resetPasswordToken?: string | null;
    resetPasswordTokenExpiresAt?: Date | string | null;
    onboarding?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.userRole;
    nationality?: NationalityCreateNestedOneWithoutUserInput;
    experiences?: ExperienceCreateNestedManyWithoutUserInput;
    educations?: EducationCreateNestedManyWithoutUserInput;
    skills?: SkillCreateNestedManyWithoutUserInput;
    degrees?: DegreeCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutSessionInput = {
    id?: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    avatarPicture?: string | null;
    description?: string | null;
    dateBirth: Date | string;
    title?: string | null;
    titleProfession?: string | null;
    linkWebsite?: string | null;
    isVerify?: boolean;
    emailVerificationToken?: string | null;
    emailVerificationTokenExpiresAt?: Date | string | null;
    resetPasswordToken?: string | null;
    resetPasswordTokenExpiresAt?: Date | string | null;
    onboarding?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.userRole;
    nationalityId?: string | null;
    experiences?: ExperienceUncheckedCreateNestedManyWithoutUserInput;
    educations?: EducationUncheckedCreateNestedManyWithoutUserInput;
    skills?: SkillUncheckedCreateNestedManyWithoutUserInput;
    degrees?: DegreeUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutSessionInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutSessionInput,
      UserUncheckedCreateWithoutSessionInput
    >;
  };

  export type UserUpsertWithoutSessionInput = {
    update: XOR<
      UserUpdateWithoutSessionInput,
      UserUncheckedUpdateWithoutSessionInput
    >;
    create: XOR<
      UserCreateWithoutSessionInput,
      UserUncheckedCreateWithoutSessionInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutSessionInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutSessionInput,
      UserUncheckedUpdateWithoutSessionInput
    >;
  };

  export type UserUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    username?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    avatarPicture?: NullableStringFieldUpdateOperationsInput | string | null;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    dateBirth?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: NullableStringFieldUpdateOperationsInput | string | null;
    titleProfession?: NullableStringFieldUpdateOperationsInput | string | null;
    linkWebsite?: NullableStringFieldUpdateOperationsInput | string | null;
    isVerify?: BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    emailVerificationTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    resetPasswordToken?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    resetPasswordTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    onboarding?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    role?: EnumuserRoleFieldUpdateOperationsInput | $Enums.userRole;
    nationality?: NationalityUpdateOneWithoutUserNestedInput;
    experiences?: ExperienceUpdateManyWithoutUserNestedInput;
    educations?: EducationUpdateManyWithoutUserNestedInput;
    skills?: SkillUpdateManyWithoutUserNestedInput;
    degrees?: DegreeUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    username?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    avatarPicture?: NullableStringFieldUpdateOperationsInput | string | null;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    dateBirth?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: NullableStringFieldUpdateOperationsInput | string | null;
    titleProfession?: NullableStringFieldUpdateOperationsInput | string | null;
    linkWebsite?: NullableStringFieldUpdateOperationsInput | string | null;
    isVerify?: BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    emailVerificationTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    resetPasswordToken?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    resetPasswordTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    onboarding?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    role?: EnumuserRoleFieldUpdateOperationsInput | $Enums.userRole;
    nationalityId?: NullableStringFieldUpdateOperationsInput | string | null;
    experiences?: ExperienceUncheckedUpdateManyWithoutUserNestedInput;
    educations?: EducationUncheckedUpdateManyWithoutUserNestedInput;
    skills?: SkillUncheckedUpdateManyWithoutUserNestedInput;
    degrees?: DegreeUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type ExperienceCreateManyUserInput = {
    id?: string;
    title: string;
    company: string;
    startDate: Date | string;
    endDate: Date | string;
    current: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type EducationCreateManyUserInput = {
    id?: string;
    title: string;
    school: string;
    startDate: Date | string;
    endDate: Date | string;
    current: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type SkillCreateManyUserInput = {
    id?: string;
    title: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type DegreeCreateManyUserInput = {
    id?: string;
    title: string;
    identify: string;
    dateDelivrance: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type SessionCreateManyUserInput = {
    id?: string;
    ipAddress: string;
    useAgent: string;
    token: string;
    lastActivityAt: Date | string;
    isOnline?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    expiresAt: Date | string;
  };

  export type ExperienceUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    company?: StringFieldUpdateOperationsInput | string;
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    current?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ExperienceUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    company?: StringFieldUpdateOperationsInput | string;
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    current?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ExperienceUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    company?: StringFieldUpdateOperationsInput | string;
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    current?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type EducationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    school?: StringFieldUpdateOperationsInput | string;
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    current?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type EducationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    school?: StringFieldUpdateOperationsInput | string;
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    current?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type EducationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    school?: StringFieldUpdateOperationsInput | string;
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    current?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SkillUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SkillUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SkillUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type DegreeUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    identify?: StringFieldUpdateOperationsInput | string;
    dateDelivrance?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type DegreeUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    identify?: StringFieldUpdateOperationsInput | string;
    dateDelivrance?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type DegreeUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    identify?: StringFieldUpdateOperationsInput | string;
    dateDelivrance?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    ipAddress?: StringFieldUpdateOperationsInput | string;
    useAgent?: StringFieldUpdateOperationsInput | string;
    token?: StringFieldUpdateOperationsInput | string;
    lastActivityAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    isOnline?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    ipAddress?: StringFieldUpdateOperationsInput | string;
    useAgent?: StringFieldUpdateOperationsInput | string;
    token?: StringFieldUpdateOperationsInput | string;
    lastActivityAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    isOnline?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    ipAddress?: StringFieldUpdateOperationsInput | string;
    useAgent?: StringFieldUpdateOperationsInput | string;
    token?: StringFieldUpdateOperationsInput | string;
    lastActivityAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    isOnline?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserCreateManyNationalityInput = {
    id?: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    avatarPicture?: string | null;
    description?: string | null;
    dateBirth: Date | string;
    title?: string | null;
    titleProfession?: string | null;
    linkWebsite?: string | null;
    isVerify?: boolean;
    emailVerificationToken?: string | null;
    emailVerificationTokenExpiresAt?: Date | string | null;
    resetPasswordToken?: string | null;
    resetPasswordTokenExpiresAt?: Date | string | null;
    onboarding?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: $Enums.userRole;
  };

  export type UserUpdateWithoutNationalityInput = {
    id?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    username?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    avatarPicture?: NullableStringFieldUpdateOperationsInput | string | null;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    dateBirth?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: NullableStringFieldUpdateOperationsInput | string | null;
    titleProfession?: NullableStringFieldUpdateOperationsInput | string | null;
    linkWebsite?: NullableStringFieldUpdateOperationsInput | string | null;
    isVerify?: BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    emailVerificationTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    resetPasswordToken?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    resetPasswordTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    onboarding?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    role?: EnumuserRoleFieldUpdateOperationsInput | $Enums.userRole;
    experiences?: ExperienceUpdateManyWithoutUserNestedInput;
    educations?: EducationUpdateManyWithoutUserNestedInput;
    skills?: SkillUpdateManyWithoutUserNestedInput;
    degrees?: DegreeUpdateManyWithoutUserNestedInput;
    session?: SessionUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutNationalityInput = {
    id?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    username?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    avatarPicture?: NullableStringFieldUpdateOperationsInput | string | null;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    dateBirth?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: NullableStringFieldUpdateOperationsInput | string | null;
    titleProfession?: NullableStringFieldUpdateOperationsInput | string | null;
    linkWebsite?: NullableStringFieldUpdateOperationsInput | string | null;
    isVerify?: BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    emailVerificationTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    resetPasswordToken?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    resetPasswordTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    onboarding?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    role?: EnumuserRoleFieldUpdateOperationsInput | $Enums.userRole;
    experiences?: ExperienceUncheckedUpdateManyWithoutUserNestedInput;
    educations?: EducationUncheckedUpdateManyWithoutUserNestedInput;
    skills?: SkillUncheckedUpdateManyWithoutUserNestedInput;
    degrees?: DegreeUncheckedUpdateManyWithoutUserNestedInput;
    session?: SessionUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateManyWithoutNationalityInput = {
    id?: StringFieldUpdateOperationsInput | string;
    firstName?: StringFieldUpdateOperationsInput | string;
    lastName?: StringFieldUpdateOperationsInput | string;
    username?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    avatarPicture?: NullableStringFieldUpdateOperationsInput | string | null;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    dateBirth?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: NullableStringFieldUpdateOperationsInput | string | null;
    titleProfession?: NullableStringFieldUpdateOperationsInput | string | null;
    linkWebsite?: NullableStringFieldUpdateOperationsInput | string | null;
    isVerify?: BoolFieldUpdateOperationsInput | boolean;
    emailVerificationToken?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    emailVerificationTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    resetPasswordToken?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    resetPasswordTokenExpiresAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    onboarding?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    role?: EnumuserRoleFieldUpdateOperationsInput | $Enums.userRole;
  };

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number;
  };

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF;
}
