import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/AuthContext"
import { useNavigate } from "react-router"
import { useState } from "react"

export function LoginForm({ className, ...props }) {
  const { login, error } = useAuth();

  const navigate = useNavigate();

  const [data, setData] = useState({
    login: "",
    pass: ""
  });

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  }

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    const result = await login(event.target.login.value, event.target.pass.value);
    if (result) {
      navigate('/');
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            className="p-6 md:p-8"
            onSubmit={handleSubmitForm}
          >
            {error ? <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4 text-sm font-medium" id="error-message">{error}</div> : null}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Bienvenido</h1>
                <p className="text-muted-foreground text-balance">
                  Accede a tu cuenta
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="login">User</Label>
                <Input
                  id="login"
                  type="login"
                  name="login"
                  value={data.login}
                  onChange={handleInputChange}
                  required />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="pass">Password</Label>
                </div>
                <Input
                  id="pass"
                  type="pass"
                  name="pass"
                  value={data.pass}
                  onChange={handleInputChange}
                  required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/images/pharmacy.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
