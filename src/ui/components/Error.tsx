import { Box, Text } from "ink";

type ErrorScreenProps = {
  message: string;
  onRetry?: () => void;
};

const ErrorScreen = ({ message, onRetry }: ErrorScreenProps) => {
  return (
    <Box flexDirection="column" padding={1} borderStyle="round" borderColor="red">
      <Box justifyContent="center" marginBottom={1}>
        <Text bold color="red">
          Rediscope failed to connect
        </Text>
      </Box>

      <Box marginBottom={1}>
        <Text color="white">{message}</Text>
      </Box>

      <Box marginBottom={1}>
        <Text dimColor>
          Check the Redis URL, make sure the server is reachable, and try again.
        </Text>
      </Box>

      <Box justifyContent="space-between">
        <Text dimColor>Enter: retry</Text>
        <Text dimColor>Ctrl+C: exit</Text>
      </Box>
    </Box>
  );
};

export default ErrorScreen;