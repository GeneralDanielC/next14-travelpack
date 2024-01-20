import { LoginForm } from "@/components/auth/login-form";

const LoginPage = () => {
    return (
        <div className="h-full flex flex-row justify-center">
            {/* <div className="hidden md:block flex flex-col justify-center items-center bg-gradient-to-t from-rose-500 to-rose-400 w-[50%]">
                
            </div> */}
            <div className="flex flex-col justify-center items-center w-[50%]">
                <LoginForm />
            </div>
        </div>
    );
}

export default LoginPage;