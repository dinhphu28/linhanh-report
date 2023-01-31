package com.idb.linhanhreport.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idb.linhanhreport.Entities.Group;
import com.idb.linhanhreport.Repositories.GroupRepo;

@Service
public class GroupService {
    @Autowired
    private GroupRepo repo;

    public List<Group> retrieveAll() {
        return repo.findAll();
    }

    public Group retrieveById(String id) {
        Group sth = null;

        try {
            sth = repo.findById(id).get();
        } catch (Exception e) {
            // TODO: handle exception
        }

        return sth;
    }
}
