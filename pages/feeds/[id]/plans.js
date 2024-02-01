import { useEffect, useState } from "react";
import SinglePlan from "../../../components/SinglePlan";
import Loader from "../../../components/Loader";
import axios from "axios";
import { getApiDomain } from "../../../config/appInfo";
import styles from "../../../components/SinglePlan/SinglePlan.module.css";

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  return {
    props: {
      id,
    },
  };
}

const Plans = ({ id }) => {
  const [plans, setPlans] = useState([]);
  const [activePlan, setActivePlan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(getApiDomain() + `/feeds/${id}/plans`)
      .then((response) => setPlans(response.data.data));
    axios
      .get(getApiDomain() + `/feeds/${id}`)
      .then((response) => setActivePlan(response.data.data.activePlan));
    setLoading(false);
  }, []);
  if (loading) {
    return <Loader />;
  } else {
    return (
      <div className={styles.plansContainer}>
        {plans.map((plan, index) => (
          <SinglePlan plan={plan} index={index} activePlan={activePlan} feedId={id} />
        ))}
      </div>
    );
  }
};

export default Plans;
