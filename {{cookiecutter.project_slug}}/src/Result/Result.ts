export class Result<T> {
    private constructor(
        public readonly isOk: boolean,
        private readonly errors: Error[],
        private readonly data: T | null = null
    ) {}
    public static success<T>(data: T): Result<T> {
        return new Result<T>(true, [], data)
    }

    public static fail<T>(errors: Error[]): Result<T> {
        return new Result<T>(false, errors)
    }

    public static failFromResult<T>(result: Result<unknown>): Result<T> {
        return new Result(false, result.getErrors())
    }

    public getErrorsAsString(): string {
        if(this.isOk) throw new Error("Cannot get errors from successfull result")
        return this.errors.map((e) => e.message).join(" / ")
    }

    public getDataOrThrow(): T {
        if(!this.isOk) throw new Error(this.getErrorsAsString())
        return this.data as T
    }

    public getErrors(): Error[] {
        if(!this.isOk) throw new Error("Cannot get errors from successfull result")
        return this.errors
    }
}