package com.idb.linhanhreport.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.idb.linhanhreport.Entities.BaoCaoCuocGoiKhuVuc;

@Repository
public interface BaoCaoCuocGoiKhuVucRepo extends JpaRepository<BaoCaoCuocGoiKhuVuc, String> {
    
    String query1 = "select * from prc_02_tk_slg_cuocgoi_by_group(?1, ?2, ?3, ?4, ?5)";
    @Query(
        value = query1,
        nativeQuery = true
    )
    List<BaoCaoCuocGoiKhuVuc> findBaoCaoCuocGoiKhuVuc(String from, String to, String direction, String group, String username);
}
