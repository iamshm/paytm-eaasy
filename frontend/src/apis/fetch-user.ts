import PaytmEasyApi from ".";

const fetchUser = async (toUserId: string) => {
  try {
    const res = await PaytmEasyApi.get(`/api/v1/user/one/${toUserId}`);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export default fetchUser;
