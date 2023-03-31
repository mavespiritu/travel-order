import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const MultipleSelect = ({
    className,
    index = "name",
    id,
    name,
    label,
    value,
    options,
    handleChange,
    required = false,
    defaultValues = [],
    invalid,
    invalidMessage,
    disabled,
    showLabel = false,
    styles,
    placeholder
}) => 
{
    const animatedComponents = makeAnimated();

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
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    defaultValue={defaultValues}
                    isMulti
                    options={options}
                    styles={styles}
                    placeholder={placeholder}
                />
            </div>
        </div>
    )
}

export default MultipleSelect