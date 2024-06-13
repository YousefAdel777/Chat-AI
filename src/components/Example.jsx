/* eslint-disable react/prop-types */
const Example = ({text, onClick}) => {
    return (
        <div onClick={onClick} className="cursor-pointer flex items-center justify-center p-3 rounded-lg text-black bg-white hover:bg-gray-300 dark:bg-gray-600 hover:dark:bg-black dark:text-white">
            <p className="text-center text-sm md:text-base">
                {text}
            </p>
        </div>
    );
}

export default Example;