package com.idb.linhanhreport.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.idb.linhanhreport.Entities.BaoCaoCuocGoiDetail;

@Repository
public interface BaoCaoCuocGoiDetailRepo extends JpaRepository<BaoCaoCuocGoiDetail, String> {
    
    String query1 = "select * from tmp_data_kq_prc01";
    String countQuery1 = "select count(time_view) from tmp_data_kq_prc01";
    @Query(
        value = query1,
        countQuery = countQuery1,
        nativeQuery = true
    )
    List<BaoCaoCuocGoiDetail> findCaoCuocGoiDetails();
}
