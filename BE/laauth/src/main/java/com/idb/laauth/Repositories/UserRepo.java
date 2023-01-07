package com.idb.laauth.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.idb.laauth.Entities.User;

@Repository
public interface UserRepo extends JpaRepository<User, String> {
    List<User> findByRole(String role);
}
