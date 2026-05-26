interface Props {
	searches: string[];

	onLabelClicked: (term: string) => void;
}

// Componente PreviousSearches
// Muestra una lista de etiquetas clicables con los términos buscados anteriormente
export const PreviousSearches = ({ searches, onLabelClicked }: Props) => {
	return (
		<div className='previous-searches'>
			<h2>Busquedas previas</h2>
			<ul className='previous-searches-list'>
				{searches.map((term) => (
					<li key={term} onClick={() => onLabelClicked(term)}>
						{term}
					</li>
				))}
			</ul>
		</div>
	);
};
