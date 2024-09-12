import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Text,
  Heading,
  Button,
  Image,
  Grid,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) return <Text>Loading...</Text>;
  console.log(user);
  return (
    <Box maxW="md" mx="auto" mt={10} p={6} boxShadow="lg" borderRadius="md">
      <VStack spacing={6}>
        <Heading as="h2" size="lg">
          Profile Details
        </Heading>

        {/* Profile Image */}
        <Image
          borderRadius="full"
          boxSize="150px"
          src={user.image} // Using the profile image from the dummy data
          alt={`${user.firstName} ${user.lastName}`}
        />

        {/* User Info */}
        <Grid templateColumns="repeat(2, 1fr)" gap={4} textAlign="left">
          <Text fontWeight="bold">Name:</Text>
          <Text>
            {user.firstName} {user.lastName}
          </Text>

          <Text fontWeight="bold">Username:</Text>
          <Text>{user.username}</Text>

          <Text fontWeight="bold">Email:</Text>
          <Text>{user.email}</Text>

          <Text fontWeight="bold">Gender:</Text>
          <Text>{user.gender}</Text>
        </Grid>

        {/* Back to Home Button */}
        <Button as={Link} to="/" colorScheme="gray" mt={4}>
          Back to Home
        </Button>
      </VStack>
    </Box>
  );
};

export default Profile;
