package com.idb.linhanhreport.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idb.linhanhreport.Entities.Top10AgentMaxTgianCgoi;
import com.idb.linhanhreport.Repositories.Top10AgentMaxTgianCgoiRepo;

@Service
public class Top10AgentMaxTgianCgoiService {
    @Autowired
    private Top10AgentMaxTgianCgoiRepo repo;

    public List<Top10AgentMaxTgianCgoi> retrieveAllWithFilters(String from, String to, String direction, String group, String username) {
        List<Top10AgentMaxTgianCgoi> tmp = new ArrayList<Top10AgentMaxTgianCgoi>();

        try {
            tmp = repo.findTop10AgentMaxTgianCgoiWithFilters(from, to, direction, group, username);
        } catch (Exception e) {
            // TODO: handle exception
        }

        return tmp;
    }
}
