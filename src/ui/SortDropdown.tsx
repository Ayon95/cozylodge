import { useSearchParams } from 'react-router-dom';

import Select from './Select';

interface SortDropdownProps {
	options: { label: string; value: string }[];
}

function SortDropdown({ options }: SortDropdownProps) {
	const [searchParams, setSearchParams] = useSearchParams();
	const currentSortValue = searchParams.get('sort');

	function setSortSearchParam(e: React.ChangeEvent<HTMLSelectElement>) {
		if (e.target.value === '') searchParams.delete('sort');
		else searchParams.set('sort', e.target.value);
		setSearchParams(searchParams);
	}
	return (
		<>
			<label htmlFor="sortBy" className="sr-only">
				Sort By
			</label>
			<Select
				options={options}
				placeholder="Sort By"
				value={currentSortValue || ''}
				onChange={setSortSearchParam}
				id="sortBy"
			/>
		</>
	);
}

export default SortDropdown;
