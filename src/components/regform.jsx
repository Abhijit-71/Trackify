import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../images/Register.json";
import { AlertError, AlertSuccess } from "./alerts";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Regform() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password2: "",
    email: "",
  });
  const [success, setSuccess] = useState(null);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const navigate = useNavigate();

  // handles submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.username || !formData.password) {
      alert("All fields are required.");
      return;
    }
    try {
      const register = await axios.post(
        "https://abhijit71.pythonanywhere.com/api/register/",
        formData
      );
      setMessage(register.data.message);
      setSuccess(true);
      navigate("/login")
    } catch (error) {
      setSuccess(false);
      setMessage(
        JSON.stringify(error.response.data, null, null)
          .replace(/[{}]/g, "")
          .replace(/,/g, "\n")
          .replace(/:/g, " : ")
          .replace(/"/g, "")
          .trim()
      );
    }
  };
  //handles oauthlogin/register
  const oauthlogin = async (credentialResponse) => {
    try {
      const res = await axios.get(
        "https://abhijit71.pythonanywhere.com/api/google-login-callback/",
        {
          params: { code: credentialResponse.credential },
        }
      );
      setSuccess(true);
      navigate("/dashboard")
      localStorage.setItem("tokens", JSON.stringify(res.data)); 
    } catch (err) {
      setSuccess(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId="450008098766-r11fmpandh7covqshfka9jju62cmtsok.apps.googleusercontent.com">
      <div className="bg-background flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        {success == false && AlertError()}
        {success && AlertSuccess()}
        <div className="w-full max-w-sm md:max-w-3xl">
          <div className={cn("flex flex-col gap-6")}>
            <Card className="overflow-hidden p-0">
              <CardContent className="grid p-0 md:grid-cols-2">
                <form className="p-6 md:p-8" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-[10px] text-center">
                      <h1 className="text-2xl font-bold">Fuel Your Fire</h1>
                      <p className="text-muted-foreground text-balance">
                        Get started with Trackify , Sign Up now
                      </p>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        name="username"
                        id="username"
                        type="text"
                        placeholder="Username"
                        required
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        name="email"
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid gap-3">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                      </div>
                      <Input
                        name="password"
                        id="password"
                        type="password"
                        placeholder="Password"
                        required
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid gap-3">
                      <div className="flex items-center">
                        <Label htmlFor="password2">Confirm Password</Label>
                      </div>
                      <Input
                        name="password2"
                        id="password2"
                        type="password"
                        placeholder="Confirm password"
                        required
                        onChange={handleChange}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Register
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
                      Already have an account?{" "}
                      <a href="/login" className="underline underline-offset-4">
                        Log In
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

export default Regform;
