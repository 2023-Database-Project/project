import prisma from "@/utils/prisma";

export class DealLoginClarification{
    async IsCourseRequestExist(courseid: number, studentid: number): Promise<boolean> {
        const courseRequest = await prisma.unassignedcourse.findFirst({
            where: {
                courseid: courseid,
                studentid: studentid,
                state: {
                    notIn: ['allow', 'deny']
                }
            }
        });
    
        if (!courseRequest) {
            return false;
        }
        return true;
    }
}

export const dealLoginClarificationModule = new DealLoginClarification();