package com.idb.laauth.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idb.laauth.Entities.UserGroup;
import com.idb.laauth.Entities.IdClasses.UserGroupId;
import com.idb.laauth.Repositories.UserGroupRepo;

@Service
public class UserGroupService {
    @Autowired
    private UserGroupRepo repo;

    public List<UserGroup> retrieveAll() {
        return repo.findAll();
    }

    public UserGroup retrieveById(UserGroupId userGroupId) {
        UserGroup sth = null;

        try {
            sth = repo.findById(userGroupId).get();
        } catch (Exception e) {
            // TODO: handle exception
        }

        return sth;
    }

    public List<UserGroup> retrieveByUserId(String userId) {
        List<UserGroup> sth = new ArrayList<UserGroup>();

        try {
            sth = repo.findByUserId(userId);
        } catch (Exception e) {
            // TODO: handle exception
        }

        return sth;
    }

    public List<UserGroup> retrieveByGroupId(String groupId) {
        return repo.findByGroupId(groupId);
    }

    public UserGroup createOne(UserGroup userGroup) {
        UserGroup tmp = null;

        try {
            repo.findById(new UserGroupId(userGroup.getUserId(), userGroup.getGroupId())).get();

        } catch (Exception e) {
            // TODO: handle exception
            tmp = repo.save(userGroup);
        }

        return tmp;
    }

    public Boolean deleteOne(UserGroupId userGroupId) {
        Boolean isSuccess = false;

        try {
            repo.deleteById(userGroupId);
        } catch (Exception e) {
            // TODO: handle exception
        }

        return isSuccess;
    }

    public Boolean deleteAllByUserId(String userId) {
        Boolean isSuccess = false;

        try {
            Long ii = repo.deleteByUserId(userId);

            if(ii > 0) {
                isSuccess = true;
            }
        } catch (Exception e) {
            // TODO: handle exception
        }

        // Long ii = repo.deleteByUserId(userId);

        return isSuccess;
    }
}
