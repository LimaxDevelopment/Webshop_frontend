import { useCallback, useMemo } from "react";
import { useAuth } from "../contexts/Auth.context";
import { useNavigate, Link } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import LabelInput from "../components/LabelInput";
import Error from "../components/Error";

const Register = () => {
  interface AuthContextValues {
    error: any;
    loading: boolean;
    register: (
      firstname: string,
      lastname: string,
      email: string,
      password: string,
      street: string,
      number: string,
      postalCode: string,
      city: string,
      country: string
    ) => Promise<boolean>;
  }
  const { error, loading, register } = useAuth() as AuthContextValues;
  const navigate = useNavigate();

  const methods = useForm();

  const { handleSubmit, reset } = methods;

  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);

  const handleRegister = useCallback(
    async ({
      Firstname,
      Lastname,
      Email,
      Password,
      Street,
      Number,
      Postalcode,
      City,
      Country,
    }: any) => {
      const signedUp = await register(
        Firstname,
        Lastname,
        Email,
        Password,
        Street,
        Number,
        Postalcode,
        City,
        Country
      );
      if (signedUp) {
        navigate("/", { replace: true });
      }
    },
    [register, navigate]
  );

  const validationRules = useMemo(
    () => ({
      firstname: { required: "Firstname is required" },
      lastname: { required: "Lastname is required" },
      email: { required: "Email is required" },
      password: { required: "Password is required" },
      street: { required: "Street is required" },
      number: { required: "Number is required" },
      postalCode: { required: "Postalcode is required" },
      city: { required: "City is required" },
      country: { required: "Country is required" },
    }),
    []
  );

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 hidden lg:block">
        <div className="w-full h-full">
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

      <div className="w-1/2 flex justify-center pt-4">
        <div className="flex justify-center">
          <div
            className="flex flex-col align-items-center"
            style={{ width: "375px" }}
          >
            <Link to="/">
              <img
                src="/src/images/logo.png"
                className="w-16"
                data-cy="link_homepage_from_register"
              />
            </Link>
            <h1 className="font-bold text-xl my-6 uppercase">LiMax</h1>
            <div className="flex w-full pb-4 mb-6">
              <button className="w-1/2 uppercase font-bold text-xs border-b border-grey-f py-4 text-grey-c border-black-b text-black-b border-b-3">
                <Link to="/login" data-cy="link_loginpage_from_register">
                  <span className="focus">Login</span>
                </Link>
              </button>
              <button className="w-1/2 uppercase underline font-bold text-xs border-b border-grey-f py-4 text-grey-c">
                <Link to="/register" data-cy="link_registerpage_from_register">
                  <span className="font-bold">Sign up</span>
                </Link>
              </button>
            </div>
            <div className="w-full mb-4">
              <FormProvider {...methods}>
                <div role="tabpanel">
                  <form onSubmit={handleSubmit(handleRegister)}>
                    <Error error={error} />
                    <div className="mb-4 w-full">
                      <LabelInput
                        label="Firstname"
                        type="text"
                        name="Firstname"
                        placeholder="Maxim"
                        validationRules={validationRules.firstname}
                        data-cy="register_firstname_input"
                      />
                    </div>
                    <div className="mb-4 w-full">
                      <LabelInput
                        label="Lastname"
                        type="text"
                        name="Lastname"
                        placeholder="Lison"
                        validationRules={validationRules.lastname}
                        data-cy="register_lastname_input"
                      />
                    </div>
                    <div className="mb-4 w-full">
                      <LabelInput
                        label="Email"
                        type="text"
                        name="Email"
                        placeholder="your@email.com"
                        validationRules={validationRules.email}
                        data-cy="register_email_input"
                      />
                    </div>
                    <div className="w-full">
                      <LabelInput
                        label="Password"
                        type="password"
                        name="Password"
                        placeholder="Enter password"
                        validationRules={validationRules.password}
                        data-cy="register_password_input"
                      />
                    </div>
                    <div className="mb-4 w-full">
                      <LabelInput
                        label="Street"
                        type="text"
                        name="Street"
                        placeholder="Voskenslaan"
                        validationRules={validationRules.street}
                        data-cy="register_street_input"
                      />
                    </div>
                    <div className="mb-4 w-full">
                      <LabelInput
                        label="Number"
                        type="number"
                        name="Number"
                        placeholder="1"
                        validationRules={validationRules.number}
                        data-cy="register_number_input"
                      />
                    </div>
                    <div className="mb-4 w-full">
                      <LabelInput
                        label="Postalcode"
                        type="text"
                        name="Postalcode"
                        placeholder="9000"
                        validationRules={validationRules.postalCode}
                        data-cy="register_postalcode_input"
                      />
                    </div>
                    <div className="mb-4 w-full">
                      <LabelInput
                        label="City"
                        type="text"
                        name="City"
                        placeholder="Ghent"
                        validationRules={validationRules.city}
                        data-cy="register_city_input"
                      />
                    </div>
                    <div className="mb-4 w-full">
                      <LabelInput
                        label="Country"
                        type="text"
                        name="Country"
                        placeholder="Belgium"
                        validationRules={validationRules.country}
                        data-cy="register_country_input"
                      />
                    </div>
                    <button
                      className="w-full uppercase bg-black text-white font-bold text-sm p-3 rounded-full mt-4 hover:bg-black-b>"
                      type="submit"
                      disabled={loading}
                      data-cy="submit_user"
                    >
                      Create account
                    </button>
                  </form>
                  <div className="w-full text-center mt-6">
                    <button
                      className="font-extrabold underline text-sm"
                      onClick={handleCancel}
                      data-cy="cancel"
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

export default Register;
