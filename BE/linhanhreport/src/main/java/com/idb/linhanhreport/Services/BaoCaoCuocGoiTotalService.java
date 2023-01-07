package com.idb.linhanhreport.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idb.linhanhreport.Entities.BaoCaoCuocGoiTotal;
import com.idb.linhanhreport.Repositories.BaoCaoCuocGoiTotalRepo;

@Service
public class BaoCaoCuocGoiTotalService {
    @Autowired
    private BaoCaoCuocGoiTotalRepo repo;

    public List<BaoCaoCuocGoiTotal> retrieveWithParams(String from, String to, String direction, String group, String agent, String destination, String source, String username) {
        List<BaoCaoCuocGoiTotal> baoCaoCuocGoiTotals = new ArrayList<BaoCaoCuocGoiTotal>();

        try {
            baoCaoCuocGoiTotals = repo.findBaoCaoCuocGoiTotals(from, to, direction, group, agent, destination, source, username);
        } catch (Exception e) {
            // TODO: handle exception
        }

        return baoCaoCuocGoiTotals;
    }
}
