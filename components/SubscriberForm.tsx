"use client";
import { subscribe } from "@/actions/subscribe";
import SubscribeButton from "./SubscribeButton";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SubscriberForm = () => {
  const router = useRouter();
  const handleSubmit = async (formData: FormData) => {
    const { error, data } = await subscribe(formData);
    if (error) {
      console.error(error);
      toast.error(error);
    } else {
      console.log(data);
      toast.success(data as string);
      router.push("/subscriber/pending");
    }
  };
  return (
    <form action={handleSubmit}>
      <label htmlFor="email" className="hidden"></label>
      <div className="relative">
        <input
          type="text"
          name="email"
          id="email"
          className="w-full rounded-md border border-white/[0.67] bg-transparent p-3 pl-4 text-white"
        />
        <SubscribeButton />
      </div>
    </form>
  );
};

export default SubscriberForm;
