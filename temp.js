import {signUpNewUser} from "./src/lib/supabase-utils"
try {
    const data = await signUpNewUser("user1@gmail.com", "user1@123")
    console.log(data)
} catch (error) {
    console.log(error.message)
}