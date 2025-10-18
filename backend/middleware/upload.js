// backend/middleware/upload.js
import fileUpload from "express-fileupload";

export const uploadMiddleware = fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/",
  limits: { 
    fileSize: 10 * 1024 * 1024 // 10MB max file size
  },
  abortOnLimit: true,
  createParentPath: true,
  parseNested: true
});

export default uploadMiddleware;