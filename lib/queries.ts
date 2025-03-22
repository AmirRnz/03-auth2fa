import prisma from "./db";

export const createSubscriber = async (email: string, token: string) => {
  return prisma.subscriber.create({
    data: {
      email,
      token,
    },
  });
};

export const getSubscriberByToken = async (token: string) => {
  return prisma.subscriber.findFirst({
    where: { token },
  });
};

export const updateSubscriberToVerified = async (id: string) => {
  return await prisma.subscriber.update({
    where: {
      xata_id: id,
    },
    data: {
      verified: true,
    },
  });
};
