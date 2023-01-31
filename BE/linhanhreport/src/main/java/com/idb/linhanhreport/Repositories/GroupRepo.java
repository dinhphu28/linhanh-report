package com.idb.linhanhreport.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.idb.linhanhreport.Entities.Group;

@Repository
public interface GroupRepo extends JpaRepository<Group, String> {
    
}
