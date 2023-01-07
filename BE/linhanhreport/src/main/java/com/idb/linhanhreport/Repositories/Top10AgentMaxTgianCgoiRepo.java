package com.idb.linhanhreport.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.idb.linhanhreport.Entities.Top10AgentMaxTgianCgoi;

@Repository
public interface Top10AgentMaxTgianCgoiRepo extends JpaRepository<Top10AgentMaxTgianCgoi, String> {
    
    String query1 = "select * from prc_04_tk_time_cuocgoi_by_agent_top10(?1, ?2, ?3, ?4, ?5)";
    @Query(
        value = query1,
        nativeQuery = true
    )
    List<Top10AgentMaxTgianCgoi> findTop10AgentMaxTgianCgoiWithFilters(String from, String to, String direction, String group, String username);
}
