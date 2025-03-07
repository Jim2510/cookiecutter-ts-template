export type MongoDbRecordDTO<T> = T & {
    createdAt: Date;
    updatedAt?: Date;
};
