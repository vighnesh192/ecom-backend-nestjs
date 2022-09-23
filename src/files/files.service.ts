import { Injectable } from '@nestjs/common';
import { S3 } from "aws-sdk";
import { v4 as uuid } from "uuid";
import { FilesRepository } from './files.repository';
import { PublicFile, PublicFileDocument } from './schemas/publicFile.schema';

@Injectable()
export class FilesService {
    constructor(private readonly FilesRepository: FilesRepository) { }

    async uploadPublicFile(files: Express.Multer.File[]): Promise<PublicFileDocument[]> {
        let publicFiles: Promise<PublicFileDocument[]>;

        const uploadToS3AndDb = async ({ buffer, originalname }) => {
            const s3 = new S3();
            const uploadResult = await s3.upload({
                Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
                Body: buffer,
                Key: `${uuid()}--${originalname}`
            }).promise();

            return this.FilesRepository.create({
                key: uploadResult.Key.toString(),
                url: uploadResult.Location.toString()
            })
        }

        publicFiles = Promise.all(files.map(uploadToS3AndDb))
        return publicFiles;
    }
}
