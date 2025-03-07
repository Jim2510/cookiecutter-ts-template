export function isDefined<T = unknown>(value: T): value is NonNullable<T> {
    return value !== undefined && value !== null && !Number.isNaN(value);
}
