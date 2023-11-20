import './input.css';

const Input = (props) => {
	
	const { value, type, placeholder, label, onChangeFunction } = props;
	
	return (
		<label className='input-common'>
			{ label }
			<input 
			type={type || "text"}
			placeholder={placeholder}
			onChange={(event) => onChangeFunction(event.target.value)}
			value={value} />
		</label>
		
	)
}

export default Input;
