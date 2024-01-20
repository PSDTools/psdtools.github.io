// eslint-disable-next-line fp/no-class
class Course {
  letterGrade: number;
  classText: string;
  classNum: number;
  classType: string;

  /**
   * Create `Course` class.
   */
  constructor(num: number) {
    this.letterGrade = 5;
    this.classText = "";
    this.classNum = num;
    this.classType = "1";
  }
}

export { Course };
