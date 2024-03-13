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
    await axios.patch(getApiDomain() + `/api/feeds/${id}`, {
      activePlan: planId,
    });
  };
  useEffect(() => {
    if (!!plan) {
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
          <div className={styles.infos}>
            <Text sh1 bold className={styles.title}>
              {plan.title}
            </Text>
            <div>
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
            </div>
          </div>
          <div className={styles.items}>
            {plan.items.map((el) => (
              <div className={styles.item}>
                <Image src={Checked} />
                <Text className={styles.ui2} ui2>
                  {el}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default SinglePlan;
