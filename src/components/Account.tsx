import { FormProvider, useForm } from "react-hook-form";
import { useMemo, useCallback } from "react";
import LabelInput from "./LabelInput";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/Auth.context";
import Error from "../components/Error";

export function AccountForm({ user }: any) {
  interface AuthContextValues {
    error: any;
    loading: boolean;
    update: (
      Firstname: string,
      Lastname: string,
      Email: string,
      Street: string,
      Number: string,
      Postalcode: number,
      City: string,
      Country: string
    ) => Promise<boolean>;
  }

  const { error, loading, update } = useAuth() as AuthContextValues;
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      Firstname: user ? user.firstname : "",
      Lastname: user ? user.lastname : "",
      Email: user ? user.email : "",
      Street: user ? user.street : "",
      Number: user ? user.number : "",
      Postalcode: user ? user.postalCode : "",
      City: user ? user.city : "",
      Country: user ? user.country : "",
    },
  });

  const { handleSubmit } = methods;

  interface typesUpdate {
    Firstname: string;
    Lastname: string;
    Email: string;
    Password: string;
    Street: string;
    Number: string;
    Postalcode: number;
    City: string;
    Country: string;
  }

  const handleUpdate = useCallback(
    async ({
      Firstname,
      Lastname,
      Email,
      Street,
      Number,
      Postalcode,
      City,
      Country,
    }: typesUpdate) => {
      const updateUser = await update(
        Firstname,
        Lastname,
        Email,
        Street,
        Number,
        Postalcode,
        City,
        Country
      );
      if (updateUser) {
        navigate("/", { replace: true });
      }
    },
    [update, navigate]
  );

  const validationRules = useMemo(
    () => ({
      firstname: { required: "Firstname is required" },
      lastname: { required: "Lastname is required" },
      email: { required: "Email is required" },
      street: { required: "Street is required" },
      number: { required: "Number is required" },
      postalcode: { required: "Postalcode is required" },
      city: { required: "City is required" },
      country: { required: "Country is required" },
    }),
    []
  );

  return (
    <FormProvider {...methods}>
      <div role="tabpanel">
        <form onSubmit={handleSubmit(handleUpdate)}>
          <Error error={error} />
          <div className="mb-4 w-full">
            <LabelInput
              label="Firstname"
              type="text"
              name="Firstname"
              validationRules={validationRules.firstname}
              data-cy="firstname_input"
            />
          </div>
          <div className="mb-4 w-full">
            <LabelInput
              label="Lastname"
              type="text"
              name="Lastname"
              validationRules={validationRules.lastname}
              data-cy="lastname_input"
            />
          </div>
          <div className="mb-4 w-full">
            <LabelInput
              label="Email"
              type="text"
              name="Email"
              validationRules={validationRules.email}
              data-cy="email_input"
            />
          </div>
          <div className="mb-4 w-full">
            <LabelInput
              label="Street"
              type="text"
              name="Street"
              validationRules={validationRules.street}
              data-cy="street_input"
            />
          </div>
          <div className="mb-4 w-full">
            <LabelInput
              label="Number"
              type="number"
              name="Number"
              validationRules={validationRules.number}
              data-cy="number_input"
            />
          </div>
          <div className="mb-4 w-full">
            <LabelInput
              label="Postalcode"
              type="text"
              name="Postalcode"
              validationRules={validationRules.postalcode}
              data-cy="postalcode_input"
            />
          </div>
          <div className="mb-4 w-full">
            <LabelInput
              label="City"
              type="text"
              name="City"
              validationRules={validationRules.city}
              data-cy="city_input"
            />
          </div>
          <div className="mb-4 w-full">
            <LabelInput
              label="Country"
              type="text"
              name="Country"
              validationRules={validationRules.country}
              data-cy="country_input"
            />
          </div>
          <button
            className="w-full uppercase bg-black text-white font-bold text-sm p-3 rounded-full mt-4 hover:bg-black-b>"
            type="submit"
            disabled={loading}
            data-cy="update_user"
          >
            Update account
          </button>
        </form>
      </div>
    </FormProvider>
  );
}
