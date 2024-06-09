import { useParams } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import fetchUser from "../apis/fetch-user";
import { useEffect, useState } from "react";
import InputWithLabel from "../components/InputWithLabel";
import Button from "../components/Button";
import transfer from "../apis/send";

const Send = () => {
  const { toUserId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState<number>();

  const onFetchUser = async () => {
    if (!toUserId) return;

    const res = await fetchUser(toUserId);

    console.log(res);
  };

  useEffect(() => {
    setIsLoading(true);

    onFetchUser();

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <>Loading</>;

  const onChangeAmount = (newAmount: string) => {
    const num = parseFloat(newAmount);

    if (Number.isNaN(num)) return;

    setAmount(+newAmount);
  };

  const onSend = async () => {
    const msg = document.getElementById("sucessMessage");
    if (!toUserId || !amount || !msg) return;

    try {
      await transfer(toUserId, amount);
      msg.innerHTML = "Transaction Successful";
    } catch (error) {
      msg.innerHTML = "Transaction failed";
    }
  };

  return (
    <PageLayout>
      <div className="flex gap-4 items-end">
        <InputWithLabel
          onChange={(e) => onChangeAmount(e.target.value)}
          value={amount}
          type="number"
          label="Amount"
          placeholder="Please enter amount to send"
        />

        <div className="w-fit">
          <Button onClick={onSend}>Send</Button>
        </div>
      </div>

      <div id="sucessMessage"></div>
    </PageLayout>
  );
};

export default Send;
