import {
  getSubscriberByToken,
  updateSubscriberToVerified,
} from "@/lib/queries";
import React from "react";

interface ConfirmPageProps {
  params: {
    token: string;
  };
}

const ConfirmPage = async ({ params }: ConfirmPageProps) => {
  const { token } = params;
  const existingSubscriber = await getSubscriberByToken(token);
  if (!existingSubscriber) {
    throw new Error("invalid token");
  }
  await updateSubscriberToVerified(existingSubscriber.xata_id);
  return (
    <>
      <p className="text-xl mb-4">{existingSubscriber.email}</p>
      <h1 className="mb-10 font-semibold tracking-tight text-4xl">
        {" "}
        verified👍
      </h1>
    </>
  );
};

export default ConfirmPage;
