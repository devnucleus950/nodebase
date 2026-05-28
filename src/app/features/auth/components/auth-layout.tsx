import Image from "next/image"
import Link from "next/link"

export const AuthLayout = ({ children } : { children : React.ReactNode}) => {
    return (
        <div className="bg-muted flex justify-center flex-col items-center min-h-svh gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <Link href="/" className="flex items-center gap-2 font-medium self-center">
                     <Image alt="Nodebase" src="/logos/logo.svg" width={30} height={30} />
                    Nodebase
                </Link>
                {children}
            </div>
        </div>
    )
}