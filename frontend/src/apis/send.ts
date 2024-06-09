import PaytmEasyApi from ".";

const transfer = async (toUserId: string, amount: number) => {
  try {
    const res = await PaytmEasyApi.post(`/api/v1/account/transfer`, {
      to: toUserId,
      amount,
    });

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export default transfer;
