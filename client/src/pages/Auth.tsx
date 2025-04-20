import { useState } from "react";
import { Card } from "@/components/ui/card";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import AuthAnimation from "@/components/auth/AuthAnimation";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitchToSignup = () => {
    setIsLogin(false);
  };

  const handleSwitchToLogin = () => {
    setIsLogin(true);
  };

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          {/* Auth Forms */}
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <Card className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
              {isLogin ? (
                <LoginForm onSwitchToSignup={handleSwitchToSignup} />
              ) : (
                <SignupForm onSwitchToLogin={handleSwitchToLogin} />
              )}
            </Card>
          </div>

          {/* Auth Animation/Graphic */}
          <AuthAnimation />
        </div>
      </div>
    </section>
  );
}
