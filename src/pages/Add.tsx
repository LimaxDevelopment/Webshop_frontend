import { useState, memo, useCallback } from "react";
import Header from "../components/Header";
import { FormProvider, useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import * as api from "../api/index";
import Error from "../components/Error";

const persons = ["Women", "Men"];
const types = ["Hoodies", "Shirts", "Trousers", "Accessories"];

const validationRules = {
  person: {
    required: "Choice a person",
  },
  type: {
    required: "Choice a type",
  },
  picture: {
    required: "Add a picture of your product",
  },
  productName: {
    required: "Give the name of your product",
  },
  color: {
    required: "Choice the color of your product",
  },
  size: {
    required: "Choice the size of your product",
  },
  price: {
    valueAsNumber: true,
    required: "Add the price of your product",
    min: { value: 1, message: "min price of 1" },
    max: { value: 1000, message: "max price of 1000" },
  },
  brand: {
    required: "Give the brand of your product",
  },
};

export default memo(function Add() {
  const [selectedPerson, setSelectedPerson] = useState<string>();
  const [selectedType, setSelectedType] = useState<string>();

  const { error: saveError, trigger: saveItems } = useSWRMutation(
    "products",
    api.post
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = useCallback(
    async (data: any) => {
      const { person, type, picture, productName, color, size, price, brand } =
        data;
      const categoryID = types.findIndex((t) => type === t) + 1;
      await saveItems({
        categoryID,
        person,
        type,
        picture: `${type.toLowerCase()}/${picture[0].name}`,
        productName,
        color,
        size,
        price: parseFloat(price),
        brand,
      });
      reset();
    },
    [reset, saveItems]
  );

  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);

  return (
    <div>
      <Header />
      <Error error={saveError} />
      <FormProvider
        handleSubmit={handleSubmit}
        errors={errors}
        register={register}
      >
        <form className="row ml-3 mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <p>Person: </p>
            <div className="mb-3">
              {persons.map((p) => (
                <div className="form-check" key={`${p}`}>
                  <input
                    {...register("person", validationRules.person)}
                    className="form-check-input"
                    type="radio"
                    value={`${p}`}
                    checked={selectedPerson === `${p}`}
                    onChange={() => setSelectedPerson(p)}
                    id={`radio${p}`}
                    required
                    data-cy="person_check"
                  />
                  <label className="form-check-label" htmlFor={`radio${p}`}>
                    {p}
                  </label>
                </div>
              ))}
            </div>

            <p>Type: </p>
            <div className="mb-3">
              {types.map((t) => (
                <div className="form-check" key={`${t}`}>
                  <input
                    {...register("type", validationRules.type)}
                    className="form-check-input"
                    type="radio"
                    value={`${t}`}
                    checked={selectedType === `${t}`}
                    onChange={() => setSelectedType(t)}
                    id={`radio${t}`}
                    required
                    data-cy="type_check"
                  />
                  {errors.type ? (
                    <p className="form-text text-danger">
                      {errors.type.message}
                    </p>
                  ) : null}
                  <label className="form-check-label" htmlFor={`radio${t}`}>
                    {t}
                  </label>
                </div>
              ))}
            </div>

            <div className="mb-3 col-md-3">
              <label form="pictureOfItem" className="form-label">
                Photo of item:
              </label>
              <input
                {...register("picture", validationRules.picture)}
                className="form-control"
                type="file"
                id="pictureOfItem"
                required
                data-cy="picture_input"
              />
              {errors.picture ? (
                <p className="form-text text-danger">
                  {errors.picture.message}
                </p>
              ) : null}
            </div>

            <div className="mb-3 col-md-3">
              <label form="brandOfItem" className="form-label">
                Brand of item:
              </label>
              <input
                {...register("brand", validationRules.brand)}
                type="text"
                className="form-control"
                id="brandOfItem"
                placeholder="Brand"
                autoComplete="off"
                required
                data-cy="brand_input"
              />
              {errors.brand ? (
                <p className="form-text text-danger">{errors.brand.message}</p>
              ) : null}
            </div>

            <div className="mb-3 col-md-3">
              <label form="nameOfItem" className="form-label">
                Name of item:
              </label>
              <input
                {...register("productName", validationRules.productName)}
                type="text"
                className="form-control"
                id="nameOfItem"
                placeholder="Name"
                autoComplete="off"
                required
                data-cy="productName_input"
              />
              {errors.productName ? (
                <p className="form-text text-danger">
                  {errors.productName.message}
                </p>
              ) : null}
            </div>

            <div className="mb-3 col-md-3">
              <label className="form-label">Color of item:</label>
              <select
                {...register("color", validationRules.color)}
                className="form-select"
                aria-label="Default select example"
                defaultValue="Chose color"
                required
                data-cy="color_select"
              >
                <option defaultValue="Color">Chose color</option>
                <option value="BLACK">BLACK</option>
                <option value="BLUE">BLUE</option>
                <option value="GREEN">GREEN</option>
                <option value="GREY">GREY</option>
                <option value="RED">RED</option>
                <option value="WHITE">WHITE</option>
              </select>
              {errors.color ? (
                <p className="form-text text-danger">{errors.color.message}</p>
              ) : null}
            </div>

            <div className="mb-3 col-md-3">
              <label className="form-label">Size of item:</label>
              <select
                {...register("size", validationRules.size)}
                className="form-select"
                aria-label="Default select example"
                required
                data-cy="size_select"
              >
                <option defaultValue="Size">Chose size</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
              {errors.size ? (
                <p className="form-text text-danger">{errors.size.message}</p>
              ) : null}
            </div>

            <div className="input-group mb-3">
              <label form="priceOfItem" className="form-label">
                Price:
              </label>
              <div className="input-group mb-3">
                <span className="input-group-text">€</span>
                <input
                  {...register("price", validationRules.price)}
                  type="text"
                  className="form-control"
                  style={{ maxWidth: "410px" }}
                  autoComplete="off"
                  data-cy="price_input"
                />
                {errors.price ? (
                  <p
                    className="form-text text-danger"
                    data-cy="price_input_error"
                  >
                    {errors.price.message}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="col-12">
              <button
                type="submit"
                className="uppercase bg-black text-white font-bold text-sm p-3 rounded-full mt-2 hover:bg-black-b mr-10"
                data-cy="submit_product"
              >
                Add item
              </button>
              <button
                className="uppercase bg-black text-white font-bold text-sm p-3 rounded-full mt-2 hover:bg-black-b"
                onClick={handleCancel}
                data-cy="cancel_submit"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
});
