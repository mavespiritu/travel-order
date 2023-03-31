import { useState, useRef } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const SingleSelect = ({
    className,
    index = "name",
    id,
    name,
    label,
    value,
    options,
    required = false,
    defaultValues = [],
    invalid,
    invalidMessage,
    disabled,
    showLabel = false,
    styles,
    isClearable,
    placeholder,
    setFieldValue,
}) => 
{
    const animatedComponents = makeAnimated();

    const [selectedOption, setSelectedOption] = useState({
        value: "",
        label: ""
    })

    const handleSelectChange = (selectedOption) => {
        setFieldValue(name, selectedOption.value)
        setSelectedOption(selectedOption)
    }

    const handleSelectClear = () => {
        setFieldValue(name, "")
        setSelectedOption({})
    };

    console.log(selectedOption)

    return (
        <div className={className}>
            <div>
                { showLabel &&
                    <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor={id}>
                    {label}
                    { required && <span className="text-rose-500"> *</span> }
                    </label>
                }
                <Select
                    value={selectedOption.value}
                    isClearable={isClearable}
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    options={options}
                    styles={styles}
                    placeholder={placeholder}
                    onChange={handleSelectChange}
                    onClear={handleSelectClear}
                />
            </div>
        </div>
    )
}

export default SingleSelect