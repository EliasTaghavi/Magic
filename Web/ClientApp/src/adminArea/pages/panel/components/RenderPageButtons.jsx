import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import React from "react";

const RenderPageButtons = (props) => {
	let pagesNumber = props.pagesNumber;
	let currentPage = props.currentPage;
	let firstPageNumber = pagesNumber[0];
	let lastPageNumber = pagesNumber[pagesNumber.length - 1];

	let isActive = currentPage === (currentPage + 1);

	let showFirstPage = currentPage !== firstPageNumber;

	return (
		<div className="d-flex align-items-center justify-content-start">
			<button disabled={props.disabledArrowButtons} type="button" className="outline btn btn-light rounded-circle d-none d-md-flex align-items-center justify-content-center bgLight ml-3" style={{width: 35, height: 35}} onClick={() => props.changePage(currentPage - 1)}>
				<FontAwesomeIcon icon={faChevronRight} className="text-secondary" style={{fontSize: 14}}/>
			</button>
			{(pagesNumber.length > 0 && pagesNumber.length < 6) && pagesNumber.map((item, index) => {
				return (
					<button key={Math.random().toString()} style={{width: 30, height: 30}} type="button" className={`outline btn btn-transparent rounded-circle d-flex align-items-center justify-content-center mx-1 ${currentPage === (index + 1) ? 'bg-primary text-white' : 'bgLight'}`} onClick={() => props.changePage(index + 1)}>
						<span>{item}</span>
					</button>
				)
			})}
			{pagesNumber.length >= 6 && <div className="d-flex align-items-center justify-content-center">
				{showFirstPage && <button style={{width: 30, height: 30}} type="button" className={`outline btn btn-transparent rounded-circle d-flex align-items-center justify-content-center mx-1 ${isActive ? 'bg-primary text-white' : 'bgLight'}`} onClick={() => props.changePage(firstPageNumber)}>
					<span>{firstPageNumber}</span>
				</button>}
				{showFirstPage && <span>...</span>}
				{(currentPage !== firstPageNumber && currentPage !== pagesNumber[1])  && <button style={{width: 30, height: 30}} type="button" className={`outline btn btn-transparent rounded-circle d-flex align-items-center justify-content-center mx-1 ${isActive ? 'bg-primary text-white' : 'bgLight'}`} onClick={() => props.changePage(currentPage - 1)}>
					<span>{currentPage - 1}</span>
				</button>}
				<button style={{width: 30, height: 30}} type="button" className={`outline btn btn-transparent rounded-circle d-flex align-items-center justify-content-center mx-1 ${currentPage ? 'bg-primary text-white' : 'bgLight'}`} onClick={() => {}}>
					<span>{currentPage}</span>
				</button>
				{(currentPage !== lastPageNumber && currentPage !== pagesNumber[pagesNumber.length - 2]) && <button style={{width: 30, height: 30}} type="button" className={`outline btn btn-transparent rounded-circle d-flex align-items-center justify-content-center mx-1 ${isActive ? 'bg-primary text-white' : 'bgLight'}`} onClick={() => props.changePage(currentPage + 1)}>
					<span>{currentPage + 1}</span>
				</button>}
				{currentPage !== lastPageNumber && <span>...</span>}
				{currentPage !== lastPageNumber && <button style={{width: 30, height: 30}} type="button" className={`outline btn btn-transparent rounded-circle d-flex align-items-center justify-content-center mx-1 ${currentPage === lastPageNumber ? 'bg-primary text-white' : 'bgLight'}`} onClick={() => props.changePage(lastPageNumber)}>
					<span>{lastPageNumber}</span>
				</button>}
			</div>}
			<button disabled={props.disabledArrowButtons} type="button" className="outline btn btn-light rounded-circle d-none d-md-flex align-items-center justify-content-center bgLight mr-3" style={{width: 35, height: 35}} onClick={() => props.changePage(currentPage + 1)}>
				<FontAwesomeIcon icon={faChevronLeft} className="text-secondary" style={{fontSize: 14}} />
			</button>
		</div>
	)
};

export default RenderPageButtons;
