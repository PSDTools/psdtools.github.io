import { z } from "zod";

type Course = z.infer<typeof courseSchema>;

/**
 * Represent a course.
 */
const courseSchema = z.object({
  classNum: z.number().readonly(),
  classText: z.string().readonly(),
  classType: z.string().readonly(),
  letterGrade: z.number().readonly(),
});

/**
 * Create a new course.
 */
const newCourse = z
  .function()
  .args(
    courseSchema.partial({
      classText: true,
      classType: true,
      letterGrade: true,
    }),
  )
  .returns(courseSchema)
  .implement(
    ({ classNum, classText = "", classType = "1", letterGrade = 5 }) => ({
      classNum,
      classText,
      classType,
      letterGrade,
    }),
  );

export { type Course, courseSchema, newCourse };
