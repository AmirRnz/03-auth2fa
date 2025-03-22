import confirmationEmail from "@/emails/confirmationEmail";
import React from "react";
import { Resend } from "resend";

export const sendConfirmationEmail = async (email: string, link: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = `Email Confirmation <amirrnz@xikode.lol>`;
  const res = await resend.emails.send({
    from,
    to: email,
    subject: "confirm your email",
    react: React.createElement(confirmationEmail, { link }),
  });
  return res;
};
