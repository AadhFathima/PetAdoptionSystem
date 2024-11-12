package com.example.PostApet.Controller;

import com.example.PostApet.Model.PetModel;
import com.example.PostApet.Service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/pets")
@CrossOrigin
public class PetController
{
    @Autowired
    private PetService petService;

    @PostMapping("/add")
    public String add(@RequestBody PetModel petModel)
    {
        petService.savePet(petModel);
        return " New pet is added! ";
    }

    @GetMapping("/getAll")
    public List<PetModel> getAllPets(){
        return petService.getAllPets();
    }

    @GetMapping("/get/{id}")
    public PetModel getPetById(@PathVariable int id) {
        return petService.getPetById(id);
    }
    //
//    @PutMapping("/updateStatus/{id}")
//    public PetModel updatePetStatus(@PathVariable int id, @RequestBody String newStatus) {
//        return petService.updatePetStatus(id, newStatus);
//    }
    @PutMapping("/updateStatus/{id}")
    public ResponseEntity<String> updatePetStatus(@PathVariable int id, @RequestBody String status) {
        PetModel updatedPet = petService.updatePetStatus(id, status.trim());
        if (updatedPet != null) {
            return ResponseEntity.ok("Pet status updated successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pet not found!");
        }
    }


    @PutMapping("/update/{id}")
    public PetModel updatePet(@PathVariable int id, @RequestBody PetModel petModel) {
        return petService.updatePet(id, petModel);
    }

    @DeleteMapping("/delete/{id}")
    public String deletePet(@PathVariable int id) {
        return petService.deletePet(id);
    }

    @PostMapping("/calculate")
    public PetModel calculateCosts(@RequestBody PetModel petModel) {
        return petService.calculateCosts(petModel);
    }

}