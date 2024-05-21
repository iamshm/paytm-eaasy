import PaytmEasyApi from ".";

interface SignupPayload {
  email: string;
  password: string;
  name?: string;
}

const signup = async (payload: SignupPayload) => {
  try {
    const res = await PaytmEasyApi.post("/api/v1/user/signup", payload);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export default signup;
