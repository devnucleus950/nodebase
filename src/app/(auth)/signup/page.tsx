import { RegisterForm } from "@/app/features/auth/components/register-form";
import { requireUnauth } from "@/lib/auth-utils";


const Page = async () => {

    await requireUnauth();

    return (
        <div className="flex justify-center items-center py-5">
            <div className="w-xs md:w-md  ">
                <RegisterForm/>
            </div>
        </div>
        
    )
} 



export default Page;