import { useState } from "react";
import Button from "../components/Button";
import InputWithLabel from "../components/InputWithLabel";
import { setAuthorizationToken } from "../apis";
import { useNavigate } from "react-router-dom";
import signin from "../apis/signin";

const Signin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const isFormValid = !!formData.email && !!formData.password;

  const onUpdateField = (fieldValue: string, fieldName: string) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [fieldName]: fieldValue,
      };
    });
  };

  const onSubmit = async () => {
    const { email, password } = formData;

    setIsLoading(true);

    const res = await signin({
      email,
      password,
    });

    setAuthorizationToken(res.token);

    navigate("/dashboard");

    setIsLoading(false);
  };

  return (
    <div className="bg-[#161616] h-screen flex justify-center items-center">
      <div className="border-[1px] border-black flex flex-col gap-4 rounded px-8 py-10 bg-white min-w-[500px]">
        <p className="text-2xl font-bold text-center">Signin</p>

        <p className="text-md text-slate-600 text-center mt-[-15px] mb-[15px]">
          Login to your account
        </p>

        <InputWithLabel
          onChange={(e) => onUpdateField(e.target.value, "email")}
          value={formData.email}
          label="Email"
          type="email"
          placeholder="john@doe.com"
        />

        <InputWithLabel
          onChange={(e) => onUpdateField(e.target.value, "password")}
          value={formData.password}
          label="Password"
          type="password"
          placeholder="Enter a strong password"
        />

        <div className="w-full mt-4">
          <Button disabled={!isFormValid || isLoading} onClick={onSubmit}>
            {isLoading ? "Loading" : "Submit"}
          </Button>

          <Button
            variant="secondary"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Dont have an account? <b>Signup</b>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
