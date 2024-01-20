import { RegisterForm } from "@/components/auth/register-form";

const RegisterPage = () => {
    return (
        <div className="h-full flex flex-row justify-center">
            {/* <div className="hidden md:block flex flex-col justify-center items-center bg-gradient-to-t from-rose-500 to-rose-400 w-[50%]">
                
            </div> */}
            <div className="flex flex-col justify-center items-center w-[50%]">
                <RegisterForm />
            </div>
        </div>
    );
}

export default RegisterPage;