package com.idb.linhanhreport.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.idb.linhanhreport.Entities.Group;
import com.idb.linhanhreport.Entities.NoticeModel;
import com.idb.linhanhreport.Services.GroupService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/groups")
public class GroupController {
    @Autowired
    private GroupService groupService;

    @Value("${idb.internal.apikey}")
    private String localApiKey;

    @GetMapping(
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Object> retrieveAll(@RequestHeader(value = "X-API-KEY", required = true) String apiKey) {
        ResponseEntity<Object> entity;

        if(apiKey == null) {
            entity = new ResponseEntity<>(new NoticeModel("401", "Unauthorized"), HttpStatus.UNAUTHORIZED);
        } else if(apiKey.equals(localApiKey)) {
            List<Group> groups = groupService.retrieveAll();

            entity = new ResponseEntity<>(groups, HttpStatus.OK);
        } else {
            entity = new ResponseEntity<>(new NoticeModel("401", "Unauthorized"), HttpStatus.UNAUTHORIZED);
        }

        return entity;
    }
}
