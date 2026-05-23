import { useEffect, useState } from 'react';
import { Input } from './components/Input';
import { saveRedisFile, verifyConfig } from '@/server/file';
import { connectToRedis } from '@/server/redis';
import { Box  , Text} from 'ink';
import { verifyURL } from './lib/helper';
import Loading from './components/Loading';
import ErrorScreen from './components/Error';

const App = () => {
	const [succes, setSucces] = useState<boolean>(false);
	const [error, setError] = useState<string | unknown | Error>("");
	const [screen, setScreen] = useState<unknown>({
		name: "loading"
	});


	useEffect( () => {
		async function checkConfig() {
			await getScreen();
		}

		checkConfig();
	}, [])

	const getScreen = async () => {
		const config: boolean | Error  | any = await verifyConfig();

		if (config) {
			setSucces(true);
			setScreen({
				name: "playground"
			});
		}
		

		else if (config instanceof Error) {
			setScreen({
				name: "error",
				message: config || "An error occurred while verifying the configuration."
			});
		}

		else if (!config) {
			setScreen({
				name: "input"
			});
		}
	}



	const onSubmit = async (uri: string) => {

		try {
			if (!verifyURL(uri)) {
				setError("Invalid Redis URL");
				setSucces(!succes);
				return;
			}

			const res = await saveRedisFile(uri);

			if (typeof res !== 'boolean') {
				setError(res);
			}


			const conn = await connectToRedis(uri);

			setError(JSON.stringify(conn));

			setSucces(true)
		} catch (err) {
			setError(err);
		}

	}

	const renderScreen = () => {
		switch(screen && screen.name) {
			case "input":
				return <Input onSubmit={onSubmit} succes={succes} error={error} setScreen={setScreen} />
			case "playground":
				return <Box><Text>{screen && screen.name}</Text></Box>

			case "error":
				return <Box><ErrorScreen message={screen && screen.message} /></Box>

			default:
				return <Box>
					<Loading />
				</Box>
		}
	}

	return <>
		{renderScreen()}
	</>
};

export default App;