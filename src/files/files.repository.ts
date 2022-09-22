import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EntityRepository } from "../database/entity.repository";
import { PublicFile, PublicFileDocument } from "./schemas/publicFile.schema";

export class FilesRepository extends EntityRepository<PublicFileDocument> {
    constructor(@InjectModel(PublicFile.name) publicFileModel: Model<PublicFileDocument>) {
        super(publicFileModel);
    }
}