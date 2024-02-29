import { useEffect, useState } from "react";
import SinglePlan from "../../../components/SinglePlan";
import Loader from "../../../components/Loader";
import axios from "axios";
import { getApiDomain } from "../../../config/appInfo";
import Text from "../../../components/Text";
import styles from "../../../components/SinglePlan/SinglePlan.module.css";

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  let plans = await axios.get(getApiDomain() + `/plans`);
  let feed = await axios.get(getApiDomain() + `/feeds/${id}`);
  return {
    props: {
      id,
      plans: plans?.data?.data,
      feed: feed?.data?.data?.activePlan,
    },
  };
}

const Plans = ({ plans, feed: activePlan, id }) => {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div>
        <Text h3 className={styles.header}>ZGJIDHNI SHËRBIMET TONA TË MARKETINGUT RRETH NJOFTIMEVE TË PUNËS</Text>
        <div className={styles.plansContainer}>
          {plans.map((plan) => (
            <SinglePlan plan={plan} activePlan={activePlan} id={id} />
          ))}
        </div>
      </div>
    );
  }
};

export default Plans;
