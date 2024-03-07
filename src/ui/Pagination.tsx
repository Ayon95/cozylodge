import { PAGE_SIZE } from '@/utils/constants';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

interface PaginationProps {
	totalCount: number;
}

function Pagination({ totalCount }: PaginationProps) {
	const [searchParams, setSearchParams] = useSearchParams();
	const pageQueryParamValue = searchParams.get('page');
	const currentPageNum = !pageQueryParamValue ? 1 : Number.parseFloat(pageQueryParamValue);
	const pageCount = Math.ceil(totalCount / PAGE_SIZE);
	const isFirstPage = currentPageNum === 1;
	const isLastPage = currentPageNum === pageCount;
	const pageStartCount = (currentPageNum - 1) * PAGE_SIZE + 1;
	const pageEndCount = isLastPage ? totalCount : currentPageNum * PAGE_SIZE;

	function handleClickNext() {
		if (!isLastPage) {
			searchParams.set('page', (currentPageNum + 1).toString());
			setSearchParams(searchParams);
		}
	}

	function handleClickPrev() {
		if (!isFirstPage) {
			searchParams.set('page', (currentPageNum - 1).toString());
			setSearchParams(searchParams);
		}
	}

	if (pageCount <= 1) return null;

	return (
		<Container>
			<PaginationText>
				Showing <span>{pageStartCount}</span>-<span>{pageEndCount}</span> of{' '}
				<span>{totalCount}</span> results
			</PaginationText>
			<PaginationButtons>
				<PaginationButton onClick={handleClickPrev} disabled={isFirstPage}>
					<HiChevronLeft /> <span>Previous</span>
				</PaginationButton>
				<PaginationButton onClick={handleClickNext} disabled={isLastPage}>
					<span>Next</span> <HiChevronRight />
				</PaginationButton>
			</PaginationButtons>
		</Container>
	);
}

export default Pagination;

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1rem;
	margin-top: 1rem;
`;

const PaginationText = styled.p`
	font-size: var(--fontSize-sm);

	> span {
		font-weight: 600;
	}
`;

const PaginationButtons = styled.div`
	display: flex;
	gap: 0.6rem;
`;

const PaginationButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.4rem;
	padding: 0.6rem 1rem;
	border: none;
	border-radius: var(--border-radius-sm);
	font-weight: 500;
	font-size: var(--fontSize-sm);
	transition:
		background-color 0.3s,
		color 0.3s;
	cursor: pointer;

	&:disabled {
		cursor: not-allowed;
		color: var(--color-grey-400);
	}

	&:hover:not(:disabled) {
		background-color: var(--color-btn-primary);
		color: var(--color-grey-0);
	}

	svg {
		height: 1.8rem;
		width: 1.8rem;
	}
`;
