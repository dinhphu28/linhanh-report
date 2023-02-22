package com.idb.laauth.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.idb.laauth.Entities.User;
import com.idb.laauth.Entities.UserSecKey;
import com.idb.laauth.Models.ReturnModel;
import com.idb.laauth.Models.User.UserChangePasswordModel;
import com.idb.laauth.Services.UserGroupService;
import com.idb.laauth.Services.UserSecKeyService;
import com.idb.laauth.Services.UserService;
import com.idb.laauth.Utils.Auth.PasswordAuthUtil;
import com.idb.laauth.Utils.TOTP.TOTPUtils;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserGroupService userGroupService;

    @Autowired
    private UserSecKeyService userSecKeyService;

    @Autowired
    private TOTPUtils totpUtils;

    @GetMapping(
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Object> retrieveAllManagerUser() {
        ResponseEntity<Object> entity;

        List<User> users = userService.retrieveByRole("manager");

        entity = new ResponseEntity<>(users, HttpStatus.OK);

        return entity;
    }

    @GetMapping(
        value = "/sec-keys/{username}",
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Object> retrieveSeckeyByUserId(@PathVariable("username") String username) {
        ResponseEntity<Object> entity;

        UserSecKey userSecKey = userSecKeyService.retrieveByUserId(username);
        if(userSecKey != null) {
            String secKey = userSecKey.getSecKey();

            entity = new ResponseEntity<>(new ReturnModel(secKey, "otpauth://totp/Linh Anh 3CX Reports: " + username + "?secret=" + secKey + "&issuer=3cx"), HttpStatus.OK);
        } else {
            entity = new ResponseEntity<>(new ReturnModel("Not found", "Not found TOTP"), HttpStatus.NOT_FOUND);
        }

        return entity;
    }

    @PutMapping(
        value = "/{username}",
        produces = MediaType.APPLICATION_JSON_VALUE,
        consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Object> updateUserPassword(@PathVariable("username") String username, @RequestBody UserChangePasswordModel userChangePasswordModel) {
        ResponseEntity<Object> entity;

        User tmpUser = userService.retrieveById(username);

        if(tmpUser == null) {
            entity = new ResponseEntity<>("{ \"Notice\": \"Invalid username\" }", HttpStatus.BAD_REQUEST);  // invalid username
        } else {
            PasswordAuthUtil passwordAuthUtil = new PasswordAuthUtil();

            String encryptedPassword = passwordAuthUtil.storePassword(userChangePasswordModel.getPassword());

            tmpUser.setPassword(encryptedPassword);

            User tmpSaved = userService.updateOne(tmpUser);

            if(tmpSaved == null) {
                entity = new ResponseEntity<>("{ \"Notice\": \"Failed\" }", HttpStatus.BAD_REQUEST); 
            } else {
                entity = new ResponseEntity<>("{ \"Notice\": \"Password changed\" }", HttpStatus.OK); 
            }
        }

        return entity;
    }

    @DeleteMapping(
        value = "/{username}",
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Object> deleteUser(@PathVariable("username") String username) {
        ResponseEntity<Object> entity;

        User tmpUser = userService.retrieveById(username);

        if(tmpUser == null) {
            entity = new ResponseEntity<>("{ \"Notice\": \"Invalid username\" }", HttpStatus.BAD_REQUEST);  // invalid username
        } else {
            Boolean isUserGroupDeleted = userGroupService.deleteAllByUserId(tmpUser.getId());

            Boolean isUserSecKeyDeleted = userSecKeyService.deleteByUserId(username);

            Boolean isUserDeleted = userService.deleteOne(username);

            if(isUserDeleted) {
                entity = new ResponseEntity<>("{ \"Notice\": \"Deleted success\" }", HttpStatus.OK); 
            } else {
                entity = new ResponseEntity<>("{ \"Notice\": \"Failed\" }", HttpStatus.BAD_REQUEST); 
            }
        }

        return entity;
    }
}
