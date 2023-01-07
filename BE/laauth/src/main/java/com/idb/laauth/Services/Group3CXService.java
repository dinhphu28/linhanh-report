package com.idb.laauth.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idb.laauth.Entities.Group3CX;
import com.idb.laauth.Repositories.Group3CXRepo;

@Service
public class Group3CXService {
    @Autowired
    private Group3CXRepo repo;

    public Group3CX retrieveById(String groupId) {
        Group3CX sth = null;

        try {
            sth = repo.findById(groupId).get();
        } catch (Exception e) {
            // TODO: handle exception
        }

        return sth;
    }

    public List<Group3CX> retrieveAllById(List<String> groupIds) {
        List<Group3CX> tmp = new ArrayList<Group3CX>();

        try {
            tmp = repo.findAllById(groupIds);
        } catch (Exception e) {
            // TODO: handle exception
        }

        return tmp;
    }

    public List<Group3CX> retrieveByGroupLevel(Integer groupLevel) {
        List<Group3CX> tmp = new ArrayList<Group3CX>();

        try {
            tmp = repo.findByGroupLevel(groupLevel);
        } catch (Exception e) {
            // TODO: handle exception
        }

        return tmp;
    }

    public List<Group3CX> retrieveByParentGroupId(String parentId) {
        List<Group3CX> tmp = new ArrayList<Group3CX>();

        try {
            tmp = repo.findByParentGroupId(parentId);
        } catch (Exception e) {
            // TODO: handle exception
        }

        return tmp;
    }

    public List<Group3CX> retrieveByGroupLevelAndParentGroupId(Integer groupLevel, String parentId) {
        List<Group3CX> tmp = new ArrayList<Group3CX>();

        try {
            tmp = repo.findByGroupLevelAndParentGroupId(groupLevel, parentId);
        } catch (Exception e) {
            // TODO: handle exception
        }

        return tmp;
    }

    public List<Group3CX> retrieveAll() {
        return repo.findAll();
    }

    public Group3CX createOne(Group3CX group3cx) {
        Group3CX tmp = null;

        try {
            repo.findById(group3cx.getId()).get();
        } catch (Exception e) {
            // TODO: handle exception
            tmp = repo.save(group3cx);
        }

        return tmp;
    }

    public Group3CX updateOne(Group3CX group3cx) {
        Group3CX tmp = null;

        try {
            repo.findById(group3cx.getId()).get();

            tmp = repo.save(group3cx);
        } catch (Exception e) {
            // TODO: handle exception
        }

        return tmp;
    }
}
