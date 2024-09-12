import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Text,
  Heading,
  Grid,
  GridItem,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const RideHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const rideHistory = JSON.parse(localStorage.getItem("rideHistory")) || [];
    setHistory(rideHistory);
  }, []);

  return (
    <Box maxW="lg" mx="auto" mt={10} p={6} boxShadow="lg" borderRadius="md">
      <VStack spacing={6}>
        <Heading as="h2" size="lg" textAlign="center">
          Ride History
        </Heading>

        {history.length === 0 ? (
          <Text>No rides booked yet.</Text>
        ) : (
          history.map((ride, index) => (
            <Box
              key={index}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              width="100%"
            >
              <Grid templateColumns="repeat(2, 1fr)" gap={4} textAlign="left">
                <GridItem>
                  <Text fontWeight="bold">Pickup:</Text>
                  <Text>
                    {ride.pickup.lat}, {ride.pickup.lng}
                  </Text>
                </GridItem>

                <GridItem>
                  <Text fontWeight="bold">Destination:</Text>
                  <Text>
                    {ride.destination.lat}, {ride.destination.lng}
                  </Text>
                </GridItem>

                <GridItem>
                  <Text fontWeight="bold">Fare:</Text>
                  <Text>₹{ride.fare}</Text>
                </GridItem>

                <GridItem>
                  <Text fontWeight="bold">Ride Type:</Text>
                  <Text>{ride.rideType}</Text>
                </GridItem>
              </Grid>
            </Box>
          ))
        )}

        <Button as={Link} to="/" colorScheme="gray">
          Back to Home
        </Button>
      </VStack>
    </Box>
  );
};

export default RideHistory;
