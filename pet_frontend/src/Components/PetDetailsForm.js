import './PetDetailsForm.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import '@fortawesome/fontawesome-free/css/all.min.css';



const PetDetailsForm = () => {
  const [pets, setPets] = useState([]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        axios.post('http://localhost:8080/api/v1/pet/upload', formData)
            .then(response => {
                FormData({ ...formData, photo: response.data }); // response.data should be the image URL
            })
            .catch(error => {
                console.error('Error uploading the file', error);
            });
    }
};

  // Fetching data from Spring Boot backend
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/pet/getAll")
      .then((response) => {
        setPets(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the pet data!", error);
      });
  }, []);

  // const handleStatusChange = (id, status) => {
  //   axios
  //     .put(`http://localhost:8080/api/v1/pet/updateStatus/${id}`, {  status })
  //     .then((response) => {
  //       // Update the pet's status in the frontend
  //       setPets((prevPets) =>
  //         prevPets.map((pet) =>
  //           pet.id === id ? { ...pet, regStatus: status } : pet
  //         )
  //       );
  //     })
  //     .catch((error) => {
  //       console.error("Error updating the status!", error);
  //     });
  // };
  

  const handleStatusChange = (id, status) => {
    axios
      .put(`http://localhost:8080/api/v1/pet/updateStatus/${id}`, status, {
        headers: {
          'Content-Type': 'text/plain',
        },
      })
      .then((response) => {
        // Update the pet's status in the frontend
        setPets((prevPets) =>
          prevPets.map((pet) =>
            pet.id === id ? { ...pet, regStatus: status } : pet
          )
        );
      })
      .catch((error) => {
        console.error("Error updating the status!", error);
      });
  };
  
  return (
    <div id="pet-details-container">
      <h2 className="pet-list-title">Requested List</h2>
      {pets.length > 0 ? (
        <table className="pet-list-table">
          <thead className="pet-list-header">
            <tr>
              <th className="pet-list-th">ID</th>
            
              <th className="pet-list-th">Pet Name</th>
              <th className="pet-list-th pet-list-details-col">Pet Details</th> {/* Apply the class here */}
              <th className="pet-list-th ">Residency & Temporary</th>
              <th className="pet-list-th">Justification</th>
              <th className="pet-list-th">Owner Details</th>
              <th className="pet-list-th ">Reg. Status</th> 
              <th className="pet-list-th">Decision</th>
            </tr>
          </thead>


          <tbody className="pet-list-body">
            {pets.map((pet) => (
              <tr key={pet.id} className="pet-list-row">
                {/* <td className="pet-list-photo">
                  {pet.photo ? (
                    <img src={pet.photo} alt="Pet" className="pet-photo" />
                  ) : (
                    <span className="no-photo">No photo available</span>
                  )}
                </td> */}
               
               <td className="pet-name">{pet.id}</td>
                <td className="pet-name">{pet.petName}</td>
                <td className="pet-details">
                  <span className="category-label">Specie:</span> {pet.specie} <br /> 
                  <span className="category-label">Breed:</span> {pet.breed} <br /> 
                  <span className="category-label">Age:</span> {pet.age} <br /> 
                  <span className="category-label">Gender:</span> {pet.gender} <br /> 
                  <span className="category-label">Location:</span> {pet.location}
                </td>
                <td className="pet-reason-temp">
                  <span className="category-label">Residency:</span> {pet.reason} <br /> 
                  <span className="category-label">If Temporary:</span> {pet.ifTemp}
                </td>
                <td className="pet-justify">{pet.justify}</td>
                <td className="owner-details">
                  <span className="category-label">Owner:</span> {pet.ownerName} <br />
                  <span className="category-label">NIC:</span> {pet.nic} <br />
                  <span className="category-label">Email:</span> {pet.contactEmail} <br />
                  <span className="category-label">Phone No:</span> {pet.contactPhoneNumber}
                </td>
                <td className="pet-reg-status">{pet.regStatus}</td>
                <td>
  <div className="button-container">
    <button className="approve-button" onClick={() => handleStatusChange(pet.id, "Approved")}>
      <i className="fas fa-check"></i> Approve
    </button>
    <button className="reject-button" onClick={() => handleStatusChange(pet.id, "Rejected")}>
      <i className="fas fa-times"></i> Reject
    </button>
  </div>
</td>


              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-pets-message">No pets available for adoption.</p>
      )}
    </div>
  );
};

export default PetDetailsForm;
