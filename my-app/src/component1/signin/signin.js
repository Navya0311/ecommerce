import { useState } from "react";
import { Input, FormControl, FormLabel, FormHelperText, Flex, Card, CardBody, Button, Text, Link, Heading } from "@chakra-ui/react";
import axios from 'axios';
import { api } from "../actions/api";
import { useNavigate } from 'react-router-dom'; 

export const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async () => {
        try {
            const res = await axios.post(`${api}/signin`, { email, password });
            if (res.data.message) {
                console.log(res?.data?.values);
                alert("Login successful");
                navigate("/");  // Navigate to the home page after successful login
            } else {
                alert("Invalid email or password");
                navigate("/signup"); 
            }
        } catch (e) {
            console.error(e);
            alert("Login failed");
        }
    };

    return (
        <Flex 
            height="100vh"  
            alignItems="center"  
            justifyContent="center"  
        >
            <Card boxShadow="md" borderRadius="md" width="sm">
                <CardBody>
                    <Heading as="h2" size="lg" textAlign="center" mb={6}>
                        Sign In
                    </Heading>
                    <FormControl mb={4}>
                        <FormLabel>Email address</FormLabel>
                        <Input 
                            type='email' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FormHelperText>We'll never share your email.</FormHelperText>
                    </FormControl>

                    <FormControl mb={6}>
                        <FormLabel>Password</FormLabel>
                        <Input 
                            type='password' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>

                    <Button 
                        colorScheme="teal" 
                        width="full"  
                        onClick={handleSubmit}  
                        mb={4}
                    >
                        Sign In
                    </Button>

                    <Text textAlign="center" mb={4}>
                        Don't have an account?{" "}
                        <Link color="teal.500" href="/signup">
                            Sign Up
                        </Link>
                    </Text>

                    <Text textAlign="center">
                        <Link color="teal.500" href="/forgotpassword">
                            Forgot Password?
                        </Link>
                    </Text>
                </CardBody>
            </Card>
        </Flex>
    );
};
