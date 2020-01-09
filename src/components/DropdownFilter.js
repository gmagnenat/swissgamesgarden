import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import shortid from 'shortid';
import useComponentVisible from "../utilities/useComponentVisible";

const DropdownFilter = props => {
  const [selectedOptions, setSelectedOptions] = useState(new Set());
  const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false);

  // Unique id for this dropdown
  const uniqId = shortid.generate();

  const handleChangeOption = e => {
    if (e.target.checked) {
      // Add the selected option from Set.
      setSelectedOptions(new Set(selectedOptions).add(e.target.value));
    } else {
      // Remove the selected option from Set.
      const newSet = new Set(selectedOptions);
      newSet.delete(e.target.value);
      setSelectedOptions(newSet);
    }
  };

  const renderOptions = props.options.map((option, i) => (
    <div className="dropdown-option" key={i}>
      <input
        type="checkbox"
        value={option.value}
        onChange={handleChangeOption}
        id={`${uniqId}-${i}`}
        checked={selectedOptions.has(option.value)}
      />
      <label
        className="dropdown-option-label"
        htmlFor={`${uniqId}-${i}`}
      >
        {option.name}
      </label>
    </div>
  ));

  // when you click reset, the selected options are set to the start again.
  const handleReset = () => {
    setSelectedOptions(new Set());
  };

  return (
    <div className={`dropdown ${isComponentVisible ? 'open' : ''}`} ref={ref}>
      <button
        className="dropdown-toggle"
        onClick={() => setIsComponentVisible(!isComponentVisible)}
        aria-haspopup="true"
        aria-expanded="false"
        id=""
      >{props.title}</button>
      <div
        className="dropdown-content"
        aria-labelledby="dropdownMenuButton"
      >
        {renderOptions}
        <div>
          <button className="btn btn-dim" onClick={handleReset}>Reset</button>
          {/*<button className="btn btn-primary" onClick={handleSubmit}>Save</button>*/}
        </div>
      </div>
    </div>
  )
};

DropdownFilter.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

export default DropdownFilter;
