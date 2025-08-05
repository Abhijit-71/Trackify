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
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

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
        "http://127.0.0.1:8000/api/login/",
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
        "http://localhost:8000/api/google-login-callback/",
        {
          params: { code: credentialResponse.credential },
        }
      );
      setSuccess(true);
      navigate("/dashboard");
      localStorage.setItem("tokens", JSON.stringify(res.data));
    } catch (err) {
      setSuccess(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId="450008098766-r11fmpandh7covqshfka9jju62cmtsok.apps.googleusercontent.com">
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
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
                    <div className="grid grid-cols-1 gap-4">
                      <GoogleLogin
                        onSuccess={oauthlogin}
                        onError={() => {
                          setSuccess(false);
                        }}
                      />
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
                <div className="bg-muted relative hidden md:flex md:items-center p-5">
                  <Player src={animationData} loop autoplay />
                </div>
              </CardContent>
            </Card>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
              By clicking continue, you agree to our{" "}
              <a href="#">Terms of Service</a> and{" "}
              <a href="#">Privacy Policy</a>.
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
