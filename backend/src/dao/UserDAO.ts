import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const loginDAO = async (userNameParam: string, password: string) => {
    const result = await prisma.user.findFirst({
        where: {
            userName: userNameParam
        },
        select: {
            id:true,
            userName: true,
            password: true
        }
    })

    if (result) {
        const storedPassword = result.password
        console.log('Stored Password: ' + storedPassword)
        bcrypt.compare(password, storedPassword, function (err, passResult) {
            
            console.log(passResult);
            
          });
        const passwordResult = await bcrypt.compareSync(password, storedPassword)
        console.log('Password Result: ' + passwordResult)
        if (passwordResult == true)
            return result
        else return null
    }
}

export { loginDAO }