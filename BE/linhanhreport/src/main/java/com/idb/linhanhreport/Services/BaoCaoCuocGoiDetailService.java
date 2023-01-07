package com.idb.linhanhreport.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idb.linhanhreport.Entities.BaoCaoCuocGoiDetail;
import com.idb.linhanhreport.Repositories.BaoCaoCuocGoiDetailRepo;

@Service
public class BaoCaoCuocGoiDetailService {
    @Autowired
    private BaoCaoCuocGoiDetailRepo repo;

    public List<BaoCaoCuocGoiDetail> retrieveAll() {
        List<BaoCaoCuocGoiDetail> baoCaoCuocGoiDetails = new ArrayList<BaoCaoCuocGoiDetail>();

        try {
            baoCaoCuocGoiDetails = repo.findCaoCuocGoiDetails();
        } catch (Exception e) {
            // TODO: handle exception
        }

        return baoCaoCuocGoiDetails;
    }
}
