import { z } from "zod";

type Course = z.infer<typeof courseSchema>;

/**
 * Represent a course.
 */
const courseSchema = z.object({
  letterGrade: z.number().readonly(),
  classText: z.string().readonly(),
  classNum: z.number().readonly(),
  classType: z.string().readonly(),
});

/**
 * Create a new course.
 */
const newCourse = z
  .function()
  .args(
    courseSchema.partial({
      letterGrade: true,
      classText: true,
      classType: true,
    }),
  )
  .returns(courseSchema)
  .implement(
    ({ classNum, classText = "", letterGrade = 5, classType = "1" }) => ({
      letterGrade,
      classText,
      classNum,
      classType,
    }),
  );

export { type Course, newCourse };
