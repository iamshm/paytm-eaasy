import { useParams } from "react-router-dom";
import PageLayout from "../components/PageLayout";

const Send = () => {
  const { toUserId } = useParams();

  console.log(toUserId);

  return (
    <PageLayout>
      <div>Send</div>
    </PageLayout>
  );
};

export default Send;
