import { useCallback, useMemo } from "react";
import { useAuth } from "../contexts/Auth.context";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import LabelInput from "../components/LabelInput";
import Error from "../components/Error";

const validationRules = {
  email: {
    required: "Email is required",
  },
  password: {
    required: "Password is required",
  },
};

const Login = () => {
  interface AuthContextValues {
    error: any;
    loading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
  }
  const { error, loading, login } = useAuth() as AuthContextValues;
  const navigate = useNavigate();
  const { search } = useLocation();

  const redirect = useMemo(() => {
    const urlParams = new URLSearchParams(search);
    if (urlParams.has("redirect")) return urlParams.get("redirect");
    return "/";
  }, [search]);

  const methods = useForm({
    defaultValues: {
      Email: "maxim.lison@student.hogent.be",
      Password: "123456789",
    },
  });

  const { handleSubmit, reset } = methods;

  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);

  const handleLogin = useCallback(
    async ({ Email, Password }: any) => {
      const loggedIn = await login(Email, Password);

      if (loggedIn) {
        navigate(redirect, { replace: true });
      }
    },
    [login, navigate, redirect]
  );

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 hidden lg:block">
        <div className="w-full">
          <div className="flex flex-col justify-content-center w-full h-full bg-cover bg-center">
            <img
              src="/src/images/Broek.png"
              style={{
                height: "100%",
                width: "100%",
                flexDirection: "column",
              }}
            />
          </div>
        </div>
      </div>

      <div className="w-1/2 flex justify-center pt-20">
        <div className="flex justify-center">
          <div
            className="flex flex-col items-center"
            style={{ width: "375px" }}
          >
            <Link to="/">
              <img
                src="/src/images/logo.png"
                className="w-16"
                data-cy="link_homepage_from_login"
              />
            </Link>
            <h1 className="font-bold text-xl my-6 uppercase">LiMax</h1>
            <div className="flex w-full pb-4 mb-6">
              <button className="w-1/2 uppercase underline font-bold text-xs border-b border-grey-f py-4 text-grey-c border-black-b text-black-b border-b-3">
                <Link to="/login" data-cy="link_loginpage_from_login">
                  <span className="focus">Login</span>
                </Link>
              </button>
              <button className="w-1/2 uppercase font-bold text-xs border-b border-grey-f py-4 text-grey-c">
                <Link to="/register" data-cy="link_registerpage_from_login">
                  <span className="focus">Sign up</span>
                </Link>
              </button>
            </div>
            <div className="w-full">
              <FormProvider {...methods}>
                <div>
                  <form onSubmit={handleSubmit(handleLogin)}>
                    <Error error={error} />
                    <div className="mb-4 w-full">
                      <LabelInput
                        label="Email"
                        type="text"
                        name="Email"
                        placeholder="your@email.com"
                        validationRules={validationRules.email}
                        data-cy="email_input"
                      />
                    </div>
                    <div className="w-full">
                      <LabelInput
                        label="Password"
                        type="password"
                        name="Password"
                        placeholder="Enter password"
                        validationRules={validationRules.password}
                        data-cy="password_input"
                      />
                    </div>
                    <button
                      className="w-full uppercase bg-black text-white font-bold text-sm p-3 rounded-full mt-4 hover:bg-black-b"
                      type="submit"
                      disabled={loading}
                      data-cy="btn_submit"
                    >
                      Login
                    </button>
                  </form>
                  <div className="w-full text-center mt-6">
                    <button
                      className="font-extrabold underline text-sm"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </FormProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
