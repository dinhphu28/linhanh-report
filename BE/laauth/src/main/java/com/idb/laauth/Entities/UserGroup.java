package com.idb.laauth.Entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import com.idb.laauth.Entities.IdClasses.UserGroupId;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "app_fd_user_group")
@IdClass(UserGroupId.class)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserGroup {
    @Id
    @Column(name = "groupid")
    private String groupId;

    @Id
    @Column(name = "userid")
    private String userId;
}
