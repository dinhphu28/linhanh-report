package com.idb.laauth.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.idb.laauth.Entities.Group3CX;
import com.idb.laauth.Services.Group3CXService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/groups")
public class Group3CXController {
    @Autowired
    private Group3CXService group3cxService;

    @GetMapping(
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Object> retrieveAll() {
        ResponseEntity<Object> entity;

        List<Group3CX> group3cxs = group3cxService.retrieveAll();

        entity = new ResponseEntity<>(group3cxs, HttpStatus.OK);

        return entity;
    }
}
