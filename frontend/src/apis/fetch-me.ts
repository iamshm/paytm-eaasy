import PaytmEasyApi from ".";

const fetchMe = async () => {
  try {
    const res = await PaytmEasyApi.get("/api/v1/user/me");

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export default fetchMe;
