import { useState } from "react";
import { Input, FormControl, FormLabel, FormHelperText, Flex, Card, CardBody, Button, Text, Link, Heading } from "@chakra-ui/react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { api } from "../actions/api"; 

export const Signup = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        try {
            // Check if passwords match
            if (password !== confirmPassword) {
                alert("Passwords do not match.");
                return;
            }

            // Send a POST request to the signup API endpoint
            const res = await axios.post(`${api}/signup`, { email, username, password, address, pincode });

            // Check the response for success message
            if (res.data.message) {
                console.log(res?.data?.user); // Optionally log the created user data
                alert("Signup successful");
                navigate("/signin"); // Redirect to Sign-In page on successful signup
            } else {
                // Handle unexpected responses (if any)
                alert("Unexpected response from server");
            }
        } catch (error) {
            // Handle errors from the server or client
            if (error.response) {
                // If there's a response from the server, handle specific errors
                if (error.response.data.error === "User already exists") {
                    alert("User already exists. Please sign in.");
                    navigate("/signin"); // Redirect to Sign-In page
                } else {
                    alert(error.response.data.error || "Signup failed. Please try again.");
                }
            } else {
                // Handle errors without a response (e.g., network issues)
                console.error(error);
                alert("Signup failed. Please try again.");
            }
        }
    };

    return (
        <Flex
            height="100vh" // Full viewport height
            alignItems="center" // Vertically center the content
            justifyContent="center" // Horizontally center the content
        >
            <Card boxShadow="md" borderRadius="md" width="sm"> {/* Card component for form styling */}
                <CardBody>
                    <Heading as="h2" size="lg" textAlign="center" mb={6}>
                        Sign Up
                    </Heading>
                    <form onSubmit={handleSubmit}> {/* Add form element with onSubmit handler */}
                        <FormControl mb={4}>
                            <FormLabel>Username</FormLabel>
                            <Input
                                type='text'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </FormControl>

                        <FormControl mb={4}>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <FormHelperText>We'll never share your email.</FormHelperText>
                        </FormControl>

                        <FormControl mb={4}>
                            <FormLabel>Create Password</FormLabel>
                            <Input
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>

                        <FormControl mb={6}>
                            <FormLabel>Confirm Password</FormLabel>
                            <Input
                                type='password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </FormControl>

                        <FormControl mb={4}>
                            <FormLabel>Address</FormLabel>
                            <Input
                                type='text'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </FormControl>

                        <FormControl mb={6}>
                            <FormLabel>Pin Code</FormLabel>
                            <Input
                                type='text'
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                            />
                        </FormControl>

                        <Button
                            colorScheme="teal" // Cool color for the button
                            width="full" // Full width button
                            type="submit" // Submit button type
                            mb={4}
                        >
                            Sign Up
                        </Button>
                    </form>

                    <Text textAlign="center">
                        Already have an account?{" "}
                        <Link color="teal.500" href="/signin"> {/* Link to sign-in page */}
                            Sign In
                        </Link>
                    </Text>
                </CardBody>
            </Card>
        </Flex>
    );
};
