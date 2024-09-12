import React, { useState } from "react";
import { Box, Button, Input, VStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // Function to handle the login process
  const handleLogin = async (userEmail, userPassword) => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userEmail,
          password: userPassword,
          expiresInMins: 30,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Logged in:", data);

        // Store user info in localStorage
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
      } else {
        setError("Invalid login credentials");
      }
    } catch (error) {
      setError("An error occurred during login");
      console.error(error);
    }
  };

  // Normal login using the input fields
  const handleNormalLogin = () => {
    handleLogin(email, password);
  };

  // Guest login with predefined credentials
  const handleGuestLogin = () => {
    handleLogin("emilys", "emilyspass");
  };

  return (
    <Box maxW="sm" mx="auto" mt={10}>
      <VStack spacing={4}>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Text color="red">{error}</Text>}
        <Button onClick={handleNormalLogin} colorScheme="teal">
          Login
        </Button>
        <Button onClick={handleGuestLogin} colorScheme="blue">
          Sign in as Guest
        </Button>
      </VStack>
    </Box>
  );
};

export default Login;
