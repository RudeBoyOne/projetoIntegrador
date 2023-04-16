import loading from '../../images/loading-svg.svg';

const LoadingComponent = ({ loading }) => {
  if (loading) {
    return <img src={loading} alt="Loading" style={{ width: 250 }}></img>;
  }
  return null;
};

export default LoadingComponent;
