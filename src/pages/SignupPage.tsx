import { useState } from "react";
import { Link } from "react-router-dom";
import validator from "validator";
import { Loader2 } from "lucide-react";
import { useAuth } from "replyke";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// import githubIcon from "../assets/github.svg";
import AuthenticationFrame from "../components/authentication/AuthenticationFrame";

import { cn } from "../lib/utils";

function SignupPage() {
  const { signUpWithEmailAndPassword } = useAuth();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  async function handleSignup() {
    if (isSubmitting) return;
    try {
      if (!validator.isEmail(credentials.email)) {
        throw new Error("email|Invalid email");
      }

      if (credentials.password.length < 8) {
        throw new Error("password|Password is too short");
      }

      setIsSubmitting(true);

      await signUpWithEmailAndPassword!({
        email: credentials.email,
        password: credentials.password,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        let errorMessage = err.message;
        let errorKey = "form";

        if (
          err.message.includes("email|") ||
          err.message.includes("password|") ||
          err.message.includes("repeatPassword|")
        ) {
          const parts: string[] = err.message.split("|");
          errorKey = parts[0];
          errorMessage = parts[1];
        }

        setErrors((errs) => ({ ...errs, [errorKey]: errorMessage }));
      }

      setIsSubmitting(false);
    }
  }

  return (
    <AuthenticationFrame>
      <>
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Sign up</h1>
          <p className="text-balance text-muted-foreground">
            Enter your information to create an account
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
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
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
                onClick={handleSignup}
                type="submit"
                className={cn("w-full", isSubmitting && "opacity-70")}
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}{" "}
                Create an account
              </Button>
              {errors.form && (
                <p className="text-xs text-red-600 mt-2">{errors.form}</p>
              )}
            </div>
            {/* <GoogleSignInButton /> */}
          </div>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/sign-in" className="underline">
            Sign in
          </Link>
        </div>
      </>
    </AuthenticationFrame>
  );
}

export default SignupPage;
