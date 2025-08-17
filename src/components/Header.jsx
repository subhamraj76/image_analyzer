import { Heading, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <>
      <Heading color="white" marginBottom="3rem" size="3xl">
        Image Analyzer
      </Heading>
      <Text fontSize={25} textAlign="center" marginBottom="2rem">
        Upload and analyze your images with detailed insights and information.
      </Text>
    </>
  );
};

export default Header;