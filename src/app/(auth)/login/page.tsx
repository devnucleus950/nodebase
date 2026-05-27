import { LoginForm } from "@/app/features/auth/components/login-form";
import { requireUnauth } from "@/lib/auth-utils";


const Page = async () => {

    await requireUnauth();

    return (
        <div className="flex justify-center items-center py-5">
            <div className="w-xs md:w-md  ">
                <LoginForm/>
            </div>
        </div>
        
    )
} 



export default Page;