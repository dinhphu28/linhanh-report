package com.idb.linhanhreport.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.idb.linhanhreport.Entities.Top10AgentMaxSoLuongCall;

@Repository
public interface Top10AgentMaxSoLuongCallRepo extends JpaRepository<Top10AgentMaxSoLuongCall, String> {
    
    String query1 = "select * from prc_03_tk_slg_cuocgoi_by_agent_top10(?1, ?2, ?3, ?4, ?5)";
    @Query(
        value = query1,
        nativeQuery = true
    )
    List<Top10AgentMaxSoLuongCall> findTop10AgentMaxSoLuongCallsWithFilters(String from, String to, String direction, String group, String username);
}
