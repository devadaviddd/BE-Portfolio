import mongoose from "mongoose";
import { DatabaseMapper } from "../utils";
import { InternalServerException } from "../exceptions";

export interface MongoDBConfig {
  database: string,
  collection: string,
  url: string
}

export class MongoDBRepository<DomainModel, DataModel> {
  private readonly mongoURI: string | undefined;
  constructor(
    protected readonly config: MongoDBConfig,
    protected readonly mapper: DatabaseMapper<DomainModel, DataModel>
  ) {
    this.mongoURI = process.env.MONGO_DATABASE;
  }


  async connectDB() {
    if (!this.mongoURI) {
      throw new InternalServerException('Invalid URL to database')
    }
    await mongoose.connect(this.mongoURI);
  }
}
