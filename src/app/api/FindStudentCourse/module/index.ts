import prisma from "@/utils/prisma";

interface CourseIdRequestBody {
  courseid: number;
}

export class FindStudentCourseCase {
  async FindStudentTableId(studentId: number, semester: string) {
    const member = await prisma.coursetable.findFirst({
      where: {
        studentid: studentId,
        semester: semester,
      },
      select: {
        coursetableid: true,
      },
    });
    return member;
  }
  async FindStudentParticipationCourseId(coursetableId: number) {
    const member = await prisma.participationcourse.findMany({
      where: {
        coursetableid: coursetableId,
      },
      select: {
        courseid: true,
      },
    });
    return member;
  }
  async FindAllStudentParticipationCourse(
    courseList: CourseIdRequestBody[],
    semester: string
  ) {
    const participationCourseDetails = await Promise.all(
      courseList.map(async (course) => {
        const courseInfo = await prisma.course.findUnique({
          where: {
            courseid: course.courseid,
          },
          include: {
            schedule: {
              where: {
                semester: semester,
              },
            },
            courseclassroom: {
              select: {
                classroom: {
                  select: {
                    location: true,
                  },
                },
              },
            },
          },
        });
        return courseInfo;
      })
    );
    return participationCourseDetails;
  }
}

export const findStudentCourseTable = new FindStudentCourseCase();
