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
import { useEffect, useState } from "react";

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  return {
    props: {
      id,
    },
  };
}

const SinglePlan = ({ plan, activePlan, id }) => {
  const [loading, setLoading] = useState(false);

  const updatePlan = async (planId) => {
    setLoading(true);
    Router.reload();
    await axios.patch(getApiDomain() + `/feeds/${id}`, {
      activePlan: planId,
    });
  };
  useEffect(() => {
    if (plan) {
      setLoading(false);
    }
  }, [plan]);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div className={styles.wrapper}>
        <div className={`${styles.recommended} ${plan._id !== "3" ? styles.hide : ""}`}>
          <Text sh2>Rekomandohet</Text>
        </div>
        <div className={styles.planCardContainer} key={plan._id}>
          <Text sh1 bold className={styles.title}>
            {plan.title}
          </Text>
          <Text sh2 className={styles.price}>
            {plan.price}
          </Text>
          {plan._id === activePlan ? (
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
      </div>
    );
  }
};

export default SinglePlan;
