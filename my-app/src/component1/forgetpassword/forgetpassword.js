import { useState } from 'react';
import { Input, FormControl, FormLabel, FormHelperText, Flex, Card, CardBody, Button, Text, Link, useToast } from "@chakra-ui/react";
import axios from 'axios'; // Import axios for API calls
import { api } from "../actions/api"; // Import your API endpoint

export const ForgotPassword = () => {
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [emailError, setEmailError] = useState('');
    const [otpError, setOtpError] = useState('');
    const toast = useToast(); // For displaying toast notifications

    const handleSendOtp = async () => {
        setEmailError('');
        if (!email) {
            setEmailError('Email is required');
            return;
        }
        
        try {
            // Make API call to send OTP
            await axios.post(`${api}/send-otp`, { email });
            setIsOtpSent(true);
            toast({
                title: "OTP Sent",
                description: "An OTP has been sent to your email address.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            console.error("Error sending OTP:", error);
            toast({
                title: "Error",
                description: "Failed to send OTP. Please try again.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleVerifyOtp = async () => {
        setOtpError('');
        if (!otp) {
            setOtpError('OTP is required');
            return;
        }

        try {
            // Make API call to verify OTP
            await axios.post(`${api}/verify-otp`, { email, otp });
            toast({
                title: "OTP Verified",
                description: "Your OTP has been verified successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            // Redirect to password reset page or show a success message
        } catch (error) {
            console.error("Error verifying OTP:", error);
            toast({
                title: "Error",
                description: "Failed to verify OTP. Please try again.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
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
                    {!isOtpSent ? (
                        <>
                            <FormControl mb={4} isInvalid={!!emailError}>
                                <FormLabel>Email address</FormLabel>
                                <Input 
                                    type='email' 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <FormHelperText>Enter the email address you used to register. We will send a link to reset your password.</FormHelperText>
                                {emailError && <Text color="red.500" mt={2}>{emailError}</Text>}
                            </FormControl>

                            <Button 
                                colorScheme="teal"
                                width="full"
                                onClick={handleSendOtp}
                                mb={4}
                            >
                                Send OTP
                            </Button>
                        </>
                    ) : (
                        <>
                            <FormControl mb={4} isInvalid={!!otpError}>
                                <FormLabel>Enter OTP</FormLabel>
                                <Input 
                                    type='text' 
                                    value={otp} 
                                    onChange={(e) => setOtp(e.target.value)} 
                                />
                                <FormHelperText>Enter the OTP sent to your email.</FormHelperText>
                                {otpError && <Text color="red.500" mt={2}>{otpError}</Text>}
                            </FormControl>

                            <Button 
                                colorScheme="teal"
                                width="full"
                                onClick={handleVerifyOtp}
                                mb={4}
                            >
                                Verify OTP
                            </Button>
                        </>
                    )}

                    <Text textAlign="center">
                        Remembered your password?{" "}
                        <Link color="teal.500" href="/signin">
                            Sign In
                        </Link>
                    </Text>
                </CardBody>
            </Card>
        </Flex>
    );
}
