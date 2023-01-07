package com.idb.laauth.Controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.idb.laauth.Entities.User;
import com.idb.laauth.Entities.UserGroup;
import com.idb.laauth.Models.UserGroup.UserGroupAssignModel;
import com.idb.laauth.Services.UserGroupService;
import com.idb.laauth.Services.UserService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/user-groups")
public class UserGroupController {
    @Autowired
    private UserGroupService userGroupService;

    @Autowired
    private UserService userService;

    @GetMapping(
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Object> retrieveUserGroupByUserId(@RequestParam(value = "username", required = true) String username) {
        ResponseEntity<Object> entity;

        List<UserGroup> userGroups = userGroupService.retrieveByUserId(username);

        entity = new ResponseEntity<>(userGroups, HttpStatus.OK);

        return entity;
    }

    @PutMapping(
        produces = MediaType.APPLICATION_JSON_VALUE,
        consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Object> assignGroupsToUser(@RequestBody UserGroupAssignModel userGroupAssignModel) {
        ResponseEntity<Object> entity;

        User tmpUser = userService.retrieveById(userGroupAssignModel.getUsername());

        if(tmpUser != null) {
            Boolean isDeleted = userGroupService.deleteAllByUserId(tmpUser.getId());

            List<UserGroup> userGroups = new ArrayList<UserGroup>();

            for (String tmpGroupId : userGroupAssignModel.getGroupIds()) {
                UserGroup tmpUsrGroup = new UserGroup(tmpGroupId, userGroupAssignModel.getUsername());

                UserGroup tmpSaved = userGroupService.createOne(tmpUsrGroup);

                userGroups.add(tmpSaved);
            }

            entity = new ResponseEntity<>(userGroups, HttpStatus.CREATED);

        } else {
            entity = new ResponseEntity<>("{ \"Notice\": \"User not found\" }", HttpStatus.BAD_REQUEST);
        }

        return entity;
    }
}
