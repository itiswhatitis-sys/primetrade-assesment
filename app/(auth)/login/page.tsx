import { LoginPageView } from "@/app/components/LoginPage";


const LoginPage = async () => {
  //   const session = await getServerSession(authOptions);

  // if (session) {
  //   redirect("/dashboard");
  // }
  return ( 
    <>
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-19">
      <div className="w-full max-w-sm md:max-w-3xl">
      <LoginPageView />
        </div>  
    </div>
    </>

   );
}
 
export default LoginPage;