import { Box, Text, Flex, useColorModeValue } from "@chakra-ui/react";

const Footer = () => {
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Box 
      as="footer" 
      marginTop={50}
      paddingY={6}
      backgroundColor={bgColor}
    >
      <Flex 
        justifyContent="center" 
        alignItems="center" 
        flexDirection="column"
        gap={2}
      >
        <Text 
          fontSize="sm" 
          color={textColor}
          fontWeight="medium"
        >
          Powered by Google Gemini AI
        </Text>
        
        <Text 
          fontSize="xs" 
          color={textColor} 
          opacity={0.7}
        >
          © {new Date().getFullYear()} - Built with React
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;