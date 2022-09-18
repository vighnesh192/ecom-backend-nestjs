import { Document, FilterQuery, Model, UpdateQuery } from "mongoose";

export abstract class EntityRepository<T extends Document> {
    constructor(protected readonly entityModel: Model<T>) { }

    async findOne(
        entityFilterQuery: FilterQuery<T>,
        projection?: Record<string, unknown>
    ): Promise<T | null> {
        // The properties present inside projection would be ignored by findOne
        return this.entityModel.findOne(entityFilterQuery, { ...projection }).exec();
    }

    async find(entityFilterQuery: FilterQuery<T>): Promise<T[] | null> {
        return this.entityModel.find(entityFilterQuery);
    }

    async create(entityDetails: unknown): Promise<T> {
        // const entity = new this.entityModel(entityDetails)
        // return entity.save();
        return this.entityModel.create(entityDetails);
    }

    async findOneAndUpdate(
        entityFilterQuery: FilterQuery<T>,
        updatedEntityDetails: UpdateQuery<unknown>
    ): Promise<T | null> {
        return this.entityModel.findOneAndUpdate(entityFilterQuery, updatedEntityDetails, { new: true })
    }

    async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
        const result = await this.entityModel.deleteMany(entityFilterQuery);
        return result.deletedCount >= 1;
    }
}