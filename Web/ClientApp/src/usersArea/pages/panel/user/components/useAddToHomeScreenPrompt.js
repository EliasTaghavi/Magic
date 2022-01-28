import * as React from "react";

export const useAddToHomeScreenPrompt = () => {
	const [prompt, setState] = React.useState(null);

	const promptToInstall = () => {
		if (prompt) {
			return prompt.prompt();
		}
		return Promise.reject(
			new Error(
				'Tried installing before browser sent "beforeinstallprompt" event'
			)
		);
	};

	const ready = (e) => {
		e.preventDefault();
		setState(e);
	};

	React.useEffect(() => {
		window.addEventListener("beforeinstallprompt", ready);
		return () => {
			window.removeEventListener("beforeinstallprompt", ready);
		};
	}, []);

	return {prompt, promptToInstall};
}
