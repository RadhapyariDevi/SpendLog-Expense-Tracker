import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-12">
    
        <div className="relative hidden lg:col-span-5 lg:block xl:col-span-6">
          <img
            src="/sign_in_img.jpg"
            alt="Sign in"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "13% center" }}
            />

          <div className="absolute inset-0 bg-primary/40" />

          <div className="relative z-10 flex h-full items-end p-10 text-white">
            <div>
              <h2 className="text-2xl font-bold">
                Welcome back
              </h2>
              <p className="mt-2 text-sm opacity-90">
                Track your expenses and stay organised.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-6 py-12 lg:col-span-7 xl:col-span-6">
          <div className="w-full max-w-md">
            <SignIn 
            appearance={{
              variables: {
                colorPrimary: "#3E7B27", 
                borderRadius: "0.75rem",
              },
              elements: {
                formButtonPrimary:
                  "bg-[#3E7B27] hover:bg-secondary text-white shadow-md",
                card: "shadow-xl",
              },
            }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
