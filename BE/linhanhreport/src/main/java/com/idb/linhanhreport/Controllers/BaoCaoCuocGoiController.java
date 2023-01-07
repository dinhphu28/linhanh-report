package com.idb.linhanhreport.Controllers;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.idb.linhanhreport.Entities.BaoCaoCuocGoiDetail;
import com.idb.linhanhreport.Entities.BaoCaoCuocGoiTotal;
import com.idb.linhanhreport.Services.BaoCaoCuocGoiDetailService;
import com.idb.linhanhreport.Services.BaoCaoCuocGoiTotalService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/baocaocuocgoi")
public class BaoCaoCuocGoiController {
    @Autowired
    private BaoCaoCuocGoiTotalService baoCaoCuocGoiTotalService;

    @Autowired
    private BaoCaoCuocGoiDetailService baoCaoCuocGoiDetailService;

    @GetMapping(
        value = "/total",
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    // public ResponseEntity<Object> retrieveBaoCaoCuocGoiTotalWithParams(@RequestParam(value = "from", required = true) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime from, @RequestParam(value = "to", required = true) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime to, @RequestParam(value = "direction", required = true) String direction, @RequestParam(value = "group", required = false) String group, @RequestParam(value = "agent", required = false) String agent, @RequestParam(value = "destination", required = false) String destination, @RequestParam(value = "source", required = false) String source, @RequestParam(value = "username", required = false) String username) {
    public ResponseEntity<Object> retrieveBaoCaoCuocGoiTotalWithParams(@RequestParam(value = "from", required = true) String from, @RequestParam(value = "to", required = true) String to, @RequestParam(value = "direction", required = true) String direction, @RequestParam(value = "group", required = false) String group, @RequestParam(value = "agent", required = false) String agent, @RequestParam(value = "destination", required = false) String destination, @RequestParam(value = "source", required = false) String source, @RequestParam(value = "username", required = false) String username) {
        ResponseEntity<Object> entity;

        if(group == null) {
            group = "";
        }
        if(agent == null) {
            agent = "";
        }
        if(destination == null) {
            destination = "";
        }
        if(source == null) {
            source = "";
        }
        if(username == null) {
            username = "";
        }

        List<BaoCaoCuocGoiTotal> baoCaoCuocGoiTotals = baoCaoCuocGoiTotalService.retrieveWithParams(from, to, direction, group, agent, destination, source, username);

        entity = new ResponseEntity<>(baoCaoCuocGoiTotals, HttpStatus.OK);

        return entity;
    }

    @GetMapping(
        value = "/detail",
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Object> retrieveAllAfterTotal() {
        ResponseEntity<Object> entity;

        List<BaoCaoCuocGoiDetail> baoCaoCuocGoiDetails = baoCaoCuocGoiDetailService.retrieveAll();

        entity = new ResponseEntity<>(baoCaoCuocGoiDetails, HttpStatus.OK);

        return entity;
    }
}
