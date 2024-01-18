import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const StarIcon = () => <FontAwesomeIcon icon={faStar} className='star-icon' />;

function renderStars(number) {
  return Array.from({ length: number }, (_, index) => <StarIcon key={index} />);
}

const StarRating = ({ rating }) => {
  return <div className='text-yellow-500 mt-2'>{renderStars(rating)}</div>;
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default StarRating;
