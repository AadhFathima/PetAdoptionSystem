package com.example.PostApet.Service;

import com.example.PostApet.Model.PetModel;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface PetService
{
    PetModel savePet(PetModel petModel);
    List<PetModel> getAllPets();
    PetModel updatePetStatus(int id, String newStatus);
    PetModel updatePet( int id,  PetModel petModel);
    PetModel getPetById(int id);
    String deletePet(int id);
    PetModel calculateCosts(PetModel petModel);

}
