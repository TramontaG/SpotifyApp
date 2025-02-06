type ContextData = {
	runId: string;
};

const AppContext = () => {
	let contextData: ContextData = {
		runId: Math.floor(Math.random() * 16 ** 12).toString(16),
	};

	const upsert = (data: Partial<ContextData>) => {
		contextData = {
			...contextData,
			...data,
		};
	};

	const get = <Key extends keyof ContextData>(key: Key): ContextData[Key] => {
		return contextData[key];
	};

	return {
		get,
		upsert,
	};
};

export default AppContext();
