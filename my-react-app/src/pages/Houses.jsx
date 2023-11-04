import HousesDoughnut from '../components/HousesDoughnut';

const Houses = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-content-center">
      <h1 className="text-center">Houses</h1>
      <div className="w-75 mx-auto">
        <HousesDoughnut />
      </div>
    </div>
  );
};

export default Houses;
