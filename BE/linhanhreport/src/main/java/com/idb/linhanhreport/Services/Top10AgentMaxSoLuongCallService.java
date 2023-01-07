package com.idb.linhanhreport.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idb.linhanhreport.Entities.Top10AgentMaxSoLuongCall;
import com.idb.linhanhreport.Repositories.Top10AgentMaxSoLuongCallRepo;

@Service
public class Top10AgentMaxSoLuongCallService {
    @Autowired
    private Top10AgentMaxSoLuongCallRepo repo;

    public List<Top10AgentMaxSoLuongCall> retrieveAllWithFilters(String from, String to, String direction, String group, String username) {
        List<Top10AgentMaxSoLuongCall> tmp = new ArrayList<Top10AgentMaxSoLuongCall>();

        try {
            tmp = repo.findTop10AgentMaxSoLuongCallsWithFilters(from, to, direction, group, username);
        } catch (Exception e) {
            // TODO: handle exception
        }

        return tmp;
    }
}
