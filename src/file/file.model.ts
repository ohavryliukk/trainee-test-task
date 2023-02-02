import * as mongoose from 'mongoose';

export const FileSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  encoding: { type: String, required: true },
  date: { type: Date, required: true },
  reversedText: { type: String, required: true },
});

export interface File {
  id: string;
  fileName: string;
  encoding: string;
  date: Date;
  reversedText: string;
}
