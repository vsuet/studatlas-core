import * as mongoose from 'mongoose';

export const AcademySchema = new mongoose.Schema({
  name: String,
  abbreviation: String,
  website: String,
  endpoint: String,
  version: String,
});
