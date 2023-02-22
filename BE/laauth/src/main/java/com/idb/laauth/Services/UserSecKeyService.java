package com.idb.laauth.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idb.laauth.Entities.UserSecKey;
import com.idb.laauth.Repositories.UserSecKeyRepo;

@Service
public class UserSecKeyService {
    @Autowired
    private UserSecKeyRepo repo;

    public UserSecKey retrieveByUserId(String userId) {
        UserSecKey tmp = null;

        try {
            tmp = repo.findById(userId).get();
        } catch (Exception e) {
            // TODO: handle exception
        }

        return tmp;
    }

    public UserSecKey saveOne(UserSecKey userSecKey) {
        UserSecKey tmp = null;

        try {
            tmp = repo.save(userSecKey);
        } catch (Exception e) {
            // TODO: handle exception
        }

        return tmp;
    }

    public Boolean deleteByUserId(String userId) {
        Boolean isSuccess = false;

        try {
            repo.deleteById(userId);

            isSuccess = true;
        } catch (Exception e) {
            // TODO: handle exception
        }

        return isSuccess;
    }
}
