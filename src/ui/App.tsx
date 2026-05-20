import { useState } from 'react';
import { Input } from './components/Input';
import { saveRedisFile } from '@/server/file';

const App = () => {
	const [succes, setSucces] = useState<boolean>(false);
	const [error, setError] = useState<string | unknown | Error>("");

	const onSubmit = async (uri: string) => {

		try {
			const res = await saveRedisFile(uri);

			if (typeof res !== 'boolean') {
				setError(res);
			}
			setSucces(true)
		} catch (err) {
			setError(err);
		}

	}

	return <>
		<Input onSubmit={onSubmit} succes={succes} />
	</>
};

export default App;