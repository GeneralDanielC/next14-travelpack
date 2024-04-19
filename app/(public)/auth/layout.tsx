const AuthLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="h-full w-full sm:w-[400px] flex items-center justify-center">
            {children}
        </div>
    );
}

export default AuthLayout;