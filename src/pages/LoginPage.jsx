import { Link } from "react-router-dom";
import authIllustration from "../assets/images/login-img.png";
import LoginForm from "../components/auth/LoginForm";
export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-lightBg py-8">
      <div className="max-w-[1368px] flex-1">
        <div className="container grid items-center gap-8 lg:grid-cols-2">
          <div>
            <img
              className="mb-10 max-w-96 max-lg:hidden"
              src={authIllustration}
              alt="auth_illustration"
            />
            <div>
              <h1 className="mb-3 text-4xl font-bold lg:text-[40px]">
                u<span className="text-textBlue">Alumni</span>
              </h1>
              <p className="max-w-[452px] text-gray-600 lg:text-lg">
                A website for versity alumni to share their insightful thoughts thoughout the memebers.
              </p>
            </div>
          </div>
          <div className="card">
            <LoginForm />
            <div className="py-4 lg:py-6">
              <p className="text-center text-sm text-gray-600 lg:text-sm">
                Don’t have account?
                <Link
                  className="text-white transition-all hover:text-textBlue hover:underline mx-2 underline"
                  to="/register"
                >
                  Create New
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
