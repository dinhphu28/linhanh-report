package com.idb.laauth.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.idb.laauth.Entities.Group3CX;

@Repository
@Transactional
public interface Group3CXRepo extends JpaRepository<Group3CX, String> {
    List<Group3CX> findByGroupLevel(Integer groupLevel);

    List<Group3CX> findByParentGroupId(String parentId);

    List<Group3CX> findByGroupLevelAndParentGroupId(Integer groupLevel, String parentId);
}
