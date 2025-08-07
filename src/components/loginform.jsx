import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../images/Login.json";
import axios from "axios";
import { AlertError, AlertSuccess } from "./alerts";
import {
  useGoogleLogin,
} from "@react-oauth/google";
import { Navigate, useNavigate } from "react-router-dom";

export function LoginForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [success, setSuccess] = useState(null);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const login = await axios.post(
        "https://abhijit71.pythonanywhere.com/api/login/",
        formData
      );
      localStorage.setItem("tokens", JSON.stringify(login.data));
      setSuccess(true);
      navigate("/dashboard");
    } catch (error) {
      if (error.response?.status === 400) {
        setSuccess(false);
      } else {
        setSuccess(false);
      }
    }
  };

  const oauthlogin = async (credentialResponse) => {
    try {
      const res = await axios.get(
        "https://abhijit71.pythonanywhere.com/api/google-login-callback/",
        {
          params: { code: credentialResponse.credential },
        }
      );
      setSuccess(true);
      localStorage.setItem("tokens", JSON.stringify(res.data));
      <Navigate to="/dashboard" />;
    } catch (err) {
      setSuccess(false);
    }
  };

  const googlebutton = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      oauthlogin(tokenResponse);
    },
    onError: () => {
      setSuccess(false);
    },
  });

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      {success == false && AlertError()}
      {success && AlertSuccess()}
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className={cn("flex flex-col gap-6")}>
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <form className="p-6 md:p-8" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Welcome back</h1>
                    <p className="text-muted-foreground text-balance">
                      Login to your Trackify account
                    </p>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="usernaem">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Username"
                      required
                      name="username"
                      onChange={handleChange}
                      value={formData.username}
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="#"
                        className="ml-auto text-sm underline-offset-2 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                  <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                    <span className="bg-card text-muted-foreground relative z-10 px-2">
                      Or continue with
                    </span>
                  </div>
                  <div className="">
                    <Button
                      onClick={() => googlebutton()}
                      className="w-full font-bold h-[40px] gap-3"
                      variant="outline"
                    ><svg viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"></path><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"></path><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"></path><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"></path></g></svg>
                      Log in with Google
                    </Button>
                  </div>
                  <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <a
                      href="/register"
                      className="underline underline-offset-4"
                    >
                      Sign up
                    </a>
                  </div>
                </div>
              </form>
              <div className="bg-[#1a2031] relative hidden md:flex md:items-center p-5">
                <Player src={animationData} loop autoplay />
              </div>
            </CardContent>
          </Card>
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
