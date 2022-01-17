import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

const SearchBox = ({changeValue, searchValue, searchData}) => {
	return (
		<form noValidate={true} autoComplete="off" onSubmit={searchData} className={`col-12 col-sm-6 col-md-4 col-xl-3`}>
			<div className="form-group d-flex justify-content-start p-0 m-0">
				<div className="w-100 d-flex">
					<input type="text" name="floor" value={searchValue} className='form-control' placeholder="جستجو..." onChange={changeValue} style={{paddingLeft: 30}}/>
				</div>
				<button type="submit" className="outline btn d-flex align-items-center justify-content-center mr-2 bgMain">
					<FontAwesomeIcon icon={faArrowLeft} className="text-white" />
				</button>
			</div>
		</form>
	)
};

export default SearchBox;
