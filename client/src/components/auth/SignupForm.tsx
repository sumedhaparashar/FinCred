import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

type SignupFormProps = {
  onSwitchToLogin: () => void;
};

export default function SignupForm({ onSwitchToLogin }: SignupFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, signInWithGoogle } = useAuth();
  const { toast } = useToast();
  const [_, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signUp(email, password, fullName);
      toast({
        title: "Account created",
        description: "Welcome to Fincread! Your journey to financial credibility starts now.",
      });
      setLocation("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: "There was an issue creating your account. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast({
        title: "Account created",
        description: "Welcome to Fincread! Your journey to financial credibility starts now.",
      });
      setLocation("/dashboard");
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: "There was an issue signing up with Google.",
      });
    }
  };

  return (
    <div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
        <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white font-heading">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Or{" "}
          <button
            onClick={onSwitchToLogin}
            className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
          >
            sign in to your existing account
          </button>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="signup-name" className="text-gray-700 dark:text-gray-300">
            Full name
          </Label>
          <Input
            id="signup-name"
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="mt-1 block w-full border-gray-300 dark:border-gray-600 shadow-sm dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <Label htmlFor="signup-email" className="text-gray-700 dark:text-gray-300">
            Email address
          </Label>
          <Input
            id="signup-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full border-gray-300 dark:border-gray-600 shadow-sm dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <Label htmlFor="signup-password" className="text-gray-700 dark:text-gray-300">
            Password
          </Label>
          <Input
            id="signup-password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full border-gray-300 dark:border-gray-600 shadow-sm dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-primary-600 hover:bg-primary-700"
          >
            {isLoading ? "Creating account..." : "Sign up"}
          </Button>
        </div>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button
            type="button"
            onClick={handleGoogleSignIn}
            variant="outline"
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <i className="ri-google-fill text-lg"></i>
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <i className="ri-apple-fill text-lg"></i>
          </Button>
        </div>
      </div>
    </div>
  );
}
