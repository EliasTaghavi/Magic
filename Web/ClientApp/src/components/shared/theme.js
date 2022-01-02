export const theme = {
	suggestionsContainerOpen: {
		backgroundColor: 'white',
		border: '1px solid #cdcdcd',
		borderRadius: 4,
		position: 'absolute',
		zIndex: 500,
		width: '89%',
		maxHeight: 200,
		listStyle: 'none',
		overflowY: 'scroll',
	},
	suggestionsList: {
		padding: 0,
		listStyle: 'none',
	},
	suggestion: {
		padding: 5,
		cursor: 'pointer',
	},
	suggestionHighlighted: {
		backgroundColor: '#eaeaea',
	},
	customStyles: {
		menu: () => ({
			position: 'absolute',
			zIndex: 10000,
			backgroundColor: 'white',
			width: '100%',
			textAlign: 'center',
			boxShadow: '1px 1px 5px #cccccc',
		}),
		menuList: () => ({
			position: 'absolute',
			zIndex: 10000,
			backgroundColor: 'white',
			marginTop: 7,
			paddingTop: 5,
			paddingBottom: 5,
			width: '100%',
			height: 'auto',
			maxHeight: 150,
			borderRadius: 4,
			overflowY: 'auto',
			textAlign: 'right',
			boxShadow: '0 0 5px #cccccc',
		}),
		option: (provided, state) => ({
			...provided,
			borderBottom: '1px dotted pink',
			color: 'black',
			backgroundColor: state.isFocused ? '#ededed' : 'transparent',
			padding: 12,
		}),
		singleValue: (provided, state) => ({
			...provided,
			transition: '300ms'
		}),
		noOptionsMessage: (base) => ({
			...base,
			color: 'red',
		}),
	},
};
