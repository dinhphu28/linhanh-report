package com.idb.linhanhreport.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idb.linhanhreport.Entities.BaoCaoCuocGoiKhuVuc;
import com.idb.linhanhreport.Repositories.BaoCaoCuocGoiKhuVucRepo;

@Service
public class BaoCaoCuocGoiKhuVucService {
    @Autowired
    private BaoCaoCuocGoiKhuVucRepo repo;

    public List<BaoCaoCuocGoiKhuVuc> retrieveAllWithFilters(String from, String to, String direction, String group, String username) {
        List<BaoCaoCuocGoiKhuVuc> tmp = new ArrayList<BaoCaoCuocGoiKhuVuc>();

        try {
            tmp = repo.findBaoCaoCuocGoiKhuVuc(from, to, direction, group, username);
        } catch (Exception e) {
            // TODO: handle exception
        }

        return tmp;
    }
}
