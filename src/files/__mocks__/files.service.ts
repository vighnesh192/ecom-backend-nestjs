import { FileStub } from "../test/stubs/files.stub"

export const FilesService = jest.fn().mockReturnValue({
    uploadToS3AndDb: jest.fn().mockResolvedValue([FileStub()])
})