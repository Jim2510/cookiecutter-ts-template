import {Db, MongoClient} from "mongodb";

export class DbCtx {
    constructor(
        private readonly uri: string,
        private readonly dbName: string,
        private readonly db: Db,
        private readonly client: MongoClient,
    ) {}

    public static async connect(uri: string, dbName: string): Promise<DbCtx> {
        const client = await MongoClient.connect(uri);
        const db = client.db(dbName);
        return new DbCtx(uri, dbName, db, client);
    }

    public async disconnect(): Promise<void> {
        await this.client.close();
    }

    public async dropDatabaseForTest(): Promise<void> {
        if (!this.uri.includes("localhost") && !this.uri.includes("127.0.0.1"))
            throw new Error("This method is only for localhost");
        if (!this.dbName.includes("-test-"))
            throw new Error("This method is only for test databases");
        await this.db.dropDatabase();
    }

    public getDb(): Db {
        return this.db;
    }

    getUri(): string {
        return this.uri;
    }

    getDbName(): string {
        return this.dbName;
    }

    public async ping(): Promise<void> {
        await this.db.stats();
    }
}
