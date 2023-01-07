package com.idb.linhanhreport.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.idb.linhanhreport.Entities.BaoCaoCuocGoiKhuVuc;
import com.idb.linhanhreport.Services.BaoCaoCuocGoiKhuVucService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/baocaocuocgoikhuvuc")
public class BaoCaoCuocGoiKhuVucController {
    @Autowired
    private BaoCaoCuocGoiKhuVucService baoCaoCuocGoiKhuVucService;

    @GetMapping(
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Object> retrieveAllWithFilters(@RequestParam(value = "from", required = true) String from, @RequestParam(value = "to", required = true) String to, @RequestParam(value = "direction", required = true) String direction, @RequestParam(value = "group", required = false) String group, @RequestParam(value = "username", required = false) String username) {
        ResponseEntity<Object> entity;

        List<BaoCaoCuocGoiKhuVuc> baoCaoCuocGoiKhuVucs = baoCaoCuocGoiKhuVucService.retrieveAllWithFilters(from, to, direction, group, username);

        entity = new ResponseEntity<>(baoCaoCuocGoiKhuVucs, HttpStatus.OK);

        return entity;
    }
}
