/* eslint-disable react/prop-types */
const GoogleButton = ({onClick, text}) => {
    return (
        <button onClick={onClick} className="px-4 flex item-center justify-center w-full bg-white mx-auto py-2 flex gap-2 rounded-lg text-black dark:text-slate dark:bg-white hover:shadow transition duration-150">
            <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
            <span>{text}</span>
        </button>
    );
}

export default GoogleButton;