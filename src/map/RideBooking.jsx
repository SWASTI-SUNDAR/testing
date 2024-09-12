import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Box, Button, VStack, Select, Text, useToast } from "@chakra-ui/react";
import { calculateDistance } from "../utils";
import { Link } from "react-router-dom";

const RideBooking = () => {
  const [pickup, setPickup] = useState(null);
  const [destination, setDestination] = useState(null);
  const [rideType, setRideType] = useState("economy"); // Default ride type
  const [fare, setFare] = useState(null);
  const toast = useToast(); 


  const handleMapClick = (e) => {
    if (!pickup) {
      setPickup({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    } else {
      setDestination({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    }
  };
  const handlePayment = () => {
    // Simulate a payment success
    toast({
      title: "Payment Successful!",
      description: `You have paid ₹${fare} for your ride.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  const calculateFare = () => {
    if (pickup && destination) {
      const distance = calculateDistance(pickup, destination);
      let baseFare = 10;

      if (rideType === "premium") {
        baseFare = 20;
      }

      const calculatedFare = baseFare * distance;
      setFare(calculatedFare.toFixed(2));

      // Save ride to history in localStorage
      const rideDetails = {
        pickup,
        destination,
        fare: calculatedFare.toFixed(2),
        rideType,
      };

      const rideHistory = JSON.parse(localStorage.getItem("rideHistory")) || [];
      rideHistory.push(rideDetails);
      localStorage.setItem("rideHistory", JSON.stringify(rideHistory));
    }
  };

  const mapContainerStyle = {
    height: "40vh",
    width: "90vw",
  };

  const center = {
    lat: 20.5937, // Latitude for India
    lng: 78.9629, // Longitude for India
  };

  return (
    <Box maxW="sm" mx="auto" mt={10}>
      <VStack spacing={4}>
        <LoadScript googleMapsApiKey="AIzaSyAFdsr5GHdAJIHWvQJ2Abw9Vw06L-oqulE">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={5}
            center={center}
            onClick={handleMapClick}
          >
            {pickup && <Marker position={pickup} />}
            {destination && <Marker position={destination} />}
          </GoogleMap>
        </LoadScript>

        {/* Ride Type Selection */}
        <Select
          placeholder="Select Ride Type"
          value={rideType}
          onChange={(e) => setRideType(e.target.value)}
        >
          <option value="economy">Economy</option>
          <option value="premium">Premium</option>
        </Select>

        <Button colorScheme="teal" onClick={calculateFare}>
          Calculate Fare
        </Button>

        {/* Display Fare */}
        {fare && (
          <>
            <Text>The estimated fare is ₹{fare}</Text>

            {/* Payment Button */}
            <Button colorScheme="blue" onClick={handlePayment}>
              Make Payment
            </Button>
          </>
        )}

        <Button as={Link} to="/" colorScheme="gray">
          Back to Home
        </Button>
      </VStack>
    </Box>
  );
};

export default RideBooking;
