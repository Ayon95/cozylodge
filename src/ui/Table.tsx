import React from 'react';
import styled, { css } from 'styled-components';

interface TableProps {
	id: string;
	caption: string;
	children: React.ReactNode;
	className?: string;
}

interface TablePartProps {
	children: React.ReactNode;
	className?: string;
}

interface CellProps extends TablePartProps {
	label?: string;
}

export default function Table({ id, caption, children, className }: TableProps) {
	return (
		<TableContainer
			className={className}
			role="region"
			tabIndex={0}
			aria-labelledby={`${id}Caption`}
		>
			<StyledTable role="table">
				<caption className="sr-only" id={`${id}Caption`} role="caption">
					{caption}
				</caption>
				{children}
			</StyledTable>
		</TableContainer>
	);
}

function Head({ children, className }: TablePartProps) {
	return (
		<thead role="rowgroup" className={className}>
			{children}
		</thead>
	);
}

function HeaderCell({ children, className }: TablePartProps) {
	return (
		<th role="columnheader" className={className}>
			{children}
		</th>
	);
}

function Body({ children, className }: TablePartProps) {
	return (
		<tbody role="rowgroup" className={className}>
			{children}
		</tbody>
	);
}

function Row({ children, className }: TablePartProps) {
	return (
		<tr role="row" className={className}>
			{children}
		</tr>
	);
}

function Cell({ children, label, className }: CellProps) {
	return (
		<ResponsiveCell
			role="cell"
			className={className}
			{...(label && { 'data-cell': label })}
			{...(label && { $label: label })}
		>
			{children}
		</ResponsiveCell>
	);
}

Table.Head = Head;
Table.HeaderCell = HeaderCell;
Table.Body = Body;
Table.Row = Row;
Table.Cell = Cell;

const TableContainer = styled.div`
	margin-top: 1rem;
`;

const StyledTable = styled.table`
	width: 100%;
	padding: 1rem;
	background-color: var(--color-grey-0);
	border-collapse: collapse;
	border: 1px solid var(--color-grey-200);
	border-radius: var(--border-radius-md);
	font-size: 1.4rem;
	overflow: hidden;

	thead {
		background-color: var(--color-grey-50);
		border-bottom: 1px solid var(--color-grey-100);
		text-align: left;
		text-transform: uppercase;
		letter-spacing: 0.4px;
		color: var(--color-grey-600);
	}

	th,
	td {
		padding: 1.2rem;
	}

	td img {
		border-radius: var(--border-radius-sm);
	}

	tbody tr:nth-child(2n) {
		background-color: var(--color-grey-200);
	}

	tbody tr:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}

	@media only screen and (max-width: 62.5em) {
		thead {
			display: none;
		}
	}
`;

const ResponsiveCell = styled.td<{ $label?: string }>`
	@media only screen and (max-width: 62.5em) {
		display: grid;
		grid-template-columns: 10ch auto;

		> * {
			${props =>
				!props.$label &&
				css`
					grid-column: 1/-1;
				`}
		}

		&::before {
			${props =>
				props.$label &&
				css`
					content: attr(data-cell) ': ';
					font-weight: bold;
					text-transform: capitalize;
				`}
		}
	}
`;
