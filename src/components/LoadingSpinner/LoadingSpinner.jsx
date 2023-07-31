import Loading from '../../assets/Loading_icon.gif'

const LoadingSpinner = () => {
    return <div className="p-14 justify-center min-w-max ml-36">
        <img src={Loading} alt='loading-icon' width="300px"
            height="300px" className='flex flex-grow justify-center m-40 '/>
    </div>;
};

export default LoadingSpinner;