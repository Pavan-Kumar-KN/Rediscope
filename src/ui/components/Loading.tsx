import { Box, Text } from "ink";
import { useEffect, useState } from "react";

const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

const Loading = () => {
    const [frame, setFrame] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setFrame(prev => (prev + 1) % frames.length);
        }, 80);

        return () => clearInterval(id);
    }, []);

    return (
        <Box
            flexDirection="column"
            padding={1}
            borderStyle="round"
            borderColor="cyan"
        >
            <Box justifyContent="center" marginBottom={1}>
                <Text bold color="cyan">
                    Rediscope
                </Text>
            </Box>

            <Box justifyContent="center" marginBottom={1}>
                <Text color="white">
                    {frames[frame]} Connecting to Redis...
                </Text>
            </Box>

            <Box justifyContent="center" marginBottom={1}>
                <Text dimColor>
                    Validating URL, creating config, and opening the playground
                </Text>
            </Box>

            <Box justifyContent="space-between">
                <Text dimColor>Press Ctrl+C to exit</Text>
                <Text dimColor>Please wait</Text>
            </Box>
        </Box>
    );
};

export default Loading;