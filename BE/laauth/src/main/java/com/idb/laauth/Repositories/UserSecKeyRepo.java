package com.idb.laauth.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.idb.laauth.Entities.UserSecKey;

@Repository
public interface UserSecKeyRepo extends JpaRepository<UserSecKey, String> {
    
}
