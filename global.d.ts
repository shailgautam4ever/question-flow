import { MongoClient, MongoClientOptions } from 'mongodb'

declare global {
  namespace globalThis {
    var _mongoClientPromise: Promise<MongoClient>
  }
}
