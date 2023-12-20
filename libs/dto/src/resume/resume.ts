import { defaultResumeData, idSchema, resumeDataSchema } from "@reactive-resume/schema";
import { createZodDto } from "nestjs-zod/dto";
import { z } from "nestjs-zod/z";

import { userSchema } from "../user";

export const resumeSchema = z.object({
  id: idSchema,
  title: z.string(),
  slug: z.string(),
  data: resumeDataSchema.default(defaultResumeData),
  visibility: z.enum(["private", "public"]).default("private"),
  locked: z.boolean().default(false),
  userId: idSchema,
  user: userSchema.optional(),
  createdAt: z.date().or(z.dateString()),
  updatedAt: z.date().or(z.dateString()),
});

export class ResumeDto extends createZodDto(resumeSchema) {
  static default() {
    return this.create({
      "id": "clq1tmndk000p5aulo26b7yfv",
      "title": "zhc",
      "slug": "zhc",
      "data": defaultResumeData,
      "visibility": "private",
      "locked": false,
      "userId": "clq0uyx2p00005aulwsz33gv6",
      "createdAt": "2023-12-12T04:06:58.519Z",
      "updatedAt": "2023-12-15T14:08:27.570Z"
  });
  }
}
