import PaytmEasyApi from ".";

interface SigninPayload {
  email: string;
  password: string;
}

const signin = async (payload: SigninPayload) => {
  try {
    const res = await PaytmEasyApi.post("/api/v1/user/signin", payload);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export default signin;
