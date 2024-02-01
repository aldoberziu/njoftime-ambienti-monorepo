"use client";
import styles from "./SinglePlan.module.css";
import Button from "../Button/index";
import Loader from "../Loader";
import Text from "../Text";
import { Checked } from "../../icons";
import { getApiDomain } from "../../config/appInfo";
import axios from "axios";
import Router from "next/router";
import Image from "next/image";
import { useState } from "react";

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  return {
    props: {
      id,
    },
  };
}

const SinglePlan = (props) => {
  let { plan, index, activePlan } = props;

  const [loading, setLoading] = useState(false);

  const updatePlan = async (planId) => {
    setLoading(true);
    Router.reload();
    let feedId = props.feedId;
    await axios.patch(getApiDomain() + `/feeds/${feedId}/plans`, {
      activePlan: planId,
    });
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div className={styles.planCardContainer} index={index + 1} key={index}>
        <Text h2 className={styles.title}>
          {plan.title}
        </Text>
        <Text sh1 className={styles.price}>
          {plan.price}
        </Text>
        {index + 1 === parseInt(activePlan) ? (
          <Button disabled className={styles.postoNjoftimin}>
            Plani Aktual
          </Button>
        ) : (
          <Button className={styles.postoNjoftimin} onClick={() => updatePlan(plan._id)}>
            Posto Njoftimin
          </Button>
        )}
        {plan.items.map((el) => (
          <div className={styles.items}>
            <Image src={Checked} />
            <Text className={styles.ui2} ui2>
              {el}
            </Text>
          </div>
        ))}
      </div>
    );
  }
};

export default SinglePlan;
