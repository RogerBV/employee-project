import 'jest'
import { PrismaClient } from '@prisma/client'

describe('', () =>{
    let backendPort: string
    let prisma;
    beforeEach(() => {
        console.log("prisma")
        prisma = new PrismaClient();
    })

    it('testing environment variables', () => {
        expect(process.env.BACKEND_PORT).toBe("3000")
        expect(process.env.DB_PORT).toBe("5432")
    })

    it('check departments count', async () => {
        const result = await prisma.department.count()
        expect(3).toBe(result)
    })
})