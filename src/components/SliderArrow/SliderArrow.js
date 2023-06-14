import arrow from '../images/arrow.svg';

function SliderArrow(props) {
    const {onClick} = props;
    const {arrowClass} = props;
    return (
        <div className={arrowClass} onClick={onClick}>
            <img src={arrow} alt='стрелка'/>
        </div>
    );
}

export default SliderArrow;
