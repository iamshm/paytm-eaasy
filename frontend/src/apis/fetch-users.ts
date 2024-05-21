import PaytmEasyApi from ".";

const fetchUsers = async () => {
  try {
    const res = await PaytmEasyApi.get("/api/v1/user/bulk");

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export default fetchUsers;
