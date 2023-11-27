import PropTypes from 'prop-types';

export function Numberbox({ value }) {
    return <h1 className='border-[1px] border-[#E5DFDF] rounded-[20px] min-w-[91px] text-center py-[8px] font-open-sans font-medium text-[#575757]'>
        {value}
    </h1>
};

Numberbox.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
    ]).isRequired
}