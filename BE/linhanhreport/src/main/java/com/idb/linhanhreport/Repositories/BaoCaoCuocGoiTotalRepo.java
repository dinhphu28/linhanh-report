package com.idb.linhanhreport.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.idb.linhanhreport.Entities.BaoCaoCuocGoiTotal;

@Repository
public interface BaoCaoCuocGoiTotalRepo extends JpaRepository<BaoCaoCuocGoiTotal, Integer> {
    
    String query1 = "select * from prc_01_baocao_cuocgoi_detail( ?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)";
    @Query(
        value = query1,
        nativeQuery = true
    )
    List<BaoCaoCuocGoiTotal> findBaoCaoCuocGoiTotals(String from, String to, String direction, String group, String agent, String destination, String source, String username);
}
