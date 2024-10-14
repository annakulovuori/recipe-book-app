package com.annakulovuori.recipeApp.repositories;

import com.annakulovuori.recipeApp.models.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

//in JpaRepository there is already save, findAll etc.
@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    Optional<UserEntity> findByUsername(String username);

}
