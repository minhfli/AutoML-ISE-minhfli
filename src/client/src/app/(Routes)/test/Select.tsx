import React, { useEffect, useState } from 'react';
import Select, { SingleValue, GroupBase } from 'react-select';

// Assuming CsvRow is defined somewhere in your project
type CsvRow = { [key: string]: string };

// Adjusted OptionType to match your usage
type OptionType = { value: string; label: string };

// Define the Props type more accurately
interface Props {
  selectedTargetColumn: string;
  handleTargetColumnSelect: (value: string) => void; // Adjusted to directly pass string value
  csvData: CsvRow[];
}

const CustomSelect: React.FC<Props> = ({ selectedTargetColumn, handleTargetColumnSelect, csvData }) => {
  const [initialSelected, setInitialSelected] = useState<OptionType | undefined>();

  // Logic to prepare options
  const options: OptionType[] = csvData.length > 0
    ? Object.keys(csvData[0]).map(columnName => ({ value: columnName, label: columnName }))
    : [];

  useEffect(() => {
    // Automatically select the first column if no selection has been made yet
    if (!selectedTargetColumn && options.length > 0) {
      const firstOption = options[0];
      handleTargetColumnSelect(firstOption.value);
      setInitialSelected(firstOption);
    }
  }, [selectedTargetColumn, options, handleTargetColumnSelect]);

  // Finding the selected option based on the passed selectedTargetColumn prop
  // or the initial selection if no target column has been selected yet
  const selectedOption = options.find(option => option.value === selectedTargetColumn) || initialSelected;

  // Adjusting onChange handler to fit the expected type
  const onChange = (selectedOption: SingleValue<OptionType>) => {
    if (selectedOption) {
      handleTargetColumnSelect(selectedOption.value);
    }
  };

  return (
    <Select<OptionType, false, GroupBase<OptionType>>
      value={selectedOption}
      onChange={onChange}
      options={options}
      isClearable={true}
      isSearchable={true}
    />
  );
};

export default CustomSelect;
