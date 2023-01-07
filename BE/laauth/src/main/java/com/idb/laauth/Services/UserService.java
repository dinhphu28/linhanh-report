package com.idb.laauth.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idb.laauth.Entities.User;
import com.idb.laauth.Repositories.UserRepo;

@Service
public class UserService {
    @Autowired
    private UserRepo repo;

    public User retrieveById(String userId) {
        User sth = null;

        try {
            sth = repo.findById(userId).get();
        } catch (Exception e) {
            // TODO: handle exception
        }

        return sth;
    }

    public List<User> retrieveByRole(String role) {
        List<User> users = new ArrayList<User>();

        try {
            users = repo.findByRole(role);
        } catch (Exception e) {
            // TODO: handle exception
        }

        return users;
    }

    public List<User> retrieveAll() {
        return repo.findAll();
    }

    public User createOne(User user) {
        User tmp = null;

        try {
            repo.findById(user.getId()).get();
        } catch (Exception e) {
            // TODO: handle exception
            tmp = repo.save(user);
        }

        return tmp;
    }

    public User updateOne(User user) {
        User tmp = null;

        try {
            repo.findById(user.getId()).get();

            tmp = repo.save(user);
        } catch (Exception e) {
            // TODO: handle exception
        }

        return tmp;
    }

    public Boolean deleteOne(String username) {
        Boolean isSuccess = false;

        try {
            repo.deleteById(username);

            isSuccess = true;
        } catch (Exception e) {
            // TODO: handle exception
        }

        return isSuccess;
    }
}
