import mongoose from "mongoose"

type MongooseGlobal = typeof globalThis & {
  mongooseConn?: {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
  }
}

const globalForMongoose = globalThis as MongooseGlobal

if (!globalForMongoose.mongooseConn) {
  globalForMongoose.mongooseConn = { conn: null, promise: null }
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  const cached = globalForMongoose.mongooseConn!

  if (cached.conn) return cached.conn

  if (!cached.promise) {
    const uri = process.env.MONGODB_URI
    if (!uri) {
      throw new Error("MONGODB_URI is not set")
    }
    cached.promise = mongoose.connect(uri, {
      autoIndex: true,
      maxPoolSize: 10,
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}


