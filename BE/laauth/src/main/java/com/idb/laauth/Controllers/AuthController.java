package com.idb.laauth.Controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Collections;
import java.util.Comparator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.idb.laauth.Entities.Group3CX;
import com.idb.laauth.Entities.User;
import com.idb.laauth.Entities.UserGroup;
import com.idb.laauth.Models.Auth.CredentialReturn;
import com.idb.laauth.Models.Auth.UserModel;
import com.idb.laauth.Models.Group.GroupBaseModel;
import com.idb.laauth.Services.Group3CXService;
import com.idb.laauth.Services.UserGroupService;
import com.idb.laauth.Services.UserService;
import com.idb.laauth.Utils.Auth.PasswordAuthUtil;
import com.idb.laauth.Utils.Auth.JWT.jwtSecurity;
import com.idb.laauth.Utils.Auth.JWT.myJWT;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserGroupService userGroupService;

    @Autowired
    private Group3CXService group3cxService;

    // Login
    @PutMapping(
        produces = MediaType.APPLICATION_JSON_VALUE,
        consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Object> login(@RequestBody UserModel user) {
        ResponseEntity<Object> entity;

        if(user.getUsername() == null || user.getPassword() == null) {
            entity = new ResponseEntity<>("{ \"Notice\": \"Username and password not be empty\" }", HttpStatus.BAD_REQUEST);
        } else {
            User tmpUser = userService.retrieveById(user.getUsername());

            if(tmpUser == null) {
                entity = new ResponseEntity<>("{ \"Notice\": \"Invalid username or password\" }", HttpStatus.BAD_REQUEST);  // invalid username
            } else {
                if(tmpUser.getActive() == 1) {
                    PasswordAuthUtil passwordAuthUtil = new PasswordAuthUtil();

                    if(passwordAuthUtil.verifyPassword(user.getPassword(), tmpUser.getPassword())) {
                        // create token here

                        myJWT jwt = new jwtSecurity();

                        String token = jwt.GenerateToken(user.getUsername());

                        if(token == "") {
                            entity = new ResponseEntity<>("{ \"Notice\": \"Invalid username or password\" }", HttpStatus.BAD_REQUEST);  // failed to create token
                        } else {
                            List<GroupBaseModel> groupBaseModels = new ArrayList<GroupBaseModel>();

                            if(tmpUser.getRole().equals("admin")) {
                                List<Group3CX> group3cxs = group3cxService.retrieveAll();

                                for (Group3CX group3cxTmp : group3cxs) {

                                    GroupBaseModel tmpGrpBaseModel = new GroupBaseModel(group3cxTmp.getId(), group3cxTmp.getGroupName());
    
                                    groupBaseModels.add(tmpGrpBaseModel);
                                }

                                Collections.sort(groupBaseModels, new Comparator<GroupBaseModel>() {
                                    @Override
                                    public int compare(GroupBaseModel gr1, GroupBaseModel gr2) {
                                        return gr1.getName().compareTo(gr2.getName());
                                    }
                                });
    
                                CredentialReturn credentialReturn = new CredentialReturn(user.getUsername(), tmpUser.getRole(), token, groupBaseModels);
    
                                entity = new ResponseEntity<>(credentialReturn, HttpStatus.OK);
                            } else {
                            
                                List<UserGroup> userGroups = userGroupService.retrieveByUserId(user.getUsername());

                                for (UserGroup userGroup : userGroups) {
                                    Group3CX tmpGroup3CX = group3cxService.retrieveById(userGroup.getGroupId());

                                    GroupBaseModel tmpGrpBaseModel = new GroupBaseModel(tmpGroup3CX.getId(), tmpGroup3CX.getGroupName());

                                    groupBaseModels.add(tmpGrpBaseModel);
                                }

                                Collections.sort(groupBaseModels, new Comparator<GroupBaseModel>() {
                                    @Override
                                    public int compare(GroupBaseModel gr1, GroupBaseModel gr2) {
                                        return gr1.getName().compareTo(gr2.getName());
                                    }
                                });

                                CredentialReturn credentialReturn = new CredentialReturn(user.getUsername(), tmpUser.getRole(), token, groupBaseModels);

                                entity = new ResponseEntity<>(credentialReturn, HttpStatus.OK);
                            }
                        }
                    } else {
                        entity = new ResponseEntity<>("{ \"Notice\": \"Invalid username or password\" }", HttpStatus.BAD_REQUEST);  // invalid password
                    }
                } else {
                    entity = new ResponseEntity<>("{ \"Notice\": \"User was blocked\" }", HttpStatus.LOCKED);
                }
            }
        }

        return entity;
    }

    /*
     * Create new manager user
     */
    @PostMapping(
        consumes = MediaType.APPLICATION_JSON_VALUE,
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Object> register(@RequestBody UserModel user) {
        ResponseEntity<Object> entity;

        // String token = authHeaderProcessing.getTokenFromAuthHeader(authorization);

        // myJWT jwt = new jwtSecurity();

        // Boolean authorized = jwt.VerifyToken(token, "admin");
        Boolean authorized = true;
        
        if(authorized) {
            if(user.getUsername() == null || user.getPassword() == null) {
                entity = new ResponseEntity<>("{ \"Notice\": \"Username and password not be empty\" }", HttpStatus.BAD_REQUEST);
            } else {
                PasswordAuthUtil passwordAuthUtil = new PasswordAuthUtil();
    
                String encryptedPassword = passwordAuthUtil.storePassword(user.getPassword());
                // User tmpToCreate = new User(user.getUsername(), encryptedPassword, true);
                User tmpToCreate = new User(user.getUsername(), user.getUsername(), encryptedPassword, "", "manager", 0, 1);
                User tmpSaved = userService.createOne(tmpToCreate);
    
                if(tmpSaved == null) {
                    entity = new ResponseEntity<>("{ \"Notice\": \"Username is existed\" }", HttpStatus.BAD_REQUEST);
                } else {
                    entity = new ResponseEntity<>("{ \"username\": \"" + user.getUsername() + "\", \"password\": \"" + user.getPassword() + "\" }", HttpStatus.OK);
                }
            }
        } else {
            entity = new ResponseEntity<>("{ \"Notice\": \"Unauthorized\" }", HttpStatus.UNAUTHORIZED);
        }

        return entity;
    }
}
