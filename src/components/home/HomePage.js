import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFetchBreedsQuery } from "../../features/dogs/dogs-api-slice";

const HomePage = () => {
  const [numDogs, setNumDogs] = useState(10);
  const { data = [] } = useFetchBreedsQuery(numDogs);

  return (
    <div className="jumbotron">
      <h1>Pluralsight Administration</h1>
      <p>React, Redux and React Router for ultra-responsive web apps.</p>
      <Link to="about" className="btn btn-primary btn-lg">
        Learn more
      </Link>

      <div>
        <p>Dogs to fetch:</p>
        <select
          value={numDogs}
          onChange={(e) => setNumDogs(Number(e.target.value))}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>

      <div>
        <p>Number of dogs fetched: {data.length}</p>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {data.map((breed) => (
              <tr key={breed.id}>
                <td>{breed.name}</td>
                <td>
                  <img src={breed.image.url} alt={breed.name} height={250} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;
