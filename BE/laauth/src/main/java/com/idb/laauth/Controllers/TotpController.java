package com.idb.laauth.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.idb.laauth.Models.ReturnModel;
import com.idb.laauth.Utils.TOTP.TOTPUtils;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/totp")
public class TotpController {
    @Autowired
    private TOTPUtils totpUtils;

    @GetMapping(
        value = "/secretkey",
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Object> retrieveQR() {
        ResponseEntity<Object> entity;

        String secKey = totpUtils.generateSecretKey();

        entity = new ResponseEntity<>(new ReturnModel("SecKey", "otpauth://totp/user?secret=" + secKey + "&issuer=2fademo"), HttpStatus.OK);

        return entity;
    }
}
