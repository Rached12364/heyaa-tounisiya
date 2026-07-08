package tn.heyaa.backend;

import com.heyaatounisiya.backend.controller.TechnicienPublicController;
import com.heyaatounisiya.backend.entity.Metier;
import com.heyaatounisiya.backend.entity.Role;
import com.heyaatounisiya.backend.entity.Sexe;
import com.heyaatounisiya.backend.entity.TechnicienProfile;
import com.heyaatounisiya.backend.entity.User;
import com.heyaatounisiya.backend.repository.TechnicienProfileRepository;
import com.heyaatounisiya.backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@SpringBootTest(classes = com.heyaatounisiya.backend.BackendApplication.class)
class BackendApplicationTests {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TechnicienProfileRepository technicienProfileRepository;

    @Autowired
    private TechnicienPublicController controller;

    @Test
    void testRealDatabaseData() {
        System.out.println("--- REAL DATABASE DATA TEST ---");
        try {
            long count = technicienProfileRepository.count();
            System.out.println("Total profiles in DB: " + count);
            var profiles = technicienProfileRepository.findAll();
            System.out.println("Loaded " + profiles.size() + " profiles");
            for (var p : profiles) {
                System.out.println("Profile ID: " + p.getId());
                if (p.getUser() == null) {
                    System.out.println("  WARNING: User is null!");
                } else {
                    System.out.println("  User ID: " + p.getUser().getId());
                    System.out.println("  User Nom: " + p.getUser().getNom());
                    System.out.println("  User Prenom: " + p.getUser().getPrenom());
                }
                System.out.println("  Metier: " + p.getMetier());
                System.out.println("  Specialite: " + p.getSpecialite());
            }
        } catch (Exception e) {
            System.out.println("ERROR during database check:");
            e.printStackTrace();
        }
        System.out.println("--------------------------------");
    }

}

