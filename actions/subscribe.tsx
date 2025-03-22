"use server";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { createSubscriber } from "@/lib/queries";
import { sendConfirmationEmail } from "@/lib/email";
interface RetVal<T> {
  error?: string;
  data?: T;
}
const subscribeSchema = z.object({
  email: z.string().email(),
});
export const subscribe = async (
  formdata: FormData
): Promise<RetVal<string>> => {
  const email = formdata.get("email");
  const parsed = subscribeSchema.safeParse({ email });
  if (!parsed.success) {
    return { error: "invalid email" };
  }
  const validatedEmail = parsed.data.email.toLowerCase();
  const token = uuidv4();
  try {
    const newSubscriber = await createSubscriber(validatedEmail, token);
  } catch (error: any) {
    console.error(error);
    if (error?.code === "P2002") {
      return { error: "email already exists" };
    }
    return { error: "Failed to subscribe" };
  }
  const link = `${process.env.NEXT_PUBLIC_BASE_URL}/subscriber/confirm/${token}`;
  const res = await sendConfirmationEmail(validatedEmail, link);
  if (res?.error) {
    return { error: "failed to send confirmation email" };
  }
  return { data: "check your email to confirm" };
};
