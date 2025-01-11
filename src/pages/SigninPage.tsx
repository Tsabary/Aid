import { useState } from "react";
import { Link } from "react-router-dom";
import validator from "validator";
import { Loader2 } from "lucide-react";
import { useAuth, handleError } from "replyke";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import AuthenticationFrame from "@/components/authentication/AuthenticationFrame";
import GoogleSignInButton from "@/components/authentication/GoogleSignInButton";

function SigninPage() {
  const { signInWithEmailAndPassword } = useAuth();

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogin() {
    if (isSubmitting) return;
    try {
      if (!validator.isEmail(credentials.email)) {
        throw new Error("email|Please enter a valid email");
      }

      if (credentials.password.length < 6) {
        throw new Error("password|Please enter a valid password");
      }

      setIsSubmitting(true);

      await signInWithEmailAndPassword!({
        email: credentials.email,
        password: credentials.password,
      });
    } catch (err: unknown) {
      handleError(err, "Failed to sign in: ");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthenticationFrame>
      <>
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@replyke.com"
              required
              onChange={(event) =>
                setCredentials((cs) => ({
                  ...cs,
                  email: event.target.value.trim(),
                }))
              }
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                to="/forgot-password"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              required
              onChange={(event) =>
                setCredentials((cs) => ({
                  ...cs,
                  password: event.target.value.trim(),
                }))
              }
            />
          </div>
          <div className="grid gap-2">
            <div>
              <Button
                onClick={handleLogin}
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}{" "}
                Login
              </Button>
              {/* {errors.form && (
                <p className="text-xs text-red-600 mt-2">{errors.form}</p>
              )} */}
            </div>
            <GoogleSignInButton />
          </div>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/sign-up" className="underline">
            Sign up
          </Link>
        </div>
      </>
    </AuthenticationFrame>
  );
}

export default SigninPage;
