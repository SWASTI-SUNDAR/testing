import React from "react";
import { Box, Button, VStack, Heading, Image } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data from localStorage
    navigate("/login"); // Redirect to login page
  };
  return (
    <Box maxW="md" mx="auto" mt={10} p={6} boxShadow="lg" borderRadius="md">
      <VStack spacing={6}>
        <Heading as="h1" size="xl" textAlign="center">
          Ride Sharing App
        </Heading>

        {/* Optional App Image */}
        <Image
          borderRadius="md"
          boxSize="400px"
          src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*tsToDy7vp-D6MGlAq1izOw.jpeg"
          alt="Ride Sharing App"
        />

        <Button as={Link} to="/profile" colorScheme="teal" width="100%">
          Go to Profile
        </Button>
        <Button as={Link} to="/ride-booking" colorScheme="teal" width="100%">
          Book a Ride
        </Button>
        <Button as={Link} to="/ride-history" colorScheme="blue" width="100%">
          View Ride History
        </Button>
        <Button
          as={Link}
          to="/login"
          colorScheme="red"
          width="100%"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </VStack>
    </Box>
  );
};

export default Home;
