interface Props {
	title: string;
	description?: string;
}

// Componente CustomHeader
// Renderiza un header centrado con título y descripción opcional
const CustomHeader = ({ title, description }: Props) => {
	return (
		<div className='content-center'>
			<h1>{title}</h1>
			{description && <p>{description}</p>}
		</div>
	);
};

export default CustomHeader;
