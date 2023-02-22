package com.idb.laauth.Entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "dir_user_seckey")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserSecKey {
    @Id
    @Column(name = "userid")
    private String userId;

    @Column(name = "c_seckey")
    private String secKey;
}
