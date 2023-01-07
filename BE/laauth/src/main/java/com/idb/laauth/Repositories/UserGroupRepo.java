package com.idb.laauth.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.idb.laauth.Entities.UserGroup;
import com.idb.laauth.Entities.IdClasses.UserGroupId;

@Repository
@Transactional
public interface UserGroupRepo extends JpaRepository<UserGroup, UserGroupId> {
    List<UserGroup> findByUserId(String userId);

    List<UserGroup> findByGroupId(String groupId);

    Long deleteByUserId(String userId);
}
