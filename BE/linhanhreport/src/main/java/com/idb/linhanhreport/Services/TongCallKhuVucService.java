package com.idb.linhanhreport.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idb.linhanhreport.Entities.TongCallKhuVuc;
import com.idb.linhanhreport.Repositories.TongCallKhuVucRepo;

@Service
public class TongCallKhuVucService {
    @Autowired
    private TongCallKhuVucRepo repo;

    public List<TongCallKhuVuc> retrieveAllWithFilters(String from, String to, String direction, String group, String username) {
        List<TongCallKhuVuc> tmp = new ArrayList<TongCallKhuVuc>();

        try {
            tmp = repo.findTop10AgentMaxSoLuongCallsWithFilters(from, to, direction, group, username);
        } catch (Exception e) {
            // TODO: handle exception
        }

        return tmp;
    }
}
