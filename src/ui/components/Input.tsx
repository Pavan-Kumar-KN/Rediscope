import { useInput, Box, Text } from "ink";
import { FC, useEffect, useState } from "react";

interface InputProps {
    initialValue?: string;
    error?: string;
    succes?: boolean;
    setScreen?: (state: unknown) => void;
    onSubmit: (uri: string) => void;
}

export const Input: FC<InputProps> = ({ initialValue = "", error, succes, setScreen, onSubmit }) => {
    const [input, setInput] = useState<String>(initialValue);
    const [cursorVisible, setCursorVisible] = useState<boolean>(false);

    // load the cursor pointer after loading the UI in the terminal
    useEffect(() => {
        setTimeout(() => {
            setCursorVisible(value => !value);
        }, 500);
    }, []);

    useInput((value, key) => {
        if (key.return) {
            onSubmit(input.trim());
        }
        else if(key.ctrl && value === 'u') {
            setInput("");
        }
        else if (key.ctrl && value === 'k') {
            setScreen && setScreen({
                name: "playground"
            });
        }
        else if (key.backspace || key.delete) {
            setInput(prev => prev.slice(0, -1))
        }
        else if (!key.ctrl && !key.meta && value && value.length > 0) {
            setInput(prev => prev+ value);
        }
    })

    return (
        <>
            <Box
                flexDirection="column"
                padding={1}
                borderStyle="round"
                borderColor="cyan"
            //   width={width}
            >
                <Box justifyContent="center" marginBottom={1}>
                    <Text bold color="cyan">
                        Rediscope — Redis Connection
                    </Text>
                </Box>
                <Box marginBottom={1}>
                    <Text>Paste your Redis URI below:</Text>
                </Box>
                <Box borderStyle="single" borderColor="gray" paddingX={1}>
                    <Text>
                        {input}
                        <Text color="cyan">{cursorVisible ? '█' : ' '}</Text>
                    </Text>
                </Box>

                {
                    succes && (
                        <Box marginTop={1}>
                            <Text color="green">connection Sucessfull !! </Text>
                            <Text dimColor>Ctrl+K: Playground</Text>
                        </Box>
                    )
                }

                {error && (
                    <Box marginTop={1}>
                        <Text color="red">✗ {error}</Text>
                    </Box>
                )}
                <Box marginTop={1} justifyContent="space-between">
                    <Text dimColor>Enter: connect</Text>
                    <Text dimColor>Ctrl+U: clear</Text>
                    <Text dimColor>Ctrl+C: exit</Text>
                </Box>
            </Box>
        </>
    )
}

