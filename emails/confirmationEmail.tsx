import {
  Tailwind,
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
} from "@react-email/components";
import React from "react";
const confirmationEmail = ({ link }: { link: string }) => {
  return (
    <Tailwind>
      <Html lang="en">
        <Head />
        <Preview>Confirm your email address</Preview>
        <Body className="font-sans">
          <Container>
            <Heading className="text-2xl">You are almost there</Heading>
            <Text className="">Please click link to verify your email</Text>
            <Text className="bg-gray-200 text-center px-4 py-2 rounded-md">
              {link}
            </Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default confirmationEmail;
